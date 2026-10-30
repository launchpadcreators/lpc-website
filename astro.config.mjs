// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// SITE_URL / BASE_PATH are set by the GitHub Pages workflow (site served at https://<owner>.github.io/<repo>/).
// Locally and for the real domain (123reg) they're unset, so the site builds for the domain root.
export default defineConfig({
  site: process.env.SITE_URL || undefined, // empty for preview builds
  base: process.env.BASE_PATH || '/',
  // build files (CSS/JS) go in the same single folder as the images (public/lpc-site/), see src/config/paths.ts
  build: { assets: 'lpc-site/_astro' },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
