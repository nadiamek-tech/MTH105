"""Generate Kokoro narration for every scene paragraph.
Usage: python3 tools/narrate.py lines.json   (lines.json: {page: [[para, ...] per scene]})
Writes audio/<page>/p-<hash>.mp3 and audio/manifest.json {pages: {page: [[files] per scene]}}."""
import json, os, re, sys, hashlib, subprocess
import soundfile as sf
from kokoro_onnx import Kokoro
def spoken(t):
    t = re.sub(r'Ch\.? ?(\d+)', r'Chapter \1', t)
    t = re.sub(r'CLO ?(\d)', r'C L O \1', t)
    t = re.sub(r'Weeks (\d+)–(\d+)', r'Weeks \1 to \2', t)
    t = t.replace('68–95–99.7', '68, 95, 99.7')
    t = re.sub(r'Var\(X\)', 'the variance of X', t)
    t = re.sub(r'E\(X\)', 'E of X', t)
    t = re.sub(r'C\(n, ?x\)', 'n choose x', t)
    t = re.sub(r'P\(([^()]*)\)', r'P of \1', t)
    for a, b in [('x̄', 'x bar'), ('p̂', 'p hat'), ('ŷ', 'y hat'), ('χ²', 'chi-square'), ('H₀', 'H nought'), ('H₁', 'H one'), ('z*', 'z star'),
                 ('σ²', 'sigma squared'), ('s²', 's squared'), ('r²', 'r squared'), ('²', ' squared'), ('√', 'the square root of '), ('Σ', 'the sum of '),
                 ('μ', 'mu'), ('σ', 'sigma'), ('≈', 'about'), ('≤', ' at most '), ('≥', ' at least '), ('→', ','), ('−', ' minus '), ('×', ' times '), ('÷', ' divided by '),
                 ('Q1', 'Q one'), ('Q3', 'Q three'), ('IQR', 'I Q R'), (' SD', ' S D'), ('CV', 'C V'), ('SE ', 'S E '), ('n ≥', 'n at least'), ('%', ' percent'),
                 ('±', ' plus or minus '), (' = ', ' equals '), ('SE.', 'S E.'), ('df ', 'd f '), ('“', ''), ('”', ''), ('’', "'"), ('…', ', ')]:
        t = t.replace(a, b)
    t = re.sub(r'(\w)·(\w)', r'\1 times \2', t)
    t = t.replace(' · ', ', ').replace('·', ' ')
    t = re.sub(r'\b1σ\b', 'one sigma', t)
    return re.sub(r'\s{2,}', ' ', t).strip()
if __name__ == '__main__':
    k = Kokoro('/home/claude/kokoro/kokoro-v1.0.int8.onnx', '/home/claude/kokoro/voices-v1.0.bin')
    data = json.load(open(sys.argv[1])); man = {'engine': 'Kokoro v1.0', 'voice': 'af_heart', 'pages': {}}
    for page, scenes in data.items():
        key = page.replace('.html', ''); os.makedirs(f'audio/{key}', exist_ok=True); out = []
        for sc in scenes:
            files = []
            for para in sc:
                t = spoken(para); name = f'{key}/p-{hashlib.sha1(t.encode()).hexdigest()[:10]}.mp3'
                if not os.path.exists('audio/' + name):
                    s, sr = k.create(t, voice='af_heart', speed=0.95, lang='en-us'); sf.write('/tmp/clip.wav', s, sr)
                    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', '/tmp/clip.wav', '-ac', '1', '-b:a', '48k', 'audio/' + name], check=True)
                files.append(name)
            out.append(files)
        man['pages'][key] = out; print(page, sum(len(f) for f in out), flush=True)
    json.dump(man, open('audio/manifest.json', 'w'), ensure_ascii=False)
