# Changelog

The update history of the Launchpad Creators website, newest first. **Add a line for every change** (see [CLAUDE.md](CLAUDE.md)).

## Current status

- **Preview:** https://launchpadcreators.github.io/lpc-website/, updated automatically from `main` and hidden from Google.
- **Live domain:** launchpadcreators.com still shows the old WordPress site.
- **Hosting decision:** the new site will go live on the existing 123reg hosting as plain files (no WordPress). Tom agreed to option 1 (123reg).
- **123reg preview:** https://launchpadcreators.com/lpc-preview/ (hidden from Google), updated by the "Preview to 123reg" job. Last upload: `main` at `9ebc8a9` on 29 Oct. Server details and rules: [docs/DEPLOY-123REG.md](docs/DEPLOY-123REG.md).
- **Waiting on Tom and Dan:** which Growth System version to keep; any copy changes; Dan's reference blue; new glass ceiling quotes and second beat; a new photo of Joseph (ideally on-stage photos of all partners); the "Our story" text; Jo Bird's bio.
- **To do before launch:** Privacy Policy and Terms pages in the new design (same text as the current ones); SEO basics (share image, sitemap, robots.txt, structured data); the automatic upload to 123reg; making this repo private (note: on GitHub's free plan that switches off the GitHub preview, so do it once the 123reg preview is in regular use).
- **Access:** one shared LPC Claude account (team email) with the `launchpadcreators` GitHub account. Abdullah (`m-abdullahh`) stays a collaborator until the final deployment is done; he'll remove himself after that.

## 2026-10-29
- Results page, Tom's Loom review: top stat "$805M+" is now "$80M+"; the row of partner name links removed; Nicolas "in around 9 months" is now "in 9 months" (headline and result); Jo's "Who she is" replaced with the text from her website. Joseph's "Who he is" and "The product" replaced with Tom's words from the Loom (2:56–3:37). Nicolas's "Who he is" is now his LinkedIn line, and his product line adds "community of 4,000+". Added to Nicolas's "Who he is": "Companies including KPMG, Mercedes, Chanel, Siemens and Amazon have trained their teams with him." (draft picked by Abdullah from Tom's spoken points). Still to come from Tom: the closing sentence and button between the partners and "Our team". Asked by Tom (Loom, 29 Oct). (results.astro)
- 123reg cache: Abdullah flushed the cache and the preview now shows the latest upload. Then tested a no-cache rule (`.htaccess` in lpc-preview, from a test branch) so uploads would show without a flush: **123reg's gateway ignores it**, so flushing after every upload stays the rule. The preview was put back to `main`, the rule file removed and the test branch deleted. Live site unchanged. Run links in docs/DEPLOY-123REG.md section 8. Asked by Abdullah.
- **123reg preview updated again** to `main` at `ebf6820` (team list centred): [dry-run](https://github.com/launchpadcreators/lpc-website/actions/runs/40854551555) (SAFETY CHECK PASSED, 55/55 paths inside lpc-preview), [full](https://github.com/launchpadcreators/lpc-website/actions/runs/40854782980) (53 files uploaded, the old Results stylesheet removed). The server has the new files and the live site is unchanged. **Found:** the CDN in front of the site (Cloudflare, up to 31 days) is still giving visitors old copies of `/lpc-preview/` and `/lpc-preview/results/`, and the old homepage copy links to a deleted funnel script. Fix: **Flush Cache** in the 123reg dashboard (done by Abdullah). New rule 10 in docs/DEPLOY-123REG.md: flush the cache after every upload and check the plain address. Asked by Abdullah.
- Results page, "Our team" list: centred, with the 7th specialism centred under the two columns. Asked by Abdullah. (results.astro)
- **123reg preview updated** to `main` at `9ebc8a9` (homepage, the new Results page, the cursor fix), after a fresh 123reg backup. Runs: [dry-run](https://github.com/launchpadcreators/lpc-website/actions/runs/40853135873) (SAFETY CHECK PASSED, 63/63 paths inside lpc-preview), [one-file-test](https://github.com/launchpadcreators/lpc-website/actions/runs/40853315490) (deploy-test.txt uploaded), [full](https://github.com/launchpadcreators/lpc-website/actions/runs/40853463256) (check passed again, 53 files uploaded, 4 old files in lpc-preview removed). Checked: launchpadcreators.com/lpc-preview/ and /lpc-preview/results/ on desktop and phone, all linked files load; live homepage, privacy, terms and login unchanged. Asked by Abdullah.
- Custom cursor no longer freezes at the edge of the Results page video. The normal cursor takes over on the video's tile (the embedded player doesn't tell our page when the mouse enters it). Asked by Abdullah. (Cursor.astro, results.astro)
- New **Results & Proof page at `/results`**: intro and stats, then Chris, Nicolas, Joseph and Jo (photo, who they are, the product, what we did, results; Chris's testimonial video embedded), then the team and founders, plus the closing card. Copy word for word from Tom's "Results & Proof" doc. Doc placeholders (testimonials, the empty 4th stat, Jo's "In her words") are hidden until the content exists. Hidden from Google, and not linked from the homepage. Asked by Tom (Loom, 29 Oct). (src/pages/results.astro)
- Menu and footer section links now work from other pages (they go back to the homepage's sections). (Navbar.astro, Footer.astro)
- Copy questions for Tom: "$805M+" (the homepage says $80M+); the empty 4th stat; "30%%" shown as "30%"; Tom's two travel company figures (£500K to £7M vs £0 to £7M); em dashes in Joseph's result line.

## 2026-10-28
- Rules updated for Tom and Dan on Claude Code on the web (shared team account): who does what, two previews explained, confirm before merging, drafts and stats rules, image rules, web-session limits. Tested twice with a fresh Claude that saw only this repo. AGENTS.md now points to CLAUDE.md. Outdated "Hostinger" and "orange" comments fixed (comments only). Asked by Abdullah.
- "Preview to 123reg" job: automatic safety verdict. The dry run prints SAFETY CHECK PASSED/FAILED, and `full` re-checks the plan and stops before uploading if any path is outside lpc-preview. Tested locally with a clean plan and a bad one.
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
