// Scripts: Router Functions
/*----------------------------------------------------------------------------------------------------
* Shared functions for api routes.
----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';

/*---------- Functions ----------*/

// Function - getArchiveRouteKey
export const getArchiveRouteKey = (slug: string) => {
	// Loop configCMS.archives
	for (const [key, value] of Object.entries(configCMS.archives)) {
		if (key == slug) return key;
	}

	// Return false if no match
	return false;
};

// Function - getDocumentRouteKey
export const getDocumentRouteKey = (slug: string) => {
	// Loop configCMS.documents
	for (const [key, value] of Object.entries(configCMS.documents)) {
		if (key == slug) return key;
	}

	// Return false if no match
	return false;
};

// Function - getRouteInfo
// Pass in slug array, returns route and params
export function getRouteParams(slug: string[]) {
	// Init
	let type = '404';
	let documentType = '404';
	let route = '/404';
	let params = {};

	// If no slug, return home
	if (!slug || slug.length == 0) {
		documentType = 'index';
		route = '/';
		params = {};
		return { documentType, params } as RouteParams;
	}

	// If 1 slug, return archive
	if (slug.length == 1) {
		// Get archive route key
		const key = getArchiveRouteKey(slug[0]);

		// If no match, return page
		if (!key) {
			type = 'document';
			documentType = 'page';
			route = `/${slug[0]}`;
			params = { slug: slug[0] };
			return { _type: type, documentType, route, params } as RouteParams;
		}

		// Return archive
		type = 'archive';
		documentType = key;
		route = `/${slug[0]}`;
		params = {};
		return { _type: type, documentType, route, params } as RouteParams;
	}

	// If 2 slugs, return document
	if (slug.length == 2) {
		// Get document route key
		const key = getDocumentRouteKey(slug[0]);

		// If no match, return 404
		if (!key) {
			type = '404';
			documentType = '404';
			route = '/404';
			params = {};
			return { _type: type, documentType, route, params } as RouteParams;
		}

		// Return document
		type = 'document';
		documentType = key;
		route = `/${slug[0]}/${slug[1]}`;
		params = { slug: slug[1] };
		return { _type: type, documentType, route, params } as RouteParams;
	}

	// Return 404
	return { _type: type, documentType, route, params } as RouteParams;
}
