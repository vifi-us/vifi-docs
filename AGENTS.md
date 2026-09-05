# AGENTS.md — ViFi Help Center (Astro Starlight + GitHub Pages)

Read this before changing anything. This repository is the public, customer-facing help site at https://docs.vifi.us. It is intentionally separate from the application (`vifi-platform`, private) and the marketing site (`vifi-site`).

## Mission

Keep the help center accurate, plainly written, and easy to navigate for business owners with no technical background. Every page must describe the product as it is today.

## Non-negotiables

- Content is Markdown in `src/content/docs/`. Don't move pages to MDX unless a component is genuinely required.
- Follow the writing rules in `README.md`. Second person, plain English, task-shaped headings, no marketing words, no emojis.
- Never document a feature as available unless it is live in production. Use `status: beta` or `status: coming-soon` frontmatter, or leave it out.
- Internal links are absolute with a trailing slash (`/your-agent/transfers/`). The build fails on broken links; run `npm run build` before opening a PR.
- Don't add client-side JavaScript beyond what Starlight ships and the two small scripts in `src/components/` (feedback widget, PostHog).
- Don't add external services. Search is Pagefind; analytics is the existing PostHog project.
- Keep `public/CNAME` as `docs.vifi.us`.

## Where to change what

| Change | File |
|---|---|
| Add or edit a page | `src/content/docs/<section>/<slug>.md` |
| Section labels, order, collapse | `astro.config.mjs` → `sidebar` |
| Status pill / sidebar badge | Page frontmatter `status`; rendering in `src/components/PageTitle.astro` and `src/route-middleware.ts` |
| Screenshot placeholder syntax | `src/plugins/satteri-screenshot.mjs` |
| Colors, fonts, pill and figure styles | `src/styles/theme.css` |
| `<head>` extras, analytics | `src/components/Head.astro` |
| "Was this page helpful?" | `src/components/Footer.astro` |
| Deploy | `.github/workflows/deploy.yml`; PR builds in `check.yml` |

## When the product changes

1. Update the affected page so UI labels match the app exactly.
2. Add a line to `src/content/docs/whats-new.md` if a customer can see the change.
3. Update `src/content/docs/reference/feature-status.md` if a status changed.
4. Remove `coming-soon` pills from features that shipped.

## Source of truth for product behavior

The app itself (`vifi-platform/web/src`, the dashboard UI strings) and its `docs/` folder. When this site and the app disagree, the app is right; fix the page.
