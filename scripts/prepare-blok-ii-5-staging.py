"""Build source-number audit records. These are NOT publishable quiz questions."""
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'tmp' / 'blok2.5'
sys.path.insert(0, str(WORK / 'python-packages'))
import pymupdf as fitz


def clean(text):
    return re.sub('[\u200b-\u200d\ufeff]', '', text).replace('\ufffd', "'")


def main():
    inventory = json.loads((WORK / 'inventory.json').read_text(encoding='utf-8'))
    records = []
    for source in inventory:
        if source['role'] == 'overview':
            continue
        doc = fitz.open(stream=Path(source['path']).read_bytes(), filetype='pdf')
        text = ''
        for p in doc:
            if source['code'] in ('source_01', 'source_02', 'source_03'):
                # The three extensionless PDFs have two independent text columns.
                mid = p.rect.width / 2
                parts = [p.get_text(clip=fitz.Rect(x0, 0, x1, p.rect.height), sort=True)
                         for x0, x1 in [(0, mid), (mid, p.rect.width)]]
                page_text = '\n'.join(parts)
            else:
                page_text = p.get_text(sort=True)
            text += f'\n[[PAGE:{p.number+1}]]\n' + clean(page_text)
        (WORK / 'corpus' / f"{source['code']}-reading.txt").write_text(text, encoding='utf-8')
        if source['code'] == 'source_06':
            # A wrapped dose "1.0 nicardipine" is not a second question 1.
            text = re.sub(r'(?m)^\s*1\.\s*0 nicardipine', '1.0 nicardipine', text)
            text = text.replace('1.0 nicardipine', 'dose 1.0 nicardipine')
        sections = [('cumex-1', text)]
        if source['code'] == 'source_08':
            text = text.split('Block II.5', 1)[1].split('Block II.6', 1)[0]
            a, b = text.split('Cumulative Examination 2', 1)
            b, c = b.split('Ujian Akhir Semester', 1)
            # Section splits can remove the current page marker; restore the
            # visually checked starting pages so Q1 never loses its provenance.
            sections = [('cumex-1', '[[PAGE:19]]\n'+a.split('Cumulative Examination 1', 1)[1]),
                        ('cumex-2', '[[PAGE:23]]\n'+b), ('uas', '[[PAGE:25]]\n'+c)]
        else:
            exam = {'source_01':'cumex-1', 'source_02':'uas', 'source_03':'cumex-2',
                    'source_04':'cumex-1','source_05':'uas','source_06':'cumex-2',
                    'source_07':'uas','source_09':'cumex-1','source_10':'cumex-2'}[source['code']]
            sections = [(exam, text)]
        for exam, part in sections:
            matches = list(re.finditer(r'(?m)^\s*(\d{1,3})\s*\.\s*', part))
            for i, m in enumerate(matches):
                end = matches[i+1].start() if i+1 < len(matches) else len(part)
                raw = part[m.end():end].strip()
                page_matches = re.findall(r'\[\[PAGE:(\d+)\]\]', part[:m.start()])
                records.append(dict(sourceCode=source['code'], sourceFile=source['name'],
                                    exam=exam, id=int(m[1]), page=int(page_matches[-1]) if page_matches else None,
                                    raw=raw, status='pending_review'))
    # Preserve genuine duplicate numbering as separate source positions.
    seen = {}
    for record in records:
        key = (record['sourceCode'], record['exam'], record['id'])
        seen[key] = seen.get(key, 0) + 1
        record['occurrence'] = seen[key]
    (WORK / 'raw-questions.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    for source in inventory[1:]:
        items = [r for r in records if r['sourceCode'] == source['code']]
        print(source['code'], source['name'])
        for exam in sorted(set(r['exam'] for r in items)):
            ids = [r['id'] for r in items if r['exam'] == exam]
            print(' ', exam, len(ids), ids)
    # Small readable source records, retaining source notes and keys for author review.
    for s in inventory[1:]:
        items = [r for r in records if r['sourceCode'] == s['code']]
        (WORK / 'corpus' / f"{s['code']}-questions.txt").write_text(
            '\n\n'.join(f"{r['exam']} Q{r['id']} (p{r['page']})\n{r['raw']}" for r in items), encoding='utf-8')


if __name__ == '__main__':
    main()
