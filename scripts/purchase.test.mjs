// The `:::purchase` / `:purchase[...]` directive, and a check over every page
// that anything leading to a purchase is marked with it. Pages opened from the
// ViFi mobile app hide marked content (src/components/AppContext.astro).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import purchasePlugin from '../src/plugins/satteri-purchase.mjs';

const plugin = purchasePlugin();

test('a :::purchase block renders as a div marked data-purchase', () => {
  const children = [{ type: 'paragraph', children: [{ type: 'text', value: '$49 a month' }] }];
  const node = plugin.containerDirective({ type: 'containerDirective', name: 'purchase', attributes: {}, children });
  assert.equal(node.type, 'paragraph');
  assert.deepEqual(node.data, { hName: 'div', hProperties: { 'data-purchase': 'true', 'data-pagefind-ignore': 'all' } });
  assert.deepEqual(node.children, children);
});

test('an inline :purchase[...] renders as a span marked data-purchase', () => {
  const children = [{ type: 'link', url: 'https://app.vifi.us/register', children: [{ type: 'text', value: 'sign up' }] }];
  const node = plugin.textDirective({ type: 'textDirective', name: 'purchase', attributes: {}, children });
  assert.deepEqual(node.data, { hName: 'span', hProperties: { 'data-purchase': 'true', 'data-pagefind-ignore': 'all' } });
  assert.deepEqual(node.children, children);
});

test('purchase content is always kept out of the search index, whatever its attributes', () => {
  // Search inside the app would otherwise show hidden sections ("Upgrading",
  // "Promo codes") and their excerpts. scripts/check-search-index.mjs checks the build.
  for (const attributes of [undefined, {}, { search: 'on' }, { search: 'off' }]) {
    const block = plugin.containerDirective({ type: 'containerDirective', name: 'purchase', attributes, children: [] });
    assert.equal(block.data.hProperties['data-pagefind-ignore'], 'all');
    const inline = plugin.textDirective({ type: 'textDirective', name: 'purchase', attributes, children: [] });
    assert.equal(inline.data.hProperties['data-pagefind-ignore'], 'all');
  }
});

test('other directives are left for Starlight', () => {
  for (const name of ['note', 'tip', 'caution', 'danger', 'purchases', 'screenshot']) {
    assert.equal(plugin.containerDirective({ type: 'containerDirective', name, children: [] }), undefined);
    assert.equal(plugin.textDirective({ type: 'textDirective', name, children: [] }), undefined);
  }
});

// ── Content check ──────────────────────────────────────────────────────────

const DOCS = 'src/content/docs';

function pages(dir = DOCS) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return pages(path);
    return /\.mdx?$/.test(entry.name) ? [path] : [];
  });
}

// Same destinations the in-app script hides (AppContext.astro).
function isPurchaseLink(href) {
  let url;
  try {
    url = new URL(href, 'https://docs.vifi.us/');
  } catch {
    return false;
  }
  if (url.hostname === 'app.vifi.us') return /^\/(billing|settings\/billing|register|onboarding)(\/|$)/.test(url.pathname);
  if (url.hostname === 'vifi.us' || url.hostname === 'www.vifi.us') return /^\/pricing(\/|$)/.test(url.pathname);
  return false;
}

// Words that only appear when telling someone how to buy or change a plan:
// choosing a plan (the web app's button is "Choose plan"), upgrading, checkout,
// promo codes, and "subscribe" as an instruction ("Subscribe so...", "or
// subscribe"). Status text with "you" as the subject stays allowed ("Transfers
// switch on once you subscribe"), as do "subscribed" and "subscription".
const PURCHASE_WORDS =
  /\b(choose|chooses|choosing|pick|picking|select|selecting) (a |an |your |the |another )?(new |paid |different )?plans?\b|upgrad|checkout|promo(tion)? codes?|(?<!\byou (already )?)\bsubscribe\b/i;
// A table row with a dollar amount is a price table.
const PRICE_ROW = /^\s*\|.*\$\s?\d/;

/**
 * Splits a page into lines, each with the text that is outside purchase markup:
 * lines inside a `:::purchase` block are blank, and `:purchase[...]` spans are cut out.
 * Frontmatter is skipped (it never renders as page text).
 */
function unmarkedLines(source) {
  const lines = source.split('\n');
  const out = [];
  const stack = [];
  let i = 0;
  if (lines[0] === '---') {
    i = lines.indexOf('---', 1) + 1;
  }
  for (; i < lines.length; i++) {
    const line = lines[i];
    const open = line.match(/^\s*(:{3,})([a-z][\w-]*)/);
    const close = line.match(/^\s*(:{3,})\s*$/);
    if (open) {
      stack.push({ fence: open[1].length, purchase: open[2] === 'purchase' });
      out.push({ number: i + 1, text: stack.some((s) => s.purchase) ? '' : line });
      continue;
    }
    if (close) {
      const at = stack.findLastIndex((s) => s.fence === close[1].length);
      if (at !== -1) stack.splice(at);
      out.push({ number: i + 1, text: '' });
      continue;
    }
    out.push({ number: i + 1, text: stack.some((s) => s.purchase) ? '' : stripInline(line) });
  }
  return out;
}

