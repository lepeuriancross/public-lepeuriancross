// Component: SectionExperience
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
import NavButtons from '@/components/singles/Nav/NavButtons';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import ListExperience from '@/components/singles/List/ListExperience';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionExperience';

/*---------- Template ----------*/

// Types
export type SectionExperienceProps = {
	idx?: number;
	settings?: SanityBlockExperience;
	className?: string;
};
export type SectionExperiencePresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	experience?: SanityExperience[];
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
export default function SectionExperience(props: SectionExperienceProps) {
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
	const presenterProps: SectionExperiencePresenterProps = {
		title: settings?.title,
		subtitle: settings?.subtitle,
		body: settings?.body,
		experience: settings?.experience,
		buttons: settings?.buttons,
		isFlipped: settings?.isFlipped ?? false,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionExperience2
		// case 'section-experience-2':
		// 	return <SectionExperience2 {...presenterProps} />;

		// Case - SectionExperience1
		case 'section-experience-1':
		default:
			return <SectionExperience1 {...presenterProps} />;
	}
}

// SectionExperience1 component
export function SectionExperience1(props: SectionExperiencePresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title,
		subtitle,
		body,
		experience,
		buttons,
		isFlipped,
		wrapper = {},
	} = props;

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
					{(title || subtitle || body || buttons) && (
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
				<div
					className={classNames(
						`section__col space-y-10 lg:text-left`,
						isFlipped && 'col-start-1'
					)}
				>
					<div className="max-w-screen-lg mx-auto space-y-4">
						{experience && (
							<div className="section__experience">
								<ListExperience className="mx-auto" experience={experience} />
							</div>
						)}
						{buttons && (
							<NavButtons
								className="w-full justify-center pt-8 lg:hidden"
								buttons={buttons}
							/>
						)}
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}

// SectionExperience1 component
// ...
