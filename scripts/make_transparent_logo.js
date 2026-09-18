import fs from "fs";
import zlib from "zlib";

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function parsePNG(buffer) {
  let pos = 8;
  let idatList = [];
  let width, height, bitDepth, colorType;

  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.toString("ascii", pos + 4, pos + 8);
    const data = buffer.slice(pos + 8, pos + 8 + len);
    pos += 12 + len;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
    } else if (type === "IDAT") {
      idatList.push(data);
    }
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatList));
  return { width, height, bitDepth, colorType, rawData: decompressed };
}

function unfilterPNG(rawData, width, height, bpp) {
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * bpp);
  let rawOffset = 0;

  for (let y = 0; y < height; y++) {
    const filter = rawData[rawOffset++];
    const lineStart = y * stride;

    for (let x = 0; x < stride; x++) {
      const rawByte = rawData[rawOffset++];
      const left = x >= bpp ? pixels[lineStart + x - bpp] : 0;
      const up = y > 0 ? pixels[lineStart - stride + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? pixels[lineStart - stride + x - bpp] : 0;

      let val = rawByte;
      if (filter === 0) {
        val = rawByte;
      } else if (filter === 1) { // Sub
        val = (rawByte + left) & 0xFF;
      } else if (filter === 2) { // Up
        val = (rawByte + up) & 0xFF;
      } else if (filter === 3) { // Average
        val = (rawByte + Math.floor((left + up) / 2)) & 0xFF;
      } else if (filter === 4) { // Paeth
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = up;
        else pr = upLeft;
        val = (rawByte + pr) & 0xFF;
      }
      pixels[lineStart + x] = val;
    }
  }
  return pixels;
}

function encodePNG(pixels, width, height) {
  const stride = width * 4;
  const rawWithFilter = Buffer.alloc(height * (stride + 1));
  let outPos = 0;

  for (let y = 0; y < height; y++) {
    rawWithFilter[outPos++] = 0; // Filter None
    pixels.copy(rawWithFilter, outPos, y * stride, (y + 1) * stride);
    outPos += stride;
  }

  const compressedIDAT = zlib.deflateSync(rawWithFilter, { level: 9 });

  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk("IHDR", ihdrData);
  const idatChunk = createChunk("IDAT", compressedIDAT);
  const iendChunk = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, "ascii");
  data.copy(chunk, 8);
  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// Use original uploaded logo as clean source
const sourcePath = fs.existsSync("/Users/fortuneadvisorz/.gemini/antigravity-ide/brain/aa982067-7804-40dd-84f8-b2a91169267e/.user_uploaded/media_1789715541535.png")
  ? "/Users/fortuneadvisorz/.gemini/antigravity-ide/brain/aa982067-7804-40dd-84f8-b2a91169267e/.user_uploaded/media_1789715541535.png"
  : "src/assets/axonn-logo.png";

const inputBuf = fs.readFileSync(sourcePath);
const { width, height, rawData } = parsePNG(inputBuf);
const pixels = unfilterPNG(rawData, width, height, 4);

// Process pixels
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  const maxVal = Math.max(r, g, b);
  const minVal = Math.min(r, g, b);
  const isNeutral = (maxVal - minVal) < 25;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const isCyan = (b > r + 30) && (g > r + 15);

  if (isCyan) {
    // Blue / Cyan symbol or 'X'
    if (r <= 35) {
      pixels[i + 3] = 255;
    } else if (r < 235) {
      const alpha = Math.max(0, Math.min(255, Math.round((235 - r) * (255 / 200))));
      pixels[i + 3] = alpha;
      if (alpha > 0) {
        const aNorm = alpha / 255;
        pixels[i] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - aNorm)) / aNorm)));
        pixels[i + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - aNorm)) / aNorm)));
        pixels[i + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - aNorm)) / aNorm)));
      } else {
        pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0;
      }
    } else {
      pixels[i + 3] = 0;
      pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0;
    }
  } else if (isNeutral) {
    // Dark black/charcoal text vs white background
    if (lum <= 40) {
      // Solid black text
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 255;
    } else if (lum < 225) {
      // Anti-aliased black edge
      const alpha = Math.max(0, Math.min(255, Math.round((225 - lum) * (255 / 185))));
      pixels[i + 3] = alpha;
      if (alpha > 0) {
        // True black foreground with alpha matte
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
      } else {
        pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0;
      }
    } else {
      // White/off-white background
      pixels[i + 3] = 0;
      pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0;
    }
  } else {
    // Background noise / non-artwork
    pixels[i + 3] = 0;
    pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0;
  }
}

const outPng = encodePNG(pixels, width, height);

fs.writeFileSync("src/assets/axonn-logo.png", outPng);
fs.writeFileSync("public/axonn-logo.png", outPng);
if (fs.existsSync("dist")) {
  fs.writeFileSync("dist/axonn-logo.png", outPng);
}

console.log("Successfully generated clean transparent axonn-logo.png, size:", outPng.length, "bytes");
