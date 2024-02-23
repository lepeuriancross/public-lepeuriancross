// Sanity: Schema Buttons
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop, configPortfolio, configBlog } from '@/data/config';

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
export const arListLinks = [
	{ type: 'archiveButton' },
	{ type: 'referenceButton' },
	{ type: 'linkButton' },
];
export const arThemeButton = [
	{ title: 'Default', value: 'default' },
	{ title: 'Block', value: 'block' },
	{ title: 'Shadow', value: 'shadow' },
	{ title: 'Outline', value: 'outline' },
];

/*---------- Exports ----------*/

// Define schema - popoverButton
export const popoverButton = defineType({
	// Data
	name: 'popoverButton',
	title: 'Popover',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),

		// Define field - items
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: arListLinks,
		}),

		// Define field - ctas
		defineField({
			name: 'ctas',
			title: 'Call To Actions',
			type: 'array',
			of: arListLinks,
			validation: (Rule) => Rule.max(4).warning('Max 4 items.'),
		}),

		// Define field - icon
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {},

	// Preview
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			const { title } = selection;
			return { ...selection };
		},
	},
});

// Define schema - archiveButton
export const archiveButton = defineType({
	// Data
	name: 'archiveButton',
	title: 'Archive',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),

		// Define field - type
		defineField({
			name: 'type',
			title: 'Archive Type',
			type: 'string',
			options: {
				list: [
					{ title: 'All', value: 'index' },
					...(configShop.isActive
						? [{ title: 'Products', value: 'product' }]
						: []),
					...(configPortfolio.isActive
						? [{ title: 'Projects', value: 'project' }]
						: []),
					...(configBlog.isActive ? [{ title: 'Posts', value: 'post' }] : []),
					{ title: 'Authors', value: 'author' },
					{ title: 'Categories', value: 'category' },
				],
			},
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),

		// Define field - icon
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		type: 'product',
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			docType: 'docType',
		},
		prepare(selection) {
			const { docType } = selection;
			return { ...selection, subtitle: docType && `${docType}` };
		},
	},
});

// Define schema - referenceButton
export const referenceButton = defineType({
	// Data
	name: 'referenceButton',
	title: 'Reference',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),

		// Define field - reference
		defineField({
			name: 'reference',
			title: 'Reference',
			type: 'reference',
			to: [
				{ type: 'page' },
				...(configShop.isActive ? [{ type: 'product' }] : []),
				...(configPortfolio.isActive ? [{ type: 'project' }] : []),
				...(configBlog.isActive ? [{ type: 'post' }] : []),
				{ type: 'author' },
				{ type: 'category' },
			],
			validation: (Rule) => Rule.required(),
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),

		// Define field - icon
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			docType: 'docType',
		},
		prepare(selection) {
			const { docType } = selection;
			return { ...selection, subtitle: docType && `${docType}` };
		},
	},
});

// Define schema - linkButton
export const linkButton = defineType({
	// Data
	name: 'linkButton',
	title: 'Link',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),

		// Define field - href
		defineField({
			name: 'href',
			title: 'Href',
			type: 'url',
			validation: (Rule) =>
				Rule.required().uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
				}),
		}),

		// Define field - target
		defineField({
			name: 'target',
			title: 'Target',
			type: 'string',
			options: {
				list: [
					{ title: 'Self', value: '_self' },
					{ title: 'Blank', value: '_blank' },
				],
			},
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),

		// Define field - icon
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		target: '_self',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			url: 'href',
		},
		prepare(selection) {
			const { url } = selection;
			return { ...selection, subtitle: url && `${url}` };
		},
	},
});

// Define schema - socialButton
export const socialButton = defineType({
	// Data
	name: 'socialButton',
	title: 'Social Link',
	type: 'object',

	// Fields
	fields: [
		// Define field - icon
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			options: {
				list: [
					{ title: 'LinkedIn', value: 'linkedin' },
					{ title: 'Facebook', value: 'facebook' },
					{ title: 'Instagram', value: 'instagram' },
					{ title: 'Github', value: 'github' },
					{ title: 'YouTube', value: 'youtube' },
				],
			},
		}),

		// Define field - href
		defineField({
			name: 'href',
			title: 'Href',
			type: 'url',
			validation: (Rule) =>
				Rule.required().uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
				}),
		}),

		// Define field - target
		defineField({
			name: 'target',
			title: 'Target',
			type: 'string',
			options: {
				list: [
					{ title: 'Self', value: '_self' },
					{ title: 'Blank', value: '_blank' },
				],
			},
		}),
	],

	// Initial values
	initialValue: {
		icon: 'linkedin',
		target: '_blank',
	},

	// Preview
	preview: {
		select: {
			title: 'icon',
			url: 'href',
		},
		prepare(selection) {
			const { title, url } = selection;
			return { title, subtitle: url && `${url}` };
		},
	},
});
