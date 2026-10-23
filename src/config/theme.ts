// Switch the site theme here. Values must match a [data-theme] block in src/styles/themes.css.
export const THEMES = ["charcoal", "blue"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME: Theme = "charcoal";

// Switch the accent colour here: "electric" (blue) or "orange". Values match a [data-accent] block in themes.css.
export const ACCENTS = ["electric", "orange"] as const;
export type Accent = (typeof ACCENTS)[number];

export const ACCENT: Accent = "electric";
