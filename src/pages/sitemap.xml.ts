// /sitemap.xml for search engines: every page except the hidden /p/ pages and the 404 page, so a new page in
// src/pages/ is listed automatically. Used on Netlify; on 123reg WordPress (Yoast) makes its own, so the upload job
// leaves this file out.
import type { APIRoute } from "astro";
import { url } from "../config/paths";

const routes = Object.keys(import.meta.glob("./**/*.astro"))
  .map((f) => f.replace(/^\.\//, "").replace(/\.astro$/, "").replace(/(^|\/)index$/, ""))
  .filter((r) => !r.startsWith("p/") && r !== "404")
  .sort();

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://launchpadcreators.com");
  const locs = routes.map((r) => `  <url><loc>${new URL(url(r ? `${r}/` : "/"), origin)}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
