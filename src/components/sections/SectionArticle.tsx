// Component: SectionArticle
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextBody from '@/components/singles/Text/TextBody';
import NavButtons from '@/components/singles/Nav/NavButtons';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';
import ButtonAuthor from '../singles/Button/ButtonAuthor';

/*---------- Static Data ----------*/

// Name
const name = 'SectionArticle';

/*---------- Template ----------*/

// Types
export type SectionArticleProps = {
	idx?: number;
	settings?: SanityBlockArticle;
	className?: string;
};
export type SectionArticlePresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	author?: SanityAuthor;
	categories?: SanityCategory[];
	buttons?: SanityListButtons;
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
export default function SectionArticle(props: SectionArticleProps) {
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
	const presenterProps: SectionArticlePresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		buttons: settings?.buttons,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionArticle2
		// case 'section-example-2':
		// 	return <SectionArticle2 {...presenterProps} />;

		// Case - SectionArticle1
		case 'section-article-1':
		default:
			return <SectionArticle1 {...presenterProps} />;
	}
}

// SectionArticle1 component
export function SectionArticle1(props: SectionArticlePresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title,
		subtitle,
		body,
		image,
		author,
		categories,
		buttons,
		wrapper = {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-3">
				{(image || author) && (
					<div className="section__col space-y-10 lg:pt-6 lg:text-left">
						<TextWrapper className="max-w-screen-lg w-full mx-auto space-y-8">
							{image && (
								<div>
									<div className="section__image relative w-full border rounded-md overflow-hidden">
										<span className="section__image-spacer relative z-10 block pt-[60%]" />
										<ImageBuilder
											className="section__img absolute z-20 inset-0 w-full h-full object-cover object-center"
											image={image}
										/>
									</div>
								</div>
							)}
							{author && (
								<ButtonAuthor className="hidden lg:flex" author={author} />
							)}
						</TextWrapper>
					</div>
				)}

				<div
					className={classNames(
						`section__col space-y-10 lg:text-left`,
						image || author ? 'xl:col-span-2' : 'xl:col-span-3'
					)}
				>
					{(title || subtitle || body || buttons) && (
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
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{author && (
								<ButtonAuthor className="pt-6 lg:hidden" author={author} />
							)}
							{buttons && (
								<div className="section__buttons">
									<NavButtons buttons={buttons} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// SectionArticle1 component
// ...
