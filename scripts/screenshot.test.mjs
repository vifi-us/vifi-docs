import assert from 'node:assert/strict';
import { test } from 'node:test';
import screenshotPlugin from '../src/plugins/satteri-screenshot.mjs';

function screenshot(sourceFormat, caption, attributes = {}) {
  return screenshotPlugin({ sourceFormat }).leafDirective(
    { name: 'screenshot', attributes }, { textContent: () => caption },
  );
}

test('Markdown screenshots escape captions and attributes', () => {
  const node = screenshot('md', '<script>alert(1)</script>', {
    src: '/screenshots/example.png" onerror="alert(1)', alt: '<unsafe> & "quoted"',
  });
  assert.equal(node.type, 'html');
  assert.ok(node.value.includes('src="/screenshots/example.png&quot; onerror=&quot;alert(1)"'));
  assert.ok(node.value.includes('alt="&lt;unsafe&gt; &amp; &quot;quoted&quot;"'));
  assert.ok(node.value.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(!node.value.includes('<script>'));
});

test('a screenshot without an image remains an accessible placeholder', () => {
  const node = screenshot('md', '  Setup Guide  ');
  assert.ok(node.value.includes('role="img"'));
  assert.ok(node.value.includes('aria-label="Screenshot placeholder: Setup Guide"'));
  assert.ok(node.value.includes('Screenshot coming soon'));
  assert.ok(!node.value.includes('<img'));
});

test('MDX screenshots preserve the same escaped output', () => {
  const markdown = screenshot('md', 'Menu & prices', { src: '/screenshots/menu.png' });
  const mdx = screenshot('mdx', 'Menu & prices', { src: '/screenshots/menu.png' });
  assert.equal(mdx.type, 'mdxJsxFlowElement');
  assert.deepEqual(mdx.attributes, [{ type: 'mdxJsxAttribute', name: 'set:html', value: markdown.value }]);
});
