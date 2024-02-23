// Component: SectionPosts
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useRef } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import NavButtons from '@/components/singles/Nav/NavButtons';
import GridPosts from '@/components/singles/Grid/GridPosts';
import CarouselPosts from '@/components/singles/Carousel/CarouselPosts';
import SectionWrapper from './_partials/SectionWrapper';
import { ButtonIcon } from '../singles/Button/ButtonDefault';

/*---------- Static Data ----------*/

// Name
const name = 'SectionPosts';

/*---------- Template ----------*/

// Types
export type SectionPostsProps = {
	idx?: number;
	settings?: SanityBlockPosts;
	className?: string;
};
export type SectionPostsPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	buttons?: SanityListButtons;
	posts?: SanityPost[];
	wrapper?: {
		idx?: number;
		paddingTop?: boolean;
		paddingSides?: boolean;
		paddingBottom?: boolean;
		isCard?: boolean;
		isFlipped?: boolean;
		theme?: ThemeSection;
		className?: string;
	};
};

// Default component
export default function SectionPosts(props: SectionPostsProps) {
	/*----- Props -----*/

	// Get props
	const { idx, settings, className } = props;

	/*----- Init -----*/

	// Define wrapper props
	const wrapper = {
		idx,
		name,
		paddingTop: props?.settings?.paddingTop ?? true,
		paddingSides: props?.settings?.paddingSides ?? true,
		paddingBottom: props?.settings?.paddingBottom ?? true,
		isCard: props?.settings?.isCard ?? false,
		isFlipped: props?.settings?.isFlipped ?? false,
		theme: props?.settings?.theme ?? 'default',
		className: classNames(props?.settings?.className, props?.className),
	};

	// Presenter props
	const presenterProps: SectionPostsPresenterProps = {
		title: settings?.title,
		body: settings?.body,
		buttons: settings?.buttons,
		posts: settings?.posts,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionPosts3
		case 'section-posts-3':
			return <SectionPosts3 {...presenterProps} />;

		// Case - SectionPosts2
		// case 'section-posts-2':
		// 	return <SectionPosts2 {...presenterProps} />;

		// Case - SectionPosts1
		case 'section-posts-1':
		default:
			return <SectionPosts1 {...presenterProps} />;
	}
}

