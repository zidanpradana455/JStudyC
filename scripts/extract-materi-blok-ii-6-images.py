"""Crop lecture-slide figures for the Blok II.6 materi pages into JPG files.

Usage (from JStudyC):
  python3 -I scripts/extract-materi-blok-ii-6-images.py [--src DIR] [CODE ...]
Source PDFs are read from --src (default: the folder that contains JStudyC).
PyMuPDF + Pillow are loaded from tmp/python-packages if installed there
(pip install --target tmp/python-packages pymupdf pillow).

For each listed slide the script unions the slide's picture rectangles
(ignoring the small UGM logo / template strips), renders that region at 3x,
and saves assets/materi/blok2.6/<unit>/<name>.jpg (max 1400 px wide).
"""
import argparse
import glob
import io
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, os.path.join(ROOT, 'tmp', 'python-packages'))
import pymupdf as fitz  # noqa: E402
from PIL import Image  # noqa: E402

OUT = os.path.join(ROOT, 'assets', 'materi', 'blok2.6')

# unit folder -> (source PDF glob, [(1-based page, output name[, crop]), ...]),
# or a list of such tuples when a unit combines several lecturers' PDFs.
# crop = (x0, y0, x1, y1) in a 1270 px-wide slide frame, for figures sitting on
# a full-slide picture (blue template panels) where auto-detection grabs too much.
FIGURES = {
    'el-1-2': ('EL 1.2 - *.pdf', [
        (9, 'patogenesis-edema', (286, 288, 961, 742)),
        (11, 'mekanisme-edema-sistemik', (236, 250, 1055, 870)),
        (13, 'polip-edema-pitting'),
        (19, 'kongesti-paru', (385, 392, 845, 760)),
        (20, 'nutmeg-liver', (150, 396, 1105, 727)),
        (24, 'petekie', (182, 252, 1115, 872)),
        (25, 'perdarahan-otak', (165, 236, 1120, 872)),
        (27, 'hemostasis', (140, 312, 1130, 840)),
        (29, 'trias-virchow'),
        (32, 'trombus-lines-of-zahn'),
        (33, 'faktor-trombosis', (143, 340, 1120, 825)),
        (34, 'nasib-trombus', (205, 314, 1150, 860)),
        (38, 'saddle-embolus', (136, 233, 589, 838)),
        (39, 'emboli-asal-jantung', (172, 300, 1104, 815)),
        (40, 'emboli-sumsum-tulang'),
        (41, 'emboli-air-ketuban'),
        (43, 'infark-merah-putih'),
        (49, 'syok-septik', (220, 272, 1100, 823)),
    ]),
    'el-1-3': ('EL 1.3 - *.pdf', [
        (4, 'arteriolosklerosis'),
        (8, 'jenis-aneurisma'),
        (13, 'diseksi-aorta'),
        (15, 'klasifikasi-vaskulitis'),
        (17, 'giant-cell-arteritis'),
        (23, 'poliarteritis-nodosa'),
        (27, 'kawasaki-kriteria'),
        (32, 'buerger'),
        (44, 'raynaud'),
        (59, 'elefantiasis'),
        (64, 'kaposi'),
        (72, 'hipertrofi-jantung'),
        (85, 'heart-failure-cells'),
        (96, 'distribusi-infark'),
        (102, 'histologi-infark'),
        (104, 'komplikasi-infark'),
        (112, 'jantung-rematik'),
        (114, 'endokarditis-infektif'),
        (121, 'kardiomiopati-hipertrofik'),
        (131, 'miksoma-atrium'),
    ]),
    'el-1-4': ('EL 1.4 - *.pdf', [
        (4, 'lapisan-jantung', (40, 365, 1225, 670)),
        (9, 'perikarditis-efusi', (250, 362, 895, 668)),
        (14, 'kriteria-duke', (172, 112, 1097, 636)),
        (15, 'manifestasi-endokarditis', (0, 112, 1215, 672)),
    ]),
    'el-1-5': ('EL 1.5 - *.pdf', [
        (10, 'vicious-cycle', (170, 155, 1110, 650)),
        (13, 'progresi-pencetus', (60, 112, 1180, 640)),
        (14, 'klasifikasi-hf', (0, 80, 1268, 655)),
        (23, 'terapi-berdasarkan-lvef', (95, 30, 1175, 660)),
        (26, 'lokasi-diuretik', (150, 280, 925, 655)),
        (28, 'algoritma-hfref', (245, 65, 1078, 662)),
        (29, 'terapi-perangkat', (55, 160, 1235, 490)),
    ]),
    'el-1-6': ('EL 1.6 - *.pdf', [
        (8, 'saluran-napas-asma'),
        (9, 'patologi-asma', (110, 272, 1225, 785)),
        (13, 'variasi-pef'),
        (20, 'gina-step'),
        (24, 'bronkitis-emfisema'),
        (30, 'bronkitis-kronik-histologi'),
        (31, 'emfisema-a1at'),
        (35, 'sentrilobular-panlobular'),
        (42, 'sopt-destroyed-lung'),
        (48, 'bronkiektasis-ct'),
        (53, 'lingkaran-cole'),
        (59, 'fibrosis-pasca-covid'),
    ]),
    'is-1-8': [
        ('IS 1.8 - Pneumonia, dr. Ika*.pdf', [
            (9, 'fase-patologi-pneumonia'),
            (20, 'radiologi-pneumonia'),
            (22, 'radiologi-ggo-nodul', (0, 104, 690, 666)),
            (28, 'curb-65'),
            (39, 'komplikasi-pneumonia'),
        ]),
        ('IS 1.8 - Pneumonia, dr. Dwikisworo*.pdf', [
            (16, 'patogenesis-pneumonia-anak'),
            (19, 'tarikan-dinding-dada'),
            (23, 'klasifikasi-mtbs'),
            (26, 'foto-toraks-anak'),
        ]),
        ('IS 1.8 - Pneumonia, dr. M. Edwin*.pdf', [
            (27, 'pewarnaan-gram'),
            (29, 's-pneumoniae'),
            (30, 's-aureus'),
            (31, 'h-influenzae'),
        ]),
    ],
    'ps-1-1': ('Isolasi strepto dan staphylo_Praktikum Mikrobiologi.pdf', [
        (2, 'gram-dan-hemolisis'),
        (3, 'alur-identifikasi-streptococcus'),
        (5, 'virulensi-s-aureus'),
        (6, 'uji-koagulase'),
        (7, 'uji-katalase'),
    ]),
    'pd-1-9': [
        ('PD 1.9 - Diagnostic approach of Tuberculosis, Prof. dr. Titik*.pdf', [
            (5, 'alur-diagnosis-tb-paru', (20, 5, 1240, 665)),
            (11, 'pewarnaan-zn'),
            (12, 'pembacaan-bta'),
            (16, 'gen-target-tcm', (60, 90, 1260, 540)),
            (21, 'interpretasi-tcm', (22, 98, 1260, 645)),
            (32, 'mgit-positif'),
        ]),
        ('PD 1.9 - Diagnostic approach of Tuberculosis, dr. Noviana*.pdf', [
            (4, 'spektrum-infeksi-tb'),
            (10, 'kompleks-primer'),
            (11, 'kompleks-ghon-ranke'),
            (14, 'perjalanan-alamiah-tb'),
            (20, 'limfadenitis-tb'),
        ]),
        ('PD 1.9 - Diagnostic approach of Tuberculosis, Prof. Dr. Dra. Erna*.pdf', [
            (19, 'dosis-oat-berat-badan', (250, 15, 1012, 703)),
        ]),
    ],
    'pd-1-10': [
        ('PD 1.10 - Clinical approach of Tuberculosis, dr. Harik*.pdf', [
            (23, 'dosis-oat-dewasa', (35, 55, 880, 655)),
            (24, 'efek-samping-oat', (60, 60, 1215, 660)),
            (34, 'macam-tb-ro', (55, 90, 1010, 690)),
            (36, 'algoritma-tb-ro'),
            (39, 'paduan-tb-ro', (60, 100, 1230, 640)),
        ]),
        ('PD 1.10 - Clinical approach of Tuberculosis, dr. Rina*.pdf', [
            (29, 'algoritma-tb-anak', (20, 5, 1215, 690)),
            (33, 'regimen-tb-anak', (10, 20, 1250, 700)),
            (47, 'investigasi-kontak', (10, 15, 1260, 705)),
            (53, 'paduan-tpt', (30, 100, 1245, 660)),
        ]),
        ('PD 1.10 - Clinical approach of Tuberculosis, dr. Dwi Damar*.pdf', [
            (8, 'limfadenopati-hilus-anak'),
            (10, 'tb-milier-anak'),
            (11, 'efusi-perikard'),
            (18, 'konsolidasi-tb'),
            (20, 'kavitas-tb'),
            (22, 'tb-milier-dewasa'),
            (24, 'fibrosis-apikal'),
            (26, 'kalsifikasi-tb'),
        ]),
    ],
    'el-1-7': ('EL 1.7 - *.pdf', [
        (6, 'mekanisme-asma'),
        (7, 'mekanisme-ppok'),
        (11, 'target-obat-asma'),
    ]),
    'ps-1-3': ('PPT Praktikum Blok II.6*.pdf', [
        (7, 'polip-mikroskopis'),
        (12, 'inverted-papilloma-makroskopis'),
        (14, 'inverted-papilloma-mikroskopis'),
        (20, 'scc-well-differentiated'),
        (21, 'scc-moderately-differentiated'),
        (22, 'scc-poorly-differentiated'),
        (23, 'p40-imunohistokimia'),
        (31, 'npc-undifferentiated'),
        (32, 'npc-metastasis-kgb'),
    ]),
    'ps-1-4': ('*Transudate Exudate Exam.pdf', [
        (5, 'gaya-starling'),
        (7, 'akumulasi-cairan-interstitial'),
        (8, 'pengambilan-sampel'),
        (11, 'kriteria-light'),
        (14, 'makroskopis-cairan-efusi'),
        (19, 'kamar-hitung-neubauer'),
        (21, 'sel-transudat-vs-eksudat'),
        (22, 'sel-mesotelial'),
        (25, 'prosedur-rivalta'),
    ]),
    'is-1-13': [
        ('IS 1.13 - *Ratih*.pdf', [
            (4, 'rangka-toraks'),
            (5, 'fraktur-iga-flail-chest'),
            (10, 'proyeksi-pleura'),
            (18, 'torakosentesis'),
        ]),
        ('IS 1.13 - *Hanggoro*.pdf', [
            (11, 'makroskopis-pneumonia-lobaris'),
            (15, 'mikroskopis-pneumonia-bakterial'),
            (17, 'pneumonia-viral-dad'),
            (20, 'pneumonia-aspirasi'),
            (25, 'abses-paru'),
            (30, 'sclc-makroskopis'),
            (31, 'sclc-mikroskopis'),
            (35, 'adenokarsinoma-mikroskopis'),
            (38, 'scc-paru-diferensiasi'),
            (45, 'mesotelioma-subtipe'),
        ]),
        ('IS 1.13 - *Dwi Damar*.pdf', [
            (14, 'cxr-normal'),
            (25, 'radiolusen-radioopak'),
            (30, 'pneumonia-lobaris-silhouette'),
            (34, 'pneumonia-segmental'),
            (36, 'round-pneumonia'),
            (38, 'pneumonia-interstisial-pcp'),
            (40, 'tb-kavitas'),
            (45, 'emfisema-cxr'),
            (47, 'emfisema-sentriasinar-ct'),
            (53, 'efusi-pleura-erect'),
            (63, 'pneumotoraks-simple-tension'),
        ]),
    ],
    'pd-1-12': [
        ('PD 1.12 - *Ika Trisnawati*.pdf', [
            (3, 'struktur-sars-cov-2'),
            (7, 'patofisiologi-covid'),
            (8, 'progresi-penyakit-covid'),
            (9, 'manifestasi-ekstraparu'),
            (11, 'ggo-foto-toraks'),
            (13, 'ct-toraks-covid'),
        ]),
        ('PD 1.12 - *Erlangga*.pdf', [
            (5, 'ards-covid-fenotip'),
            (11, 'endotelialitis-pic'),
            (12, 'tahapan-keparahan-covid'),
            (21, 'posisi-prone'),
        ]),
        ('PD 1.12 - *Eggi*.pdf', [
            (10, 'patofisiologi-mis-c'),
            (11, 'manifestasi-mis-c'),
            (12, 'diagnosis-banding-mis-c'),
        ]),
    ],
    'is-1-11': [
        ('IS 1.11 - *dr. Hesti*.pdf', [
            (9, 'tonsilitis-folikular'),
            (10, 'tonsilitis-membranosa'),
            (16, 'patogenesis-tonsilitis-kronik', (5, 25, 1265, 712)),
            (27, 'epiglotitis'),
            (36, 'abses-leher-dalam'),
        ]),
        ('IS 1.11 - *Nungki*.pdf', [
            (2, 'histologi-hidung-normal'),
            (9, 'mikroskopis-sinusitis-kronik'),
            (10, 'allergic-mucin'),
            (15, 'endoskopi-polip-nasal'),
            (16, 'mikroskopis-polip'),
            (20, 'inverted-papilloma-makroskopis'),
            (21, 'inverted-papilloma-mikroskopis'),
            (30, 'laringitis-akut-makroskopis'),
            (32, 'laringitis-kronik-mikroskopis'),
            (42, 'scc-laring-mikroskopis'),
            (53, 'npc-mikroskopis'),
        ]),
    ],
}

