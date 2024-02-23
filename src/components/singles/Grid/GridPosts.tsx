// Component: GridPosts
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';

// Scripts (node)
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';

// Components (node)
// ...

// Components (local)
import ButtonArchiveView from '@/components/singles/Button/ButtonArchiveView';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import {
	GridPostsArticleProps,
	GridPostsArticleGrid,
	GridPostsArticleList,
} from './_partials/GridPostsArticle';

/*---------- Static Data ----------*/

// Name
const name = 'GridPosts';

/*---------- Template ----------*/

// Types
export type GridPostsProps = {
	component?: 'GridPostsArchive' | 'GridPostsGrid' | 'GridPostsList';
	posts?: SanityPost[];
	className?: string;
};
export type GridPostsPresenterProps = {
	posts?: GridPostsArticleProps[];
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function GridPosts(props: GridPostsProps) {
	/*----- Props -----*/

	// Get props
	const { component, posts, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// If no posts...
	if (!posts) return null;

	// Parse posts
	const parsedPosts = posts.map((post) => {
		// Get post
		const { title, slug, description, image } = post;

		// Return parsed post
		return {
			title,
			href: `/${configCMS.documents.post}/${slug.current}`,
			description,
			image,
		};
	}) as GridPostsArticleProps[];

	// Presenter props
	const presenterProps: GridPostsPresenterProps = {
		posts: parsedPosts,
		themeSection,
		className,
	};

	// Switch component
	switch (component) {
		case 'GridPostsArchive':
			// Return archive
			return <GridPostsArchive {...presenterProps} />;
		case 'GridPostsGrid':
			// Return document
			return <GridPostsGrid {...presenterProps} />;
		case 'GridPostsList':
		default:
			// Return document
			return <GridPostsList {...presenterProps} />;
	}
}

// GridPostsArchive component
export function GridPostsArchive(props: GridPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { posts, themeSection = 'default', className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { contentPostsView } = ui;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(`posts space-y-8 lg:space-y-16`, className)}
			data-name={name}
		>
			<div className="posts__heading relative border rounded-md px-6 py-4 overflow-hidden border-white/30">
				<div className="posts__heading-bg absolute top-0 left-0 w-full h-full bg-current opacity-10"></div>
				<div className="posts__heading-container relative z-20 flex justify-center items-center">
					<ButtonArchiveView archiveType="posts" />
				</div>
			</div>
			{contentPostsView ? (
				<AosWrapper
					className={classNames(
						`posts__row divide-y`,
						themeSection === 'primary'
							? 'divide-white/10'
							: themeSection === 'secondary'
							? 'divide-white/10'
							: themeSection === 'tertiary'
							? 'divide-white/10'
							: themeSection === 'white'
							? 'divide-black/10'
							: 'divide-white/10'
					)}
					animation="fade-left"
					duration={0.5}
					stagger={0.1}
				>
					{posts?.map((post, p) => (
						<GridPostsArticleList
							key={`grid-posts-article--list-item${p}`}
							{...post}
						/>
					))}
				</AosWrapper>
			) : (
				<AosWrapper
					className="posts__container grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
					animation="fade-left"
					duration={0.5}
					stagger={0.1}
				>
					{posts?.map((post, p) => (
						<GridPostsArticleGrid
							key={`grid-posts-article-grid-item${p}`}
							{...post}
						/>
					))}
				</AosWrapper>
			)}
		</div>
	);
}

// GridPostsGrid component
export function GridPostsGrid(props: GridPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { posts, themeSection = 'default', className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`posts`, className)} data-name={name}>
			<AosWrapper
				className="posts__container grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
				animation="fade-left"
				duration={0.5}
				stagger={0.1}
			>
				{posts?.map((post, p) => (
					<GridPostsArticleGrid
						key={`grid-posts-article-link-${p}`}
						{...post}
					/>
				))}
			</AosWrapper>
		</div>
	);
}

// GridPostsList component
export function GridPostsList(props: GridPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { posts, themeSection = 'default', className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`posts`, className)} data-name={name}>
			<AosWrapper
				className={classNames(
					`posts__row divide-y`,
					themeSection === 'primary'
						? 'divide-white/10'
						: themeSection === 'secondary'
						? 'divide-white/10'
						: themeSection === 'tertiary'
						? 'divide-white/10'
						: themeSection === 'white'
						? 'divide-black/10'
						: 'divide-white/10'
				)}
				animation="fade-left"
				duration={0.5}
				stagger={0.1}
			>
				{posts?.map((post, p) => (
					<GridPostsArticleList
						key={`grid-posts-article--list-item${p}`}
						{...post}
					/>
				))}
			</AosWrapper>
		</div>
	);
}
