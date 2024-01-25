import { perlinNoise } from 'path-to-perlin-noise-implementation'; // Import Perlin Noise function

export default function generatePerlinBiomeMap(tileMap, options) {
    const scale = options.scale || 0.1; // Scale of noise

    for (let x = 0; x < tileMap.width; x++) {
        for (let y = 0; y < tileMap.height; y++) {
            const noiseValue = perlinNoise(x * scale, y * scale);
            tileMap.data[y * tileMap.width + x] = determineBiomeType(noiseValue);
        }
    }
}

function determineBiomeType(noiseValue) {
    // Map the noise value to biome types
    if (noiseValue < 0.3) return 0; // Water
    if (noiseValue < 0.5) return 1; // Sand
    if (noiseValue < 0.7) return 2; // Grass
    if (noiseValue < 0.9) return 3; // Forest
    return 4; // Mountain
}