function stripInline(line) {
  let result = '';
  let rest = line;
  for (let start = rest.indexOf(':purchase['); start !== -1; start = rest.indexOf(':purchase[')) {
    result += rest.slice(0, start);
    let depth = 0;
    let end = start + ':purchase'.length;
    for (; end < rest.length; end++) {
      if (rest[end] === '[') depth++;
      if (rest[end] === ']' && --depth === 0) break;
    }
    rest = rest.slice(end + 1).replace(/^\{[^}]*\}/, '');
  }
  return result + rest;
}

function links(text) {
  return [
    ...[...text.matchAll(/\]\(\s*<?([^)\s>]+)/g)].map((m) => m[1]),
    ...[...text.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
    ...[...text.matchAll(/<(https?:\/\/[^>\s]+)>/g)].map((m) => m[1]),
  ];
}

test('the content check understands blocks, inline spans, and nesting', () => {
  const sample = [
    '---',
    'description: Upgrade instantly.',
    '---',
    'Open **Billing**.',
    ':::purchase',
    '## Choosing a plan',
    '::::note',
    'Upgrade now at [pricing](https://vifi.us/pricing).',
    '::::',
    '| Plan | $49 |',
    ':::',
    'Go:purchase[ to [sign-up](https://app.vifi.us/register)]{search="off"} today.',
    'Still [billing](https://app.vifi.us/billing).',
  ].join('\n');
  const visible = unmarkedLines(sample).map((l) => l.text).filter(Boolean);
  assert.deepEqual(visible, ['Open **Billing**.', 'Go today.', 'Still [billing](https://app.vifi.us/billing).']);
  assert.deepEqual(links(visible.join('\n')), ['https://app.vifi.us/billing']);
  assert.ok(isPurchaseLink('https://app.vifi.us/billing'));
  assert.ok(isPurchaseLink('https://www.vifi.us/pricing/'));
  assert.ok(!isPurchaseLink('https://app.vifi.us/'));
  assert.ok(!isPurchaseLink('https://vifi.us/legal/privacy'));
  assert.ok(!isPurchaseLink('/billing/plans-and-pricing/'));
});

test('the purchase words catch instructions to buy, not status text', () => {
  const instructions = [
    '- [ ] Subscribe so your number keeps answering after the trial.',
    'Subscribe from **Billing** and everything resumes within a minute.',
    'Test from an approved phone, or subscribe.',
    'add policies, review the knowledge base, and connect your tools, then subscribe.',
    'Click Billing to subscribe.',
    'On the home page, click **Choose plan**.',
    '1. Open **Billing** and choose a plan.',
    'Pick a new plan.',
    '## Upgrading',
    'Enter a promotion code at checkout.',
  ];
  for (const text of instructions) assert.match(text, PURCHASE_WORDS, text);
  const status = [
    'Transfers switch on once you subscribe.',
    'Both switch on the moment you subscribe.',
    "If you've already subscribed, the email confirms the activation date instead.",
    '## If the trial ends without a subscription',
    "The ViFi mobile app doesn't cancel subscriptions.",
    'Unsubscribe from these emails at the bottom of any message.',
    'The trial starts when you pick a phone number.',
    'The plans differ in included usage.',
  ];
  for (const text of status) assert.doesNotMatch(text, PURCHASE_WORDS, text);
});

test('every page marks what can lead to a purchase', () => {
  const problems = [];
  for (const path of pages()) {
    const name = relative(DOCS, path);
    for (const { number, text } of unmarkedLines(readFileSync(path, 'utf8'))) {
      if (!text) continue;
      for (const href of links(text)) {
        if (isPurchaseLink(href)) problems.push(`${name}:${number} links to ${href}`);
      }
      if (PRICE_ROW.test(text)) problems.push(`${name}:${number} is a price table row`);
      const word = text.match(PURCHASE_WORDS);
      if (word) problems.push(`${name}:${number} says "${word[0]}"`);
    }
  }
  assert.deepEqual(problems, [], 'Wrap these in :::purchase or :purchase[...] (see README "Content that leads to a purchase").');
});

test('a closing ::: never directly follows a table row', () => {
  // Markdown treats a line right after a table row as another row, so the
  // fence would render as a table cell and the block would never close.
  const problems = [];
  for (const path of pages()) {
    const lines = readFileSync(path, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (i > 0 && /^\s*:{3,}\s*$/.test(line) && /^\s*\|/.test(lines[i - 1])) {
        problems.push(`${relative(DOCS, path)}:${i + 1}`);
      }
    });
  }
  assert.deepEqual(problems, [], 'Leave a blank line between a table and the closing :::.');
});

test('the pages the spec names are marked', () => {
  const plans = readFileSync(join(DOCS, 'billing/plans-and-pricing.md'), 'utf8');
  assert.match(plans, /:::purchase\nCurrent prices are on \[vifi\.us\/pricing\][\s\S]*?\| Extra text segments [^\n]*\n\n:::\n/);
  assert.match(plans, /:::purchase\n## Choosing a plan\n/);
  const change = readFileSync(join(DOCS, 'billing/change-or-cancel.md'), 'utf8');
  assert.match(change, /:::purchase\n## Upgrading\n[\s\S]*## Downgrading\n[\s\S]*?\n:::\n/);
});
