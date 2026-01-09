import { Jimp } from 'jimp';
import { join } from 'path';

const inputPath = join(process.cwd(), 'public/images/settings-mascot-raw.png');
const outputPath = join(process.cwd(), 'public/images/settings-mascot.png');

async function removeBackground() {
    try {
        console.log('Loading image...');
        const image = await Jimp.read(inputPath);

        const width = image.width;
        const height = image.height;

        console.log(`Processing ${width}x${height} image...`);

        // Process each pixel - scan is the jimp v1 way
        image.scan(0, 0, width, height, function (x, y, idx) {
            const red = this.bitmap.data[idx];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // Check if pixel is close to white/light gray (background)
            const isBackground = red > 245 && green > 245 && blue > 248;

            if (isBackground) {
                // Make transparent (set alpha to 0)
                this.bitmap.data[idx + 3] = 0;
            }
        });

        // Save the result
        await image.write(outputPath);
        console.log('✅ Background removed! Saved to:', outputPath);

    } catch (error) {
        console.error('Error processing image:', error);
        process.exit(1);
    }
}

removeBackground();
