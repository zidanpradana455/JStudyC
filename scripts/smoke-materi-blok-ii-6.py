"""Smoke-check Blok II.6 materi content.  Usage: python3 -I scripts/smoke-materi-blok-ii-6.py

Every unit with a summary (unless marked "quiz": false) must have exactly 10 quiz questions with 5 distinct
options, a valid key, an explanation, and existing image files; every image
referenced from the summary must exist too.
"""
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CONTENT = os.path.join(ROOT, 'content', 'materi-blok-ii-6')
errors = []

units = json.load(open(os.path.join(CONTENT, 'units.json'), encoding='utf8'))['units']
done = 0
for u in units:
    stem = u['code'].replace(' ', '-')
    md = os.path.join(CONTENT, stem + '.md')
    quiz = os.path.join(CONTENT, stem + '.quiz.json')
    if not os.path.exists(md):
        continue
    done += 1
    text = open(md, encoding='utf8').read()
    for img in re.findall(r'!\[[^\]]*\]\(([^)]+)\)', text):
        if not os.path.exists(os.path.join(ROOT, img)):
            errors.append(f'{u["code"]}: summary image missing: {img}')
    if '**' in re.sub(r'\*\*[^*\n]+\*\*', '', text):
        errors.append(f'{u["code"]}: unbalanced ** in summary')
    if u.get('quiz') is False:
        if os.path.exists(quiz):
            errors.append(f'{u["code"]}: marked quiz:false but has a quiz file')
        continue
    if not os.path.exists(quiz):
        errors.append(f'{u["code"]}: summary without quiz')
        continue
    qs = json.load(open(quiz, encoding='utf8'))
    if len(qs) != 10:
        errors.append(f'{u["code"]}: {len(qs)} questions (expected 10)')
    for i, q in enumerate(qs, 1):
        tag = f'{u["code"]} q{i}'
        if len(q['options']) != 5 or len(set(q['options'])) != 5:
            errors.append(f'{tag}: needs 5 distinct options')
        if not isinstance(q['correctAnswer'], int) or not 0 <= q['correctAnswer'] < 5:
            errors.append(f'{tag}: invalid correctAnswer')
        if len(q.get('explanation', '')) < 80:
            errors.append(f'{tag}: explanation too short')
        if q.get('image') and not os.path.exists(os.path.join(ROOT, q['image'])):
            errors.append(f'{tag}: image missing: {q["image"]}')

print(f'{done}/{len(units)} units checked')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print('OK')
