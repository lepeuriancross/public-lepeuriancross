// Sanity: Schema Blocks
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
import {
	listImages,
	listExperience,
	listReviews,
	listButtons,
	themeSection,
} from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Define Type - blockHero
export const blockHero = defineType({
	// Data
	name: 'blockHero',
	title: 'Section Hero',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Hero #1', value: 'section-hero-1' },
					// { title: 'Hero #2', value: 'section-hero-2' },
					// { title: 'Hero #3', value: 'section-hero-3' },
					// { title: 'Hero #4', value: 'section-hero-4' },
					// { title: 'Hero #5', value: 'section-hero-5' },
					// { title: 'Hero #6', value: 'section-hero-6' },
					// { title: 'Hero #7', value: 'section-hero-7' },
					// { title: 'Hero #8', value: 'section-hero-8' },
					// { title: 'Hero #9', value: 'section-hero-9' },
					// { title: 'Hero #10', value: 'section-hero-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - images
		defineField(listImages('images', 'Images')),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-hero-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Hero: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockHeading
export const blockHeading = defineType({
	// Data
	name: 'blockHeading',
	title: 'Section Heading',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Heading #1', value: 'section-heading-1' },
					// { title: 'Heading #2', value: 'section-heading-2' },
					// { title: 'Heading #3', value: 'section-heading-3' },
					// { title: 'Heading #4', value: 'section-heading-4' },
					// { title: 'Heading #5', value: 'section-heading-5' },
					// { title: 'Heading #6', value: 'section-heading-6' },
					// { title: 'Heading #7', value: 'section-heading-7' },
					// { title: 'Heading #8', value: 'section-heading-8' },
					// { title: 'Heading #9', value: 'section-heading-9' },
					// { title: 'Heading #10', value: 'section-heading-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - image
		defineField({
			name: 'image',
			title: 'Main image',
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
		}),

		// Define field - categories
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
		}),

		// Define field - url
		defineField({
			name: 'url',
			title: 'Client Url',
			type: 'string',
			validation: (Rule) =>
				Rule.regex(/^(http(s)?:\/\/)?((w){3}.)?instagram?(\.com)?\/.+/).warning(
					`'Client Url' should be a valid URL`
				),
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-heading-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Heading: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockBody
export const blockBody = defineType({
	// Data
	name: 'blockBody',
	title: 'Section Body',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{
						title: 'Body #1 (large title, small text)',
						value: 'section-body-1',
					},
					{
						title: 'Body #2 (small text, large title)',
						value: 'section-body-2',
					},
					// { title: 'Body #3', value: 'section-body-3' },
					// { title: 'Body #4', value: 'section-body-4' },
					// { title: 'Body #5', value: 'section-body-5' },
					// { title: 'Body #6', value: 'section-body-6' },
					// { title: 'Body #7', value: 'section-body-7' },
					// { title: 'Body #8', value: 'section-body-8' },
					// { title: 'Body #9', value: 'section-body-9' },
					// { title: 'Body #10', value: 'section-body-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - images
		defineField({
			name: 'image',
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
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-body-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Body: ${title}`,
				subtitle: subtitle,
				media: media,
			};
		},
	},
});

// Define Type - blockImages
export const blockImages = defineType({
	// Data
	name: 'blockImages',
	title: 'Section Images',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Images #1', value: 'section-images-1' },
					// { title: 'Images #2', value: 'section-images-2' },
					// { title: 'Images #3', value: 'section-images-3' },
					// { title: 'Images #4', value: 'section-images-4' },
					// { title: 'Images #5', value: 'section-images-5' },
					// { title: 'Images #6', value: 'section-images-6' },
					// { title: 'Images #7', value: 'section-images-7' },
					// { title: 'Images #8', value: 'section-images-8' },
					// { title: 'Images #9', value: 'section-images-9' },
					// { title: 'Images #10', value: 'section-images-10' },
				],
			},
		}),

		// Define field - images
		defineField(listImages('images', 'Images')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-hero-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			media: 'images',
		},
		prepare(selection) {
			const { media } = selection;
			return {
				title: `Images`,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockExperience
export const blockExperience = defineType({
	// Data
	name: 'blockExperience',
	title: 'Section Experience',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Experience #1', value: 'section-experience-1' },
					// { title: 'Experience #2', value: 'section-experience-2' },
					// { title: 'Experience #3', value: 'section-experience-3' },
					// { title: 'Experience #4', value: 'section-experience-4' },
					// { title: 'Experience #5', value: 'section-experience-5' },
					// { title: 'Experience #6', value: 'section-experience-6' },
					// { title: 'Experience #7', value: 'section-experience-7' },
					// { title: 'Experience #8', value: 'section-experience-8' },
					// { title: 'Experience #9', value: 'section-experience-9' },
					// { title: 'Experience #10', value: 'section-experience-10' },
				],
			},
		}),

		// Define field - experience
		defineField(listExperience('experience', 'Experience')),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-experience-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: `Experience: ${title}`,
				subtitle: subtitle,
			};
		},
	},
});

// Define Type - blockClients
export const blockClients = defineType({
	// Data
	name: 'blockClients',
	title: 'Section Clients',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Clients #1', value: 'section-clients-1' },
					// { title: 'Clients #2', value: 'section-clients-2' },
					// { title: 'Clients #3', value: 'section-clients-3' },
					// { title: 'Clients #4', value: 'section-clients-4' },
					// { title: 'Clients #5', value: 'section-clients-5' },
					// { title: 'Clients #6', value: 'section-clients-6' },
					// { title: 'Clients #7', value: 'section-clients-7' },
					// { title: 'Clients #8', value: 'section-clients-8' },
					// { title: 'Clients #9', value: 'section-clients-9' },
					// { title: 'Clients #10', value: 'section-clients-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - images
		defineField({
			name: 'images',
			title: 'Logos',
			type: 'array',
			of: [
				{
					title: 'Logo',
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
			],
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-clients-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Clients: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockReviews
export const blockReviews = defineType({
	// Data
	name: 'blockReviews',
	title: 'Section Reviews',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Reviews #1', value: 'section-reviews-1' },
					// { title: 'Reviews #2', value: 'section-reviews-2' },
					// { title: 'Reviews #3', value: 'section-reviews-3' },
					// { title: 'Reviews #4', value: 'section-reviews-4' },
					// { title: 'Reviews #5', value: 'section-reviews-5' },
					// { title: 'Reviews #6', value: 'section-reviews-6' },
					// { title: 'Reviews #7', value: 'section-reviews-7' },
					// { title: 'Reviews #8', value: 'section-reviews-8' },
					// { title: 'Reviews #9', value: 'section-reviews-9' },
					// { title: 'Reviews #10', value: 'section-reviews-10' },
				],
			},
		}),

		// Define field - reviews
		defineField(listReviews('reviews', 'Reviews')),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-reviews-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: `Reviews: ${title}`,
				subtitle: subtitle,
			};
		},
	},
});

// Define Type - blockContactForm
export const blockContactForm = defineType({
	// Data
	name: 'blockContactForm',
	title: 'Section Contact Form',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Contact #1', value: 'section-contact-1' },
					// { title: 'Contact #2', value: 'section-contact-2' },
					// { title: 'Contact #3', value: 'section-contact-3' },
					// { title: 'Contact #4', value: 'section-contact-4' },
					// { title: 'Contact #5', value: 'section-contact-5' },
					// { title: 'Contact #6', value: 'section-contact-6' },
					// { title: 'Contact #7', value: 'section-contact-7' },
					// { title: 'Contact #8', value: 'section-contact-8' },
					// { title: 'Contact #9', value: 'section-contact-9' },
					// { title: 'Contact #10', value: 'section-contact-10' },
				],
			},
		}),

		// Define field - formspreeEndpoint
		defineField({
			name: 'formspreeEndpoint',
			title: 'Formspree Endpoint',
			description: 'eg. https://formspree.io/f/abcdefgh',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - bodySuccess
		defineField({
			name: 'bodySuccess',
			title: 'Success Message',
			type: 'blockContent',
		}),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		title: 'Get in touch',
		component: 'section-contact-1',
		formspreeEndpoint: 'https://formspree.io/f/xqkrkael',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: `Contact Form: ${title}`,
				subtitle: subtitle,
			};
		},
	},
});

// Define Type - blockProduct (Shop)
export const blockProduct = defineType({
	// Data
	name: 'blockProduct',
	title: 'Section Product',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Product #1', value: 'section-product-1' },
					// { title: 'Product #2', value: 'section-product-2' },
					// { title: 'Product #3', value: 'section-product-3' },
					// { title: 'Product #4', value: 'section-product-4' },
					// { title: 'Product #5', value: 'section-product-5' },
					// { title: 'Product #6', value: 'section-product-6' },
					// { title: 'Product #7', value: 'section-product-7' },
					// { title: 'Product #8', value: 'section-product-8' },
					// { title: 'Product #9', value: 'section-product-9' },
					// { title: 'Product #10', value: 'section-product-10' },
				],
			},
		}),

		// Define field - reference
		defineField({
			name: 'reference',
			title: 'Reference',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required(),
		}),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-product-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'reference.title',
			subtitle: 'reference.subtitle',
			media: 'reference.images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				// Get title from reference title
				title: `Product: ${title}`,
				subtitle,
				media: media[0],
			};
		},
	},
});

// Define Type - blockSubscriptions (Shop)
export const blockSubscriptions = defineType({
	// Data
	name: 'blockSubscriptions',
	title: 'Section Services',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Products #1', value: 'section-products-1' },
					// { title: 'Products #2', value: 'section-products-2' },
					// { title: 'Products #3', value: 'section-products-3' },
					// { title: 'Products #4', value: 'section-products-4' },
					// { title: 'Products #5', value: 'section-products-5' },
					// { title: 'Products #6', value: 'section-products-6' },
					// { title: 'Products #7', value: 'section-products-7' },
					// { title: 'Products #8', value: 'section-products-8' },
					// { title: 'Products #9', value: 'section-products-9' },
					// { title: 'Products #10', value: 'section-products-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-services-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Services: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockProjects
export const blockProjects = defineType({
	// Data
	name: 'blockProjects',
	title: 'Section Projects',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Projects Grid', value: 'section-projects-1' },
					{ title: 'Projects List', value: 'section-projects-2' },
					{ title: 'Projects Carousel', value: 'section-projects-3' },
					// { title: 'Projects #4', value: 'section-projects-4' },
					// { title: 'Projects #5', value: 'section-projects-5' },
					// { title: 'Projects #6', value: 'section-projects-6' },
					// { title: 'Projects #7', value: 'section-projects-7' },
					// { title: 'Projects #8', value: 'section-projects-8' },
					// { title: 'Projects #9', value: 'section-projects-9' },
					// { title: 'Projects #10', value: 'section-projects-10' },
				],
			},
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - projects
		defineField({
			name: 'projects',
			title: 'Projects',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'project' }] }],
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-projects-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'projects.0.image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Projects: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockPosts
export const blockPosts = defineType({
	// Data
	name: 'blockPosts',
	title: 'Section Posts',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Posts Grid', value: 'section-posts-1' },
					{ title: 'Posts List', value: 'section-posts-2' },
					{ title: 'Posts Carousel', value: 'section-posts-3' },
					// { title: 'Posts #4', value: 'section-posts-4' },
					// { title: 'Posts #5', value: 'section-posts-5' },
					// { title: 'Posts #6', value: 'section-posts-6' },
					// { title: 'Posts #7', value: 'section-posts-7' },
					// { title: 'Posts #8', value: 'section-posts-8' },
					// { title: 'Posts #9', value: 'section-posts-9' },
					// { title: 'Posts #10', value: 'section-posts-10' },
				],
			},
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - posts
		defineField({
			name: 'posts',
			title: 'Posts',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'post' }] }],
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-posts-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'projects.0.image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Projects: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});
