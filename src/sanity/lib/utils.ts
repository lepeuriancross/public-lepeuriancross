// Sanity: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Scripts (local)
import { strCapitalize } from '@/lib/utils';
import { getClient } from '@/sanity/lib/client';

/*---------- Sanity Base ----------*/

const groqBase = () => {
	return groq`
        _id,
        _rev,
        _type,
        _createdAt,
        _updatedAt
    `;
};

const groqBlockBase = () => {
	return groq`
        ${groqBase()},
        _key,
        isActive,
        key,
        component,
        paddingTop,
        paddingContainer,
        paddingBottom,
        isCard,
        theme,
        className
    `;
};

/*---------- Sanity Vanilla ----------*/

const groqSlug = () => {
	return groq`
        ${groqBase()},
        current,
    `;
};

const groqImage = () => {
	return groq`
        ${groqBase()},
        asset -> {
            ${groqBase()},
            url,
            metadata {
                palette {
                    ${groqBase()},
                    dominant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    darkMuted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    muted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    lightVibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    darkVibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    lightMuted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    vibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                }
            }
        },
        alt,
        crop {
            ${groqBase()},
            top,
            bottom,
            left,
            right,
        },
        hotspot {
            ${groqBase()},
            x,
            y,
            height,
            width,
        },
    `;
};

const groqVideo = () => {
	return groq`
        ${groqBase()},
        title,
        embedId,
        width,
        height,
    `;
};

/*---------- Sanity Objects ----------*/

