import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync('src/components/Head.astro', 'utf8')
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function analytics(hostname = 'docs.vifi.us', globalPrivacyControl = false) {
  const scripts = [];
  const listeners = {};
  class Element {
    constructor(href) { this.href = href; this.textContent = 'Open ViFi'; }
    closest() { return this; }
    getAttribute(name) { return name === 'href' ? this.href : null; }
  }
  const context = {
    location: { hostname, href: `https://${hostname}/start-here/`, pathname: '/start-here/' },
    navigator: { globalPrivacyControl }, URL, Element,
    document: {
      createElement: () => ({}),
      getElementsByTagName: () => [{ parentNode: { insertBefore: value => scripts.push(value) } }],
      addEventListener: (name, listener) => { listeners[name] = listener; },
    },
  };
  context.window = context;
  runInNewContext(source, context);
  return { context, scripts, listeners, Element };
}

test('previews and Global Privacy Control do not initialize analytics', () => {
  for (const [host, gpc] of [['localhost', false], ['preview.vifi.us', false], ['docs.vifi.us', true]]) {
    const { scripts, listeners, context } = analytics(host, gpc);
    assert.equal(scripts.length, 0);
    assert.equal(Object.keys(listeners).length, 0);
    assert.equal(context.posthog, undefined);
  }
});

test('external, malformed, and non-HTTPS app links do not emit app events', () => {
  const { context, listeners, Element } = analytics();
  for (const href of [
    'https://app.vifi.us.evil.example/register', 'https://app.vifi.us@evil.example/register',
    'http://app.vifi.us/register', 'https://app.vifi.us:444/register',
    '/start-here/', 'mailto:support@vifi.us', 'https://[',
  ]) listeners.click({ type: 'click', target: new Element(href) });
  assert.equal(context.posthog.length, 0);
});

test('only the registration route counts as a signup conversion', () => {
  const { context, listeners, Element } = analytics();
  for (const href of [
    'https://app.vifi.us/register?source=docs', 'https://app.vifi.us/register/',
    'https://app.vifi.us/register-help', 'https://app.vifi.us/settings',
  ]) listeners.click({ type: 'click', target: new Element(href) });
  assert.deepEqual(Array.from(context.posthog, event => event[1]), [
    'marketing_cta_clicked', 'marketing_cta_clicked',
    'docs_app_link_clicked', 'docs_app_link_clicked',
  ]);
  assert.equal(context.posthog[0][2].page, '/start-here/');
  assert.equal(context.posthog[0][3].transport, 'sendBeacon');
});

test('middle-click counts once and right-click does not count', () => {
  const { context, listeners, Element } = analytics();
  const target = new Element('https://app.vifi.us/register');
  listeners.auxclick({ type: 'auxclick', button: 1, target });
  listeners.auxclick({ type: 'auxclick', button: 2, target });
  assert.equal(context.posthog.length, 1);
});
