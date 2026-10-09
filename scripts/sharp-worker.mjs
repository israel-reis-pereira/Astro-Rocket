import sharp from 'sharp';

let input = '';
for await (const chunk of process.stdin) input += chunk;

const task = JSON.parse(input);
const svg = Buffer.from(task.svg);
let output;

switch (task.kind) {
  case 'favicon':
    output = await sharp(svg).png().toBuffer();
    break;
  case 'og':
    output = await sharp(svg)
      .resize(1200, 630)
      .flatten({ background: task.brandColor })
      .png({ compressionLevel: 9 })
      .toBuffer();
    break;
  case 'probe': {
    const pixels = await sharp(svg).flatten().greyscale().raw().toBuffer();
    output = Buffer.from(pixels.some((value) => value > 40) ? 'true' : 'false');
    break;
  }
  default:
    throw new Error(`Unknown Sharp task: ${task.kind}`);
}

process.stdout.write(output);
