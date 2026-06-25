import sharp from 'sharp';
import fs from 'fs';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#111111"/>
  <line x1="0" y1="80" x2="1200" y2="80" stroke="#5e5e5e" stroke-width="1"/>
  <line x1="0" y1="550" x2="1200" y2="550" stroke="#5e5e5e" stroke-width="1"/>
  <text x="40" y="50" font-family="monospace" font-size="14" fill="#5e5e5e">[REF: AC-2026-MINIMAL]</text>
  <text x="80" y="290" font-family="sans-serif" font-size="72" font-weight="700" fill="#CCCCCC">ALEJANDRO CASTRO</text>
  <text x="80" y="350" font-family="sans-serif" font-size="32" font-weight="600" fill="#13ecaf">AI RESEARCHER &amp; SYSTEMS ENGINEER</text>
  <text x="80" y="600" font-family="monospace" font-size="14" fill="#5e5e5e">alecastro.dev</text>
</svg>
`;

sharp(Buffer.from(svg)).png().toFile('public/og-default.png').then(() => {
    console.log('OG image created.');
});
