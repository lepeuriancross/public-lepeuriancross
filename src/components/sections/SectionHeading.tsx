// Component: SectionHeading
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames, numPad } from '@/lib/utils';

// Components (node)
import { LinkIcon } from '@heroicons/react/24/solid';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextBody from '@/components/singles/Text/TextBody';
import NavButtons from '@/components/singles/Nav/NavButtons';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import SectionWrapper from './_partials/SectionWrapper';
import NavCategories from '../singles/Nav/NavCategories';
import Link from 'next/link';
import ImageParallax from '../singles/Image/ImageParallax';

/*---------- Static Data ----------*/

// Name
const name = 'SectionHeading';

/*---------- Template ----------*/

// Types
export type SectionHeadingProps = {
	idx?: number;
	settings?: SanityBlockHeading;
	className?: string;
};
export type SectionHeadingPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	categories?: SanityCategory[];
	url?: string;
	buttons?: SanityListButtons;
	isFlipped?: boolean;
	wrapper?: {
		idx?: number;
		paddingTop?: boolean;
		paddingSides?: boolean;
		paddingBottom?: boolean;
		isCard?: boolean;
		theme?: ThemeSection;
		className?: string;
	};
};

// Default component
export default function SectionHeading(props: SectionHeadingProps) {
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
		theme: props?.settings?.theme ?? 'default',
		className: classNames(props?.settings?.className, className),
	};

	// Presenter props
	const presenterProps: SectionHeadingPresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		image: settings?.image,
		categories: settings?.categories,
		url: settings?.url,
		buttons: settings?.buttons,
		isFlipped: settings?.isFlipped ?? false,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionHeading2
		// case 'section-body-2':
		// 	return <SectionHeading2 {...presenterProps} />;

		// Case - SectionHeading1
		case 'section-heading-1':
		default:
			return <SectionHeading1 {...presenterProps} />;
	}
}

// SectionHeading1 component
export function SectionHeading1(props: SectionHeadingPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title,
		subtitle,
		body,
		image,
		categories,
		url,
		buttons,
		isFlipped,
		wrapper = {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
				<div
					className={classNames(
						`section__col space-y-10 lg:col-span-2 lg:text-left`,
						isFlipped && 'col-start-2'
					)}
				>
					{(title || subtitle || body) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{wrapper?.idx && wrapper.idx > 0 && !url && (
								<div className="section__idx pl-1 font-button font-extrabold text-sm uppercase">
									/ {numPad(wrapper?.idx ?? 0, 2)}
								</div>
							)}
							{url && url.length > 0 && (
								<Link
									className="section__url flex justify-center items-center space-x-3 text-sm transition-opacity duration-500 ease-in-out lg:justify-start lg:hover:opacity-30"
									href={url}
									target="_blank"
								>
									<div className="section__url-icon">
										<LinkIcon className="w-4 h-4" />
									</div>
									<span className="section__url-text">{url}</span>
								</Link>
							)}
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
							{categories && categories.length > 0 && (
								<NavCategories className="pt-4" categories={categories} />
							)}
						</TextWrapper>
					)}
					{buttons && (
						<AosWrapper animation="fade-up" duration={0.5} delay={0.2}>
							<NavButtons className="hidden lg:block" buttons={buttons} />
						</AosWrapper>
					)}
				</div>
				<div
					className={classNames(
						`section__col flex flex-col space-y-10 lg:justify-end lg:text-left`,
						isFlipped && 'col-start-1'
					)}
				>
					{(body || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4 lg:pt-20 lg:ml-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{buttons && (
								<NavButtons className="pt-8 lg:hidden" buttons={buttons} />
							)}
						</TextWrapper>
					)}
				</div>
			</div>
			{image && (
				<div className="section__row">
					<div className="section__col relative top-0 left-0 w-full h-screen min-h-[300px]">
						<div className="section__image absolute top-0 left-1/2 transform -translate-x-1/2 w-screen h-full">
							<ImageParallax
								className="absolute top-0 left-0 w-full h-full"
								image={image}
							/>
						</div>
					</div>
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionHeading1 component
// ...
