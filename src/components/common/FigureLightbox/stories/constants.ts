/**
 * Builds a detailed, wide SVG chart as a data URL: rows of dots along log-scale
 * axes with small labels, like the sequence and assembly diagrams in blog posts.
 * The labels are too small to read at content width, which is what the lightbox
 * zoom is for.
 * @param title - Chart title.
 * @param seed - Seed for the dot positions, so each chart differs.
 * @returns The SVG data URL.
 */
function buildChartSrc(title: string, seed: number): string {
  const width = 1120;
  const rows = 4;
  const rowHeight = 64;
  const height = 72 + rows * rowHeight;
  let value = seed;
  const random = (): number => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
  const parts: string[] = [
    `<rect width="${width}" height="${height}" fill="#fff"/>`,
    `<text x="28" y="32" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#212b36">${title}</text>`,
    `<text x="28" y="48" font-family="Inter, sans-serif" font-size="8" fill="#637381">one dot per assembly, log scale · labels are 6px, readable once zoomed in</text>`,
  ];
  for (let row = 0; row < rows; row++) {
    const y = 88 + row * rowHeight;
    parts.push(
      `<line x1="150" x2="1090" y1="${y}" y2="${y}" stroke="#c4cdd5" stroke-width="0.5"/>`,
      `<text x="28" y="${y + 3}" font-family="Inter, sans-serif" font-size="9" fill="#212b36">Sample ${row + 1}</text>`,
    );
    for (let tick = 0; tick <= 4; tick++) {
      const x = 150 + tick * 235;
      parts.push(
        `<text x="${x}" y="${y + 16}" font-family="Inter, sans-serif" font-size="6" fill="#637381" text-anchor="middle">${10 ** (tick + 1)}</text>`,
      );
    }
    for (let dot = 0; dot < 40; dot++) {
      const x = (150 + random() * 940).toFixed(1);
      const fill = random() > 0.35 ? "#1c7cc7" : "#c4cdd5";
      parts.push(`<circle cx="${x}" cy="${y}" r="3" fill="${fill}"/>`);
      if (dot % 8 === 0) {
        parts.push(
          `<text x="${x}" y="${y - 7}" font-family="Inter, sans-serif" font-size="6" fill="#b42318" text-anchor="middle">GCA_${Math.round(random() * 1e6)}</text>`,
        );
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const FIGURES = [
  {
    alt: "Assembly quality across 49 public assemblies",
    caption:
      "Figure 1. Assembly quality across the 49 public C. cayetanensis assemblies. None is chromosome-level and the median assembly is in 1,391 pieces.",
    src: buildChartSrc("All 49 public genome assemblies", 7),
  },
  {
    alt: "Contig N50 by sequencing technology",
    caption:
      "Figure 2. Contig N50 by sequencing technology. Long-read assemblies are an order of magnitude more contiguous.",
    src: buildChartSrc("Contig N50 by sequencing technology", 19),
  },
  {
    alt: "Marker gene coverage per assembly",
    caption:
      "Figure 3. Marker gene coverage per assembly. Most assemblies recover fewer than half of the genotyping markers.",
    src: buildChartSrc("Marker gene coverage per assembly", 31),
  },
  {
    alt: "Genotyping calls across laboratories",
    caption:
      "Figure 4. Genotyping calls across laboratories. Calls agree for 87% of samples.",
    src: buildChartSrc("Genotyping calls across laboratories", 43),
  },
];
