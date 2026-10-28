# Launchpad Creators website: rules for Claude

The website for Launchpad Creators (LPC), launchpadcreators.com. Anyone can ask for changes: Tom, Dan or Abdullah, from any Claude chat, including Claude Code on the web.

**Before doing anything, read [CHANGELOG.md](CHANGELOG.md).** It's the update history and current status. **After every change, add an entry to it** (see the bottom of this file).

## Where things stand

- `main` publishes automatically to the **preview**, https://launchpadcreators.github.io/lpc-website/. It's hidden from Google.
- The **real domain** (launchpadcreators.com) still shows the old WordPress site. The new site will go live on the existing 123reg hosting, with automatic uploads from GitHub. Until that's set up, `main` only updates the preview. CHANGELOG.md says when this changes.
- **Never publish to the real domain, or push to `main`, unless the person asking clearly says to.** For Tom and Dan, the normal route is a branch and a pull request, so it can be checked on the preview before anyone approves it.

## Copy rules (most important)

- **Never invent copy, stats, numbers, quotes, names or bios.** Use the words the person gives you, or the wording already on the site. If a layout needs words that don't exist, ask for them.
- Don't reword existing copy unless asked. Copy changes are word-for-word swaps.
- British English. No em dashes. No hype or emoji.
- Voice: a serious growth firm for serious founders. Specific numbers, short sentences, plain English. Say founders, experts and partners, not "agency".

## Design rules

- Colours only come from the CSS variables in `src/styles/themes.css`; never hard-code colours. The accent (electric blue, or orange) switches in `src/config/theme.ts`.
- Fonts: Plus Jakarta Sans for everything, and Instrument Serif italic (class `accent`) for **one** phrase per headline.
- Section headings are centred, on mobile too.
- **Avoid:** small eyebrow labels above headlines, pill or chip lists, "SaaS-looking" template cards, text-heavy layouts, uneven card sizes, content spilling out of its container, tiny uppercase "AI look" labels.
- **Like:** smooth, eased motion and small, useful animated mockups.
- Animations run for everyone, even with the device's "Reduce motion" setting on. That was a deliberate decision, so don't add `prefers-reduced-motion` checks.
- Files in `public/` are referenced with `url()` from `src/config/paths.ts`, so they work on the preview's sub-path too.

## Check every change

- Run `npm run build`; it must pass.
- Look at the change on **desktop (1440×900)**, **tablet (768×1024)** and **phone (375×812)**, with no console errors.
- Leave every other section as it was.

## How the site is built

- Astro 7 + Tailwind v4, with Lenis smooth scroll. One page: `src/pages/index.astro`. Sections are in `src/components/`, in page order: Hero, Stats, GlassCeiling, GrowthSystem / GrowthEclipse / GrowthFunnel, Partners, WhatWeDo, HowWeWork, WhoWeAre, Close, Footer.
- **The three Growth System sections are alternative versions.** All three stay until Tom and Dan pick one.
- The Typeform "Work with us" link is in `src/data/growth-stages.ts` (`applyUrl`). The mailing list posts to Kit form 10103548, in `src/components/Close.astro`.
- **New page:** add a file in `src/pages/` (for example `src/pages/proof.astro` gives `/proof/`) that uses the `Base` layout and the existing components.
- Commands: `npm install`, `npm run dev` (localhost:4321), `npm run build`.

## Never commit

Passwords, logins, server details or private documents (call transcripts, internal briefs). **This repo is public.** Logins go in GitHub's encrypted settings (repo Settings → Secrets).

## Updating CHANGELOG.md (every change)

Add a line at the top of the newest date (or a new date heading), then commit it with the change:

```
## 2026-10-28
- Funnel on tablet and phone: heading, line and funnel stay pinned together. Asked by Abdullah. (GrowthFunnel.astro)
```

Say what changed in plain words, who asked, and which files. When a decision is made (for example, which Growth System version to keep, or the launch), note it there too.
