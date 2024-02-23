// Component: SectionBody
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames, numPad } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextBody from '@/components/singles/Text/TextBody';
import NavButtons from '@/components/singles/Nav/NavButtons';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionBody';

/*---------- Template ----------*/

// Types
export type SectionBodyProps = {
	idx?: number;
	settings?: SanityBlockBody;
	className?: string;
};
export type SectionBodyPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
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
export default function SectionBody(props: SectionBodyProps) {
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
	const presenterProps: SectionBodyPresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		buttons: settings?.buttons,
		isFlipped: settings?.isFlipped ?? false,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionBody3
		// case 'section-body-3':
		// 	return <SectionBody3 {...presenterProps} />;

		// Case - SectionBody2
		case 'section-body-2':
			return <SectionBody2 {...presenterProps} />;

		// Case - SectionBody1
		case 'section-body-1':
		default:
			return <SectionBody1 {...presenterProps} />;
	}
}

// SectionBody1 component
export function SectionBody1(props: SectionBodyPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, isFlipped, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div
					className={classNames(
						`section__col space-y-10 lg:text-left`,
						isFlipped && 'col-start-2'
					)}
				>
					{(title || subtitle || body) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{wrapper?.idx && wrapper.idx > 0 && (
								<div className="section__idx pl-1 font-button font-extrabold text-sm uppercase">
									/ {numPad(wrapper?.idx ?? 0, 2)}
								</div>
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
						</TextWrapper>
					)}
				</div>
				<div
					className={classNames(
						`section__col space-y-10 lg:text-left`,
						isFlipped && 'col-start-1'
					)}
				>
					{(body || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4 lg:ml-0">
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// SectionBody2 component
export function SectionBody2(props: SectionBodyPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, isFlipped, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div
					className={classNames(
						`section__col space-y-10 lg:text-left`,
						isFlipped && 'col-start-2'
					)}
				>
					{(title || subtitle || body) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4 lg:max-w-[33vw] lg:ml-0">
							{title && (
								<div className="section__title text-[6vw] md:text-[4vw] lg:text-[3vw]">
									<h2 className="leading-none font-bold">{title}</h2>
								</div>
							)}
							{subtitle && (
								<div className="section__subtitle text-normal">
									<h3 className="leading-none font-bold">{subtitle}</h3>
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
						`section__col space-y-10 lg:text-left`,
						isFlipped && 'col-start-1'
					)}
				>
					{(body || buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4 lg:ml-0">
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
		</SectionWrapper>
	);
}

// SectionBody3 component
// ...
