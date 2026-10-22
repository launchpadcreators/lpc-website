// Switch the site theme here. Values must match a [data-theme] block in src/styles/themes.css.
export const THEMES = ["charcoal", "blue"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME: Theme = "charcoal";
