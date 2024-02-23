// Component: SectionProjects
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/solid';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import { ButtonText } from '@/components/singles/Button/ButtonDefault';
import NavButtons from '@/components/singles/Nav/NavButtons';
import GridProjects from '@/components/singles/Grid/GridProjects';
import Carousel from '@/components/singles/Carousel/Carousel';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionProjects';

/*---------- Template ----------*/

// Types
export type SectionProjectsProps = {
	idx?: number;
	settings?: SanityBlockProjects;
	className?: string;
};
export type SectionProjectsPresenterProps = {
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	buttons?: SanityListButtons;
	projects?: SanityProject[];
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
export default function SectionProjects(props: SectionProjectsProps) {
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
	const presenterProps: SectionProjectsPresenterProps = {
		title: settings?.title,
		body: settings?.body,
		buttons: settings?.buttons,
		projects: settings?.projects,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionProjects2
		// case 'section-projects-2':
		// 	return <SectionProjects2 {...presenterProps} />;

		// Case - SectionProjects1
		case 'section-projects-1':
		default:
			return <SectionProjects1 {...presenterProps} />;
	}
}

// SectionProjectsArchive component
export function SectionProjectsArchive(props: SectionProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, body, buttons, projects, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-cols-1">
				<div className="section__col space-y-10">
					{title && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
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
							<div className="section__button pt-2">
								<Link href="/contact">
									<ButtonText
										name="Start a project"
										icon={
											<PencilIcon className="w-4 h-4 transiiton-all duration-300 ease-out lg:group-hover:-rotate-[30deg]" />
										}
									/>
								</Link>
							</div>
						</TextWrapper>
					)}
					{buttons && <NavButtons buttons={buttons} />}
				</div>
			</div>
			{projects && projects.length > 0 && (
				<div className="section__row">
					<GridProjects component="GridProjectsArchive" projects={projects} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionProjects1 component (grid)
export function SectionProjects1(props: SectionProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, projects, wrapper = {} } = props;

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
			{projects && projects.length > 0 && (
				<div className="section__row">
					<GridProjects component="GridProjectsGrid" projects={projects} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionProjects2 component (list)
export function SectionProjects2(props: SectionProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, projects, wrapper = {} } = props;

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
			{projects && projects.length > 0 && (
				<div className="section__row">
					<GridProjects component="GridProjectsList" projects={projects} />
				</div>
			)}
		</SectionWrapper>
	);
}

// SectionProjects3 component (carousel)
export function SectionProjects3(props: SectionProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { title, subtitle, body, buttons, projects, wrapper = {} } = props;

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
			{projects && projects.length > 0 && (
				<div className="section__row">
					<Carousel component={'CarouselDocuments'}>
						
					</Carousel>
				</div>
			)}
		</SectionWrapper>
	);
}
