"""Wrap each src/*.js page script in the shared MTH 105 page template.
First line of each src file: // {"file": "week-01.html", "title": "...", "wk": "#hex", "wkd": "#hex"}"""
import json, glob, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TPL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Schibsted+Grotesk:wght@400;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap">
<link rel="stylesheet" href="assets/course.css">
<link rel="stylesheet" href="assets/stats.css">
<link rel="stylesheet" href="assets/banner.css">
<link rel="stylesheet" href="assets/lesson.css">
<style>
:root{{--wk:{wk};--wk-soft:{wks};--wk-d:{wkd};--wk-soft-d:{wksd}}}
</style>
</head>
<body>
<script src="assets/supports.js"></script>
<script src="assets/course.js"></script>
<script src="assets/stats.js"></script>
<script src="assets/concept.js"></script>
<script src="assets/decode.js"></script>
<script src="assets/lesson.js"></script>
<script src="assets/pad.js"></script>
<script src="assets/calc.js"></script>
<script src="assets/casio.js"></script>
<script src="assets/board.js"></script>
<script src="assets/board-answers.js"></script>
<script src="assets/kb.js"></script>
<script src="assets/search-index.js"></script>
<script src="assets/assistant.js"></script>
<script src="assets/site.js"></script>
<script>
const {{W}} = Lecture; Lecture.__noLogo=true; const esc = W.esc;
const {{T, fr, sq, SG, XB, PH, v}} = F;
const goScene = i => {{ const b=document.querySelectorAll('.toc ol li button')[i]; if(b) b.click(); }};
const practice = (items, label) => el => W.practice(el, items, {{label: label||'Show answer', prefix: ''}});
{body}
</script>
</body>
</html>
"""
def rgba(h, a):
    h = h.lstrip('#'); return f"rgba({int(h[0:2],16)},{int(h[2:4],16)},{int(h[4:6],16)},{a})"
for src in sorted(glob.glob(os.path.join(ROOT, 'src', '*.js'))):
    txt = open(src, encoding='utf8').read()
    first, body = txt.split('\n', 1)
    meta = json.loads(first.lstrip('/ ').strip())
    html = TPL.format(title=meta['title'], wk=meta['wk'], wks=rgba(meta['wk'], .09), wkd=meta['wkd'], wksd=rgba(meta['wkd'], .14), body=body.strip())
    open(os.path.join(ROOT, meta['file']), 'w', encoding='utf8').write(html)
    print('built', meta['file'])
