"""Extract explicitly mapped clinical images. Backgrounds and answer notes excluded."""
import json
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'tmp' / 'blok2.5'
sys.path.insert(0, str(WORK / 'python-packages'))
import pymupdf as fitz
from PIL import Image, ImageDraw
from io import BytesIO

# source, exam, source number, page, xref; checked against page layouts.
SELECTIONS = [(2,'uas',8,2,10), (2,'uas',12,3,13), (2,'uas',16,4,18),
              (3,'cumex-2',2,2,10), (3,'cumex-2',9,3,14),
              (3,'cumex-2',14,3,15), (3,'cumex-2',15,3,16),
              (6,'cumex-2',20,3,12), (6,'cumex-2',21,3,13),
              (6,'cumex-2',35,5,19), (6,'cumex-2',52,6,22),
              (7,'uas',11,2,10), (7,'uas',32,4,16),
              (10,'cumex-2',26,22,88), (10,'cumex-2',28,24,96),
              (10,'cumex-2',68,58,215)]
inventory = {x['code']:x for x in json.loads((WORK/'inventory.json').read_text(encoding='utf-8'))}
out = WORK / 'images'
out.mkdir(exist_ok=True)
manifest = []
sheet = Image.new('RGB', (1200, ((len(SELECTIONS)+3)//4)*290), 'white')
draw = ImageDraw.Draw(sheet)
for index,(s,exam,q,page,xref) in enumerate(SELECTIONS):
    code=f'source_{s:02}'
    src=inventory[code]
    doc=fitz.open(stream=Path(src['path']).read_bytes(),filetype='pdf')
    pic=doc.extract_image(xref)
    im=Image.open(BytesIO(pic['image'])).convert('RGB')
    # One stable source code for each source PDF.
    slug={2:'final_examination_ii.5',3:'cumulative_exam2_ii.5',6:'recap_cumex2_ii.5_iup_2022',
          7:'recap_uas_ii.5_iup_2022',10:'rekap_cumex2_bii.5_lakrawiyasa'}[s]
    filename=f'{slug}_q{q}.jpg'
    im.save(out/filename,quality=95)
    manifest.append(dict(sourceCode=code,exam=exam,id=q,page=page,xref=xref,
                         file=filename,sha256=__import__('hashlib').sha256((out/filename).read_bytes()).hexdigest(),
                         visualVerified=False))
    im.thumbnail((285,255))
    x,y=(index%4)*300,(index//4)*290
    sheet.paste(im,(x,y+25))
    draw.text((x+4,y+3),f'{code} Q{q} p{page}',fill='black')
sheet.save(WORK/'review'/'question-images.jpg')
(WORK/'image-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
