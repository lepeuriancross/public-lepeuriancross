// Component: SectionExample
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
const name = 'SectionExample';

/*---------- Template ----------*/

// Types
export type SectionExampleProps = {
	idx?: number;
	settings?: SanityBlockExample;
	className?: string;
};
export type SectionExamplePresenterProps = {
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
export default function SectionExample(props: SectionExampleProps) {
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
	const presenterProps: SectionExamplePresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		buttons: settings?.buttons,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionExample2
		// case 'section-example-2':
		// 	return <SectionExample2 {...presenterProps} />;

		// Case - SectionExample1
		case 'section-example-1':
		default:
			return <SectionExample1 {...presenterProps} />;
	}
}

// SectionExample1 component
export function SectionExample1(props: SectionExamplePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 text-left">
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

// SectionExample1 component
// ...
