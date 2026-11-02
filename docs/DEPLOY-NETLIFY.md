# Moving the website to Netlify

Tom and Dan asked for the most reliable hosting that's easy to update (2 Nov 2026). Netlify was chosen. This file is the plan and the switch-day checklist. Until switch day, **the live site stays on 123reg** (docs/DEPLOY-123REG.md) and nothing here changes it.

## 1. How it works

- Netlify project: **preeminent-seahorse-1bf8ea** in the "Launchpad Creators" team (team email login). Its own address: https://preeminent-seahorse-1bf8ea.netlify.app
- Netlify builds the site from `main` by itself, about a minute after each merge. No upload job, no Flush Cache.
- Every pull request gets its own preview link from Netlify (kept out of search engines).
- Settings live in [netlify.toml](../netlify.toml): build, headers, redirects for old WordPress addresses. Netlify-only files: `public/robots.txt`, `src/pages/sitemap.xml.ts` (lists every page except `/p/` and the 404 page), `src/pages/404.astro`.
- Undo a bad update: Netlify → Deploys → pick an earlier deploy → **Publish deploy**.
- **The domain stays registered at 123reg, and its DNS stays there too.** Never use "Set up Netlify DNS" or change the name servers: that would move the Microsoft 365 email records as well.

## 2. Before switch day

1. **Plan:** the Free plan pauses a site when its monthly credits run out, and Netlify's forum has reports of Free sites paused by mistake. For the business site, use a paid plan (Tom and Dan's call). The Free plan also adds a Netlify comment and script to every page; check whether they're gone after upgrading.
2. **Optional:** rename the project (Project configuration → General → Change project name). If you do, update the Netlify address in the last redirect in netlify.toml.
3. **WordPress:** after the switch it can't be reached on the domain (login, pages, uploads). Save anything still needed.
4. **Check the Netlify address** on a computer and a phone: all sections, the newsletter pop-up, the Typeform link, /privacy-policy/, /terms-of-use/, /p/partner-results/.
5. **Backup** in 123reg (Backups tab), and compare the 123reg DNS page with `hosting/dns-backup-launchpadcreators.com-2026-10-27.md` (outside this repo). Public DNS on 2 Nov also showed a `_dmarc` TXT record (`v=DMARC1; p=none;`) that the October backup doesn't list. Leave it as it is.
6. **The two values:** Netlify → Domain management → **Pending DNS verification** next to launchpadcreators.com and next to www. Note the IP address and the www target it gives.

## 3. Switch day

1. In 123reg → DNS for launchpadcreators.com, change **only these two records**:

   | Type | Name | From | To |
   |---|---|---|---|
   | A | @ | 160.153.0.122 | the IP Netlify gives (usually 75.2.60.5) |
   | CNAME | www | launchpadcreators.com. | preeminent-seahorse-1bf8ea.netlify.app |

   Leave every other record (email, Google verification, `_acme-challenge`, `_dmarc`) exactly as it is.
2. Wait up to an hour. In Netlify → Domain management → HTTPS, click **Verify DNS configuration** until the certificate is issued.
3. Check:
   - https://launchpadcreators.com, http:// (goes to https), www (goes to the main address), on a computer and a phone.
   - `/robots.txt` (AI crawlers kept out of `/p/` only), `/sitemap.xml` (3 pages, no `/p/`), `/home/` (goes to the homepage), `/p/partner-results/` (loads, noindex tag and header), a made-up address (the "Page not found" page).
   - **Email:** send a message to and from team@launchpadcreators.com.
4. Uncomment the last redirect in netlify.toml (the Netlify address then sends everyone to launchpadcreators.com) and merge.
5. Google Search Console: submit `https://launchpadcreators.com/sitemap.xml`. The verification record stays in DNS, so nothing else is needed.
6. Log it in CHANGELOG.md.

**Undo:** put the two records back (A @ → 160.153.0.122, www → launchpadcreators.com.). The 123reg copy is untouched, so the old live site is back within about an hour. Changes merged after the switch are only on Netlify.

## 4. After a week or two without problems

- Update CLAUDE.md and README: **merging to `main` publishes the live site**; Netlify's pull request previews replace the 123reg preview and the GitHub preview.
- Retire the 123reg upload job and the GitHub Pages workflow. Then the repo can be made private (Tom and Dan's call; Netlify works with private repos).
- What happens to the 123reg hosting plan is Tom and Dan's call. The domain and its DNS stay at 123reg either way.
