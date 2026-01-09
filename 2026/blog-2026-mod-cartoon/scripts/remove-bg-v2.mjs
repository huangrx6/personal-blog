import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function removeWhiteBackground(inputPath, outputPath) {
    console.log(`Processing: ${inputPath}`);

    const image = await Jimp.read(inputPath);
    const { width, height, data } = image.bitmap;

    // Scan all pixels
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate distance from white
        const dist = Math.sqrt(
            Math.pow(r - 255, 2) +
            Math.pow(g - 255, 2) +
            Math.pow(b - 255, 2)
        );

        // Threshold for "white" (0 is pure white, larger allows for off-white)
        // More aggressive threshold to catch compression artifacts
        if (dist < 40) {
            data[i + 3] = 0; // Transparent
        }
        else if (dist < 80) {
            // Smooth edge fade
            // alpha scales from 0 (at dist 40) to 255 (at dist 80)
            const alpha = Math.floor(((dist - 40) / 40) * 255);
            data[i + 3] = alpha;
        }
    }

    await image.write(outputPath);
    console.log(`Saved: ${outputPath}`);
}

async function main() {
    try {
        await removeWhiteBackground(
            path.join(publicDir, 'mascot-flying.png'),
            path.join(publicDir, 'mascot-flying.png')
        );

        await removeWhiteBackground(
            path.join(publicDir, 'mascot-waving.png'),
            path.join(publicDir, 'mascot-waving.png')
        );

        console.log('Done! Background removal complete.');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
