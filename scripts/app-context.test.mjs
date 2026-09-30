// Store-restricted mode (src/components/AppContext.astro): the Help Center
// opened from the ViFi mobile app must never show a way to buy.
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync('src/components/AppContext.astro', 'utf8')
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

// Just enough DOM for the script: elements with attributes, children,
// closest(), and querySelectorAll() for simple selectors and one descendant step.
class Node {
  constructor() { this.parentNode = null; }
}
class Text extends Node {
  constructor(value) { super(); this.nodeValue = value; }
  get textContent() { return this.nodeValue; }
}
class Element extends Node {
  constructor(tag, attrs = {}, children = []) {
    super();
    this.tagName = tag.toUpperCase();
    this.attrs = { ...attrs };
    this.childNodes = [];
    for (const child of children) this.appendChild(typeof child === 'string' ? new Text(child) : child);
  }
  getAttribute(name) { return name in this.attrs ? this.attrs[name] : null; }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  hasAttribute(name) { return name in this.attrs; }
  get firstChild() { return this.childNodes[0] ?? null; }
  get textContent() { return this.childNodes.map((c) => c.textContent).join(''); }
  appendChild(child) {
    if (child.parentNode) child.parentNode.removeChild(child);
    child.parentNode = this;
    this.childNodes.push(child);
    return child;
  }
  removeChild(child) {
    this.childNodes.splice(this.childNodes.indexOf(child), 1);
    child.parentNode = null;
    return child;
  }
  replaceChild(next, old) {
    if (next.parentNode) next.parentNode.removeChild(next);
    this.childNodes[this.childNodes.indexOf(old)] = next;
    next.parentNode = this;
    old.parentNode = null;
    return old;
  }
  *elements() {
    for (const child of this.childNodes) {
      if (child instanceof Element) {
        yield child;
        yield* child.elements();
      }
    }
  }
  matchesCompound(compound) {
    const tag = compound.match(/^[a-z]+/i)?.[0];
    if (tag && this.tagName !== tag.toUpperCase()) return false;
    for (const [, name, op, value] of compound.matchAll(/\[([\w-]+)(?:(\^?=)"([^"]*)")?\]/g)) {
      const actual = this.getAttribute(name);
      if (actual === null) return false;
      if (op === '=' && actual !== value) return false;
      if (op === '^=' && !actual.startsWith(value)) return false;
    }
    return true;
  }
  matches(selector) {
    const parts = selector.trim().split(/\s+/);
    if (!this.matchesCompound(parts.pop())) return false;
    let node = this.parentNode;
    while (parts.length && node instanceof Element) {
      if (node.matchesCompound(parts[parts.length - 1])) parts.pop();
      node = node.parentNode;
    }
    return parts.length === 0;
  }
  closest(selector) {
    for (let node = this; node instanceof Element; node = node.parentNode) {
      if (node.matches(selector)) return node;
    }
    return null;
  }
  querySelectorAll(selector) {
    return [...this.elements()].filter((el) => el.matches(selector));
  }
}

const a = (href, text = 'link', attrs = {}) => new Element('a', { href, ...attrs }, [text]);

function page({
  href = 'https://docs.vifi.us/billing/plans-and-pricing/',
  stored = null,
  storage = 'ok',
  readyState = 'complete',
  body = [],
} = {}) {
  const store = new Map(stored ? [['vifi_client', stored]] : []);
  const url = new URL(href);
  const html = new Element('html', {}, [new Element('body', {}, body)]);
  const listeners = {};
  const context = {
    URL,
    URLSearchParams,
    location: { href: url.href, search: url.search, origin: url.origin },
    document: {
      documentElement: html,
      readyState,
      createElement: (tag) => new Element(tag),
      querySelectorAll: (selector) => html.querySelectorAll(selector),
      addEventListener: (name, listener) => { listeners[name] = listener; },
    },
  };
  if (storage === 'ok') {
    context.sessionStorage = {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => { store.set(key, String(value)); },
    };
  } else {
    // Blocked storage: even reading the property throws, as in Safari with
    // all cookies blocked.
    Object.defineProperty(context, 'sessionStorage', {
      get() { throw new Error('SecurityError'); },
    });
  }
  runInNewContext(source, context);
  return { html, store, listeners, inApp: html.getAttribute('data-vifi-client') === 'app' };
}

const hidden = (el) => el.hasAttribute('data-purchase') && el.hasAttribute('hidden');

test('without the marker nothing changes', () => {
  const link = a('https://app.vifi.us/billing');
  const marketing = a('https://vifi.us/legal/privacy');
  const block = new Element('div', { 'data-purchase': 'true' }, ['$49']);
  const { inApp, store, html } = page({ body: [link, marketing, block] });
  assert.equal(inApp, false);
  assert.equal(store.size, 0);
  assert.equal(link.getAttribute('href'), 'https://app.vifi.us/billing');
  assert.equal(link.hasAttribute('data-purchase'), false);
  assert.equal(marketing.parentNode.tagName, 'BODY');
  assert.equal(block.hasAttribute('hidden'), false);
  assert.equal(html.querySelectorAll('[hidden]').length, 0);
});

test('?vifi_client=app is remembered for the rest of the tab', () => {
  const first = page({ href: 'https://docs.vifi.us/?vifi_client=app' });
  assert.equal(first.inApp, true);
  assert.equal(first.store.get('vifi_client'), 'app');

  const next = page({ href: 'https://docs.vifi.us/billing/free-trial/', stored: 'app' });
  assert.equal(next.inApp, true);
});

test('only the exact value app turns the mode on', () => {
  for (const href of [
    'https://docs.vifi.us/?vifi_client=web',
    'https://docs.vifi.us/?vifi_client=APP',
    'https://docs.vifi.us/?vifi_client=',
    'https://docs.vifi.us/?client=app',
    'https://docs.vifi.us/#vifi_client=app',
  ]) {
    const { inApp, store } = page({ href });
    assert.equal(inApp, false, href);
    assert.equal(store.size, 0, href);
  }
  assert.equal(page({ stored: 'web' }).inApp, false);
});

test('everything marked data-purchase is hidden in the app', () => {
  const table = new Element('div', { 'data-purchase': 'true' }, [new Element('table', {}, ['$49'])]);
  const inline = new Element('span', { 'data-purchase': 'true' }, [a('https://app.vifi.us/register')]);
  const { inApp } = page({ stored: 'app', body: [table, inline] });
  assert.equal(inApp, true);
  assert.ok(hidden(table));
  assert.ok(hidden(inline));
});

test('links that lead to buying are hidden even when a page forgot to mark them', () => {
  const purchase = [
    'https://app.vifi.us/billing',
    'https://app.vifi.us/billing/',
    'https://app.vifi.us/settings/billing?tab=invoices',
    'https://app.vifi.us/register?source=docs',
    'https://app.vifi.us/register/',
    'https://app.vifi.us/onboarding',
    'http://app.vifi.us/billing',
    'https://vifi.us/pricing',
    'https://www.vifi.us/pricing/#plans',
  ].map((href) => a(href));
  page({ stored: 'app', body: purchase });
  for (const link of purchase) assert.ok(hidden(link), link.getAttribute('href'));
});

test('links into the web app carry the marker, before any #hash', () => {
  const home = a('https://app.vifi.us');
  const team = a('https://app.vifi.us/team#pending');
  const calls = a('https://app.vifi.us/calls?filter=missed');
  const marked = a('https://app.vifi.us/?vifi_client=app');
  const lookalike = a('https://app.vifi.us.evil.example/billing');
  page({ stored: 'app', body: [home, team, calls, marked, lookalike] });
  assert.equal(home.getAttribute('href'), 'https://app.vifi.us/?vifi_client=app');
  assert.equal(team.getAttribute('href'), 'https://app.vifi.us/team?vifi_client=app#pending');
  assert.equal(calls.getAttribute('href'), 'https://app.vifi.us/calls?filter=missed&vifi_client=app');
  assert.equal(marked.getAttribute('href'), 'https://app.vifi.us/?vifi_client=app');
  assert.equal(lookalike.getAttribute('href'), 'https://app.vifi.us.evil.example/billing');
  for (const link of [home, team, calls, marked, lookalike]) assert.equal(hidden(link), false);
});

test('links to the marketing site become plain text', () => {
  const privacy = a('https://vifi.us/legal/privacy', 'Privacy Policy');
  const terms = a('https://www.vifi.us/legal/terms', 'Terms of Service');
  const paragraph = new Element('p', {}, ['The ', privacy, ' and ', terms, ' are the binding documents.']);
  page({ stored: 'app', body: [paragraph] });
  assert.equal(paragraph.querySelectorAll('a').length, 0);
  assert.equal(paragraph.textContent, 'The Privacy Policy and Terms of Service are the binding documents.');
});

test('other links are left alone', () => {
  const links = [
    a('/billing/change-or-cancel/'),
    a('#choosing-a-plan-elsewhere'),
    a('mailto:support@vifi.us'),
    a('tel:+15555550100'),
    a('https://github.com/vifi-us/vifi-docs/edit/main/src/content/docs/index.mdx'),
    a('https://['),
  ];
  const before = links.map((link) => link.getAttribute('href'));
  page({ stored: 'app', body: links });
  assert.deepEqual(links.map((link) => link.getAttribute('href')), before);
  for (const link of links) assert.equal(hidden(link), false);
});

test('"On this page" entries for hidden headings are hidden too', () => {
  const heading = new Element('h2', { id: 'choosing-a-plan' }, ['Choosing a plan']);
  const anchor = a('#choosing-a-plan', 'Choosing a plan');
  const section = new Element('div', { 'data-purchase': 'true' }, [heading, anchor]);
  const tocHidden = new Element('li', {}, [a('#choosing-a-plan', 'Choosing a plan')]);
  const tocVisible = new Element('li', {}, [a('#no-contracts', 'No contracts')]);
  const toc = new Element('nav', {}, [new Element('ul', {}, [tocHidden, tocVisible])]);
  page({ stored: 'app', body: [section, new Element('h2', { id: 'no-contracts' }), toc] });
  assert.ok(hidden(tocHidden));
  assert.equal(hidden(tocVisible), false);
});

test('blocked storage: the marker rides on links within the Help Center instead', () => {
  const internal = a('/billing/free-trial/');
  const withHash = a('/start-here/mobile-app/#billing');
  const app = a('https://app.vifi.us/');
  const { inApp } = page({
    href: 'https://docs.vifi.us/?vifi_client=app',
    storage: 'blocked',
    body: [internal, withHash, app],
  });
  assert.equal(inApp, true);
  assert.equal(internal.getAttribute('href'), 'https://docs.vifi.us/billing/free-trial/?vifi_client=app');
  assert.equal(withHash.getAttribute('href'), 'https://docs.vifi.us/start-here/mobile-app/?vifi_client=app#billing');
  assert.equal(app.getAttribute('href'), 'https://app.vifi.us/?vifi_client=app');
});

test('blocked storage without the marker in the address stays off', () => {
  const link = a('https://app.vifi.us/billing');
  const { inApp } = page({ storage: 'blocked', body: [link] });
  assert.equal(inApp, false);
  assert.equal(link.hasAttribute('data-purchase'), false);
});

test('links within the Help Center stay clean while storage works', () => {
  const internal = a('/billing/free-trial/');
  page({ stored: 'app', body: [internal] });
  assert.equal(internal.getAttribute('href'), '/billing/free-trial/');
});

test('the mode is set before the body is parsed; links are handled once it is', () => {
  const link = a('https://app.vifi.us/billing');
  const { inApp, listeners } = page({ stored: 'app', readyState: 'loading', body: [link] });
  assert.equal(inApp, true);
  assert.equal(hidden(link), false);
  listeners.DOMContentLoaded();
  assert.ok(hidden(link));
});

test('the page wiring and the CSS rule are in place', () => {
  const head = readFileSync('src/components/Head.astro', 'utf8');
  assert.match(head, /import AppContext from '\.\/AppContext\.astro';/);
  assert.match(head, /<AppContext \/>/);
  const css = readFileSync('src/styles/theme.css', 'utf8');
  assert.match(css, /:root\[data-vifi-client='app'\] \[data-purchase\] \{\s*display: none !important;\s*\}/);
});
