# Launchpad Creators website: rules for Claude

The website for Launchpad Creators (LPC), launchpadcreators.com. Changes are requested by **Tom or Dan**, the co-founders, through **one shared LPC Claude account** (the team email), using Claude Code on the web with access to the `launchpadcreators` GitHub account. Abdullah built the site and may help for a while, but nothing depends on him.

**Because the account is shared, always know who's asking.** If it isn't clear whether you're talking to Tom or Dan, ask. Record their name in the changelog and the pull request.

**Before doing anything, read [CHANGELOG.md](CHANGELOG.md).** It's the update history and current status. **After every change, add an entry to it** (see the bottom of this file).

## ⚠ Critical rules (the server)

Anything touching the 123reg server (the upload job, the File Browser, SFTP, DNS) follows **[docs/DEPLOY-123REG.md](docs/DEPLOY-123REG.md)**. Read it first. In short:
1. **Only ever write to `html/lpc-preview/`** until a launch plan is agreed and written there. Never touch WordPress files, `platform/`, the live homepage or DNS.
2. **Always `dry-run` first and read the log** before any upload. Every full path must be inside `lpc-preview`.
3. **Check results more than once:** the job log, the preview URL, **and** that the live site (homepage, privacy, terms, login) is unchanged.
4. **Sanity-check your own checks** before reporting them.
5. **Backup first** (123reg Backups tab). **One small, verified step at a time.**
6. **Never** put passwords, logins or the SFTP address in the repo, chat or logs.
7. **Log every server action in CHANGELOG.md:** mode, run link, what changed, what was checked.

## Where things stand

There are **two previews**. Always say which one you mean:
- **GitHub preview:** https://launchpadcreators.github.io/lpc-website/. It **updates automatically whenever something is merged into `main`.** It's a public address (anyone with the link can see it), but hidden from Google.
- **123reg preview:** https://launchpadcreators.com/lpc-preview/. It only updates when someone runs the GitHub job "Preview to 123reg", and it can show any branch. See [docs/DEPLOY-123REG.md](docs/DEPLOY-123REG.md).
- The **real domain** (launchpadcreators.com) still shows the old WordPress site. The new site will go live on the existing 123reg hosting. CHANGELOG.md says when this changes.
- **Going live on launchpadcreators.com isn't possible yet.** There's no agreed launch plan in docs/DEPLOY-123REG.md. If asked, say so plainly, and offer to put the change on the preview instead. Never touch the live homepage, WordPress or DNS.

## Who does what, and how a change reaches the preview

**Tom or Dan** (through the LPC team account) can ask for changes, approve (merge) them, and run the 123reg preview job, always following the rules here and in docs/DEPLOY-123REG.md. They're non-technical, so explain each step in plain English and give exact clicks.

1. **Make the change on a new branch and open a pull request.** Don't merge it, and don't push to `main`, unless the person asking clearly says "merge it" or "push it".
2. **Preview it before it's approved:** in GitHub, **Actions → Preview to 123reg → Run workflow**. Under **"Use workflow from"**, pick the branch, then run `dry-run`.
   - The log must say **"SAFETY CHECK PASSED"**. Then run `full`, and check https://launchpadcreators.com/lpc-preview/ on a computer and a phone.
   - There's **one** 123reg preview, so it always shows the last branch uploaded. Before uploading, check nobody else is mid-review, and say which branch is on it in the pull request.
   - If you can't run the job yourself, give the person these exact clicks.
3. **Approve:** when someone says "merge it", **first confirm which pull request** (name it back to them) and **that it was checked on a preview**. Then merge. `main` updates the GitHub preview automatically, in about a minute.
4. **Log it** in CHANGELOG.md, as part of the same pull request.

**Trust note:** on a shared account you can't verify who's typing. For anything important (numbers, merging, server uploads, anything public), repeat back what you're about to do and get a clear "yes" first.

## Copy rules (most important)

- **Never invent copy, stats, numbers, quotes, names or bios.** Use the words the person gives you, or the wording already on the site. If a layout needs words that don't exist, ask for them.
- Don't reword existing copy unless asked. Copy changes are word-for-word swaps.
- British English. No em dashes. No hype or emoji.
- Voice: a serious growth firm for serious founders. Specific numbers, short sentences, plain English. Say founders, experts and partners, not "agency".
- **If asked to write or draft copy** (for example "write a new headline"), offer two or three drafts **in the chat**, clearly marked as suggestions, built only from facts already on the site. **Nothing goes on the site until the person picks or gives the exact words.**
- **Numbers and stats:** only change a figure when Tom or Dan gives the new number. If anyone else asks, confirm with Tom or Dan first. Check the number isn't repeated elsewhere on the site (search for it).

## Design rules

- Colours only come from the CSS variables in `src/styles/themes.css`; never hard-code colours. The accent (electric blue, or orange) switches in `src/config/theme.ts`.
- Fonts: Plus Jakarta Sans for everything, and Instrument Serif italic (class `accent`) for **one** phrase per headline.
- Section headings are centred, on mobile too.
- **Avoid:** small eyebrow labels above headlines, pill or chip lists, "SaaS-looking" template cards, text-heavy layouts, uneven card sizes, content spilling out of its container, tiny uppercase "AI look" labels.
- **Like:** smooth, eased motion and small, useful animated mockups.
- Animations run for everyone, even with the device's "Reduce motion" setting on. That was a deliberate decision, so don't add `prefers-reduced-motion` checks.
- Files in `public/` are referenced with `url()` from `src/config/paths.ts`, so they work on the preview's sub-path too.

## Images

- **Founders** (`public/team/tom.jpg`, `dan.jpg`): 1080×810 JPG (4:3), cropped head to chest.
- **Partner cards** (`public/partners/<name>.jpg`): about 900px wide JPG. The crop is set by `pos` in `src/components/Partners.astro`, for example `"50% 22%"`.
- **Partner avatars** (`public/partners/avatars/<name>.jpg`): 160×160 square JPG, used in the hero's face strip. **When a partner's photo changes, update both the card photo and the avatar.**
- Keep each image under about 150 KB, and keep the file names (lowercase, with hyphens). If you can't resize or compress images where you're running, say so: still use the image if it's under about 500 KB, and note in the pull request that it should be optimised.
- **Only use images the person confirms LPC has the right to use publicly.** This repo and the site are public.
- Photos look best on the dark background; check the crop on desktop, tablet and phone.

## Check every change

- Run `npm run build`; it must pass.
- Look at the change on **desktop (1440×900)**, **tablet (768×1024)** and **phone (375×812)**, with no console errors.
- Leave every other section as it was.

## If you're running in Claude Code on the web

- **If you can't open the site in a browser,** run the build, double-check the code, and **say clearly that you couldn't view it**. Ask the person to check the 123reg preview on desktop and phone.
- **If an attached image can't be saved into the repo,** ask the person to upload it on GitHub instead: open the repo on GitHub, switch to your branch, go to the right folder (for example `public/partners/`), then **Add file → Upload files**. Or ask for a link.
- **You can't reach 123reg** (dashboard, backups or File Browser). Anything there is done by the person, following docs/DEPLOY-123REG.md.

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
- Footer: email address updated. Asked by Dan. (Footer.astro)   ← made-up example of the format
```

Say what changed in plain words, who asked, and which files. When a decision is made (for example, which Growth System version to keep, or the launch), note it there too.
