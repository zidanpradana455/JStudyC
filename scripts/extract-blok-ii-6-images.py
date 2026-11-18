"""Extract Blok II.6 Cumex 1 question images from the source PDFs into JPG files.

Usage (from JStudyC):  python -I scripts/extract-blok-ii-6-images.py
Source PDFs are expected at tmp/blok2.6/src/{reg23,iup22,iup23,iup21}.pdf.
Output: tmp/blok2.6/images/<sourceCode>_q<id>.jpg + tmp/blok2.6/image-manifest.json
Each entry maps a question to an embedded image xref that was visually verified.
"""
import hashlib, io, json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, os.path.join(ROOT, 'tmp', 'blok2.5', 'python-packages'))
import pymupdf as fitz  # noqa: E402
from PIL import Image  # noqa: E402

WORK = os.path.join(ROOT, 'tmp', 'blok2.6')
OUT = os.path.join(WORK, 'images')

# (pdf, page 1-based, xref, sourceCode, question id, crop px from bottom)
IMAGES = [
    ('iup22', 1, 7,  'cumex1_blok2.6_iup_2022', 3, 0),   # thrombus, lines of Zahn
    ('iup22', 1, 8,  'cumex1_blok2.6_iup_2022', 4, 0),   # CXR miliary pattern
    ('iup22', 2, 11, 'cumex1_blok2.6_iup_2022', 5, 14),  # CXR air bronchogram (strip blue border)
    ('iup23', 3, 19, 'cumex1_blok2.6_iup_2023', 3, 0),   # CXR left tension pneumothorax
    ('iup23', 13, 50, 'cumex1_blok2.6_iup_2023', 12, 0), # ruptured abdominal aortic aneurysm
    ('reg23', 2, 10, 'cumex1_blok2.6_reg_2023', 1, 0),   # caseating granuloma
    ('reg23', 3, 13, 'cumex1_blok2.6_reg_2023', 8, 0),   # nutmeg liver
    ('reg23', 3, 14, 'cumex1_blok2.6_reg_2023', 10, 0),  # catalase slide test
]


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    docs = {}
    for pdf, page, xref, code, qid, crop in IMAGES:
        doc = docs.setdefault(pdf, fitz.open(os.path.join(WORK, 'src', pdf + '.pdf')))
        assert xref in [im[0] for im in doc[page - 1].get_images()], f'xref {xref} not on {pdf} p{page}'
        pix = fitz.Pixmap(doc, xref)
        if pix.n - pix.alpha >= 4 or pix.alpha:
            pix = fitz.Pixmap(fitz.csRGB, pix, 0)
        img = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        if crop:
            img = img.crop((0, 0, img.width, img.height - crop))
        name = f'{code}_q{qid}.jpg'
        path = os.path.join(OUT, name)
        img.save(path, 'JPEG', quality=90)
        data = open(path, 'rb').read()
        manifest.append({'sourceCode': code, 'id': qid, 'file': name, 'pdf': pdf, 'page': page,
                         'xref': xref, 'size': [img.width, img.height],
                         'sha256': hashlib.sha256(data).hexdigest()})
        print(name, img.size)
    with open(os.path.join(WORK, 'image-manifest.json'), 'w', encoding='utf8') as f:
        json.dump(manifest, f, indent=2)


if __name__ == '__main__':
    main()
