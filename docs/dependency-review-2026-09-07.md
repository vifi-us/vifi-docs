# Dependency and code review — September 7, 2026

The help center's application dependencies were already current when this review
started. The remaining changes update CI, remove obsolete Astro migration code,
and correct analytics attribution. The review covered the custom components,
content schema, screenshot plugin, route middleware, dependency graph, and
workflows. It did not revalidate every product description against production.

## Changes

| Area | Result |
| --- | --- |
| Runtime | CI and `.node-version` use Node 26.8.1; Astro requires at least 22.12.0. |
| GitHub Actions | Checkout 7.0.1, setup-node 7.0.0, Astro action 6.1.2, and deploy-pages 5.0.1; each pinned to its release commit. |
| CI permissions | Build keeps read-only repository access. Only the deployment job receives Pages write and OIDC permissions. Checkout does not retain credentials. |
| Astro | Keep current Astro 7.3.1 and Starlight 0.42.0; raise manifest minimums to the already installed versions. Replace the deprecated `astro:content` Zod export with `astro/zod`. |
| Screenshot processing | Keep Astro 7's Sätteri plugin. Remove the unused Remark plugin and the direct `remark-directive`, `mdast-util-to-string`, and `unist-util-visit` dependencies. Some packages remain required transitively by Starlight. |
| Type checking | Add Astro check 0.9.10 to PR and deployment builds. It requires TypeScript's JavaScript API, supplied by Microsoft's maintained `@typescript/typescript6` 6.0.2 compatibility package; the native TypeScript 7 compiler does not expose that API. |
| Attribution | Require the exact HTTPS application origin. Only `/register` and `/register/` count as signup conversions; other application routes remain `docs_app_link_clicked`. Ignore malformed URLs. |

Release references: [Checkout](https://github.com/actions/checkout/releases/tag/v7.0.1),
[setup-node](https://github.com/actions/setup-node/releases/tag/v7.0.0),
[Astro action](https://github.com/withastro/action/releases/tag/v6.1.2),
[deploy-pages](https://github.com/actions/deploy-pages/releases/tag/v5.0.1).
The current [Astro checker](https://www.npmjs.com/package/@astrojs/check)
declares support for TypeScript 5 and 6.

## Validation

- A fresh `npm ci` succeeds with Node 26.8.1 and npm 11.19.0.
- `npm run check`: 11 files, zero errors, warnings, or hints.
- `npm test`: seven tests pass, covering analytics privacy guards, URL handling,
  signup attribution, middle clicks, and screenshot escaping and rendering.
- `npm run build`: 67 pages and the Pagefind index generated; all internal links
  valid. The build still emits Starlight's notices for the absent optional `i18n`
  collection and custom `404` entry; the default 404 page is generated.
- `npm audit --json`: zero vulnerabilities in the complete dependency graph.
- `npm outdated --json`: `{}`.
- Actionlint and `git diff --check` pass.

## Remaining considerations

No exploitable vulnerability was confirmed in the custom code reviewed here.
This is a static site; there is no application server or credential-handling
backend in this repository.

The existing PostHog script loads asynchronously from the analytics proxy. A
same-tab navigation before the SDK finishes loading can discard queued click
events. This can undercount early click attribution; subsequent application
page views remain available. The remote SDK is not controlled by the npm lock.

Most screenshot directives still show intentional placeholders. Replacing these
with current product screenshots would improve the guides. Production feature
availability and help text still need to be kept in sync with the application.

The changes are prepared for review. No Pages deployment or production change
was performed as part of this review.
