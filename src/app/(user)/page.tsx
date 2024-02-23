// Component: PageIndex
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
import type { Metadata, ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';

// Scripts (local)
import { getPage, getImage } from '@/sanity/lib/utils';

// Components (node)
// ...

// Components (local)
import ThePageTransition from '@/components/base/ThePageTransition';
import TheProviderContent from '@/components/base/TheProviderContent';
import TheContent from '@/components/base/TheContent';

// Images
import imgDefault from '../../../public/img/image/image_profile-1-compressed.jpg';

/*---------- Static Data ----------*/

// Name
const name = 'PageIndex';

// Force dynamic
export const dynamic = 'force-dynamic';

/*---------- Metadata ----------*/

// Types
type PageIndexMetadataProps = {
	searchParams: {
		lastId?: string;
	};
};

// Default metadata
export async function generateMetadata(
	props: PageIndexMetadataProps
): Promise<Metadata> {
	/*----- Props -----*/

	// Get props
	const { searchParams } = props;

	// Get search params
	const { lastId } = searchParams;

	/*----- Init -----*/

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Fetch Index content
	const result = await getPage('indexMetadata', { lastId }, preview);

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

	// Return Metadata
	return {
		title: result.mainSettings?.title ?? staticMetadata.title,
		openGraph: {
			images: [imgMetadata],
		},
	};
}

/*---------- Template ----------*/

// Types
export type PageIndexProps = {
	searchParams: {
		lastId?: string;
	};
};

// Default component
export default async function Home(props: PageIndexProps) {
	/*----- Props -----*/

	// Get props
	const { searchParams } = props;

	// Get search params
	const { lastId } = searchParams;

	/*----- Init -----*/

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Fetch Index content
	const result = await getPage('index', { lastId }, preview);

	// Return default
	return (
		<ThePageTransition>
			<TheProviderContent pageType="index" documentType="page" result={result}>
				<TheContent />
			</TheProviderContent>
		</ThePageTransition>
	);
}
