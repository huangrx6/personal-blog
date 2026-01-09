import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function removeWhiteBackground(inputPath, outputPath) {
    console.log(`Processing: ${path.basename(inputPath)}`);

    const image = await Jimp.read(inputPath);
    const { data } = image.bitmap;

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

        // Very aggressive threshold for white/near-white
        if (dist < 30) {
            data[i + 3] = 0; // Full transparent
        }
        else if (dist < 60) {
            // Smooth edge fade
            const alpha = Math.floor(((dist - 30) / 30) * 255);
            data[i + 3] = alpha;
        }
    }

    await image.write(outputPath);
    console.log(`✅ Saved: ${path.basename(outputPath)}`);
}

async function main() {
    const directories = [
        path.join(publicDir, 'characters'),
        path.join(publicDir, 'parallax')
    ];

    for (const dir of directories) {
        if (!fs.existsSync(dir)) {
            console.log(`Skipping ${dir} - does not exist`);
            continue;
        }

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
        console.log(`\nProcessing ${files.length} files in ${path.basename(dir)}/`);

        for (const file of files) {
            const filePath = path.join(dir, file);
            try {
                await removeWhiteBackground(filePath, filePath);
            } catch (error) {
                console.error(`Error processing ${file}:`, error.message);
            }
        }
    }

    console.log('\n🎉 Done! All backgrounds removed.');
}

main();
