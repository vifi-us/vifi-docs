import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * `::screenshot[Caption text]{src="/screenshots/foo.png" alt="..."}`
 *
 * Renders a figure. Without `src`, renders a clearly labelled placeholder so
 * writers can mark where a screenshot belongs before one exists.
 */
export default function remarkScreenshot() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === null) return;
      if (node.type !== 'leafDirective' && node.type !== 'containerDirective') return;
      if (node.name !== 'screenshot') return;
      const caption = toString(node).trim();
      const attrs = node.attributes || {};
      const src = attrs.src;
      const alt = attrs.alt || caption;
      const html = src
        ? `<figure class="shot"><img src="${escape(src)}" alt="${escape(alt)}" loading="lazy" decoding="async"><figcaption>${escape(caption)}</figcaption></figure>`
        : `<figure class="shot shot--placeholder" role="img" aria-label="Screenshot placeholder: ${escape(caption)}"><div class="shot__frame"><span class="shot__badge">Screenshot coming soon</span><span class="shot__hint">${escape(caption)}</span></div><figcaption>${escape(caption)}</figcaption></figure>`;
      parent.children[index] = { type: 'html', value: html };
    });
  };
}
