from pathlib import Path
import json
import re

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT.parent / "Bank Soal" / "Blok II.3" / "M.NOTES MINI OSCE SEM 4 (1).pdf"
OUTPUT_PATH = ROOT / "data" / "osce-competency-details.js"


reader = PdfReader(str(PDF_PATH))


def clean_page(number):
    text = reader.pages[number - 1].extract_text() or ""
    text = re.sub(
        r"M\.NOTES\s+MINOS\s+SEM\s+4\s*-\s*armeyra\.devani\.ferintasari@mail\.ugm\.ac\.id",
        "",
        text,
        flags=re.I,
    )
    text = re.sub(
        r"\*Efek\s+samping\s+konsumsi\s+M\.NOTES.*?MINOS",
        "",
        text,
        flags=re.I | re.S,
    )
    text = text.replace("M.NOTES OSCE 1", "OSCE 1")
    text = text.replace("M.NOTES", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return text.strip()


PAGES = {number: clean_page(number) for number in range(3, 49)}


def section(text, start=None, end=None):
    start_index = 0
    if start:
        start_index = text.lower().find(start.lower())
        if start_index < 0:
            raise ValueError(f"Start marker not found: {start}")
    end_index = len(text)
    if end:
        end_index = text.lower().find(end.lower(), start_index + (len(start) if start else 0))
        if end_index < 0:
            raise ValueError(f"End marker not found: {end}")
    return text[start_index:end_index].strip()


def combine(*parts):
    return "\n\n".join(part.strip() for part in parts if part and part.strip())


def marker_index(text, marker, after=0):
    index = text.lower().find(marker.lower(), after)
    if index < 0:
        raise ValueError(f"Marker not found after position {after}: {marker}")
    return index


def clinical_page(
    page_number,
    first_test,
    treatment_start,
    extra_physical="",
    extra_treatment="",
    education_start="Edukasi",
):
    text = PAGES[page_number]
    complaint_index = marker_index(text, "Keluhan")
    vital_index = marker_index(text, "TTV", complaint_index)
    test_index = marker_index(text, first_test, vital_index)
    treatment_index = marker_index(text, treatment_start, test_index)
    education_index = marker_index(text, education_start, treatment_index)
    return {
        "diagnosis": text[:complaint_index].strip(),
        "anamnesis": text[complaint_index:vital_index].strip(),
        "physical": combine(text[vital_index:test_index], extra_physical),
        "support": text[test_index:treatment_index].strip(),
        "treatment": combine(text[treatment_index:education_index], extra_treatment),
        "education": text[education_index:].strip(),
    }


def ipm(details, professional=None):
    return [
        details["anamnesis"],
        details["physical"],
        details["support"],
        details["diagnosis"],
        details["treatment"],
        details["education"],
        professional or "Menilai informed consent, penghormatan terhadap pasien, kehati-hatian, prioritas tindakan, dan kemampuan mengenali keterbatasan.",
    ]


def eye(details):
    return [
        details["anamnesis"],
        details["physical"],
        details["diagnosis"],
        details["treatment"],
        details["education"],
        "Menilai informed consent, kenyamanan pasien saat pemeriksaan mata, higiene tangan, ketelitian, dan pengenalan kondisi yang memerlukan rujukan.",
    ]


def tht(details):
    return [
        details["anamnesis"],
        details["physical"],
        details["diagnosis"],
        details["treatment"],
        details["treatment"],
        details["education"],
        "Menilai informed consent, kenyamanan pasien, kehati-hatian penggunaan alat THT, prioritas tindakan, dan pengenalan keterbatasan.",
    ]


typhoid = clinical_page(10, "Kultur Salmonella typhi", "Dosis dewasa")
malaria = clinical_page(11, "Mikroskopis", "Dewasa…")
leptospirosis = clinical_page(12, "CBC", "Dewasa")
dengue = clinical_page(
    13,
    "CBC",
    "DEWASA....",
    extra_physical=section(PAGES[14], None, "turunkan jumlah cairan"),
    extra_treatment=section(PAGES[14], "turunkan jumlah cairan", None),
)
gerd = clinical_page(15, "PPI Test", "Dosis dewasa")
gastritis = clinical_page(16, "Penunjang perlu", "Non H.pylori")
tb = clinical_page(17, "Tes Sputum", "Dewasa \n Fase Intensif")
pneumonia = clinical_page(18, "CXR", "Menentukan rawat inap")
copd = clinical_page(19, "CXR", "PPOK STABIL")
pneumothorax = clinical_page(20, "CXR", "Non Emergency")
heart_failure = clinical_page(21, "CXR", "Non Emergency")
tth = clinical_page(22, "Tidak perlu", "Pengobatan Abortif", extra_physical=PAGES[23])
cluster = clinical_page(
    24,
    "Tidak perlu",
    "Oksigenasi",
    extra_physical=PAGES[25],
    education_start="● Hasilnya normal",
)
migraine = clinical_page(26, "Tidak perlu", "Pengobatan Abortif", extra_physical=PAGES[27])
bppv = clinical_page(28, "Tidak perlu", "Medika Mentosa", extra_physical=combine(PAGES[29], PAGES[30]))
hordeolum = clinical_page(34, "Tidak perlu", "Antibiotik", extra_physical=PAGES[35])
conjunctivitis = clinical_page(36, "Tidak perlu", "Bakterial", extra_physical=PAGES[37])
keratitis = clinical_page(38, "Tidak perlu", "Bakterial", extra_physical=PAGES[39])
oa = clinical_page(42, "X-Ray", "NSAID")
gout = clinical_page(43, "X-Ray", "NSAID")
oma = clinical_page(40, "Audiometri", "Sesuai stadium")
epistaxis = clinical_page(41, "Darah Perifer", "Hentikan Perdarahan")


leprosy_diagnosis = section(PAGES[31], None, "Keluhan")
leprosy_anamnesis = section(PAGES[31], "Keluhan", "TTV")
leprosy_physical = combine(
    section(PAGES[31], "TTV", "Pemeriksaaan MIkroskopis"),
    section(PAGES[32], None, "Pemeriksaan MIkroskopis") if "Pemeriksaan MIkroskopis" in PAGES[32] else PAGES[32].split("Pada MB")[0],
    PAGES[33],
)
leprosy_support = section(PAGES[31], "Pemeriksaaan MIkroskopis", "Terapi menggunakan")
leprosy_treatment = combine(
    section(PAGES[31], "Terapi menggunakan", "Edukasi"),
    section(PAGES[32], "Pada MB", "dubia ad malam"),
)
leprosy_treatment_index = marker_index(PAGES[31], "Terapi menggunakan")
leprosy_education_index = marker_index(PAGES[31], "Edukasi", leprosy_treatment_index)
leprosy_education = combine(
    PAGES[31][leprosy_education_index:],
    section(PAGES[32], "dubia ad malam", None),
)
leprosy = {
    "diagnosis": leprosy_diagnosis,
    "anamnesis": leprosy_anamnesis,
    "physical": leprosy_physical,
    "support": leprosy_support,
    "treatment": leprosy_treatment,
    "education": leprosy_education,
}


apusan_all = combine(*(PAGES[n] for n in range(3, 10)))
apusan_procedure = PAGES[4]
apusan_interpretation = combine(*(PAGES[n] for n in range(5, 10)))

radiology_all = combine(PAGES[44], PAGES[45], PAGES[46])
airway_procedure = """PERSIAPAN ALAT
1. Memeriksa seluruh peralatan tata laksana jalan napas lanjut.
2. Menghubungkan bilah dengan gagang laringoskop dan memastikan lampu menyala.
3. Mengembangkan cuff pipa endotrakeal, memastikan tidak bocor, lalu mengempiskannya kembali.
4. Memilih ukuran pipa endotrakeal yang sesuai.

PERSIAPAN PASIEN
5. Memeriksa kemungkinan fraktur tulang belakang servikal.
6. Membuka jalan napas menggunakan triple airway maneuver.
7. Mengambil benda asing atau menyedot cairan dari rongga mulut bila ada.
8. Memberikan ventilasi dengan oksigen 100% menggunakan Bag-Valve-Mask selama 2-3 menit.
9. Menempatkan kepala pasien pada posisi yang tepat.

INTUBASI ENDOTRAKEAL
10. Membuka mulut pasien dengan tangan kanan.
11. Memegang laringoskop dengan tangan kiri.
12. Memasukkan laringoskop perlahan dari sisi kanan mulut dan menggeser lidah ke kiri.
13. Memasukkan bilah laringoskop sampai dasar lidah.
14. Melihat epiglotis dan menempatkan ujung bilah di valekula.
15. Mengangkat laringoskop hingga plika vokalis terlihat langsung.
16. Memasukkan pipa endotrakeal melalui sudut kanan mulut, melewati plika vokalis, hingga ke trakea.
17. Mengembangkan cuff dengan udara secukupnya.

KONFIRMASI DAN FIKSASI
18. Memastikan pengembangan dinding dada saat ventilasi dengan Bag-Valve-Mask.
19. Melakukan auskultasi pada regio epigastrium, apeks paru kanan-kiri, dan basal paru kanan-kiri.
20. Memfiksasi pipa endotrakeal dengan plester."""

airway_professional = """PERILAKU PROFESIONAL
- Melakukan tindakan dengan hati-hati dan teliti agar tidak membahayakan pasien maupun diri sendiri/tim.
- Melakukan tindakan sesuai prioritas.
- Mengetahui keterbatasan dan merujuk atau berkonsultasi kepada ahli anestesi (Sp.An) bila diperlukan setelah pemasangan."""


details = {
    "abo-blood-grouping": {
        "abo-a": [
            "Sampaikan tujuan pemeriksaan, lokasi dan tata cara pengambilan sampel, risiko ketidaknyamanan, kemudian minta persetujuan tindakan secara lisan.",
            "Siapkan slide/object glass, reagen anti-A, anti-B, anti-AB, lancet, kapas alkohol, sarung tangan, dan pengaduk terpisah untuk setiap reagen.",
            "Teteskan darah pada slide, tambahkan reagen anti-A, anti-B, dan anti-AB, campur menggunakan pengaduk yang berbeda, lalu amati ada atau tidaknya aglutinasi.",
            "Hasil simulasi: anti-A terjadi aglutinasi, anti-B tidak terjadi aglutinasi, dan anti-AB terjadi aglutinasi. Interpretasi: golongan darah A.",
            "Menilai permintaan izin, kehati-hatian, kenyamanan pasien, urutan tindakan, penghormatan terhadap pasien, dan kemampuan mengenali keterbatasan.",
        ]
    },
    "apusan-darah": {
        "malaria-smear": [
            combine(PAGES[3], section(PAGES[4], None, "DIRI")),
            apusan_procedure,
            apusan_procedure,
            apusan_procedure,
            combine(apusan_interpretation, apusan_all),
            "Menilai informed consent, keselamatan pengambilan darah, penggunaan APD, pembuangan benda tajam, ketelitian, dan kebersihan area kerja.",
        ]
    },
    "abdomen-anak": {
        "dengue-child": ipm(dengue),
        "typhoid-child": ipm(typhoid),
    },
    "abdomen-dewasa": {
        "typhoid-adult": ipm(typhoid),
        "malaria-adult": ipm(malaria),
        "leptospirosis": ipm(leptospirosis),
        "gerd": ipm(gerd),
        "gastritis": ipm(gastritis),
    },
    "cardio": {"heart-failure": ipm(heart_failure)},
    "dv": {"leprosy-pb": ipm(leprosy)},
    "lung-exam": {
        "pneumonia": ipm(pneumonia),
        "tb": ipm(tb),
        "copd": ipm(copd),
        "pneumothorax": ipm(pneumothorax),
    },
    "mata": {
        "hordeolum": eye(hordeolum),
        "conjunctivitis": eye(conjunctivitis),
        "keratitis": eye(keratitis),
    },
    "muskuloskeletal": {
        "oa-knee": ipm(oa),
        "acute-gout": ipm(gout),
    },
    "neuro": {
        "tth": ipm(tth),
        "migraine": ipm(migraine),
        "cluster": ipm(cluster),
        "bppv": ipm(bppv),
    },
    "tht": {
        "aom": tht(oma),
        "epistaxis": tht(epistaxis),
    },
    "radiologi": {
        case_id: [
            radiology_all,
            section(PAGES[44], "Nama Pemeriksaan", "Kualitas Foto"),
            "Persiapan pasien disesuaikan dengan jenis pemeriksaan radiologi yang dipilih dan kondisi klinis pasien.",
            radiology_all,
            "Jelaskan tujuan pemeriksaan, proses pemeriksaan, kebutuhan posisi/proyeksi, dan tindak lanjut hasil kepada pasien.",
            "Menilai komunikasi, ketelitian membaca identitas dan kualitas foto, interpretasi sistematis, serta pengenalan keterbatasan.",
        ]
        for case_id in ["cxr-pneumonia", "cxr-tb", "cxr-pneumothorax", "cxr-hf"]
    },
    "airway-management": {
        "polytrauma": [
            airway_procedure,
            airway_professional,
        ]
    },
}


output = (
    "/* Generated from the supplied Mini OSCE reference PDF. */\n"
    "window.OSCE_COMPETENCY_DETAILS = "
    + json.dumps(details, ensure_ascii=False, indent=2)
    + ";\n"
)
OUTPUT_PATH.write_text(output, encoding="utf-8")
print(f"Wrote {OUTPUT_PATH}")
