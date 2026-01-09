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

    // Scan all pixels and make white/near-white pixels transparent
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // data[i + 3] is alpha

        // Check if pixel is white or near-white (threshold 240)
        const threshold = 240;
        if (r > threshold && g > threshold && b > threshold) {
            // Make fully transparent
            data[i + 3] = 0;
        }
        // Also handle light gray background for edge smoothing
        else if (r > 220 && g > 220 && b > 220) {
            // Semi-transparent based on brightness
            const brightness = (r + g + b) / 3;
            const alpha = Math.max(0, Math.min(255, (255 - brightness) * 4));
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

        console.log('Done! Both images now have transparent backgrounds.');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