const groqExperience = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        start,
        end,
        body,
    `;
};

const groqDetail = () => {
	return groq`
        ${groqBase()},
        title,
        body,
        items[],
    `;
};

const groqPopoverButton = () => {
	return groq`
        ${groqBase()}, 
        ...,
    `;
};

const groqArchiveButton = () => {
	return groq`
        ${groqBase()}, 
        ...,
    `;
};

const groqReferenceButton = () => {
	return groq`
        ${groqBase()},
        ...,
        reference -> {
            _type == 'page' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'product' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'project' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'post' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'author' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'category' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
        }
    `;
};

const groqLinkButton = () => {
	return groq`
        ${groqBase()},
        ...,
    `;
};

const groqSocialButton = () => {
	return groq`
        ${groqBase()},
        ...,
    `;
};

/*---------- Sanity Blocks ----------*/

const groqBlockHero = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        images[] {
            _type == 'image' => {
                ${groqImage()}
            },
            _type == 'video' => {
                ${groqVideo()}
            },
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockHeading = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        url,
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockBody = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        image {
            ${groqImage()}
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockImages = () => {
	return groq`
        ${groqBlockBase()},
        images[] {
            _type == 'image' => {
                ${groqImage()}
            },
            _type == 'video' => {
                ${groqVideo()}
            },
        },
    `;
};

const groqBlockExperience = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        experience[] {
            ${groqExperience()}
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockClients = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        images[] {
            _type == 'image' => {
                ${groqImage()}
            },
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockReviews = () => {
	return groq`
        ${groqBlockBase()},
        title,
        reviews[] {
            title,
            body
        },
        buttons[] {
            ${groqListButtons()}
        },
    `;
};

const groqBlockContactForm = () => {
	return groq`
        ${groqBlockBase()},
        title,
        formspreeEndpoint,
        subtitle,
        body,
        bodySuccess,
        isFlipped
    `;
};

const groqBlockProduct = () => {
	return groq`
        ${groqBlockBase()},
        reference -> {
            ${groqProduct()}
        },
        isFlipped
    `;
};

const groqBlockProjects = () => {
	return groq`
        ${groqBlockBase()},
        title,
        body,
        projects[] -> {
            ${groqProject()}
        },
        buttons[] {
            ${groqListButtons()}
        }
    `;
};

const groqBlockPosts = () => {
	return groq`
        ${groqBlockBase()},
        title,
        body,
        posts[] -> {
            ${groqPost()}
        },
        buttons[] {
            ${groqListButtons()}
        }
    `;
};

/*---------- Sanity Lists ----------*/

const groqFlexContent = () => {
	return groq`
        ${groqBlockBase()},
        _type == 'blockHero' => {
            ${groqBlockHero()}
        },
        _type == 'blockHeading' => {
            ${groqBlockHeading()}
        },
        _type == 'blockBody' => {
            ${groqBlockBody()}
        },
        _type == 'blockImages' => {
            ${groqBlockImages()}
        },
        _type == 'blockExperience' => {
            ${groqBlockExperience()}
        },
        _type == 'blockClients' => {
            ${groqBlockClients()}
        },
        _type == 'blockReviews' => {
            ${groqBlockReviews()}
        },
        _type == 'blockContactForm' => {
            ${groqBlockContactForm()}
        },
        _type == 'blockProduct' => {
            ${groqBlockProduct()}
        },
        _type == 'blockProjects' => {
            ${groqBlockProjects()}
        },
        _type == 'blockPosts' => {
            ${groqBlockPosts()}
        },
    `;
};

const groqListNavigation = () => {
	return groq`
        ${groqBase()},
        _type == 'popoverButton' => {
            ${groqPopoverButton()}
        },
        _type == 'archiveButton' => {
            ${groqArchiveButton()}
        },
        _type == 'referenceButton' => {
            ${groqReferenceButton()}
        },
        _type == 'linkButton' => {
            ${groqLinkButton()}
        },
    `;
};

const groqListButtons = () => {
	return groq`
        ${groqBase()},
        _type == 'archiveButton' => {
            ${groqArchiveButton()}
        },
        _type == 'referenceButton' => {
            ${groqReferenceButton()}
        },
        _type == 'linkButton' => {
            ${groqLinkButton()}
        },
    `;
};

const groqListSocial = () => {
	return groq`
        ${groqBase()},
        _type == 'socialButton' => {
            ${groqSocialButton()}
        },
    `;
};

/*---------- Sanity Documents ----------*/

const groqPage = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthor()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
        body,
    `;
};
const groqPageThumbnail = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthorThumbnail()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
    `;
};

const groqProject = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthor()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        url,
        publishedAt,
        body,
    `;
};
const groqProjectThumbnail = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthorThumbnail()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        url,
        publishedAt,
    `;
};

const groqPost = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthor()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
        body,
    `;
};
const groqPostThumbnail = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthorThumbnail()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
    `;
};

const groqProduct = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthor()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
        body,
    `;
};
const groqProductThumbnail = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        author -> {
            ${groqAuthorThumbnail()}
        },
        image {
            ${groqImage()}
        },
        categories[] -> {
            ${groqCategory()}
        },
        publishedAt,
    `;
};

const groqAuthor = () => {
	return groq`
        ${groqBase()},
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        image {
            ${groqImage()}
        },
        body,
    `;
};
const groqAuthorThumbnail = () => {
	return groq`
        ${groqBase()},
        title,
        slug {
            ${groqSlug()}
        },
        subtitle,
        description,
        image {
            ${groqImage()}
        },
    `;
};

const groqCategory = () => {
	return groq`
        ${groqBase()},
        title,
        slug {
            ${groqSlug()}
        },
        description,
    `;
};

/*---------- Sanity Singletons ----------*/

const groqSettings = () => {
	return groq`
        ${groqBase()},
        title,
        subtitle,
        image {
            ${groqImage()}
        },
        description,
        author -> {
            title,
            slug {
                ${groqSlug()}
            },
            image {
                ${groqImage()}
            }
        },
        homepage -> {
            title,
            slug {
                ${groqSlug()}
            }
        },
        navHeader[] {
            ${groqListNavigation()}
        },
        navFooter[] {
            ${groqListButtons()}
        },
        navSocial[] {
            ${groqListSocial()}
        },
        productTitle,
        productBody,
        projectTitle,
        projectBody,
        postTitle,
        postBody,
        authorTitle,
        authorBody,
        contactTel,
        contactEmail,
        comingSoonIsActive,
        comingSoonTitle,
        comingSoonBody
    `;
};

/*---------- Sanity Queries ----------*/

// Groq Result - Page
const groqResultPageIndex = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "settings"][0].homepage -> {
        _type == 'page' => {
            ${groqPage()}
        },
    },
    "listBlocks": *[_type == "settings"][0].homepage -> listBlocks[] {
        ${groqFlexContent()}
    },
    "listArchive": null
}`;
const groqResultPageIndexMetadata = groq`{
    "mainSettings": *[_type == "settings"][0] {
        homepage -> {
            title,
            slug {
                ${groqSlug()}
            },
            image {
                ${groqImage()}
            },
        },
    },
}`;
const groqResultPageSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "page" && slug.current == $slug][0] {
        ${groqPage()}
    },
    "listBlocks": *[_type == "page" && slug.current == $slug][0].listBlocks[] {
        ${groqFlexContent()}
    },
}`;

// Groq Result - Project
const groqResultProjectArchive = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": undefined,
    "listBlocks": *[_type == "project" && slug.current == $slug][0].listBlocks[] {
        ${groqFlexContent()}
    },
    "listArchive": *[_type == "project" && _id > $lastId] | order(publishedAt desc) [0...10] {
        ${groqProjectThumbnail()}
    }
}`;
const groqResultProjectSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "project" && slug.current == $slug][0] {
        ${groqProject()}
    },
    "listBlocks": *[_type == "project" && slug.current == $slug][0].listBlocks[] {
        ${groqFlexContent()}
    },
    "listArchive": null
}`;

// Groq Result - Post
const groqResultPostArchive = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": undefined,
    "listBlocks": *[_type == "post" && slug.current == $slug][0].listBlocks[] {
        ${groqFlexContent()}
    },
    "listArchive": *[_type == "post" && _id > $lastId] | order(publishedAt desc) [0...10] {
        ${groqPostThumbnail()}
    }
}`;
const groqResultPostSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "post" && slug.current == $slug][0] {
        ${groqPost()}
    },
    "listBlocks": *[_type == "post" && slug.current == $slug][0].listBlocks[] {
        ${groqFlexContent()}
    },
    "listArchive": null
}`;

// Groq - Sitemap
const groqResultSitemap = groq`{
    "mainSettings": *[_type == "settings"][0] {
        homepage -> {
            ${groqBase()},
            title,
            slug {
                ${groqSlug()}
            }
        },
    },
    "listArchive": *[_type in ["page", "product", "project", "post"]] | order(publishedAt desc) [0...49999] {
        _type == 'page' => {
            ${groqPageThumbnail()}
        },
        _type == 'product' => {
            ${groqProductThumbnail()}
        },
        _type == 'project' => {
            ${groqProjectThumbnail()}
        },
        _type == 'post' => {
            ${groqPostThumbnail()}
        },
    },
}`;

// Groq Result - 404
const groqResultPage404 = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": null,
    "listBlocks": null,
    "listArchive": null
}`;

