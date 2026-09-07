# ViFi Help Center

Customer-facing documentation for ViFi, published at **https://docs.vifi.us** from this repository on every push to `main`.

Built with [Astro Starlight](https://starlight.astro.build/). Content is plain Markdown in `src/content/docs/`. You don't need to run anything locally to fix a typo: edit the file on GitHub, open a pull request, and the **Check** workflow builds it (broken links fail the check).

## Editing content

### Where things live

```
src/content/docs/
├── index.mdx              landing page (cards)
├── whats-new.md           customer-visible changelog, newest first
├── start-here/            onboarding: account, Setup Guide, forwarding
├── your-agent/            greeting, voice, policies, knowledge base, recording…
├── calls-and-callers/     dashboard, calls, callers, messages, notifications, analytics
├── connect-your-tools/    one page per integration, widget, webhooks
├── team-and-account/      roles, numbers, account, security, audit log
├── billing/               plans, trial, usage, invoices, changes
├── fix-a-problem/         one page per symptom, plus contact support
├── best-practices/        opinionated guidance
└── reference/             feature status, glossary, privacy, SMS rules, roadmap
```

The folder is the sidebar section; the file name is the URL. Sidebar labels for sections are set in `astro.config.mjs`; page order within a section comes from `sidebar.order` in frontmatter.

### Frontmatter

```yaml
---
title: Blocked callers and spam
description: One sentence. Shown in search results, link previews, and llms.txt.
sidebar:
  order: 6
status: beta            # optional: beta | coming-soon
statusNote: One line explaining the status, shown under the title.   # optional
---
```

`status` renders a pill next to the title **and** a badge in the sidebar (see `src/route-middleware.ts`). Use `beta` for features that work but are still being refined, `coming-soon` for features that don't exist yet. Don't add a pill for things that simply have limitations; explain those in the text.

For an inline pill inside a sentence or table, use plain HTML:

```html
<span class="status-pill status-pill--coming-soon">Coming soon</span>
```

### Screenshots and placeholders

Mark where a screenshot belongs with a directive on its own line:

```md
::screenshot[The Setup Guide with its four steps across the top]
```

Without an image this renders a labelled placeholder box, so pages can ship before screenshots exist. When you have the image, drop it in `public/screenshots/` and add `src`:

```md
::screenshot[The Setup Guide with its four steps across the top]{src="/screenshots/setup-guide.png"}
```

The caption doubles as alt text unless you add `alt="..."`.

### Callouts

```md
:::tip
Short, useful aside.
:::

:::caution[Optional title]
Something that could cost the reader money or calls.
:::
```

`note`, `tip`, `caution`, and `danger` are available.

### Links

Link to other pages with absolute paths and a trailing slash: `[Transfers](/your-agent/transfers/)`. The build fails on links to pages that don't exist.

Link into the app with full URLs: `https://app.vifi.us/billing`. Clicks on those are tracked as `docs_app_link_clicked` in PostHog.

## Writing rules

The audience is a business owner with no technical background, reading on a phone between calls.

- **Second person.** "You", never "the user" or "customers".
- **Plain English.** If you need a term, define it in the sentence, and add it to the glossary.
- **Task-shaped headings.** "Blocking a number by hand", not "The blocklist feature".
- **Short paragraphs.** One idea each. Numbered steps for anything the reader does.
- **Examples over abstractions.** "Tell ViFi to post summaries to `#front-desk`" beats "configure the notification routing".
- **No marketing words.** No "seamlessly", "powerful", "robust".
- **No emojis.**
- **Nothing that doesn't exist.** Features that aren't live get a `coming-soon` pill or don't get documented.
- **Technical depth goes at the bottom** under a heading "For technical users", or in `reference/`. The plain path should never require it.

## Keeping it accurate

- When a feature changes in `vifi-platform`, update the matching page here in the same week. The UI strings in this repo should match what the app shows.
- Add an entry to `whats-new.md` for anything a customer can see.
- Update `reference/feature-status.md` when a pill changes.

## Running locally

```bash
npm ci
npm run dev       # http://localhost:4321
npm run check     # Astro and TypeScript diagnostics
npm test          # analytics and screenshot regression checks
npm run build     # full build with link validation
npm run preview   # serve the build
```

Use Node 26.8.1, matching `.node-version` and CI. Astro supports Node 22.12 or newer.

Astro's checker needs the TypeScript JavaScript API, so its `typescript` dependency
uses Microsoft's maintained `@typescript/typescript6` compatibility package.
The native TypeScript 7 compiler does not provide that API.

## How it's built

- **Astro 7 + Starlight 0.42.** Markdown is processed by Astro's default engine (Sätteri); the `::screenshot` directive is `src/plugins/satteri-screenshot.mjs`.
- **Theme** in `src/styles/theme.css`: the vifi.us palette (electric blue on slate) and the same self-hosted fonts.
- **Overrides** in `src/components/`: `Head.astro` (fonts, icons, PostHog), `PageTitle.astro` (status pill), `Footer.astro` ("Was this page helpful?").
- **Plugins:** `starlight-llms-txt` publishes `/llms.txt`, `/llms-full.txt`, and `/llms-small.txt` for AI assistants and for the platform's knowledge-base ingestion; `starlight-links-validator` fails the build on broken internal links.
- **Search** is Pagefind, built into the site; no external service.
- **Deploy:** `.github/workflows/deploy.yml` builds on push to `main` and publishes to GitHub Pages. `public/CNAME` pins the custom domain. DNS for `docs.vifi.us` is a CNAME to `vifi-us.github.io` in Cloudflare.
- **Analytics:** PostHog, same project and `.vifi.us` cookie as vifi.us and app.vifi.us, only on the production hostname and never for visitors sending Global Privacy Control.
