"""Extract normalized line-wrapped titles without changing wording or punctuation."""
import json
import re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'tmp'/'blok2.5'
pages=json.loads((WORK/'corpus'/'overview.json').read_text(encoding='utf-8'))
text='\n'.join(p['text'] for p in pages)
text=re.sub('[\u200b-\u200d\ufeff]','',text)
titles={}
for m in re.finditer(r'(?:EL|IS)\s+(\d+\.\d+)\s+(.*?)(?=(?:EL|IS)\s+\d+\.\d+|Praktikum|$)',text,re.S):
    title=re.split(r'Modul\s+\d+:',m[2])[0]
    titles[m[1]]=' '.join(title.split())
practical={
 'P7':'Filarial nematodes (Non-lymphatic filariasis)',
 'P15':'Microbiological Examination of Urinary Tract Infections',
 'P17':'Urine Albumin',
 'P24':'Laboratory Examination And Interpretation For Acute and Chronic Renal failure',
 'P5':'Oxidative stress biomarkers in metabolic syndrome (Malondialdehyde)',
 'P13':'Glucose Test (GOD-PAP Method), Glucose Challenge Test, Oral Glucose Tolerance Test, Ketone Bodies –Rothera’s Test, HbA1c Test',
 'P23':'Cold Pressure Test for hypertension prediction',
 'P27':'Kidney, ovary and thyroid'
}
# Practical rows interleave department columns, so retain their visually checked titles.
flat=' '.join(text.split())
for code,title in practical.items():
    # Every lexical title word must occur in the overview, including case.
    assert all(word in flat for word in title.split()),(code,title)
titles.update(practical)
assert len(titles)==48,len(titles)
(WORK/'lectures.json').write_text(json.dumps(titles,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(titles)} overview titles extracted')
