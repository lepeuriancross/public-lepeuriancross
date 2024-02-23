// Component: CarouselPostsArticle
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
const name = 'CarouselPostsArticle';

/*---------- Template ----------*/

// Types
export type CarouselPostsArticleProps = {
	component?: 'CarouselPostsGrid' | 'CarouselPostsList';
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};
export type CarouselPostsArticlePresenterProps = {
	title?: string;
	href?: string;
	description?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	className?: string;
};

// Default component
export default function CarouselPostsArticle(props: CarouselPostsArticleProps) {
	/*----- Props -----*/

	// Get props
	const {
		component = 'CarouselPostsGrid',
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
	const presenterProps: CarouselPostsArticlePresenterProps = {
		title,
		href,
		description,
		image,
		className,
	};

	// Return default
	return <CarouselPostsArticlePresenter {...presenterProps} />;
}

// Default component
export function CarouselPostsArticlePresenter(
	props: CarouselPostsArticlePresenterProps
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
					`posts__article space-y-4 group select-none w-screen px-6 md:max-w-[50vw] md:px-0 lg:max-w-[33vw]`,
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
										className="text-left text-4xl line-clamp-2 lg:text-3xl xl:text-4xl"
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
