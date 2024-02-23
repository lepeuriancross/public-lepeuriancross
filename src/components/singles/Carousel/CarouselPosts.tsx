// Component: CarouselPosts
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';

// Scripts (node)
import {
	Children,
	useRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
// ...

// Components (local)
import EmblaCarousel from '@/components/utility/Carousel/EmblaCarousel';

import {
	CarouselPostsArticleProps,
	CarouselPostsArticlePresenter,
} from './_partials/CarouselPostsArticle';
/*---------- Static Data ----------*/

// Name
const name = 'CarouselPosts';

// Carousel options
const carouselOptions = {
	loop: true,
	speed: 10,
	autoplay: false,
	autoplaySpeed: 10000,
};

/*---------- Template ----------*/

// Types
export type CarouselPostsProps = {
	posts?: SanityPost[];
	className?: string;
};
export type CarouselPostsPresenterProps = {
	posts?: CarouselPostsArticleProps[];
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
function CarouselPosts(props: CarouselPostsProps, ref: any) {
	/*----- Props -----*/

	// Get props
	const { posts, className } = props;

	/*----- Refs -----*/

	// Ref - carouselEl
	const carouselEl = useRef<any>(null);

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Methods -----*/

	// Function - scrollPrev
	const scrollPrev = useCallback(
		() => carouselEl.current && carouselEl.current.scrollPrev(),
		[carouselEl]
	);

	// Function - scrollNext
	const scrollNext = useCallback(() => {
		carouselEl.current && carouselEl.current.scrollNext();
	}, [carouselEl]);

	// Function - scrollTo
	const scrollTo = useCallback(
		(index: number) => carouselEl && carouselEl.current.scrollTo(index),
		[carouselEl]
	);

	// Expose custom handles as a ref
	useImperativeHandle(ref, () => ({
		scrollPrev,
		scrollNext,
		scrollTo,
	}));

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
	}) as CarouselPostsArticleProps[];

	// Presenter props
	const presenterProps: CarouselPostsPresenterProps = {
		posts: parsedPosts,
		themeSection,
		className,
	};

	// Return default
	return <CarouselPostsPresenter ref={carouselEl} {...presenterProps} />;
}
export default forwardRef(CarouselPosts);

// CarouselPostsPresenter component
export const CarouselPostsPresenter = forwardRef(function CarouselPostsRef(
	props: CarouselPostsPresenterProps,
	ref: any
) {
	/*----- Props -----*/

	// Get props
	const { posts, themeSection = 'default', className } = props;

	/*----- Refs -----*/

	// Ref - carouselEl
	const carouselEl = useRef<any>(null);

	/*----- Methods -----*/

	// Function - scrollPrev
	const scrollPrev = useCallback(
		() => carouselEl.current && carouselEl.current.scrollPrev(),
		[carouselEl]
	);

	// Function - scrollNext
	const scrollNext = useCallback(() => {
		carouselEl.current && carouselEl.current.scrollNext();
	}, [carouselEl]);

	// Function - scrollTo
	const scrollTo = useCallback(
		(index: number) => carouselEl && carouselEl.current.scrollTo(index),
		[carouselEl]
	);

	// Expose custom handles as a ref
	useImperativeHandle(ref, () => ({
		scrollPrev,
		scrollNext,
		scrollTo,
	}));

	/*----- Init -----*/

	// Return default
	return (
		<>
			<EmblaCarousel ref={carouselEl} options={carouselOptions}>
				{posts?.map((post, p) => (
					<CarouselPostsArticlePresenter
						key={`grid-posts-article-link-${p}`}
						{...post}
					/>
				))}
			</EmblaCarousel>
		</>
	);
});
