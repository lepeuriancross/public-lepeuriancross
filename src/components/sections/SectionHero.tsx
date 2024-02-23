// Component: SectionHero
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
import Marquee from '@/components/singles/Marquee/Marquee';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionHero';

/*---------- Template ----------*/

// Types
export type SectionHeroProps = {
	idx?: number;
	settings?: SanityBlockHero;
	className?: string;
};
export type SectionHeroPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
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
export default function SectionHero(props: SectionHeroProps) {
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
		className: classNames(props?.settings?.className, props?.className),
	};

	// Presenter props
	const presenterProps: SectionHeroPresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		images: settings?.images,
		buttons: settings?.buttons,
		isFlipped: props?.settings?.isFlipped ?? false,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionHero2
		// case 'section-hero-2':
		// 	return <SectionHero2 {...presenterProps} />;

		// Case - SectionHero1
		case 'section-hero-1':
		default:
			return <SectionHero1 {...presenterProps} />;
	}
}

// SectionHero1 component
export function SectionHero1(props: SectionHeroPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title,
		subtitle,
		body,
		images,
		buttons,
		isFlipped,
		wrapper = {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper style={{ minHeight: 'calc(100vh - 160px)' }} {...wrapper}>
			<div className="section__row">
				<div className="section__col space-y-10">
					{(title || subtitle || body) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{subtitle && (
								<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
									<TextSubtitle as="h3" subtitle={subtitle} />
								</div>
							)}
							{title && (
								<div className="section__title text-[18vw] md:text-[16vw] lg:text-[155px]">
									<TextTitle as="h2" title={title} useButton={true} />
								</div>
							)}
							{body && (
								<div className="section__body px-4 sm:px-0">
									<TextBody body={body} />
								</div>
							)}
						</TextWrapper>
					)}
					{buttons && (
						<NavButtons
							className="w-full sm:justify-center sm:items-center"
							buttons={buttons}
						/>
					)}
					{images && images.length > 0 && (
						<div className="section__marquee max-w-lg mx-auto overflow-hidden pt-10 pointer-events-none">
							<Marquee>
								{images.map((image, i) => (
									<div
										className="section__marquee-image mx-4"
										key={`section-hero-image--${i}`}
									>
										<ImageBuilder
											className="section__carousel-img w-auto h-[35px]"
											image={image}
										/>
									</div>
								))}
							</Marquee>
						</div>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// SectionHero2 component
// ...
