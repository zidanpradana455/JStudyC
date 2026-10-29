"""Read every archive member into an auditable local corpus (no web writes).

Run with the project/bundled Python. Install PyMuPDF if it is unavailable.
Archive paths are checked before extraction; originals are never modified.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'tmp' / 'blok2.5'
sys.path.insert(0, str(WORK / 'python-packages'))


def dump(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')


def main():
    import pymupdf as fitz
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--downloads', type=Path, default=Path.home() / 'Downloads')
    args = parser.parse_args()
    WORK.mkdir(parents=True, exist_ok=True)
    paths = [(args.downloads / 'Blok II.5.pdf', 'overview', None)]
    for name in ('Blok II.5 Oedema, Urinary and Metabolic Disorders-20261028T152833Z-1-001.zip',
                 'II.5-20261028T152825Z-1-001.zip'):
        archive = args.downloads / name
        with zipfile.ZipFile(archive) as z:
            for member in z.infolist():
                if member.is_dir():
                    continue
                target = (WORK / 'sources' / member.filename).resolve()
                if not target.is_relative_to((WORK / 'sources').resolve()):
                    raise ValueError(f'Unsafe ZIP member: {member.filename}')
                target.parent.mkdir(parents=True, exist_ok=True)
                content = z.read(member)
                if target.exists() and target.read_bytes() != content:
                    raise ValueError(f'Conflicting archive members: {member.filename}')
                target.write_bytes(content)
                paths.append((target, 'questions', name))
    inventory = []
    for index, (path, role, archive) in enumerate(paths):
        content = path.read_bytes()
        code = 'overview' if role == 'overview' else f'source_{index:02}'
        entry = dict(code=code, name=path.name, path=str(path), archive=archive,
                     role=role, bytes=len(content), sha256=hashlib.sha256(content).hexdigest())
        if content.startswith(b'%PDF'):
            doc = fitz.open(stream=content, filetype='pdf')
            pages = []
            for page in doc:
                structured = page.get_text('dict')
                # Keep layout and original colours/fonts for answer marker recovery.
                text_blocks = [b for b in structured['blocks'] if b['type'] == 0]
                images = [dict(bbox=list(im['bbox']), xref=im['xref'], width=im['width'],
                               height=im['height']) for im in page.get_image_info(xrefs=True)]
                pages.append(dict(page=page.number+1, width=page.rect.width, height=page.rect.height,
                                  text=page.get_text(sort=True), blocks=text_blocks, images=images,
                                  annotations=[dict(type=a.type, rect=list(a.rect), colors=a.colors)
                                               for a in (page.annots() or [])]))
            entry.update(format='pdf', pages=len(pages), characters=sum(len(p['text']) for p in pages),
                         imageInstances=sum(len(p['images']) for p in pages),
                         textlessPages=[p['page'] for p in pages if len(p['text'].strip()) < 50])
            dump(WORK / 'corpus' / f'{code}.json', pages)
            (WORK / 'corpus' / f'{code}.txt').write_text(
                '\n'.join(f"\n=== PAGE {p['page']} ===\n{p['text']}" for p in pages), encoding='utf-8')
            # Candidate numbering is an audit aid, not a claimed complete question count.
            candidates = []
            for p in pages:
                for m in re.finditer(r'(?m)^\s*(\d{1,3})\s*[.)]\s+([^\n]+)', p['text']):
                    candidates.append(dict(number=int(m[1]), page=p['page'], text=m[2]))
            dump(WORK / 'corpus' / f'{code}-number-candidates.json', candidates)
            entry['numberCandidates'] = len(candidates)
        else:
            entry.update(format='unsupported', magic=content[:16].hex())
        inventory.append(entry)
        print(f"{code}: {path.name} | {entry.get('format')} | {entry.get('pages', 0)} pages | "
              f"{entry.get('characters', 0)} chars | {entry.get('numberCandidates', 0)} numbered candidates")
    dump(WORK / 'inventory.json', inventory)


if __name__ == '__main__':
    main()
