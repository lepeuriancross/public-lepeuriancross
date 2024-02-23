// Component: Section404
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
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'Section404';

/*---------- Template ----------*/

// Types
export type Section404Props = {
	idx?: number;
	settings?: SanityBlock404;
	className?: string;
};
export type Section404PresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
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
export default function Section404(props: Section404Props) {
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
	const presenterProps: Section404PresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		buttons: settings?.buttons,
		wrapper,
	};

	// Return default
	return <Section404Presenter {...presenterProps} />;
}

// Presenter component
export function Section404Presenter(props: Section404PresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title = 'Well, this is awkward',
		subtitle = '404: Page not found',
		body = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
		buttons,
		wrapper = {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper style={{ minHeight: 'calc(100vh - 160px)' }} {...wrapper}>
			<div className="section__row">
				<div className="section__col space-y-10">
					{(title || subtitle || body || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{title && (
								<div className="section__title text-[15vw] lg:text-[155px]">
									<TextTitle as="h2" title={title} useButton={true} />
								</div>
							)}
							{subtitle && (
								<div className="section__subtitle text-normal md:text-[2vw] lg:text-xl">
									<TextSubtitle as="h3" subtitle={subtitle} />
								</div>
							)}
							{body && (
								<div className="section__body max-w-lg mx-auto">
									<TextBody body={body} />
								</div>
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
