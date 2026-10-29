"""Render source contact sheets for extraction QA, without changing live assets."""
from pathlib import Path
import json
import sys
ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'tmp' / 'blok2.5'
sys.path.insert(0, str(WORK / 'python-packages'))
import pymupdf as fitz
from PIL import Image, ImageDraw

out = WORK / 'review'
out.mkdir(exist_ok=True)
for source in json.loads((WORK / 'inventory.json').read_text(encoding='utf-8')):
    doc = fitz.open(stream=Path(source['path']).read_bytes(), filetype='pdf')
    # Thumbnail sheets expose actual question images vs decorative page backgrounds.
    for start in range(0, len(doc), 20):
        pages = list(range(start, min(start+20, len(doc))))
        sheet = Image.new('RGB', (1000, ((len(pages)+3)//4)*360), 'white')
        draw = ImageDraw.Draw(sheet)
        for i, n in enumerate(pages):
            p = doc[n]
            pix = p.get_pixmap(matrix=fitz.Matrix(0.4, 0.4), alpha=False)
            img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
            img.thumbnail((240, 335))
            x, y = (i%4)*250, (i//4)*360
            sheet.paste(img, (x, y+20))
            draw.text((x+4,y+3), f"{source['code']} p{n+1}", fill='black')
        sheet.save(out / f"{source['code']}-{start+1}.jpg")
