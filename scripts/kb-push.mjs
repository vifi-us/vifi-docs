#!/usr/bin/env node
// Load the knowledge base pack in public/kb/ into a ViFi workspace through the
// same API the dashboard uses. Idempotent: articles are matched on question,
// menu items on name, documents on filename, URLs on address.
//
//   VIFI_EMAIL=... VIFI_PASSWORD=... node scripts/kb-push.mjs --tenant ViFi --articles --documents --menu --urls
//   VIFI_ACCESS_TOKEN=... node scripts/kb-push.mjs --articles --dry-run
//
// Options: --api <base> (default https://app.vifi.us/api) --tenant <name> --dry-run --all

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const PACK = path.resolve(here, "..", "public", "kb");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
if (flag("--help") || flag("-h")) {
  console.log((await readFile(fileURLToPath(import.meta.url), "utf8")).split("\n").slice(1, 10).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exit(0);
}
const API = opt("--api", process.env.VIFI_API || "https://app.vifi.us/api").replace(/\/$/, "");
const DRY = flag("--dry-run");
const ALL = flag("--all");
const want = { articles: ALL || flag("--articles"), documents: ALL || flag("--documents"), menu: ALL || flag("--menu"), urls: ALL || flag("--urls") };
if (!Object.values(want).some(Boolean)) {
  console.error("nothing selected: pass --articles, --documents, --menu, --urls, or --all");
  process.exit(64);
}

let token = process.env.VIFI_ACCESS_TOKEN || "";
const headers = () => token ? { Authorization: `Bearer ${token}` } : {};

async function call(method, route, body, { raw = false } = {}) {
  const init = { method, headers: { ...headers() } };
  if (body instanceof FormData) init.body = body;
  else if (body !== undefined) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(body); }
  const res = await fetch(`${API}${route}`, init);
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${route} → ${res.status}: ${text.slice(0, 300)}`);
  if (raw || !text) return text;
  try { return JSON.parse(text); } catch { return text; }
}

async function login() {
  const wanted = (flag("--tenant") ? opt("--tenant", "") : "ViFi").trim();
  if (!wanted || wanted.startsWith("--")) throw new Error("--tenant needs a workspace name");
  const tokenProvided = Boolean(token);
  if (!tokenProvided) {
    const email = process.env.VIFI_EMAIL, password = process.env.VIFI_PASSWORD;
    if (!email || !password) throw new Error("Set VIFI_ACCESS_TOKEN or VIFI_EMAIL and VIFI_PASSWORD");
    const session = await call("POST", "/auth/login", { email, password });
    if (session.mfa_required) throw new Error("Use VIFI_ACCESS_TOKEN for an account with two-factor sign-in");
    if (!session.access_token) throw new Error("Sign-in did not return an access token");
    token = session.access_token;
  }

  const memberships = await call("GET", "/auth/tenants");
  const matches = memberships.filter((m) => norm(m.name || m.tenant_name) === norm(wanted));
  if (matches.length !== 1) throw new Error(`Expected exactly one membership named "${wanted}"`);
  const id = matches[0].id || matches[0].tenant_id;
  if (!id) throw new Error("Membership is missing its workspace ID");
  if (!tokenProvided) {
    const switched = await call("POST", "/auth/switch-tenant", { tenant_id: id });
    if (!switched.access_token) throw new Error("Workspace selection did not return an access token");
    token = switched.access_token;
  }
  const current = await call("GET", "/tenants/me");
  if (current.id !== id) throw new Error(`The session is not scoped to "${wanted}"`);
  console.log(`Workspace: ${current.name} (${current.id})`);
}

async function paged(route) {
  // The API caps page size; follow the pagination metadata rather than
  // assuming the requested size was honored.
  const out = [];
  for (let page = 1; page < 500; page++) {
    const res = await call("GET", `${route}${route.includes("?") ? "&" : "?"}page=${page}&per_page=100`);
    if (Array.isArray(res)) return res;
    const rows = res.data;
    if (!Array.isArray(rows)) throw new Error(`Unexpected list response from ${route}`);
    out.push(...rows);
    const meta = res.pagination || {};
    const totalPages = meta.total_pages ?? (meta.total !== undefined && meta.per_page ? Math.ceil(meta.total / meta.per_page) : undefined);
    if (rows.length === 0) return out;
    if (totalPages !== undefined ? page >= totalPages : meta.has_more === false || rows.length < (meta.per_page || rows.length)) return out;
  }
  throw new Error(`Pagination limit reached for ${route}`);
}

const norm = (s) => (s || "").trim().toLowerCase().replace(/\s+/g, " ");
const summary = { created: 0, updated: 0, unchanged: 0, skipped: 0, failed: 0 };
async function attempt(what, fn) {
  try { await fn(); return true; } catch (err) { summary.failed++; console.error(`failed ${what}: ${err.message || err}`); return false; }
}
const plan = (verb, what) => console.log(`${DRY ? "would " : ""}${verb}: ${what}`);

async function pushArticles() {
  const { articles } = JSON.parse(await readFile(path.join(PACK, "articles.json"), "utf8"));
  const existing = await paged("/knowledge-base");
  const byQ = new Map(existing.map((e) => [norm(e.question), e]));
  for (const a of articles) {
    const cur = byQ.get(norm(a.question));
    if (!cur) {
      plan("create article", a.question);
      if (DRY || await attempt(`create article "${a.question}"`, () => call("POST", "/knowledge-base", { category: a.category, question: a.question, answer: a.answer, is_active: true }))) summary.created++;
    } else if (cur.answer !== a.answer || (cur.category || "") !== a.category || cur.is_active === false) {
      plan("update article", a.question);
      if (DRY || await attempt(`update article "${a.question}"`, () => call("PUT", `/knowledge-base/${cur.id}`, { category: a.category, question: a.question, answer: a.answer, is_active: true }))) summary.updated++;
    } else summary.unchanged++;
  }
}

async function pushDocuments() {
  const files = (await readdir(PACK)).filter((f) => f.endsWith(".md") && !/^(README|PLAYBOOK)\.md$/.test(f));
  const existing = await paged("/knowledge-base/documents");
  const names = new Set(existing.map((d) => norm(d.filename || d.name || d.file_name)));
  for (const f of files) {
    if (names.has(norm(f))) { summary.skipped++; console.log(`exists: ${f}`); continue; }
    plan("upload document", f);
    if (DRY) { summary.created++; continue; }
    const bytes = await readFile(path.join(PACK, f));
    if (await attempt(`upload document ${f}`, () => {
      const form = new FormData();
      form.append("file", new Blob([bytes], { type: "text/markdown" }), f);
      return call("POST", "/knowledge-base/documents", form);
    })) summary.created++;
  }
}

async function pushMenu() {
  const { items } = JSON.parse(await readFile(path.join(PACK, "menu.json"), "utf8"));
  const existing = await paged("/menu");
  const byName = new Map(existing.map((m) => [norm(m.name), m]));
  for (const item of items) {
    const body = { name: item.name, category: item.category, description: item.description, is_available: item.is_available !== false, sort_order: item.sort_order };
    if (item.price !== null && item.price !== undefined) body.price = item.price;
    const cur = byName.get(norm(item.name));
    if (!cur) {
      plan("create menu item", item.name);
      if (DRY || await attempt(`create menu item ${item.name}`, () => call("POST", "/menu", body))) summary.created++;
    } else if ((cur.description || "") !== (item.description || "") || Number(cur.price ?? -1) !== Number(item.price ?? -1) || (cur.category || "") !== (item.category || "")) {
      plan("update menu item", item.name);
      if (DRY || await attempt(`update menu item ${item.name}`, () => call("PUT", `/menu/${cur.id}`, body))) summary.updated++;
    } else summary.unchanged++;
  }
}

async function pushUrls() {
  const lines = (await readFile(path.join(PACK, "urls.txt"), "utf8")).split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const existing = await paged("/knowledge-base/urls");
  const have = new Set(existing.map((u) => norm(u.url)));
  for (const url of lines) {
    if (have.has(norm(url))) { summary.skipped++; continue; }
    plan("add url", url);
    if (DRY || await attempt(`add url ${url}`, () => call("POST", "/knowledge-base/urls", { url }))) summary.created++;
  }
}

try {
  await login();
  if (want.articles) await pushArticles();
  if (want.documents) await pushDocuments();
  if (want.menu) await pushMenu();
  if (want.urls) await pushUrls();
  console.log(`${DRY ? "dry run " : ""}done: ${summary.created} created, ${summary.updated} updated, ${summary.unchanged} unchanged, ${summary.skipped} skipped, ${summary.failed} failed`);
  if (summary.failed) process.exit(2);
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
