// Component: GridPostsArticle
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { usePathname } from 'next/navigation';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

// Components (local)
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';

/*---------- Static Data ----------*/

// Name
const name = 'GridPostsArticle';

/*---------- Template ----------*/

// Types
export type GridPostsArticleProps = {
	component?: 'GridPostsGrid' | 'GridPostsList';
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};
export type GridPostsArticlePresenterProps = {
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};

// Default component
export default function GridPostsArticle(props: GridPostsArticleProps) {
	/*----- Props -----*/

	// Get props
	const {
		component = 'GridPostsGrid',
		title,
		href,
		description,
		image,
		className,
	} = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	// Context - useSection
	// const section = useSection();
	// const themeSection = section.theme;

	/*----- Methods -----*/

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-post');
		}
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	}

	/*----- Init -----*/

	// If no href, return null
	if (!href) return null;

	// Presenter props
	const presenterProps: GridPostsArticlePresenterProps = {
		title,
		href,
		description,
		image,
		className,
	};

	// Switch - component
	switch (component) {
		case 'GridPostsList':
			// Return archive
			return <GridPostsArticleList {...presenterProps} />;
		case 'GridPostsGrid':
		default:
			// Return document
			return <GridPostsArticleGrid {...presenterProps} />;
	}
}

// Default component
export function GridPostsArticleGrid(props: GridPostsArticlePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, href, description, image, className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	// Context - useSection
	// const section = useSection();
	// const themeSection = section.theme;

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = () => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-post');
		}
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	}

	/*----- Init -----*/

	// If no href, return null
	if (!href) return null;

	// Return default
	return (
		<Link
			className={classNames(
				`transition-opacity duration-300 ease-out`,
				pathname === href && 'pointer-events-none opacity-50'
			)}
			href={href}
		>
			<article
				className={classNames(
					`posts__article space-y-4 group select-none`,
					className
				)}
				onClick={handleClick}
				onMouseMove={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{image && (
					<div className="posts__article-image relative w-full border rounded-md overflow-hidden transition-all duration-500 ease-out border-white/30 lg:hover:border-white">
						<span className="posts__article-image-spacer relative z-10 block pt-[60%]" />
						{image && (
							<ImageBuilder
								className="posts__article-img absolute z-20 inset-0 w-full h-full object-cover object-center opacity-0 transition-all duration-500 ease-out lg:group-hover:scale-105 lg:group-hover:opacity-50"
								image={image}
							/>
						)}
						<div className="posts__article-info absolute z-30 top-0 left-0 w-full h-full overflow-y-auto">
							<div className="posts__article-info-track flex flex-col justify-between w-full min-h-full p-6 lg:p-8">
								{title && (
									<TextTitle
										className="text-left text-3xl lg:text-4xl"
										title={title}
									/>
								)}
								{description && (
									<TextBody
										body={description}
										className="text-left line-clamp-2 lg:line-clamp-3"
									/>
								)}
							</div>
						</div>
					</div>
				)}
			</article>
		</Link>
	);
}

// GridPostsArticleList component
export function GridPostsArticleList(props: GridPostsArticlePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, href, description, image, className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = () => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-post');
		}
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	}

	/*----- Init -----*/

	// If no href, return null
	if (!href) return null;

	// Return default
	return (
		<Link
			className={classNames(
				`transition-opacity duration-300 ease-out`,
				pathname === href && 'pointer-events-none opacity-50'
			)}
			href={href}
		>
			<article
				className={classNames(
					`posts__article relative h-[80px] group select-none overflow-hidden`,
					className
				)}
				onClick={handleClick}
				onMouseMove={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				data-name={name}
			>
				<div
					className={classNames(
						`posts__article-bg absolute z-10 top-0 left-0 transform translate-y-full w-full h-full transition-transform duration-500 ease-out lg:group-hover:translate-y-0 lg:group-hover:delay-100`,
						themeSection === 'primary'
							? 'bg-white/10'
							: themeSection === 'secondary'
							? 'bg-white/10'
							: themeSection === 'tertiary'
							? 'bg-white/10'
							: themeSection === 'white'
							? 'bg-black/10'
							: 'bg-white/10'
					)}
				/>
				{image && (
					<div className="posts__article-image absolute z-20 top-0 left-0 transform translate-y-full w-[100px] h-full transition-transform duration-500 ease-out lg:group-hover:translate-y-0 lg:group-hover:delay-100">
						{image && (
							<ImageBuilder
								className="posts__article-img absolute inset-0 w-full h-full object-cover object-center"
								image={image}
							/>
						)}
					</div>
				)}
				<div
					className={classNames(
						`posts__article-info relative z-30 flex justify-between items-center h-full space-x-6 transition-size duration-500 delay-100`,
						image && 'lg:group-hover:pl-[100px] lg:group-hover:delay-0'
					)}
				>
					{title && (
						<TextSubtitle
							subtitle={title}
							className={classNames(
								`text-left transition-size duration-500 delay-100`,
								image && 'lg:group-hover:pl-6 lg:group-hover:delay-0'
							)}
						/>
					)}
					<ArrowLongRightIcon className="w-6 h-6" />
				</div>
			</article>
		</Link>
	);
}