// SectionPostsArchive component
export function SectionPostsArchive(props: SectionPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, posts, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 lg:text-left">
					{(title || subtitle || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{subtitle && (
								<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
									<TextSubtitle as="h3" subtitle={subtitle} />
								</div>
							)}
							{title && (
								<div className="section__title text-[14vw] md:text-[10vw] lg:text-[100px]">
									<TextTitle as="h2" title={title} />
								</div>
							)}
							{buttons && (
								<div className="section__buttons">
									<NavButtons className="hidden lg:block" buttons={buttons} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
				<div className="section__col space-y-10 lg:text-right">
					{(body || buttons) && (
						<TextWrapper className="mx-auto space-y-4 lg:max-w-96 lg:mr-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{buttons && (
								<NavButtons
									className="w-full justify-center pt-8 lg:hidden"
									buttons={buttons}
								/>
							)}
						</TextWrapper>
					)}
				</div>
			</div>
			{posts && posts.length > 0 && (
				<div className="section__row">
					<GridPosts component="GridPostsArchive" posts={posts} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionPosts1 component (grid)
export function SectionPosts1(props: SectionPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, posts, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 lg:text-left">
					{(title || subtitle || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{subtitle && (
								<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
									<TextSubtitle as="h3" subtitle={subtitle} />
								</div>
							)}
							{title && (
								<div className="section__title text-[14vw] md:text-[10vw] lg:text-[100px]">
									<TextTitle as="h2" title={title} />
								</div>
							)}
							{buttons && (
								<div className="section__buttons">
									<NavButtons className="hidden lg:block" buttons={buttons} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
				<div className="section__col space-y-10 lg:text-right">
					{(body || buttons) && (
						<TextWrapper className="mx-auto space-y-4 lg:max-w-96 lg:mr-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{buttons && (
								<NavButtons
									className="w-full justify-center pt-8 lg:hidden"
									buttons={buttons}
								/>
							)}
						</TextWrapper>
					)}
				</div>
			</div>
			{posts && posts.length > 0 && (
				<div className="section__row">
					<GridPosts component="GridPostsGrid" posts={posts} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionPosts2 component (list)
export function SectionPosts2(props: SectionPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, posts, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 lg:text-left">
					{(title || subtitle || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{subtitle && (
								<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
									<TextSubtitle as="h3" subtitle={subtitle} />
								</div>
							)}
							{title && (
								<div className="section__title text-[14vw] md:text-[10vw] lg:text-[100px]">
									<TextTitle as="h2" title={title} />
								</div>
							)}
							{buttons && (
								<div className="section__buttons">
									<NavButtons className="hidden lg:block" buttons={buttons} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
				<div className="section__col space-y-10 lg:text-right">
					{(body || buttons) && (
						<TextWrapper className="mx-auto space-y-4 lg:max-w-96 lg:mr-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{buttons && (
								<NavButtons
									className="w-full justify-center pt-8 lg:hidden"
									buttons={buttons}
								/>
							)}
						</TextWrapper>
					)}
				</div>
			</div>
			{posts && posts.length > 0 && (
				<div className="section__row">
					<GridPosts component="GridPostsList" posts={posts} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionPosts3 component (carousel)
export function SectionPosts3(props: SectionPostsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, posts, wrapper = {} } = props;

	/*----- Refs -----*/

	// Ref - carouselEl
	const carouselEl = useRef<any>(null);

	/*----- Methods -----*/

	// Function - handleClickPrev
	const handleClickPrev = () => {
		carouselEl.current.scrollPrev();
	};

	// Function - handleClickNext
	const handleClickNext = () => {
		carouselEl.current.scrollNext();
	};

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...{ ...wrapper, paddingSides: false }}>
			<div
				className={classNames(
					`section__row`,
					wrapper.paddingSides && 'px-6 lg:px-8'
				)}
			>
				<div
					className={classNames(
						`section__row-inner grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16`,
						wrapper.paddingSides && 'container mx-auto'
					)}
				>
					<div className="section__col space-y-10 lg:text-left">
						{(title || subtitle || buttons) && (
							<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
								{subtitle && (
									<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
										<TextSubtitle as="h3" subtitle={subtitle} />
									</div>
								)}
								{title && (
									<div className="section__title text-[14vw] md:text-[10vw] lg:text-[100px]">
										<TextTitle as="h2" title={title} />
									</div>
								)}
								{buttons && (
									<div className="section__buttons">
										<NavButtons className="hidden lg:block" buttons={buttons} />
									</div>
								)}
							</TextWrapper>
						)}
					</div>
					<div
						className={classNames(
							`section__col flex flex-col justify-between space-y-10 lg:text-right`,
							!body && !buttons && 'hidden lg:flex'
						)}
					>
						<TextWrapper className="mx-auto space-y-4 lg:max-w-96 lg:mr-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{buttons && (
								<NavButtons
									className="w-full justify-center pt-8 lg:hidden"
									buttons={buttons}
								/>
							)}
							<div className="section__arrows hidden justify-end space-x-4 lg:flex">
								<ButtonIcon
									name="Previous"
									icon={<ArrowLeftIcon className="w-6 h-6" />}
									onClick={handleClickPrev}
								/>
								<ButtonIcon
									name="Previous"
									icon={<ArrowRightIcon className="w-6 h-6" />}
									onClick={handleClickNext}
								/>
							</div>
						</TextWrapper>
					</div>
				</div>
			</div>
			{posts && posts.length > 0 && (
				<div className="section__row">
					<CarouselPosts ref={carouselEl} posts={posts} />
				</div>
			)}
			<div className="section__row lg:hidden">
				<div className="section__col">
					<div className="section__arrows flex justify-center space-x-4">
						<ButtonIcon
							name="Previous"
							icon={<ArrowLeftIcon className="w-6 h-6" />}
							onClick={handleClickPrev}
						/>
						<ButtonIcon
							name="Previous"
							icon={<ArrowRightIcon className="w-6 h-6" />}
							onClick={handleClickNext}
						/>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}
