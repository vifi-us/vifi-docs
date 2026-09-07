import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Extra frontmatter every Help Center page may carry.
 *
 * status: marks a feature's readiness. Drives the pill next to the page title
 *         and the badge in the sidebar (see src/route-middleware.ts).
 *   - beta:        usable today, still being refined; expect rough edges.
 *   - coming-soon: not available yet; documented so customers know it's planned.
 * statusNote: optional one-liner shown under the title explaining the status.
 */
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				status: z.enum(['beta', 'coming-soon']).optional(),
				statusNote: z.string().optional(),
			}),
		}),
	}),
};
