// Sanity: Schema Category
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Scripts (local)
// ...

/*---------- Exports ----------*/

// Define type - category
export default defineType({
	// General
	name: 'category',
	title: 'Category',
	type: 'document',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().warning('A title is required.'),
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
		}),

		// Define field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
	],
});
