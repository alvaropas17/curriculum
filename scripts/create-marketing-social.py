"""Generate the marketing site's social preview with local fonts and Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

ROOT = Path(__file__).resolve().parent.parent
SCALE = 2
image = Image.new('RGB', (2400, 1260), '#0e0d0c')
draw = ImageDraw.Draw(image)

def font(size, bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/' + ('arialbd.ttf' if bold else 'arial.ttf'), size * SCALE)

def text(x, y, value, size, color, bold=False):
    draw.text((x*SCALE, y*SCALE), value, font=font(size, bold), fill=color)

def line(points, color, width=1):
    draw.line([(x*SCALE, y*SCALE) for x,y in points], fill=color, width=width*SCALE)

text(64, 48, 'MARKETING EMOCIONAL', 16, '#ffd84d', True)
line([(64, 91), (1136, 91)], '#393530')
text(64, 140, 'El miedo', 78, '#f3efe6', True)
text(64, 230, 'se recuerda.', 78, '#f0605f', True)
text(68, 354, 'Cuatro anuncios. 169 respuestas.', 27, '#f3efe6')
text(68, 397, 'Un mapa de lo que sentimos.', 27, '#bdb7ab')
colors = ['#f2c21b', '#9bd04f', '#35b066', '#2fb4c9', '#4f86e6', '#9a6ad9', '#e5534d', '#f2963a']
# DGT responses, in the same emotion order as the study (n = 32).
values = [0/32, 4/32, 26/32, 21/32, 22/32, 2/32, 9/32, 5/32]
cx, cy = 947, 294
for i, (color, value) in enumerate(zip(colors, values)):
    angle = -math.pi/2 + i*math.pi/4
    a0, a1 = angle-math.pi/8+.055, angle+math.pi/8-.055
    for radius, fill in [(157, '#27231f'), (37+120*value, color)]:
        points = [(cx+31*math.cos(a0),cy+31*math.sin(a0))]
        points += [(cx+radius*math.cos(a0+(a1-a0)*j/32), cy+radius*math.sin(a0+(a1-a0)*j/32)) for j in range(33)]
        points += [(cx+31*math.cos(a1),cy+31*math.sin(a1))]
        draw.polygon([(round(x*SCALE),round(y*SCALE)) for x,y in points], fill=fill)
text(871, 478, 'DGT · EMOCIONES', 14, '#bdb7ab', True)
line([(64, 536), (1136, 536)], '#393530')
text(64, 563, 'Álvaro Pastor', 23, '#f3efe6', True)
text(704, 568, 'marketing.alvaropastor.dev', 20, '#bdb7ab')
output = ROOT / 'img' / 'marketing-social.png'
output.parent.mkdir(parents=True, exist_ok=True)
image.resize((1200,630), Image.Resampling.LANCZOS).save(output, optimize=True)
print(output)
