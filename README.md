# PowerShell Blog

Jekyll site for GitHub Pages, styled to match johnjheisler.com.

## Publish

1. Create a **public** repo named `Snowstuff123.github.io` and push these files to `main`.
2. In **Settings → Pages**, set Source to **Deploy from a branch**, then choose `main` and `/ (root)`.
3. The site goes live at `https://snowstuff123.github.io` within a couple of minutes.

## Add a post

Create `_posts/YYYY-MM-DD-title-with-dashes.md`:

```markdown
---
title: "My Post Title"
date: 2026-10-01
tags: [powershell, exchange]
description: One sentence shown in the post list.
script_url: https://github.com/Snowstuff123/powershell-scripts/blob/main/My-Script.ps1   # optional
---
Post body in Markdown. Fence code with ```powershell.
```

`description` and `script_url` are optional. A post with `script_url` gets a "View on GitHub" box under it.

## Files to copy over from the main site

- `favicon.ico` → repo root
- `bg-vector.svg` → `assets/bg-vector.svg` (the background artwork appears automatically once the file exists)

## Keep the styling in sync

`assets/css/johnjheisler.css` is a copy of the main site's stylesheet. Update it there and copy it here when it changes. Blog-only styles live in `assets/css/blog.css`.

## Custom domain (johnjheisler.net)

1. Export your Blogger posts first and keep Blogger live until the new site is working.
2. In **Settings → Pages → Custom domain**, enter `www.johnjheisler.net`.
3. At your DNS provider, add a `CNAME` record for `www` pointing to `snowstuff123.github.io`. For the bare domain, add `A` records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. Turn on **Enforce HTTPS** once it becomes available.
5. Change `url` in `_config.yml` to `https://www.johnjheisler.net`.

## Preview locally (optional)

```powershell
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
