// Builds a URL for an internal page that respects Astro's `base`.
// Locally and on the real domain (123reg) base is "/", on GitHub Pages it's "/<repo>/" — see astro.config.mjs.
export const url = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
// Files in public/lpc-site/ (images, video, logos, favicons): kept in one folder so the live site's main folder,
// shared with WordPress, only gets the pages plus that one folder.
export const asset = (p: string) => url(`lpc-site/${p.replace(/^\//, "")}`);