/*---------- Functions ----------*/

// Function - getPage
export async function getPage(
	pageType: ThemePage,
	params?: {
		documentType?: SanityThemeDocument;
		slug?: string;
		lastId?: string;
	},
	preview?: { token?: string }
) {
	// Switch - type
	let result;
	switch (pageType) {
		// If sitemap...
		case 'sitemap':
			// Fetch Sitemap
			result = getClient(preview).fetch(groqResultSitemap) as SanityResult;

			// Return parsed result
			return result;

		// If index...
		case 'index':
			// Fetch Index
			result = getClient(preview).fetch(groqResultPageIndex, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;
		case 'indexMetadata':
			// Fetch Index Metadata
			result = getClient(preview).fetch(groqResultPageIndexMetadata, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		// If archive...
		case 'archive':
			// If project...
			if (params?.documentType == 'project') {
				// Fetch Project Archive
				result = getClient(preview).fetch(groqResultProjectArchive, {
					slug: params?.slug ?? '',
					lastId: params?.lastId ?? '',
				}) as SanityResult;

				// Return parsed result
				return result;
			}

			// If post...
			if (params?.documentType == 'post') {
				// Fetch Post Archive
				result = getClient(preview).fetch(groqResultPostArchive, {
					slug: params?.slug ?? '',
					lastId: params?.lastId ?? '',
				}) as SanityResult;

				// Return parsed result
				return result;
			}

			// Fetch 404
			result = getClient(preview).fetch(groqResultPage404, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		// If document...
		case 'document':
			// If page...
			if (params?.documentType == 'page') {
				// Fetch Page
				result = getClient(preview).fetch(groqResultPageSingle, {
					slug: params?.slug ?? '',
					lastId: params?.lastId ?? '',
				}) as SanityResult;

				// Return parsed result
				return result;
			}

			// If project...
			if (params?.documentType == 'project') {
				// Fetch Project
				result = getClient(preview).fetch(groqResultProjectSingle, {
					slug: params?.slug ?? '',
					lastId: params?.lastId ?? '',
				}) as SanityResult;

				// Return parsed result
				return result;
			}

			// If post...
			if (params?.documentType == 'post') {
				// Fetch Post
				result = getClient(preview).fetch(groqResultPostSingle, {
					slug: params?.slug ?? '',
					lastId: params?.lastId ?? '',
				}) as SanityResult;

				// Return parsed result
				return result;
			}

			// Fetch 404
			result = getClient(preview).fetch(groqResultPage404, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		// If default...
		default:
			// Fetch 404
			result = getClient(preview).fetch(groqResultPage404, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;
	}
}

// Function - getImage
export const getImage = (
	source: SanityImage,
	preview?: { token?: string }
): string => {
	// Get builder
	const builder = imageUrlBuilder(getClient(preview));

	// Return image
	return builder.image(source).url() ?? '';
};

// Function - parseListNavigation
export const parseListNavigation = (
	buttons: SanityListNavigation,
	params?: {
		home?: string;
		pathname?: string;
	}
): ListNavigation => {
	// Declare nav
	let nav = [] as ListNavigation;

	// Loop through buttons
	buttons.forEach((button, b) => {
		// Switch - _type
		switch (button._type) {
			// Case - popoverButton
			case 'popoverButton':
				// Push to nav
				if (button.title && button.title !== '') {
					nav.push({
						type: 'popoverButton',
						name: button.title,
						description: button.description ?? undefined,
						items:
							button.items && button.items.length > 0
								? parseListButtons(button.items, params)
								: [],
						ctas:
							button.ctas && button.ctas.length > 0
								? parseListButtons(button.ctas, params)
								: [],
					} as PopoverButton);
				}
				break;

			// Case - archiveButton
			case 'archiveButton':
				// Push to nav
				if (button.type) {
					nav.push({
						type: 'linkButton',
						name:
							button.title && button.title !== ''
								? button.title
								: `${strCapitalize(button.type)}s`,
						description: button.description ?? undefined,
						href: `/${button.type}`,
						target: '_self',
					} as LinkButton);
				}
				break;

			// Case - referenceButton
			case 'referenceButton':
				// Push to nav
				if (
					((button.title && button.title !== '') ||
						(button.reference?.title && button.reference.title !== '')) &&
					button.reference?.slug?.current
				) {
					nav.push({
						type: 'linkButton',
						name:
							button.title && button.title !== ''
								? button.title
								: button.reference?.title && button.reference.title !== ''
								? button.reference.title
								: 'Link',
						description:
							button.description && button.description !== ''
								? button.description
								: button.reference?.description &&
								  button.reference.description !== ''
								? button.reference.description
								: 'Link',
						href:
							button.reference._type == 'page' &&
							button.reference.slug.current == params?.home
								? '/'
								: button.reference._type == 'page'
								? `/${button.reference.slug.current}`
								: `/${button.reference._type}/${button.reference.slug.current}`,
						target: '_self',
					} as LinkButton);
				}
				break;

			// Case - linkButton
			case 'linkButton':
				// Push to nav
				if (button.href) {
					nav.push({
						type: 'linkButton',
						name: button.title && button.title !== '' ? button.title : 'Link',
						description: button.description ?? undefined,
						href: button.href ?? '#',
						target: button.target,
					} as LinkButton);
				}
				break;

			// Case - default
			default:
				break;
		}
	});

	// Return nav
	return nav;
};

// Function - parseListButtons
export const parseListButtons = (
	buttons: SanityListButtons,
	params?: {
		home?: string;
		pathname?: string;
	}
): ListButtons => {
	// Declare nav
	let nav = [] as ListButtons;

	// Loop through buttons
	buttons.forEach((button, b) => {
		// Switch - _type
		switch (button._type) {
			// Case - archiveButton
			case 'archiveButton':
				// Push to nav
				if (button.type) {
					nav.push({
						type: 'linkButton',
						name:
							button.title && button.title !== ''
								? button.title
								: `${strCapitalize(button.type)}s`,
						description: button.description ?? undefined,
						href: `/${button.type}`,
						target: '_self',
						theme: button.theme ?? 'default',
					} as LinkButton);
				}
				break;

			// Case - referenceButton
			case 'referenceButton':
				// Push to nav
				if (
					((button.title && button.title !== '') ||
						(button.reference?.title && button.reference.title !== '')) &&
					button.reference?.slug?.current
				) {
					nav.push({
						type: 'linkButton',
						name:
							button.title && button.title !== ''
								? button.title
								: button.reference?.title && button.reference.title !== ''
								? button.reference.title
								: 'Link',
						description:
							button.description && button.description !== ''
								? button.description
								: button.reference?.description &&
								  button.reference.description !== ''
								? button.reference.description
								: 'Link',
						href:
							button.reference._type == 'page' &&
							button.reference.slug.current == params?.home
								? '/'
								: button.reference._type == 'page'
								? `/${button.reference.slug.current}`
								: `/${button.reference._type}/${button.reference.slug.current}`,
						target: '_self',
						theme: button.theme ?? 'default',
					} as LinkButton);
				}
				break;

			// Case - linkButton
			case 'linkButton':
				// Push to nav
				if (button.href) {
					nav.push({
						type: 'linkButton',
						name: button.title && button.title !== '' ? button.title : 'Link',
						description: button.description ?? undefined,
						href: button.href ?? '#',
						target: button.target,
						theme: button.theme ?? 'default',
					} as LinkButton);
				}
				break;

			// Case - default
			default:
				break;
		}
	});

	// Return nav
	return nav;
};

// Function - parseListSocial
export const parseListSocial = (buttons: SanityListSocial): ListSocial => {
	// Declare nav
	let nav = [] as ListSocial;

	// Loop through buttons
	buttons.forEach((button, b) => {
		// Switch - _type
		switch (button._type) {
			// Case - buttonNavSocial
			case 'socialButton':
				// Push to nav
				if (button.href) {
					nav.push({
						type: 'socialButton',
						href: button.href ?? '#',
						target: button.target ?? '_blank',
						icon: button.icon ?? 'linkedin',
					});
				}
				break;

			// Case - default
			default:
				break;
		}
	});

	// Return nav
	return nav;
};
