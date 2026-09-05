// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightLinksValidator from 'starlight-links-validator';
import screenshotPlugin from './src/plugins/satteri-screenshot.mjs';

const SITE = 'https://docs.vifi.us';

export default defineConfig({
	site: SITE,
	output: 'static',
	trailingSlash: 'always',
	markdown: {
		// Astro 7's default Markdown engine plus our `::screenshot[...]` directive.
		processor: satteri({ features: { directive: true }, mdastPlugins: [screenshotPlugin] }),
	},
	integrations: [
		starlight({
			title: 'ViFi Help Center',
			description:
				'Plain-English guides to setting up and running ViFi, the AI phone assistant that answers your business calls.',
			logo: { src: './src/assets/logo.svg', alt: '' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			components: {
				Head: './src/components/Head.astro',
				PageTitle: './src/components/PageTitle.astro',
				Footer: './src/components/Footer.astro',
			},
			routeMiddleware: './src/route-middleware.ts',
			editLink: { baseUrl: 'https://github.com/vifi-us/vifi-docs/edit/main/' },
			lastUpdated: true,
			credits: false,
			social: [
				{ icon: 'external', label: 'Open ViFi', href: 'https://app.vifi.us' },
				{ icon: 'email', label: 'Email support', href: 'mailto:support@vifi.us' },
			],
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og-help-center.png` } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og-help-center.png` } },
			],
			sidebar: [
				{ label: 'Start here', items: [{ autogenerate: { directory: 'start-here' } }] },
				{ label: 'Your AI agent', collapsed: true, items: [{ autogenerate: { directory: 'your-agent' } }] },
				{
					label: 'Calls, messages and callers',
					collapsed: true,
					items: [{ autogenerate: { directory: 'calls-and-callers' } }],
				},
				{ label: 'Connect your tools', collapsed: true, items: [{ autogenerate: { directory: 'connect-your-tools' } }] },
				{ label: 'Team and account', collapsed: true, items: [{ autogenerate: { directory: 'team-and-account' } }] },
				{ label: 'Billing', collapsed: true, items: [{ autogenerate: { directory: 'billing' } }] },
				{ label: 'Fix a problem', collapsed: true, items: [{ autogenerate: { directory: 'fix-a-problem' } }] },
				{ label: 'Best practices', collapsed: true, items: [{ autogenerate: { directory: 'best-practices' } }] },
				{ label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
				{ label: "What's new", slug: 'whats-new' },
			],
			plugins: [
				// Publishes /llms.txt, /llms-full.txt and /llms-small.txt so the
				// platform's knowledge-base ingestion (and any AI assistant) can read
				// the whole help center as plain text.
				starlightLlmsTxt(),
				// Fails the build on broken internal links.
				starlightLinksValidator(),
			],
		}),
	],
});
