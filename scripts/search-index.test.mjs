// The post-build search index check (scripts/check-search-index.mjs), run
// against a tiny fake build.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { gzipSync } from 'node:zlib';
import { checkSearchIndex, readFragment, scanPurchase } from './check-search-index.mjs';

const PAGE = `<!doctype html><html><head><title>Plans</title>
<script>document.querySelectorAll('[data-purchase] [id]'); if (a < b) {}</script></head>
<body><main data-pagefind-body>
<h1 id="_top">Plans</h1>
<div class="sl-heading-wrapper level-h2"><h2 id="whats-included">What's included</h2></div>
<p>Status text.<br><span data-purchase="true" data-pagefind-ignore="all"> Subscribe <a href="/x/" id="inline-link">here</a></span></p>
<div data-purchase="true" data-pagefind-ignore="all">
<div class="sl-heading-wrapper level-h2"><h2 id="choosing-a-plan">Choosing a plan</h2></div>
<aside><p id="nested">Estimate your calls.</p></aside>
<img src="a.png" alt=""><svg><path d="M0 0"/></svg>
</div>
<div class="sl-heading-wrapper level-h2"><h2 id="no-contracts">No contracts</h2></div>
</main></body></html>`;

function fragment(url, anchors) {
  const json = JSON.stringify({ url, content: '', word_count: 0, filters: {}, meta: {}, anchors });
  return gzipSync(Buffer.from(`pagefind_dcd${json}`));
}

function fakeBuild(html, anchors) {
  const dist = mkdtempSync(join(tmpdir(), 'vifi-docs-index-'));
  mkdirSync(join(dist, 'billing', 'plans'), { recursive: true });
  mkdirSync(join(dist, 'pagefind', 'fragment'), { recursive: true });
  writeFileSync(join(dist, 'billing', 'plans', 'index.html'), html);
  writeFileSync(join(dist, 'pagefind', 'fragment', 'en_1.pf_fragment'), fragment('/billing/plans/', anchors));
  return dist;
}

const anchor = (id, text) => ({ element: 'h2', id, text, location: 0 });

test('scanPurchase finds ids inside purchase content, including nested and inline ones', () => {
  const { ids, searchable, count } = scanPurchase(PAGE);
  assert.deepEqual(ids, ['inline-link', 'choosing-a-plan', 'nested']);
  assert.deepEqual(searchable, []);
  assert.equal(count, 2);
});

test('scanPurchase reports purchase elements that search would still index', () => {
  const html = '<div data-purchase="true"><h2 id="a">A</h2></div><span data-purchase data-pagefind-ignore>b</span>';
  const { ids, searchable } = scanPurchase(html);
  assert.deepEqual(ids, ['a']);
  assert.deepEqual(searchable, ['<div data-purchase="true">', '<span data-purchase data-pagefind-ignore>']);
});

test('readFragment reads a Pagefind fragment', () => {
  assert.equal(readFragment(fragment('/a/', [])).url, '/a/');
});

test('a clean build passes', (t) => {
  const dist = fakeBuild(PAGE, [anchor('_top', 'Plans'), anchor('whats-included', "What's included"), anchor('no-contracts', 'No contracts')]);
  t.after(() => rmSync(dist, { recursive: true, force: true }));
  assert.deepEqual(checkSearchIndex(dist), []);
});

test('a purchase heading in the index fails', (t) => {
  const dist = fakeBuild(PAGE, [anchor('_top', 'Plans'), anchor('choosing-a-plan', 'Choosing a plan')]);
  t.after(() => rmSync(dist, { recursive: true, force: true }));
  assert.deepEqual(checkSearchIndex(dist), [
    '/billing/plans/#choosing-a-plan ("Choosing a plan") is in the search index but sits inside purchase content',
  ]);
});

test('purchase content without data-pagefind-ignore fails', (t) => {
  const dist = fakeBuild(PAGE.replace('<div data-purchase="true" data-pagefind-ignore="all">', '<div data-purchase="true">'), []);
  t.after(() => rmSync(dist, { recursive: true, force: true }));
  assert.deepEqual(checkSearchIndex(dist), ['billing/plans/index.html: purchase content is searchable: <div data-purchase="true">']);
});

test('a build with no purchase content or no index fails', (t) => {
  const dist = fakeBuild('<main><h1 id="_top">Hi</h1></main>', []);
  t.after(() => rmSync(dist, { recursive: true, force: true }));
  assert.match(checkSearchIndex(dist).join('\n'), /No purchase content found/);
  rmSync(join(dist, 'pagefind'), { recursive: true });
  assert.match(checkSearchIndex(dist).join('\n'), /is missing/);
});
