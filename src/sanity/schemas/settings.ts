// Sanity: Schema Settings
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop, configPortfolio, configBlog } from '@/data/config';
import { staticMetadata } from '@/data/content';

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Scripts (local)
import {
	listNavigation,
	listButtons,
	listSocial,
} from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Define type - settings
const settings = defineType({
	// Data
	name: 'settings',
	title: 'Settings',
	type: 'document',

	// Groups
	groups: [
		// General
		{
			name: 'general',
			title: 'General',
			default: true,
		},
		{
			name: 'nav',
			title: 'Navigation',
		},
		{
			name: 'archives',
			title: 'Archives',
		},
		{
			name: 'contact',
			title: 'Contact Info',
		},
		{
			name: 'comingSoon',
			title: 'Coming Soon',
		},
	],

	// Fields
	fields: [
		/*----- General Settings -----*/

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'general',
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: 'general',
		}),

		// Define field - image
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
			group: 'general',
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
			group: 'general',
		}),

		// Define field - author
		defineField({
			name: 'author',
			title: 'author',
			type: 'reference',
			to: { type: 'author' },
			group: 'general',
		}),

		// Define field - homepage
		defineField({
			name: 'homepage',
			title: 'Home Page',
			type: 'reference',
			to: { type: 'page' },
			group: 'general',
		}),

		/*----- Navigation -----*/

		// Define field - navHeader
		defineField(listNavigation('navHeader', 'Header Navigation', 'nav')),

		// Define field - navFooter
		defineField(listButtons('navFooter', 'Footer Navigation', 'nav')),

		// Define field - navSocial
		defineField(listSocial('navSocial', 'Social Links', 'nav')),

		/*----- Archives -----*/

		...(configShop.isActive
			? [
					// Define field - productsTitle
					defineField({
						name: 'productTitle',
						title: 'Products Title',
						type: 'string',
						group: 'archives',
					}),

					// Define field - productsBody
					defineField({
						name: 'productBody',
						title: 'Products Body',
						type: 'blockContent',
						group: 'archives',
					}),
			  ]
			: []),

		...(configPortfolio.isActive
			? [
					// Define field - projectsTitle
					defineField({
						name: 'projectTitle',
						title: 'Projects Title',
						type: 'string',
						group: 'archives',
					}),

					// Define field - projectsBody
					defineField({
						name: 'projectBody',
						title: 'Projects Body',
						type: 'blockContent',
						group: 'archives',
					}),
			  ]
			: []),

		...(configBlog.isActive
			? [
					// Define field - postsTitle
					defineField({
						name: 'postTitle',
						title: 'Posts Title',
						type: 'string',
						group: 'archives',
					}),

					// Define field - postsBody
					defineField({
						name: 'postBody',
						title: 'Posts Body',
						type: 'blockContent',
						group: 'archives',
					}),
			  ]
			: []),

		// Define field - authorsTitle
		defineField({
			name: 'authorTitle',
			title: 'Authors Title',
			type: 'string',
			group: 'archives',
		}),

		// Define field - authorsBody
		defineField({
			name: 'authorBody',
			title: 'Authors Body',
			type: 'blockContent',
			group: 'archives',
		}),

		/*----- Contact Info -----*/

		// Define field - contactTel
		defineField({
			name: 'contactTel',
			title: 'Telephone',
			type: 'string',
			group: 'contact',
			validation: (Rule) =>
				Rule.regex(
					/^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/
				).warning(
					`'Telephone' should be a valid phone number (e.g. +1 555-555-5555)`
				),
		}),

		// Define field - contactEmail
		defineField({
			name: 'contactEmail',
			title: 'Email',
			type: 'string',
			group: 'contact',
			validation: (Rule) =>
				Rule.regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).warning(
					`'Email' should be a valid email address`
				),
		}),

		/*----- Coming Soon -----*/

		// Define field - isComingSoon
		defineField({
			name: 'comingSoonIsActive',
			title: 'Activate Coming Soon',
			description:
				"Deactivate the site and show a 'coming soon' messaging in its place",
			type: 'boolean',
			group: 'comingSoon',
		}),

		// Define field - comingSoonHeroTitle
		defineField({
			name: 'comingSoonTitle',
			title: 'Coming Soon Title',
			type: 'string',
			group: 'comingSoon',
		}),

		// Define field - comingSoonHeroBody
		defineField({
			name: 'comingSoonBody',
			title: 'Coming Soon Body',
			type: 'blockContent',
			group: 'comingSoon',
		}),
	],

	// Initial value
	initialValue: {
		title: staticMetadata.title,
		description: staticMetadata.description,
		comingSoonIsActive: false,
	},
});

/*---------- Exports ----------*/

// Export default
export default settings;
