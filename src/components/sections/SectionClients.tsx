// Component: SectionClients
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
import SectionWrapper from './_partials/SectionWrapper';
import GridClients from '../singles/Grid/GridClients';

/*---------- Static Data ----------*/

// Name
const name = 'SectionClients';

/*---------- Template ----------*/

// Types
export type SectionClientsProps = {
	idx?: number;
	settings?: SanityBlockClients;
	className?: string;
};
export type SectionClientsPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
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
export default function SectionClients(props: SectionClientsProps) {
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
	const presenterProps: SectionClientsPresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		images: settings?.images,
		buttons: settings?.buttons,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionClients2
		// case 'section-clients-2':
		// 	return <SectionClients2 {...presenterProps} />;

		// Case - SectionClients1
		case 'section-clients-1':
		default:
			return <SectionClients1 {...presenterProps} />;
	}
}

// SectionClients1 component
export function SectionClients1(props: SectionClientsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, images, buttons, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 lg:text-left">
					{(title || subtitle || buttons) && (
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
			{images && images.length > 0 && (
				<div className="section__row">
					<GridClients images={images} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionClients1 component
// ...
