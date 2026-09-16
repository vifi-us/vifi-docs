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
const headers = () => ({ Authorization: `Bearer ${token}` });

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
  if (token) return;
  const email = process.env.VIFI_EMAIL, password = process.env.VIFI_PASSWORD;
  if (!email || !password) { console.error("set VIFI_ACCESS_TOKEN, or VIFI_EMAIL and VIFI_PASSWORD"); process.exit(64); }
  const res = await call("POST", "/auth/login", { email, password });
  if (res.mfa_required) { console.error("this account requires two-factor sign-in; copy a session token into VIFI_ACCESS_TOKEN instead"); process.exit(65); }
  token = res.access_token;
  const wanted = opt("--tenant", "");
  if (wanted && Array.isArray(res.tenants)) {
    const t = res.tenants.find((x) => [x.name, x.tenant_name].some((n) => (n || "").toLowerCase() === wanted.toLowerCase()));
    if (!t) { console.error(`no workspace named "${wanted}"; available: ${res.tenants.map((x) => x.name || x.tenant_name).join(", ")}`); process.exit(66); }
    const sw = await call("POST", "/auth/switch-tenant", { tenant_id: t.tenant_id || t.id });
    token = sw.access_token;
    console.log(`workspace: ${t.name || t.tenant_name}`);
  }
}

async function paged(route) {
  // The API caps page size; follow the pagination metadata rather than
  // assuming the requested size was honored.
  const out = [];
  for (let page = 1; page < 500; page++) {
    const res = await call("GET", `${route}${route.includes("?") ? "&" : "?"}page=${page}&per_page=100`);
    if (Array.isArray(res)) return res;
    const rows = res.data || [];
    out.push(...rows);
    const meta = res.pagination || {};
    const totalPages = meta.total_pages ?? (meta.total !== undefined && meta.per_page ? Math.ceil(meta.total / meta.per_page) : undefined);
    if (rows.length === 0) break;
    if (totalPages !== undefined ? page >= totalPages : meta.has_more === false || rows.length < (meta.per_page || rows.length)) break;
  }
  return out;
}

const norm = (s) => (s || "").trim().toLowerCase().replace(/\s+/g, " ");
const summary = { created: 0, updated: 0, unchanged: 0, skipped: 0, failed: 0 };
async function attempt(what, fn) {
  try { await fn(); return true; } catch (err) { summary.failed++; console.error(`failed ${what}: ${err.message || err}`); return false; }
}
const plan = (verb, what) => console.log(`${DRY ? "would " : ""}${verb}: ${what}`);

async function pushArticles() {
  const { articles } = JSON.parse(await readFile(path.join(PACK, "articles.json"), "utf8"));
  const existing = await paged("/tenants/me/knowledge-base");
  const byQ = new Map(existing.map((e) => [norm(e.question), e]));
  for (const a of articles) {
    const cur = byQ.get(norm(a.question));
    if (!cur) {
      plan("create article", a.question);
      if (DRY || await attempt(`create article "${a.question}"`, () => call("POST", "/tenants/me/knowledge-base", { category: a.category, question: a.question, answer: a.answer, is_active: true }))) summary.created++;
    } else if (cur.answer !== a.answer || (cur.category || "") !== a.category || cur.is_active === false) {
      plan("update article", a.question);
      if (DRY || await attempt(`update article "${a.question}"`, () => call("PUT", `/tenants/me/knowledge-base/${cur.id}`, { category: a.category, question: a.question, answer: a.answer, is_active: true }))) summary.updated++;
    } else summary.unchanged++;
  }
}

async function pushDocuments() {
  const files = (await readdir(PACK)).filter((f) => f.endsWith(".md") && !/^(README|PLAYBOOK)\.md$/.test(f));
  const existing = await paged("/tenants/me/knowledge-base/documents");
  const names = new Set(existing.map((d) => norm(d.filename || d.name || d.file_name)));
  for (const f of files) {
    if (names.has(norm(f))) { summary.skipped++; console.log(`exists: ${f}`); continue; }
    plan("upload document", f);
    if (DRY) { summary.created++; continue; }
    const bytes = await readFile(path.join(PACK, f));
    if (await attempt(`upload document ${f}`, () => {
      const form = new FormData();
      form.append("file", new Blob([bytes], { type: "text/markdown" }), f);
      return call("POST", "/tenants/me/knowledge-base/documents", form);
    })) summary.created++;
  }
}

async function pushMenu() {
  const { items } = JSON.parse(await readFile(path.join(PACK, "menu.json"), "utf8"));
  const existing = await paged("/tenants/me/menu");
  const byName = new Map(existing.map((m) => [norm(m.name), m]));
  for (const item of items) {
    const body = { name: item.name, category: item.category, description: item.description, is_available: item.is_available !== false, sort_order: item.sort_order };
    if (item.price !== null && item.price !== undefined) body.price = item.price;
    const cur = byName.get(norm(item.name));
    if (!cur) {
      plan("create menu item", item.name);
      if (DRY || await attempt(`create menu item ${item.name}`, () => call("POST", "/tenants/me/menu", body))) summary.created++;
    } else if ((cur.description || "") !== (item.description || "") || Number(cur.price ?? -1) !== Number(item.price ?? -1) || (cur.category || "") !== (item.category || "")) {
      plan("update menu item", item.name);
      if (DRY || await attempt(`update menu item ${item.name}`, () => call("PUT", `/tenants/me/menu/${cur.id}`, body))) summary.updated++;
    } else summary.unchanged++;
  }
}

async function pushUrls() {
  const lines = (await readFile(path.join(PACK, "urls.txt"), "utf8")).split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const existing = await paged("/tenants/me/knowledge-base/urls");
  const have = new Set(existing.map((u) => norm(u.url)));
  for (const url of lines) {
    if (have.has(norm(url))) { summary.skipped++; continue; }
    plan("add url", url);
    if (DRY || await attempt(`add url ${url}`, () => call("POST", "/tenants/me/knowledge-base/urls", { url }))) summary.created++;
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
