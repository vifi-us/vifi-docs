/**
 * `::screenshot[Caption text]` and `::screenshot[Caption]{src="/screenshots/x.png" alt="..."}`
 *
 * A Sätteri mdast plugin (Astro 7's default Markdown processor). Without `src`
 * it renders a clearly labelled placeholder so writers can mark where a
 * screenshot belongs before one exists; with `src` it renders the figure.
 */
const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function figureHtml(caption, attrs) {
  const src = attrs.src;
  const alt = attrs.alt || caption;
  if (src) {
    return `<figure class="shot"><img src="${escape(src)}" alt="${escape(alt)}" loading="lazy" decoding="async"><figcaption>${escape(caption)}</figcaption></figure>`;
  }
  return `<figure class="shot shot--placeholder" role="img" aria-label="Screenshot placeholder: ${escape(caption)}"><div class="shot__frame"><span class="shot__badge">Screenshot coming soon</span><span class="shot__hint">${escape(caption)}</span></div></figure>`;
}

function htmlNode(html, sourceFormat) {
  if (sourceFormat === 'mdx') {
    return {
      type: 'mdxJsxFlowElement',
      name: 'Fragment',
      attributes: [{ type: 'mdxJsxAttribute', name: 'set:html', value: html }],
      children: [],
    };
  }
  return { type: 'html', value: html };
}

export default function screenshotPlugin({ sourceFormat }) {
  return {
    name: 'vifi-screenshot',
    leafDirective(node, ctx) {
      if (node.name !== 'screenshot') return;
      const caption = ctx.textContent(node).trim();
      return htmlNode(figureHtml(caption, node.attributes || {}), sourceFormat);
    },
  };
}
