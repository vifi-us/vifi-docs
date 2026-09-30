// Checks the built search index: nothing marked as purchase content
// (`:::purchase` / `:purchase[...]`, src/plugins/satteri-purchase.mjs) may be
// searchable, because the mobile app hides that content and search would show
// it again. Runs after `astro build` (see the `build` script in package.json).
//
//   node scripts/check-search-index.mjs [dist]
//
// Two checks:
// - every element the build marked `data-purchase` also carries
//   `data-pagefind-ignore="all"`;
// - no heading (or other anchor) in a Pagefind fragment sits inside purchase
//   content on its page, so search never offers "Choosing a plan" as a result.
// Unit tests: scripts/search-index.test.mjs.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title']);
const TAG = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;

function attribute(attributes, name) {
  const match = attributes.match(new RegExp(`(?:^|\\s)${name}(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+)))?(?=\\s|/|$)`));
  if (!match) return undefined;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

/**
 * Walks built HTML and returns the ids of elements inside purchase content, and
 * the opening tags of purchase elements that search would still index.
 */
export function scanPurchase(html) {
  const ids = [];
  const searchable = [];
  let count = 0;
  const stack = [];
  let depth = 0;
  const lower = html.toLowerCase();
  TAG.lastIndex = 0;
  for (let match = TAG.exec(html); match; match = TAG.exec(html)) {
    if (!match[2]) continue; // a comment
    const name = match[2].toLowerCase();
    if (match[1]) {
      const at = stack.findLastIndex((element) => element.name === name);
      if (at !== -1) for (const element of stack.splice(at)) if (element.purchase) depth--;
      continue;
    }
    const attributes = match[3];
    const purchase = attribute(attributes, 'data-purchase') !== undefined;
    if (purchase) {
      count++;
      if (attribute(attributes, 'data-pagefind-ignore') !== 'all') searchable.push(`<${name}${attributes}>`);
    }
    const id = attribute(attributes, 'id');
    if (id && (purchase || depth > 0)) ids.push(id);
    if (RAW_TEXT_ELEMENTS.has(name)) {
      const end = lower.indexOf(`</${name}`, TAG.lastIndex);
      if (end === -1) break;
      TAG.lastIndex = end;
      continue;
    }
    if (VOID_ELEMENTS.has(name) || /\/\s*$/.test(attributes)) continue;
    stack.push({ name, purchase });
    if (purchase) depth++;
  }
  return { ids, searchable, count };
}

/** Reads a Pagefind `.pf_fragment` file: gzip, then `pagefind_dcd` and JSON. */
export function readFragment(buffer) {
  const text = gunzipSync(buffer).toString('utf8');
  return JSON.parse(text.slice(text.indexOf('{')));
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

function pageFile(dist, url) {
  const path = decodeURIComponent(new URL(url, 'https://docs.vifi.us/').pathname);
  return join(dist, path.endsWith('/') ? join(path, 'index.html') : path);
}

/** Returns a list of problems; empty when the index is clean. */
export function checkSearchIndex(dist) {
  const fragments = join(dist, 'pagefind', 'fragment');
  if (!existsSync(fragments)) return [`${fragments} is missing. Run astro build first.`];

  const problems = [];
  const pages = new Map();
  let marked = 0;
  for (const file of htmlFiles(dist)) {
    const scan = scanPurchase(readFileSync(file, 'utf8'));
    pages.set(file, scan);
    marked += scan.count;
    for (const tag of scan.searchable) problems.push(`${relative(dist, file)}: purchase content is searchable: ${tag}`);
  }
  if (marked === 0) problems.push('No purchase content found in the build. The billing pages should have some; is the check still reading the right markup?');

  const names = readdirSync(fragments).filter((name) => name.endsWith('.pf_fragment'));
  if (names.length === 0) problems.push(`${fragments} has no fragments.`);
  for (const name of names) {
    const fragment = readFragment(readFileSync(join(fragments, name)));
    const scan = pages.get(pageFile(dist, fragment.url));
    if (!scan) {
      problems.push(`${name}: no built page for ${fragment.url}`);
      continue;
    }
    const hidden = new Set(scan.ids);
    for (const anchor of fragment.anchors ?? []) {
      if (hidden.has(anchor.id)) {
        problems.push(`${fragment.url}#${anchor.id} ("${anchor.text}") is in the search index but sits inside purchase content`);
      }
    }
  }
  return problems;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dist = resolve(process.argv[2] ?? 'dist');
  const problems = checkSearchIndex(dist);
  if (problems.length > 0) {
    console.error('Purchase content reached the search index:');
    for (const problem of problems) console.error(`  ${problem}`);
    console.error('Purchase content must carry data-pagefind-ignore="all" (src/plugins/satteri-purchase.mjs).');
    process.exit(1);
  }
  console.log('Search index: no purchase content.');
}
