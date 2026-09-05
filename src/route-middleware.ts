import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getCollection } from 'astro:content';

type Status = 'beta' | 'coming-soon';

const BADGES: Record<Status, { text: string; variant: 'caution' | 'note' }> = {
	beta: { text: 'Beta', variant: 'caution' },
	'coming-soon': { text: 'Soon', variant: 'note' },
};

let statusByHref: Map<string, Status> | undefined;

async function loadStatuses(base: string) {
	if (statusByHref) return statusByHref;
	statusByHref = new Map();
	for (const entry of await getCollection('docs')) {
		const status = (entry.data as { status?: Status }).status;
		if (!status) continue;
		const slug = entry.id === 'index' ? '' : entry.id;
		statusByHref.set(`${base}/${slug}`.replace(/\/+$/, ''), status);
	}
	return statusByHref;
}

function normalize(href: string) {
	return href.replace(/\/+$/, '');
}

type SidebarEntry = {
	type: 'link' | 'group';
	href?: string;
	badge?: { text: string; variant: string };
	entries?: SidebarEntry[];
};

function decorate(entries: SidebarEntry[], statuses: Map<string, Status>) {
	for (const entry of entries) {
		if (entry.type === 'group' && entry.entries) {
			decorate(entry.entries, statuses);
		} else if (entry.type === 'link' && entry.href && !entry.badge) {
			const status = statuses.get(normalize(entry.href));
			if (status) entry.badge = BADGES[status];
		}
	}
}

/**
 * Sidebar badges derived from each page's `status` frontmatter, so a page only
 * has to declare its status once.
 */
export const onRequest = defineRouteMiddleware(async (context) => {
	const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
	const statuses = await loadStatuses(base);
	decorate(context.locals.starlightRoute.sidebar as SidebarEntry[], statuses);
});
