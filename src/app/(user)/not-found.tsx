// Component: Page404
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { draftMode } from 'next/headers';

// Scripts (local)
import { getPage } from '@/sanity/lib/utils';

// Components (node)
// ...

// Components (local)
import ThePageTransition from '@/components/base/ThePageTransition';
import TheProviderContent from '@/components/base/TheProviderContent';
import TheContent from '@/components/base/TheContent';

/*---------- Static Data ----------*/

// Name
const name = 'Page404';

/*---------- Template ----------*/

// Types
export type Page404Props = {};

// Force dynamic
export const dynamic = 'force-dynamic';

// Default component
export default async function Home(props: Page404Props) {
	/*----- Props -----*/

	// ...

	/*----- Init -----*/

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Fetch Index content
	const result = await getPage('404', {}, preview);

	// Return default
	return (
		<ThePageTransition>
			<TheProviderContent pageType="index" documentType="page" result={result}>
				<TheContent />
			</TheProviderContent>
		</ThePageTransition>
	);
}
