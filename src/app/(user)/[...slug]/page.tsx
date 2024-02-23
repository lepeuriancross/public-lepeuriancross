// Component: PageSub
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';
import { staticMetadata } from '@/data/content';

// Scripts (node)
import type { Metadata, ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';

// Scripts (local)
import { strCapitalize } from '@/lib/utils';
import { getRouteParams } from '@/lib/router';
import { getPage, getImage } from '@/sanity/lib/utils';

// Components (node)
// ...

// Components (local)
import ThePageTransition from '@/components/base/ThePageTransition';
import TheProviderContent from '@/components/base/TheProviderContent';
import TheContent from '@/components/base/TheContent';

// Images
import imgDefault from '../../../../public/img/image/image_profile-1-compressed.jpg';

/*---------- Static Data ----------*/

// Name
const name = 'PageSub';

// Force dynamic
export const dynamic = 'force-dynamic';

/*---------- Metadata ----------*/

// Types
type PageIndexMetadataProps = {
	params: {
		slug: string[];
	};
	searchParams: {
		lastId?: string;
	};
};

// Default metadata
export async function generateMetadata(
	props: PageIndexMetadataProps
): Promise<Metadata> {
	/*----- Props -----*/

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Get props
	const { params, searchParams } = props;

	// Get params
	const { slug } = params;

	// Get search params
	const { lastId } = searchParams;

	// Get route params
	const routeParams = getRouteParams(slug);

	// If archive...
	if (routeParams._type === 'archive') {
		// Fetch archive content
		const result = await getPage(
			'archive',
			{
				documentType: routeParams.documentType,
				lastId,
			},
			preview
		);

		// Get imgMetadata as string
		const image =
			result.mainSettings?.homepage?.image ?? result.mainSettings?.image;
		const imgMetadata =
			image && typeof image === 'object' && image._type
				? getImage(image as SanityImage, preview)
				: image && typeof image === 'object' && !image._type
				? image.src
				: image && typeof image === 'string'
				? image
				: imgDefault.src;

		// Return archive metadata
		return {
			title: `${
				routeParams.documentType === 'product'
					? result.mainSettings?.productTitle ??
					  `${configCMS.documents.product} Index`
					: routeParams.documentType === 'project'
					? result.mainSettings?.projectTitle ??
					  `${configCMS.documents.project} Index`
					: routeParams.documentType === 'post'
					? result.mainSettings?.postTitle ??
					  `${configCMS.documents.post} Index`
					: 'Index'
			} | ${result.mainSettings?.title ?? staticMetadata.title}`,
			openGraph: {
				images: [imgMetadata],
			},
		};
	}

	// If document...
	if (routeParams._type === 'document' && routeParams.params.slug) {
		// Fetch Index content
		const result = await getPage(
			'document',
			{
				documentType: routeParams.documentType,
				slug: routeParams.params.slug,
				lastId,
			},
			preview
		);

		// Get imgMetadata as string
		const image = result.pageSettings?.image ?? result.mainSettings?.image;
		const imgMetadata =
			image && typeof image === 'object' && image._type
				? getImage(image as SanityImage, preview)
				: image && typeof image === 'object' && !image._type
				? image.src
				: image && typeof image === 'string'
				? image
				: imgDefault.src;

		// Return document metadata
		return {
			title: `${
				routeParams.documentType === 'page'
					? (result.pageSettings?.title ??
							strCapitalize(configCMS.documents.product)) + ' | '
					: routeParams.documentType === 'product'
					? (result.pageSettings?.title ??
							strCapitalize(configCMS.documents.project)) + ' | '
					: routeParams.documentType === 'project'
					? (result.pageSettings?.title ??
							strCapitalize(configCMS.documents.project)) + ' | '
					: routeParams.documentType === 'post'
					? (result.pageSettings?.title ??
							strCapitalize(configCMS.documents.post)) + ' | '
					: ''
			}${result.mainSettings?.title ?? staticMetadata.title}`,
			openGraph: {
				images: [imgMetadata],
			},
		};
	}

	// Fetch Index content
	const result = await getPage('indexMetadata', { lastId }, preview);

	// Get imgMetadata as string
	const imgMetadata = imgDefault.src;

	// Return Metadata
	return {
		title: result.mainSettings?.homepage?.title ?? staticMetadata.title,
		openGraph: {
			images: [imgMetadata],
		},
	};
}

/*---------- Template ----------*/

// Types
export type PageSubProps = {
	params: {
		slug: string[];
	};
	searchParams: {
		lastId?: string;
	};
};

// Default component
export default async function Home(props: PageSubProps) {
	/*----- Props -----*/

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Get props
	const { params, searchParams } = props;

	// Get params
	const { slug } = params;

	// Get search params
	const { lastId } = searchParams;

	// Get route params
	const routeParams = getRouteParams(slug);

	// If archive...
	if (routeParams._type === 'archive') {
		// Fetch archive content
		const result = await getPage(
			'archive',
			{
				documentType: routeParams.documentType,
				lastId,
			},
			preview
		);

		// Return archive
		return (
			<ThePageTransition>
				<TheProviderContent
					pageType="archive"
					documentType={routeParams.documentType}
					result={result}
				>
					<TheContent />
				</TheProviderContent>
			</ThePageTransition>
		);
	}

	// If document...
	if (routeParams._type === 'document' && routeParams.params.slug) {
		// Fetch Index content
		const result = await getPage(
			'document',
			{
				documentType: routeParams.documentType,
				slug: routeParams.params.slug,
				lastId,
			},
			preview
		);

		// Return document
		return (
			<ThePageTransition>
				<TheProviderContent
					pageType="document"
					documentType={routeParams.documentType}
					result={result}
				>
					<TheContent />
				</TheProviderContent>
			</ThePageTransition>
		);
	}

	// Fetch Index content
	const result = await getPage('404', { lastId }, preview);

	// Return default
	return (
		<ThePageTransition>
			<TheProviderContent pageType="404" result={result}>
				<TheContent />
			</TheProviderContent>
		</ThePageTransition>
	);
}
