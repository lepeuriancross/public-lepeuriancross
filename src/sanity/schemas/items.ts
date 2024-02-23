// Sanity: Schema Items
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

/*---------- Exports ----------*/

// Define schema - experience
export const experience = defineType({
	// Data
	name: 'experience',
	title: 'Experience',
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

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - location
		defineField({
			name: 'location',
			title: 'Location',
			type: 'string',
		}),

		// Define field (sanity date) - start
		defineField({
			name: 'start',
			title: 'Start',
			type: 'date',
		}),

		// Define field (sanity date) - end
		defineField({
			name: 'end',
			title: 'Finish',
			type: 'date',
		}),

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
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

// Define schema - review
export const review = defineType({
	// Data
	name: 'review',
	title: 'Review',
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

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
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

// Define schema - detail
export const detail = defineType({
	// Data
	name: 'detail',
	title: 'Detail',
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

		// Items
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{ type: 'string' }],
		}),

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
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

// Define schema - service
export const service = defineType({
	// Data
	name: 'service',
	title: 'Service',
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

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
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

// Define schema - video
export const video = defineType({
	// Data
	name: 'video',
	title: 'Video',
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

		// Define field - embedId
		defineField({
			name: 'embedId',
			title: 'Embed Id',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - width
		defineField({
			name: 'width',
			title: 'Width',
			type: 'number',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - height
		defineField({
			name: 'height',
			title: 'Height',
			type: 'number',
			validation: (Rule) => Rule.required(),
		}),
	],

	// Initial values
	initialValue: {
		width: 853,
		height: 480,
	},

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
