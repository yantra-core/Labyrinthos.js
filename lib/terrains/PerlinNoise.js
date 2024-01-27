export default function generatePerlinNoiseMap(tileMap, options) {
  const scale = options.scale || 0.1; // Determines the "zoom level" of the noise

  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      // Generate Perlin noise value for each tile
      const noiseValue = tileMap.noise(x * scale, y * scale);
      
      // Optionally transform noiseValue here to suit your needs

      // Assign noise value to tileMap data
      tileMap.data[y * tileMap.width + x] = noiseValue;
    }
  }
}
