// Component: TheContent
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useEffect } from 'react';

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
import { useUI } from '@/components/base/TheProviderUI';
import { useContent } from '@/components/base/TheProviderContent';
import ListSections from '@/components/sections/ListSections';
import { SectionProjectsArchive as SectionProjects } from '@/components/sections/SectionProjects';
import { SectionPostsArchive as SectionPosts } from '@/components/sections/SectionPosts';
import { SectionHeading1 as SectionHeading } from '@/components/sections/SectionHeading';
import { SectionArticle1 as SectionArticle } from '@/components/sections/SectionArticle';
import { Section404Presenter as Section404 } from '@/components/sections/Section404';

/*---------- Static Data ----------*/

// Name
const name = 'TheContent';



/*---------- Template ----------*/

// Types
export type TheContentProps = {
	children?: React.ReactNode;
};
export type TheArchiveProps = {
	children?: React.ReactNode;
	fetchMore?: () => void;
};
export type TheDocumentProps = {
	listSections?: ListSections;
	children?: React.ReactNode;
};
export type The404Props = {
	children?: React.ReactNode;
};

// Default component
export default function TheContent(props: TheContentProps) {
	/*----- Props -----*/

	// Get props
	const { children } = props;

	/*----- Store -----*/

	// Context - useSection
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	// Context - content
	const content = useContent();
	const { pageType, documentType, settings, page, blocks, archive, fetchMore } =
		content;

	/*----- Lifecycle -----*/

	// On mount...
	useEffect(() => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	}, [cursorTheme, setCursor]);

	/*----- Init -----*/

	// Define sections
	let keysUsed: string[] = [];
	const listSections: ListSections | undefined = blocks?.map((block, b) => {
		// Get type, theme
		const { theme } = block;

		// Get key
		const key =
			block.key && block.key !== ''
				? `${block.key}${keysUsed.includes(block.key) ? `-${block._key}` : ''}`
				: b.toString();
		keysUsed.push(key);

		const section = {
			key,
			theme,
			block,
		};

		// Return default
		return section;
	});

	// Presenter props
	const presenterProps: TheDocumentProps = {
		listSections,
		children,
	};

	// If archive...
	if (pageType === 'archive') {
		// If no archive, return 404
		if (!archive || archive.length === 0) {
			return (
				<The404 {...presenterProps}>
					<Section404 />
				</The404>
			);
		}

		// Return archive
		return (
			<TheArchive {...presenterProps}>
				{documentType === 'project' && (
					<SectionProjects
						title={settings?.projectTitle ?? undefined}
						body={settings?.projectBody ?? undefined}
						projects={archive as SanityProject[]}
					/>
				)}
				{documentType === 'post' && (
					<SectionPosts
						title={settings?.postTitle ?? undefined}
						body={settings?.postBody ?? undefined}
						posts={archive as SanityPost[]}
					/>
				)}
			</TheArchive>
		);
	}

	// If document...
	if (pageType === 'index' || pageType === 'document') {
		// If no page, return 404
		if (!page) {
			return (
				<The404 {...presenterProps}>
					<Section404 />
				</The404>
			);
		}

		// Return document
		return (
			<TheDocument {...presenterProps}>
				{page?._type === 'project' && (
					<SectionHeading
						title={page?.title}
						body={page?.body}
						image={page?.image}
						categories={page?.categories}
						url={page?.url}
						wrapper={{
							paddingBottom: false,
						}}
					/>
				)}
				{page?._type === 'post' && (
					<SectionArticle
						title={page?.title}
						body={page?.body}
						image={page?.image}
						author={page?.author}
						categories={page?.categories}
						wrapper={{
							paddingBottom: false,
						}}
					/>
				)}
			</TheDocument>
		);
	}

	// Return default (404)
	return (
		<The404 {...presenterProps}>
			<Section404 />
		</The404>
	);
}

// TheArchive component
export function TheArchive(props: TheArchiveProps) {
	/*----- Props -----*/

	// Get props
	const { children, fetchMore } = props;

	/*----- Init -----*/

	// Return default
	return <>{children}</>;
}

// TheDocument component
export function TheDocument(props: TheDocumentProps) {
	/*----- Props -----*/

	// Get props
	const { listSections, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<>
			{listSections && listSections.length > 0 ? (
				<ListSections listSections={listSections}>{children}</ListSections>
			) : (
				children
			)}
		</>
	);
}

// The404 component
export function The404(props: The404Props) {
	/*----- Props -----*/

	// Get props
	const { children } = props;

	/*----- Init -----*/

	// Return default
	return <>{children}</>;
}
