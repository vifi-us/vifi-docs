---
title: Knowledge base
description: Teach your agent what to say with articles, documents, and web pages, and see the questions it couldn't answer.
sidebar:
  order: 7
---

The knowledge base is where your agent's answers come from when the question isn't covered by your profile or hours. Open **Knowledge Base** in the sidebar. It has four tabs.

## Articles: specific answers

Articles are the fastest way to teach the agent. Each one is a question a caller might ask and the answer you want given. You can write them yourself, and ViFi also writes them for you from the documents and web pages you add (see below).

1. Click **Add article**.
2. Pick or type a **category**, such as Hours, Pricing, or Policies. Categories are just for your own organisation.
3. In **What might a caller ask?** write the question in the caller's words.
4. In **How should the agent respond?** write the answer the way you'd say it on the phone.
5. Save. The article is live on the next call.

::screenshot[The Articles tab with a few articles grouped by category]

Good articles answer one question each. "Do you offer financing?" with a two-sentence answer beats a page titled "Everything about payments".

Articles ViFi wrote from one of your files or pages show a **From …** tag with the source's name. They are kept in step with the source: when the page or file changes, ViFi rewrites them. If you edit one, your version is kept from then on, even when the source changes. If you'd rather the agent never said something, delete the article or fix the source.

### Import and export

Have a FAQ in a spreadsheet already? Click **Import** on the Articles tab and upload it as CSV or TSV (a JSON file works too). Use the columns **question**, **answer**, and optionally **category**; a header row is recognized by name, otherwise the first three columns are read in that order. Up to 1,000 articles per file. If a question already exists, you choose whether to keep the existing answer or replace it with the file's.

**Export CSV** downloads every article in the same layout, so a spreadsheet can be where you edit, then import it back.

## Documents: source material

Upload the files you already have and ViFi reads them. Accepted formats:

- PDF, including scans
- Word (.docx), PowerPoint (.pptx), Excel (.xlsx)
- CSV and TSV spreadsheets exported from anywhere
- Plain text, Markdown, RTF, JSON, and HTML
- Photos and images (PNG, JPEG, WebP), such as a photo of your menu board or a scanned price list

Files can be up to 10 MB each. Price lists, FAQs, service menus, policies, onboarding packets, and training slides all work. Older Word, Excel, and PowerPoint formats (.doc, .xls, .ppt) need to be saved as the newer format first.

After upload, the document shows **Processing** while ViFi reads it, then **Indexing** while it breaks the text into sections the agent can search. Once it is **Active**, ViFi reads the whole document one more time and writes articles from it: the prices, hours, policies, and step-by-step answers a caller might ask about. The row shows **Learned 12 answers** when that is done, and the articles appear on the Articles tab with a **From** tag.

Scans and photos are read with OCR. The row shows **Read with OCR** so you know to double-check the learned answers; a straight-on, well-lit photo reads best. Files over 6 MB can't be read with OCR, so split a long scan into parts.

**Needs attention** means the file couldn't be read: it may be password-protected, empty, or a photo too blurry to read. Fix the file and upload it again, or use **Try again** if the problem was temporary.

The agent searches documents two ways. First it looks for a learned article that answers the question directly. If there isn't one, it searches the document text by meaning, so a caller asking "how much is a tune-up" can still find the line in a price list that says "Maintenance visit: $129".

::screenshot[The Documents tab showing an Active document with "Learned 12 answers"]

## URLs: pages on the web

Add a web page, such as your pricing, services, or FAQ page, and ViFi fetches it, indexes it, and writes articles from it just like a document. If a page shows **Fetch failed**, the site blocked ViFi or the address is wrong. **Indexing failed** means the page had no readable text.

To add many pages at once, click **Add a whole site**, enter your website, and ViFi lists the pages it finds (from the site's sitemap when there is one). Tick the ones worth reading and add them in one go; pages you already have are marked.

Pages stay up to date on their own. ViFi re-checks each page about once a day, and pages that never change are checked less often, up to once a week. When a page has changed, its sections are re-indexed and the articles learned from it are rewritten. You can turn auto-refresh off for a page, or use **Check for updates now** after you publish a change.

Each workspace can add up to 50 pages and 200 documents. If you reach the limit, remove a source you no longer need to make room. Adding the same page again doesn't use a new slot.

:::tip
Add the pages that answer real questions: pricing, services, hours, policies, FAQ, and contact. Home pages and blog posts rarely add anything the agent needs.
:::

## Unanswered: what to teach next

Every time the agent looks for an answer and finds nothing, the question lands here. Pick a window from the last 7 to 90 days. Each row shows how many times callers asked something similar.

Click **Convert to article** next to a question, write the answer, and it becomes an article. This is the single most effective habit for improving your agent. See [Knowledge base tips](/best-practices/knowledge-base-tips/).

## Who can edit

Admins and Members can add and edit knowledge base content. Viewers can read it. See [Team and roles](/team-and-account/team-and-roles/).

## Limits during the trial and after it ends

You can build the knowledge base freely during the trial. If the trial ends without a subscription, uploads pause until billing is set up; existing content stays.
