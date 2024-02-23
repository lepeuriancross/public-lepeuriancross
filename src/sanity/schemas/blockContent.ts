import { defineType, defineArrayMember } from 'sanity';

export const arThemeButton = [
	{ title: 'Default', value: 'default' },
	{ title: 'Block', value: 'block' },
	{ title: 'Shadow', value: 'shadow' },
	{ title: 'Outline', value: 'outline' },
];

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
	title: 'Block Content',
	name: 'blockContent',
	type: 'array',
	of: [
		defineArrayMember({
			title: 'Block',
			type: 'block',
			// Styles let you define what blocks can be marked up as. The default
			// set corresponds with HTML tags, but you can set any title or value
			// you want, and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H1', value: 'h1' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' },
			],
			lists: [{ title: 'Bullet', value: 'bullet' }],
			// Marks let you mark up inline text in the Portable Text Editor
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: 'URL',
						name: 'linkButton',
						type: 'object',
						fields: [
							// Define field - href
							{
								name: 'href',
								title: 'Href',
								type: 'url',
								validation: (Rule) =>
									Rule.required().uri({
										scheme: ['http', 'https', 'mailto', 'tel'],
									}),
							},

							// Define field - target
							{
								name: 'target',
								title: 'Target',
								type: 'string',
								options: {
									list: [
										{ title: 'Self', value: '_self' },
										{ title: 'Blank', value: '_blank' },
									],
								},
							},
						],
					},
				],
			},
		}),
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				},
			],
		}),
	],
});
