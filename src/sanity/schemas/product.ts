// Component: Product
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

/*---------- Type ----------*/

// Define type
export default defineType({
	// General
	name: 'product',
	title: 'Product',
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
			name: 'content',
			title: 'Content',
		},
	],

	// Fields
	fields: [
		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
			group: 'general',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'general',
		}),

		// Define field - slug
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required().warning('A slug is required.'),
			group: 'general',
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: 'general',
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
			group: 'general',
		}),

		// Define field - author
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
			group: 'general',
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
			group: 'general',
		}),

		// Define field - categories
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			group: 'general',
		}),

		// Define field - publishedAt
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			group: 'general',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			group: 'general',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		publishedAt: new Date().toISOString(),
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'image',
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
