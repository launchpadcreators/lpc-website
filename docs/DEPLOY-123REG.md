# 123reg hosting and the upload job

Everything about the 123reg server and the GitHub job that uploads the site to it. **Read this before touching the server or running the job.** Last updated 28 Oct 2026.

> This repo is public. Logins and the SFTP address are **not** written here. They live in GitHub's encrypted secrets (see below).

## 1. The hosting

- **Plan:** 123reg **Managed WordPress, Basic**: 1 website, 25,000 visitors a month, SFTP access, CDN on. WordPress 7.1.3, PHP 8.2.
- **Domain:** launchpadcreators.com. Its DNS is at 123reg; **email is Microsoft 365**, and its DNS records must never be changed.
- **The live homepage is still the old WordPress site.** The new site so far lives only in the hidden **`lpc-preview`** folder: https://launchpadcreators.com/lpc-preview/ (marked noindex).
- The new site **doesn't need WordPress**. 123reg serves it as plain files. This was tested on 28 Oct 2026.
- **Temporary addresses:** 123reg also gives the site `….myftpupload.com` addresses, listed under Domains on the Settings page. They're just extra addresses for the same site, not FTP. (Not written here, because they reveal the SFTP address.)

## 2. Folder layout on the server (confirmed 28 Oct 2026, read-only)

The **SFTP login lands in the account's home folder** (`/home/<user>`), **not** the website folder. The home folder contains just one item:

```
/home/<user>/
└── html@            ← shortcut to the WEBSITE'S MAIN FOLDER (this is SFTP_ROOT)
```

Inside `html` (the website's main folder, the same view as 123reg's File Browser):

```
html/
├── lpc-preview/         ← OUR folder: the new site's preview. The ONLY place the job writes.
├── wp-admin/            ← WordPress: never touch
├── wp-content/          ← WordPress: never touch (themes, plugins, uploads)
├── wp-includes/         ← WordPress: never touch
├── platform/            ← 123reg's own files: never touch
├── .wp-cli/             ← 123reg/WordPress tooling: never touch
├── index.php, wp-config.php, wp-*.php, xmlrpc.php, plat-cron.php, .wp-config.php.replaced.bak
```

- **There is no `public_html`.** Guides that mention it are for 123reg's standard (cPanel) hosting, not Managed WordPress.
- At the very top of the server (`/`) there are system folders, a real `/html/` and a `/httpdocs` shortcut. **We never use paths from `/`.** We always go home folder → `html`.

## 3. Ways to access the server

