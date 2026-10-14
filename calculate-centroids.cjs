const fs = require('fs');

const svg = fs.readFileSync('public/india-map.svg', 'utf8');

const activeStates = [
  "IN-MH", "IN-DL", "IN-KA", "IN-GJ", "IN-RJ", 
  "IN-TN", "IN-WB", "IN-UP", "IN-MP", "IN-PB", 
  "IN-HR", "IN-KL", "IN-TG", "IN-AP", "IN-BR", 
  "IN-OR", "IN-AS", "IN-JH", "IN-CT", "IN-UT", 
  "IN-HP", "IN-GA", "IN-JK"
];

const centroids = {};

activeStates.forEach(state => {
  const regex = new RegExp(`id="${state}"[^>]*d="([^"]+)"`);
  const match = svg.match(regex);
  if (match) {
    const d = match[1];
    const coords = d.match(/[0-9.]+/g);
    if (coords && coords.length >= 2) {
      let sumX = 0;
      let sumY = 0;
      let count = 0;
      for (let i = 0; i < coords.length; i += 2) {
        sumX += parseFloat(coords[i]);
        sumY += parseFloat(coords[i+1]);
        count++;
      }
      centroids[state] = {
        cx: (sumX / count).toFixed(1),
        cy: (sumY / count).toFixed(1)
      };
    }
  }
});

console.log(JSON.stringify(centroids, null, 2));
