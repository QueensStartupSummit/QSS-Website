import sharp from 'sharp';
import { promises as fs } from 'fs';

async function createHighQualityHeroBg() {
    console.log('🎨 Creating 4K-optimized hero background...');

    try {
        // Check if we have the original Banner.jpeg in archive or elsewhere
        let inputPath;
        try {
            await fs.access('public/Banner.jpeg');
            inputPath = 'public/Banner.jpeg';
        } catch {
            console.log('❌ Original Banner.jpeg not found in public directory');
            return;
        }

        const outputPath = 'public/Banner-hero.webp';

        // Get original file size
        const originalStats = await fs.stat(inputPath);
        const originalSize = (originalStats.size / 1024).toFixed(1);

        // Create 4K-optimized WebP for hero background
        await sharp(inputPath)
            .resize(3840, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({
                quality: 90,  // High quality optimized for 4K
                effort: 6,    // Better compression algorithm
                smartSubsample: false  // Better quality for large images
            })
            .toFile(outputPath);

        // Get new file size
        const newStats = await fs.stat(outputPath);
        const newSize = (newStats.size / 1024).toFixed(1);
        const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);

        console.log(`✅ Hero background: ${originalSize}KB → ${newSize}KB (${savings}% reduction)`);
        console.log('🎯 4K-optimized hero background created at /Banner-hero.webp');

    } catch (error) {
        console.error('❌ Error creating hero background:', error.message);
    }
}

createHighQualityHeroBg();