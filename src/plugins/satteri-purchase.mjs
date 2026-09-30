/**
 * `:::purchase` … `:::` (a block) and `:purchase[inline text]` (inside a sentence)
 *
 * Marks content that can lead to buying ViFi: prices, choosing or changing a
 * plan, checkout, promo codes, and links to vifi.us/pricing, app billing pages
 * or sign-up. On the website it renders like any other content. When the Help
 * Center is opened from the ViFi mobile app (`?vifi_client=app`),
 * src/components/AppContext.astro hides everything marked `data-purchase`, so
 * the app never shows a way to buy (App Store 3.1.1 and 3.1.3, Google Play
 * payments policy). Plain status text can stay outside the marker.
 *
 * Marked content is also left out of the Pagefind search index
 * (`data-pagefind-ignore="all"`), so search inside the app never shows a
 * hidden section, its heading, or an excerpt from it. `npm run build` checks
 * the built index (scripts/check-search-index.mjs).
 *
 * A Sätteri mdast plugin, same shape as Starlight's own asides plugin: the
 * directive becomes a node whose `data.hName` picks the HTML element.
 */
export const PURCHASE_DIRECTIVE = 'purchase';

function properties() {
  return { 'data-purchase': 'true', 'data-pagefind-ignore': 'all' };
}

export default function purchasePlugin() {
  return {
    name: 'vifi-purchase',
    containerDirective(node) {
      if (node.name !== PURCHASE_DIRECTIVE) return;
      return {
        type: 'paragraph',
        data: { hName: 'div', hProperties: properties() },
        children: [...node.children],
      };
    },
    textDirective(node) {
      if (node.name !== PURCHASE_DIRECTIVE) return;
      return {
        type: 'emphasis',
        data: { hName: 'span', hProperties: properties() },
        children: [...node.children],
      };
    },
  };
}
