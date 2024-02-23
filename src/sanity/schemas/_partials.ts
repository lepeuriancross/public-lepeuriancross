// Sanity: Schema Blocks
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop, configPortfolio, configBlog } from '@/data/config';

// Scripts (node)
// ...

// Partials
export const arListButtons = [
	{ type: 'archiveButton' },
	{ type: 'referenceButton' },
	{ type: 'linkButton' },
];
export const arListSocial = [{ type: 'socialButton' }];
export const arFlexContent = [
	{ type: 'blockHero' },
	{ type: 'blockHeading' },
	{ type: 'blockBody' },
	{ type: 'blockImages' },
	{ type: 'blockExperience' },
	{ type: 'blockClients' },
	{ type: 'blockReviews' },
	{ type: 'blockContactForm' },
	// Shop specific blocks
	...(configShop.isActive
		? [{ type: 'blockProduct' }, { type: 'blockSubscriptions' }]
		: []),
	// Portfolio specific blocks
	...(configPortfolio.isActive ? [{ type: 'blockProjects' }] : []),
	// Blog specific blocks
	...(configBlog.isActive ? [{ type: 'blockPosts' }] : []),
];

/*---------- Exports ----------*/

// Partial - listBlocks
export function listBlocks(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'content',
		title: title ?? 'Content',
		type: 'array',
		of: arFlexContent,
		...(group ? { group } : {}),
	};
}

// Partial - listNavigation
export function listNavigation(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'nav',
		title: title ?? 'Navigation',
		type: 'array',
		of: [{ type: 'popoverButton' }, ...arListButtons],
		...(group ? { group } : {}),
	};
}

// Partial - listImages
export function listImages(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'images',
		title: title ?? 'Images',
		type: 'array',
		of: [
			{
				title: 'Image',
				type: 'image',
				options: {
					hotspot: true,
				},
				fields: [
					{
						name: 'alt',
						type: 'string',
						title: 'Alternative Text',
					},
				],
			},
			{ type: 'video' },
		],
		...(group ? { group } : {}),
	};
}

// Partial - listExperience
export function listExperience(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'experience',
		title: title ?? 'Experience',
		type: 'array',
		of: [{ type: 'experience' }],
		...(group ? { group } : {}),
	};
}

// Partial - listReviews
export function listReviews(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'reviews',
		title: title ?? 'Reviews',
		type: 'array',
		of: [{ type: 'review' }],
		...(group ? { group } : {}),
	};
}

// Partial - listDetails
export function listDetails(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'details',
		title: title ?? 'Details',
		type: 'array',
		of: [{ type: 'detail' }],
		...(group ? { group } : {}),
	};
}

// Partial - listButtons
export function listButtons(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'buttons',
		title: title ?? 'Buttons',
		type: 'array',
		of: arListButtons,
		...(group ? { group } : {}),
	};
}

// Partial - listSocial
export function listSocial(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'social',
		title: title ?? 'Social Links',
		type: 'array',
		of: arListSocial,
		...(group ? { group } : {}),
	};
}

// Partial - themeSection
export function themeSection(name?: string, title?: string) {
	return {
		name: name ?? 'themeSection',
		title: title ?? 'Section Theme',
		type: 'string',
		options: {
			list: [
				{ title: 'Default', value: 'default' },
				{ title: 'Primary', value: 'primary' },
				{ title: 'Secondary', value: 'secondary' },
				{ title: 'Tertiary', value: 'tertiary' },
				{ title: 'White', value: 'white' },
			],
		},
	};
}
