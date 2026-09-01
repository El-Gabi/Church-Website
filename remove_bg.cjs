const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/Imaobong/.gemini/antigravity-ide/brain/fdaf9a7f-02cb-4d25-b2dc-44ab05e4cde4/.user_uploaded/media_1788261825799.jpg';
const jpegData = fs.readFileSync(inputPath);
const rawImageData = jpeg.decode(jpegData, { useTArray: true });

const png = new PNG({
  width: rawImageData.width,
  height: rawImageData.height
});

const data = rawImageData.data;

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;

    // Check if pixel is dark black background
    if (r < 28 && g < 28 && b < 28) {
      png.data[idx + 3] = 0; // Transparent
    } else if (r < 45 && g < 45 && b < 45) {
      // Smooth edge feathering
      const maxVal = Math.max(r, g, b);
      png.data[idx + 3] = Math.floor(((maxVal - 28) / 17) * 255);
    } else {
      png.data[idx + 3] = 255; // Opaque portrait subject
    }
  }
}

const buffer = PNG.sync.write(png);
if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });
if (!fs.existsSync('images')) fs.mkdirSync('images', { recursive: true });

fs.writeFileSync('public/images/pastor_welcome.png', buffer);
fs.writeFileSync('images/pastor_welcome.png', buffer);
console.log('SUCCESS: Generated transparent PNG for pastor welcome portrait!');
