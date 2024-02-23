// Sanity: Schema Author
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Scripts (local)
// ...

/*---------- Exports ----------*/

// Define type - author
export default defineType({
	name: 'author',
	title: 'Author',
	type: 'document',
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Name',
			type: 'string',
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
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
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
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
});
