// Component: Sitemap
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
import { MetadataRoute } from 'next';
import { draftMode } from 'next/headers';

// Scripts (local)
import { getPage } from '@/sanity/lib/utils';

/*---------- Static Data ----------*/

// Environment
const env =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

/*---------- Sitemap ----------*/

// Default sitemap
export default async function sitemap({}: {}): Promise<MetadataRoute.Sitemap> {
	/*----- Init -----*/

	// Get URL
	const url =
		env === 'production'
			? staticMetadata.urlProduction
			: staticMetadata.urlDevelopment;

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Fetch Index content
	const result = await getPage('sitemap', {}, preview);

	// Declare sitemapArray
	const sitemapArray: {
		url: string;
		lastModified: Date;
		changeFrequency:
			| 'always'
			| 'hourly'
			| 'daily'
			| 'weekly'
			| 'monthly'
			| 'yearly'
			| 'never';
		priority: number;
	}[] = [];

	// Add home page
	const homepage = result?.mainSettings?.homepage;
	if (homepage) {
		sitemapArray.push({
			url: `${url}`,
			lastModified: homepage._updatedAt
				? new Date(homepage._updatedAt)
				: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		});
	}

	// Get pages
	const pages = result?.listArchive?.filter((item) => item._type === 'page');
	if (pages && pages.length > 0) {
		pages.forEach((page) => {
			if (page.slug?.current) {
				sitemapArray.push({
					url: `${url}/${page.slug.current}`,
					lastModified: page._updatedAt
						? new Date(page._updatedAt)
						: new Date(),
					changeFrequency: 'monthly',
					priority: 0.8,
				});
			}
		});
	}

	// Get projects
	const projects = result?.listArchive?.filter(
		(item) => item._type === 'project'
	);
	if (projects && projects.length > 0) {
		projects.forEach((project) => {
			if (project.slug?.current) {
				sitemapArray.push({
					url: `${url}/project/${project.slug.current}`,
					lastModified: project._updatedAt
						? new Date(project._updatedAt)
						: new Date(),
					changeFrequency: 'yearly',
					priority: 0.6,
				});
			}
		});
	}

	// Get posts
	const posts = result?.listArchive?.filter((item) => item._type === 'post');
	if (posts && posts.length > 0) {
		posts.forEach((post) => {
			if (post.slug?.current) {
				sitemapArray.push({
					url: `${url}/post/${post.slug.current}`,
					lastModified: post._updatedAt
						? new Date(post._updatedAt)
						: new Date(),
					changeFrequency: 'monthly',
					priority: 0.4,
				});
			}
		});
	}

	// Export default
	return sitemapArray;
}
