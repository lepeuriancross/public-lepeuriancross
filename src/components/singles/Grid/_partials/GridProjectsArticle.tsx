// Component: GridProjectsArticle
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
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';

/*---------- Static Data ----------*/

// Name
const name = 'GridProjectsArticle';

/*---------- Template ----------*/

// Types
export type GridProjectsArticleProps = {
	component?: 'GridProjectsGrid' | 'GridProjectsList';
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};
export type GridProjectsArticlePresenterProps = {
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};

// Default component
export default function GridProjectsArticle(props: GridProjectsArticleProps) {
	/*----- Props -----*/

	// Get props
	const {
		component = 'GridProjectsGrid',
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

	/*----- Init -----*/

	// If no href, return null
	if (!href) return null;

	// Presenter props
	const presenterProps: GridProjectsArticlePresenterProps = {
		title,
		href,
		description,
		image,
		className,
	};

	// Switch - component
	switch (component) {
		case 'GridProjectsList':
			// Return archive
			return <GridProjectsArticleList {...presenterProps} />;
		case 'GridProjectsGrid':
		default:
			// Return document
			return <GridProjectsArticleGrid {...presenterProps} />;
	}
}

// GridProjectsArticleGrid component
export function GridProjectsArticleGrid(
	props: GridProjectsArticlePresenterProps
) {
	/*----- Props -----*/

	// Get props
	const { title, href, description, image, className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = () => {
		// If cursorTheme isn't default...
		if (pathname !== href && cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-project');
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
					`projects__article space-y-4 group select-none`,
					className
				)}
				onClick={handleClick}
				onMouseMove={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				data-name={name}
			>
				{image && (
					<div className="projects__article-image relative w-full border rounded-md overflow-hidden duration-500 ease-out border-white/30 lg:hover:border-white">
						<span className="projects__article-image-spacer relative z-10 block pt-[60%]" />
						{image && (
							<ImageBuilder
								className="projects__article-img absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out lg:group-hover:scale-105"
								image={image}
							/>
						)}
					</div>
				)}
				<div className="projects__article-info flex justify-between items-center">
					{title && (
						<TextSubtitle
							subtitle={title}
							className="text-left transform translate-x-6 transition-transform duration-500 ease-out lg:group-hover:translate-x-0"
						/>
					)}
					<ArrowLongRightIcon className="w-6 h-6 transform -translate-x-6 transition-transform duration-500 ease-out lg:group-hover:translate-x-0" />
				</div>
			</article>
		</Link>
	);
}

// GridProjectsArticleList component
export function GridProjectsArticleList(
	props: GridProjectsArticlePresenterProps
) {
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
		if (pathname !== href && cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-project');
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
					`projects__article relative h-[80px] group select-none overflow-hidden`,
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
					<div className="projects__article-image absolute z-20 top-0 left-0 transform translate-y-full w-[100px] h-full transition-transform duration-500 ease-out lg:group-hover:translate-y-0 lg:group-hover:delay-100">
						{image && (
							<ImageBuilder
								className="projects__article-img absolute inset-0 w-full h-full object-cover object-center"
								image={image}
							/>
						)}
					</div>
				)}
				<div
					className={classNames(
						`projects__article-info relative z-30 flex justify-between items-center h-full space-x-6 transition-size duration-500 delay-100`,
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
