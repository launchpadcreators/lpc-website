# Changelog

The update history of the Launchpad Creators website, newest first. **Add a line for every change** (see [CLAUDE.md](CLAUDE.md)).

## Current status

- **Preview:** https://launchpadcreators.github.io/lpc-website/, updated automatically from `main` and hidden from Google.
- **Live domain:** launchpadcreators.com still shows the old WordPress site.
- **Hosting decision:** the new site will go live on the existing 123reg hosting as plain files (no WordPress). Tom agreed to option 1 (123reg).
- **123reg upload job:** "Preview to 123reg" is set up and its `dry-run` has passed. Next: `one-file-test`, then `full`. Server details and rules: [docs/DEPLOY-123REG.md](docs/DEPLOY-123REG.md).
- **Waiting on Tom and Dan:** which Growth System version to keep; any copy changes; Dan's reference blue; new glass ceiling quotes and second beat; a new photo of Joseph (ideally on-stage photos of all partners); the "Our story" text; Jo Bird's bio.
- **To do before launch:** Privacy Policy and Terms pages in the new design (same text as the current ones); SEO basics (share image, sitemap, robots.txt, structured data); the automatic upload to 123reg; making this repo private (after previews move to 123reg).

## 2026-10-28
- Added [docs/DEPLOY-123REG.md](docs/DEPLOY-123REG.md) (server layout, access, secrets, the job, how to read logs, critical rules, set-up history) and critical server rules in CLAUDE.md. Asked by Abdullah.
- 123reg server, read-only runs only, nothing changed:
  - `dry-run`: stopped safely, because the SFTP login lands in the home folder, not the website folder. ([run](https://github.com/launchpadcreators/lpc-website/actions/runs/40698492175))
  - `find-folder`: found nothing under home. ([run](https://github.com/launchpadcreators/lpc-website/actions/runs/40701225348))
  - `look-around`: the home folder holds only an `html` shortcut; `html` is the website folder (contains `lpc-preview` and WordPress). ([run 1](https://github.com/launchpadcreators/lpc-website/actions/runs/40704105537), [run 2](https://github.com/launchpadcreators/lpc-website/actions/runs/40704732984))
  - Secret `SFTP_ROOT` set to `html`. `dry-run` passed: 58 of 58 full paths inside `html/lpc-preview/`; plan = 48 replaced, 2 new, 3 deleted (2 old build files and a leftover zip). ([run](https://github.com/launchpadcreators/lpc-website/actions/runs/40705289309))
- Added the manual GitHub job "Preview to 123reg" (`.github/workflows/preview-123reg.yml`): modes look-around, find-folder, dry-run, one-file-test and full; it only ever writes inside `lpc-preview`. SFTP login created in 123reg (SSH disabled); secrets SFTP_HOST, SFTP_USER and SFTP_PASSWORD saved. 123reg backup taken first.
- Funnel on tablet and phone: the heading, intro line and funnel stay pinned together while the levels open, with tighter spacing and a compact version for short phones. Desktop unchanged. Asked by Abdullah. (GrowthFunnel.astro)
- Mailing list connected to Kit form 10103548, keeping our own design (first name and email), and showing Kit's success message. (Close.astro)
- Repo moved to the LPC GitHub account `launchpadcreators`. Preview address changed to launchpadcreators.github.io/lpc-website.
- Added these rules (CLAUDE.md) and this changelog.

## 2026-10-26
- Partner carousel: a slower, smooth glide (1.1s), with a 2-second rest on each card. Asked by Abdullah. (Partners.astro)
- Animations now run for everyone, even with the device's "Reduce motion" setting on. A team member's Mac had it on and saw a static site. Asked by Abdullah.

## 2026-10-23 (Tom's Loom review 2)
- Electric blue accent (#0052FF, with azure #0A84FF for highlights) replaces red-orange. Orange is one switch away in `src/config/theme.ts`.
- New founder photos for Tom and Dan; "Our story" card (placeholder text until Tom sends it).
- Footer rocket redesigned: white, lifts off with a faded blue trail as the closing card comes into view. Split glass ceiling version removed.
- How we work: the Consultancy card now matches the Growth Partner card; stacked cards on mobile.
- Mobile: the funnel walks through its levels while pinned.
- Custom cursor: follows the mouse more closely, tilted like a normal arrow.
- Glass ceiling: new headline and sub-line, and a steeper climb after the break-through.
- Partner order: Chris, Joseph, Nicolas, then Jo. Hero face strip reordered so Chris is right-most.
- "We launch and scale a…" rotating word brought back above the partner cards.

## 2026-10-22 (first build and Tom's Loom review 1)
- First version of the homepage, built with Astro and published to GitHub Pages.
- Real partner and founder photos; partner cards as an infinite auto carousel.
- Tom's review 1 copy changes; red-orange accent; hero partner faces; footer rocket; alternative section versions to compare.
- Funnel bands open one by one on phones; mobile fixes and a performance pass; navbar blur fix.