| Way | Where | Notes |
|---|---|---|
| **123reg dashboard** | My Hosting → launchpadcreators.com **•••** → **Settings** | Shows the plan, PHP/WordPress versions, IP, SFTP login, tools |
| **File Browser** | Settings → **Tools** → File Browser → **Open** | Opens **directly in `html`** (shown as the site address). Can upload, create folders and Unarchive zips. ⚠ Can't reliably rename or delete files with a backslash `\` in their name. |
| **Backups** | **Backups** tab at the top of My Hosting | Take a backup before any change to the server. |
| **SFTP** | Address in the `SFTP_HOST` secret, port 22 | The login is made in Settings → SSH/SFTP login → **View or Change** → **Create New Login**. **The username and password are shown only once** (123reg doesn't store them), and **creating a new login disables the old one.** SSH is kept **disabled** (SFTP only). |
| **phpMyAdmin** | Settings → Database details → Open phpMyAdmin | WordPress's database. Export it for an off-site backup. |
| **GitHub job** | github.com/launchpadcreators/lpc-website → **Actions** → **Preview to 123reg** | See section 5. |

## 4. GitHub secrets (repo Settings → Secrets and variables → Actions)

Only the **`launchpadcreators`** account can add or change these (collaborators can't). Values are never shown again, and appear as `***` in logs.

| Secret | Value |
|---|---|
| `SFTP_HOST` | the SSH/SFTP address from the 123reg Settings page |
| `SFTP_USER` | the SFTP username (from Create New Login) |
| `SFTP_PASSWORD` | the SFTP password (from Create New Login) |
| `SFTP_ROOT` | `html` (the folder under the login's home that holds the website) |

If the SFTP login is ever recreated in 123reg, update `SFTP_USER` and `SFTP_PASSWORD` here.

## 5. The upload job: "Preview to 123reg"

File: `.github/workflows/preview-123reg.yml`. Manual only: **Actions → Preview to 123reg → Run workflow → pick a mode**. It builds the site for the `/lpc-preview/` address (noindex), logs in, goes into `SFTP_ROOT` (`html`), and then:

| Mode | What it does | Changes the server? |
|---|---|---|
| `look-around` | Lists the home folder, the server top, and the `SFTP_ROOT` folder | **No** (read-only) |
| `find-folder` | Looks for `lpc-preview` up to two levels below the home folder | **No** (read-only) |
| `dry-run` (default) | Lists exactly what `full` would upload or delete | **No** (read-only) |
| `one-file-test` | Uploads only `lpc-preview/deploy-test.txt` (time and commit) | Yes: one file only |
| `full` | Makes `lpc-preview` match the new build: uploads new and changed files, deletes ones no longer used | Yes: **inside `lpc-preview` only** |

**Safety built into the job:**
- It **stops unless the `lpc-preview` folder already exists** in `SFTP_ROOT`. It never creates folders and never works anywhere else.
- `full` mirrors `dist/` → `lpc-preview/` only; its deletions are limited to that folder.
- It stops on a missing secret or an unknown mode.

**The file count isn't fixed.** The job compares the new build with the folder each time, so 50, 51 or 500 files all work, and the folder always ends up matching the build exactly.

## 6. How to read a dry-run log

**The simple version:** look for the line **"SAFETY CHECK PASSED: all N paths in the plan are inside lpc-preview"**. The job checks its own plan automatically. If any path points outside `lpc-preview`, it prints **"SAFETY CHECK FAILED"** and stops. In `full` mode, the same check runs first, so a bad plan is never uploaded. Above it, a "Plan:" line says how many files will be uploaded and deleted.

The details, for anyone checking by hand:

- **"Removing old file" / "Transferring file"** lines show names **relative to `lpc-preview`** (for example `favicon.ico`), so they don't contain the word "lpc-preview".
- **`mkdir` / `rm` / `chmod`** lines show **full paths**. Every one must start with `…/home/***/***/lpc-preview/`. **If any full path points outside `lpc-preview`, stop.**
- A **replaced** file shows "Removing old file" **and** "Transferring file". A **deleted** file shows "Removing old file" **plus** an `rm` line, with no transfer. A **new** file shows only "Transferring file".
- Example (28 Oct 2026): Transferring 50 and Removing 51 meant 48 replaced, 2 new and 3 deleted (2 old build files and a leftover zip), leaving exactly 50 files.

### Previewing a branch (before a pull request is approved)

Actions → **Preview to 123reg** → **Run workflow** → under **"Use workflow from"** pick the branch → `dry-run` → check "SAFETY CHECK PASSED" → `full`. There's only one `lpc-preview` folder, so it shows whichever branch was uploaded last.

> ⚠ Until the first `one-file-test` and `full` have succeeded (see section 8), branch previews are **untested**, and the folder may still show an older test build.

**Who can run it:** Tom or Dan, through the LPC team account (and Abdullah while he's still helping), following the rules below. The secrets are only changed from the `launchpadcreators` GitHub account.

## 7. Critical rules

0. **This file is the source of truth** for the server. CLAUDE.md only summarises it; if they ever differ, this file wins, so fix the summary.
1. **Never write anywhere except `html/lpc-preview/`** until a launch plan is agreed and written here. The live homepage, WordPress files, `platform/` and DNS are off-limits.
2. **Always run `dry-run` first, and check it says "SAFETY CHECK PASSED"** (section 6) before `one-file-test` or `full`. Do it in the same session, after any change to the job. (`full` repeats the check by itself and stops if it fails.)
3. **Check results more than once, from more than one angle:**
   - the job log (success, and every full path inside `lpc-preview`);
   - the preview URL loads (https://launchpadcreators.com/lpc-preview/), with no failed files;
   - **the live site is unchanged:** the homepage (still WordPress), `/privacy-policy/`, `/terms-of-use/` and `/wp-login.php` all respond as before.
4. **Sanity-check your own checks.** If a check reports something surprising (everything failed, or nothing matched), the check may be wrong; verify it another way before reporting.
5. **Take a backup** (123reg Backups tab) before the first change of the day to the server, and always before launch.
6. **One small, verified step at a time.** Say what each step can and can't affect before running it.
7. **Never put passwords, logins or the SFTP address in the repo, chat or logs.** Secrets only.
8. **Zips for the server:** build them with `tar -a -c -f` (forward slashes), and check them with `unzip -Z1` (no `\` in any name) and a real `unzip` test. **Never use Windows `Compress-Archive`**: Linux unpacks its backslash paths as flat files named `lpc-preview\…`, which the File Browser can't delete.
9. **Log every server action** in [CHANGELOG.md](../CHANGELOG.md): what ran (mode and run link), what changed, and what was checked.

## 8. History of the server set-up (and lessons learned)

- **27 Oct 2026:** first test upload by zip. A Windows-made zip unpacked as ~50 flat files named `lpc-preview\…` in `html`. The live site was unaffected, but the File Browser couldn't delete them; they had to be renamed one by one, then deleted. → Rule 8.
- **27 Oct 2026:** a clean zip (tar) unpacked correctly into `html/lpc-preview/`. The new site served as plain files at /lpc-preview/, which **proved WordPress isn't needed**.
- **28 Oct 2026:** SFTP login created (SSH disabled) and secrets saved. The first `dry-run` stopped safely: the login lands in `/home/<user>`, not the website folder. `look-around` showed the home folder holds only the `html` shortcut, and that `html` is the website folder (it contains `lpc-preview` and WordPress). `SFTP_ROOT` was set to `html`. The `dry-run` then succeeded, with every path inside `lpc-preview`.
- **Next:** `one-file-test`, then `full`, then checks (rule 3).
