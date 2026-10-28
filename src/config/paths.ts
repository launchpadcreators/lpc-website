// Builds a URL for a file in public/ (or an internal page) that respects Astro's `base`.
// Locally and on the real domain (123reg) base is "/", on GitHub Pages it's "/<repo>/" — see astro.config.mjs.
export const url = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
