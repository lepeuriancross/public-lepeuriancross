// Component: TheProviderContent
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Scripts (local)
import { AppDispatch } from '@/redux';
import {
	setNavHomeSlug,
	setNavHeader,
	setNavFooter,
	setNavSocial,
	setContactTel,
	setContactEmail,
} from '@/redux/slices/sliceGlobals';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TheProviderContent';

// Environment
const env =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

/*---------- Context ----------*/

// Types
export type TheContextContentProps = {
	pageType?: ThemePage;
	documentType?: SanityThemeDocument;
	settings?: SanityMainSettings;
	page?:
		| SanityPage
		| SanityProduct
		| SanityProject
		| SanityPost
		| SanityAuthor
		| SanityCategory;
	blocks?: SanityListBlocks;
	archive?: SanityListArchive;

	isLoading?: boolean;
	fetchMore?: () => Promise<void>;
	fetchParams?: {
		lastId?: string;
	};
};

// Context
const TheContextContent = createContext<TheContextContentProps>({
	pageType: '404',
	documentType: undefined,
	settings: undefined,
	page: undefined,
	blocks: undefined,
	archive: undefined,

	isLoading: false,
	fetchMore: async () => {},
});

// Functions
export const useContent = () => useContext(TheContextContent);

/*---------- Template ----------*/

// Types
export type TheProviderContentProps = {
	pageType: ThemePage;
	documentType?: SanityThemeDocument;
	slug?: string;
	result?: SanityResult;
	children?: React.ReactNode;
};

// Default component
export default function TheProviderContent(props: TheProviderContentProps) {
	/*----- Props -----*/

	// Get props
	const { pageType = '404', documentType, slug, result, children } = props;

	// Get result
	const { mainSettings, pageSettings, listBlocks, listArchive } = result || {};

	/*----- Store -----*/

	// State - archive
	const [archive, setArchive] = useState<SanityListArchive | undefined>(
		listArchive ?? undefined
	);

	// State - isLoading
	const [isLoading, setIsLoadingMoreArchive] = useState<boolean>(false);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Methods -----*/

	// Method - fetchMore
	// Fetches additional pages from a paginated archive
	const fetchMore = async () => {
		// Return promise
		return new Promise<void>((resolve, reject) => {
			// Is loading...
			setIsLoadingMoreArchive(true);

			// Get next page
			// ...

			// Is done
			setIsLoadingMoreArchive(false);

			// Reject
			reject();
		});
	};

	/*----- Lifecycle -----*/

	// Watch - mainSettings
	useLayoutEffect(() => {
		// If mainSettings...
		if (mainSettings) {
			// If development mode...
			if (env === 'development') {
				// Log
				console.log('Updated mainSettings: ', mainSettings);
			}
		}

		// If navHomeSlug...
		const navHomeSlug = mainSettings?.homepage?.slug?.current;
		if (navHomeSlug) {
			// Set - globals/navHomeSlug
			dispatch(setNavHomeSlug(navHomeSlug));
		}

		// If navHeader...
		if (mainSettings?.navHeader && mainSettings.navHeader.length > 0) {
			// Set - globals/navHeader
			dispatch(setNavHeader(mainSettings.navHeader));
		}

		// If navFooter...
		if (mainSettings?.navFooter && mainSettings.navFooter.length > 0) {
			// Set - globals/navFooter
			dispatch(setNavFooter(mainSettings.navFooter));
		}

		// If navSocial...
		if (mainSettings?.navSocial && mainSettings.navSocial.length > 0) {
			// Set - globals/navSocial
			dispatch(setNavSocial(mainSettings.navSocial));
		}

		// If contactTel...
		if (mainSettings?.contactTel) {
			// Set - globals/contactTel
			dispatch(setContactTel(mainSettings.contactTel));
		}

		// If contactEmail...
		if (mainSettings?.contactEmail) {
			// Set - globals/contactEmail
			dispatch(setContactEmail(mainSettings.contactEmail));
		}
	}, [mainSettings, dispatch]);

	// Watch - pageSettings
	useLayoutEffect(() => {
		// If pageSettings...
		if (pageSettings) {
			// If development mode...
			if (env === 'development') {
				// Log
				console.log('Updated pageSettings: ', pageSettings);
			}
		}
	}, [pageSettings]);

	// Watch - listBlocks
	useLayoutEffect(() => {
		// If listBlocks...
		if (listBlocks && listBlocks.length > 0) {
			// If development mode...
			if (env === 'development') {
				// Log
				console.log('Updated listBlocks: ', listBlocks);
			}
		}
	}, [listBlocks]);

	// Watch - listArchive
	useLayoutEffect(() => {
		// If listArchive...
		if (listArchive && listArchive.length > 0) {
			// If development mode...
			if (env === 'development') {
				// Log
				console.log('Updated listArchive: ', listArchive);
			}
		}

		// Set - archive
		setArchive(listArchive);
	}, [listArchive]);

	/*----- Init -----*/

	// Return default
	return (
		<TheContextContent.Provider
			value={{
				pageType,
				documentType,
				settings: mainSettings ?? undefined,
				page: pageSettings ?? undefined,
				blocks: listBlocks ?? undefined,
				archive,

				isLoading,
				fetchMore,
			}}
		>
			{children}
		</TheContextContent.Provider>
	);
}
