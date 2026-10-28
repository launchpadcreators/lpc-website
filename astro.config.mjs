// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// SITE_URL / BASE_PATH are set by the GitHub Pages workflow (site served at https://<owner>.github.io/<repo>/).
// Locally and for the real domain (123reg) they're unset, so the site builds for the domain root.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || '/',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