MIN_AREA = 0.04   # ignore pictures smaller than 4% of the slide (logos, icons)
MAX_AREA = 0.97   # ignore full-slide template backgrounds
MAX_WIDTH = 1400
REF_WIDTH = 1270


def figure_rect(page):
    area = page.rect.width * page.rect.height
    rects = []
    for info in page.get_image_info():
        r = fitz.Rect(info['bbox']) & page.rect
        if r.is_empty:
            continue
        frac = r.width * r.height / area
        if MIN_AREA <= frac <= MAX_AREA:
            rects.append(r)
    if not rects:
        return None
    box = rects[0]
    for r in rects[1:]:
        box |= r
    return box


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=os.path.dirname(ROOT))
    ap.add_argument('units', nargs='*')
    args = ap.parse_args()

    for unit, sources in FIGURES.items():
        if args.units and unit not in args.units:
            continue
        if isinstance(sources, tuple):
            sources = [sources]
        os.makedirs(os.path.join(OUT, unit), exist_ok=True)
        for pattern, figures in sources:
            extract(unit, pattern, figures, args.src)


def extract(unit, pattern, figures, src):
    matches = glob.glob(os.path.join(glob.escape(src), pattern))
    if len(matches) != 1:
        sys.exit(f'{unit}: expected one PDF for {pattern!r}, found {len(matches)}')
    doc = fitz.open(matches[0])
    for page_no, name, *crop in figures:
        page = doc[page_no - 1]
        if crop:
            k = page.rect.width / REF_WIDTH
            clip = fitz.Rect(*(v * k for v in crop[0]))
        else:
            clip = figure_rect(page)
        if clip is None:
            print(f'  ! {unit}/{name}: no picture on p{page_no}, rendering whole slide')
            clip = page.rect
        pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip, alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        if img.width > MAX_WIDTH:
            img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
        path = os.path.join(OUT, unit, name + '.jpg')
        img.save(path, 'JPEG', quality=82, optimize=True, progressive=True)
        print(f'{unit}/{name}.jpg  p{page_no}  {img.width}x{img.height}  {os.path.getsize(path) // 1024} KB')


if __name__ == '__main__':
    main()
