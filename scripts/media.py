"""Cut hero loop + stills from ../MTP 2025.mp4 and export PPTX images into public/media. Run from app/."""
import os, subprocess, zipfile, warnings
import imageio_ffmpeg
from PIL import Image

warnings.simplefilter('ignore')
Image.MAX_IMAGE_PIXELS = None
FF = imageio_ffmpeg.get_ffmpeg_exe()
SRC = '../MTP 2025.mp4'
PPTX = '../MTP Presentation 23.07.2026.pptx'
OUT = 'public/media'
os.makedirs(OUT, exist_ok=True)


def ff(*a):
    subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


# hero loop: drone along the hall wall with logo (0:36-0:46)
ff('-ss', '37', '-t', '10.5', '-i', SRC, '-an', '-vf', 'scale=1920:-2,fps=30', '-c:v', 'libx264', '-crf', '28',
   '-preset', 'slow', '-movflags', '+faststart', '-pix_fmt', 'yuv420p', f'{OUT}/hero.mp4')
ff('-ss', '37', '-i', SRC, '-frames:v', '1', '-update', '1', '-vf', 'scale=1920:-2', '-q:v', '3', f'{OUT}/hero-poster.jpg')

STILLS = {'office': 7, 'wall-logo': 37, 'aerial': 44, 'aisle': 62, 'forklift': 75, 'bigbags': 84, 'flags': 100}
for name, t in STILLS.items():
    ff('-ss', str(t), '-i', SRC, '-frames:v', '1', '-update', '1', '-vf', 'scale=1600:-2', '-q:v', '4', f'{OUT}/still-{name}.jpg')

z = zipfile.ZipFile(PPTX)
for src, dst, w in [('image168.jpeg', 'iso-9001.jpg', 1200), ('image127.png', 'map-europe.jpg', 1400), ('image3.png', 'office-day.jpg', 1600)]:
    im = Image.open(z.open('ppt/media/' + src)).convert('RGB')
    im.thumbnail((w, w * 2))
    im.save(f'{OUT}/{dst}', quality=80)

for f in sorted(os.listdir(OUT)):
    print(f'{os.path.getsize(OUT + "/" + f) / 1e6:6.2f} MB  {f}')
