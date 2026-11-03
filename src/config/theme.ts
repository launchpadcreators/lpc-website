// Switch the site theme here. Values must match a [data-theme] block in src/styles/themes.css.
export const THEMES = ["charcoal", "blue"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME: Theme = "charcoal";

// Switch the accent colour here: "flame" (Blue Flame #168CFF, chosen by Tom and Dan on 3 Nov 2026), "electric" (the
// earlier blue) or "orange". Values match a [data-accent] block in themes.css.
export const ACCENTS = ["flame", "electric", "orange"] as const;
export type Accent = (typeof ACCENTS)[number];

export const ACCENT: Accent = "flame";
