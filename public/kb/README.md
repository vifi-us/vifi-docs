# Knowledge base pack for the ViFi workspace

Content for ViFi's own ViFi workspace, so the agent that answers ViFi's phone can answer anything the help center and website answer: what ViFi is, how it works, current plans and prices, what it does for each kind of business, integrations, texting limits, security, and support.

Everything here is written for speech: short, self-contained, plain, no menus or button paths. It mirrors docs.vifi.us and vifi.us; when those change, change this.

## What's in the pack

| File | Loads into | Purpose |
|---|---|---|
| `articles.json` | Knowledge Base → Articles | 113 question-and-answer entries. The primary source: the agent gets the top five matches and answers in one or two sentences, so each answer is one to three spoken sentences. |
| `*.md` (nine documents) | Knowledge Base → Documents | Depth behind the articles. Each `##` section is self-contained and under ~1,300 characters because documents are embedded in ~1,500-character chunks. Keep the filename descriptive; it is prefixed to every chunk when embedding. |
| `menu.json` | Menu | The plan catalog with exact prices, so "how much is Growth?" is answered by the menu lookup, not a paraphrase. |
| `urls.txt` | Knowledge Base → URLs | Help-center pages to add as self-refreshing sources for depth. Add after the curated content. With vifi-platform#828 each page also gets articles written from it automatically, so a page whose answers are already in `articles.json` will not produce duplicates (the extractor skips questions that are already answered). |
| `PLAYBOOK.md` | Agent, Settings, Automations | The workspace configuration and the showcase plan. |

## Loading it

Use the loader, which talks to the same API the dashboard uses:

```bash
# from the vifi-docs repo root
VIFI_EMAIL=you@vifi.us VIFI_PASSWORD=... node scripts/kb-push.mjs --tenant ViFi --articles --documents --menu --urls
# or with a token copied from an existing session
VIFI_ACCESS_TOKEN=... node scripts/kb-push.mjs --articles
```

It is idempotent for articles and menu items (matched on question and on name) and skips documents and URLs that already exist. Run `--dry-run` first to see what it would do. Accounts with two-factor authentication enabled must use a token.

## Writing rules

- One question, one answer. Answer first, then one qualifier at most.
- Say numbers the way you would on the phone. Prices as `$49 a month`, rates as `15 cents per minute`.
- Never document a feature as available unless it is live. Say "coming soon" or "not yet" in the answer itself; the agent cannot see pills.
- Web addresses as `vifi.us slash pricing` only when the caller needs to go there; otherwise leave them out.
- Keep the fact in exactly one place. Prices live in `menu.json` and the pricing document; everything else refers to them.
