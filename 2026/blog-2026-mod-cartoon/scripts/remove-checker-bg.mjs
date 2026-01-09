import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

/**
 * 移除棋盘格背景（常见于 AI 生成的"透明"图片）
 * 棋盘格通常是 #CCCCCC 和 #FFFFFF 或类似颜色交替
 */
async function removeCheckerboardBackground(inputPath, outputPath) {
    console.log(`Processing: ${path.basename(inputPath)}`);

    const image = await Jimp.read(inputPath);
    const { data, width, height } = image.bitmap;

    // 检测棋盘格颜色（通常是灰白色）
    const isCheckerboardColor = (r, g, b) => {
        // 检测灰色 (#CCCCCC 附近) 或 浅灰/白色
        const isGray = Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;
        const isLight = r > 180 && g > 180 && b > 180;
        return isGray && isLight;
    };

    // 扫描所有像素
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (isCheckerboardColor(r, g, b)) {
            // 计算周围像素是否也是棋盘格颜色
            const pixelIndex = i / 4;
            const x = pixelIndex % width;
            const y = Math.floor(pixelIndex / width);

            // 检查周围8个像素
            let checkerCount = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const ni = (ny * width + nx) * 4;
                        if (isCheckerboardColor(data[ni], data[ni + 1], data[ni + 2])) {
                            checkerCount++;
                        }
                    }
                }
            }

            // 如果周围大部分是棋盘格颜色，说明这是背景
            if (checkerCount >= 3) {
                data[i + 3] = 0; // 透明
            }
        }
    }

    await image.write(outputPath);
    console.log(`✅ Saved: ${path.basename(outputPath)}`);
}

async function main() {
    const filePath = path.join(publicDir, 'characters', 'boy-phone.png');

    try {
        await removeCheckerboardBackground(filePath, filePath);
        console.log('\n🎉 Done!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
