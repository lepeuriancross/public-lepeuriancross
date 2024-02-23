// Component: GridProjects
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
import Link from 'next/link';

// Components (local)
import ButtonArchiveView from '@/components/singles/Button/ButtonArchiveView';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import GridProjectsArticle, {
	GridProjectsArticleGrid,
	GridProjectsArticleList,
	GridProjectsArticleProps,
} from './_partials/GridProjectsArticle';

/*---------- Static Data ----------*/

// Name
const name = 'GridProjects';

/*---------- Template ----------*/

// Types
export type GridProjectsProps = {
	component?: 'GridProjectsArchive' | 'GridProjectsGrid' | 'GridProjectsList';
	projects?: SanityProject[];
	className?: string;
};
export type GridProjectsPresenterProps = {
	projects?: GridProjectsArticleProps[];
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function GridProjects(props: GridProjectsProps) {
	/*----- Props -----*/

	// Get props
	const { component = 'GridProjectsArchive', projects, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// If no projects...
	if (!projects) return null;

	// Parse projects
	const parsedProjects = projects.map((project) => {
		// Get project
		const { title, slug, description, image } = project;

		// Return parsed project
		return {
			title,
			href: `/${configCMS.documents.project}/${slug.current}`,
			description,
			image,
		};
	}) as GridProjectsArticleProps[];

	// Presenter props
	const presenterProps: GridProjectsPresenterProps = {
		projects: parsedProjects,
		themeSection,
		className,
	};

	// Switch component
	switch (component) {
		case 'GridProjectsArchive':
			// Return archive
			return <GridProjectsArchive {...presenterProps} />;
		case 'GridProjectsGrid':
			// Return document
			return <GridProjectsGrid {...presenterProps} />;
		case 'GridProjectsList':
		default:
			// Return document
			return <GridProjectsList {...presenterProps} />;
	}
}

// GridProjectsArchive component
export function GridProjectsArchive(props: GridProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { projects, themeSection = 'default', className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { contentProjectsView } = ui;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(`projects space-y-8 lg:space-y-16`, className)}
			data-name={name}
		>
			<div className="projects__heading relative border rounded-md px-6 py-4 overflow-hidden border-white/30">
				<div className="projects__heading-bg absolute top-0 left-0 w-full h-full bg-current opacity-10"></div>
				<div className="projects__heading-container relative z-20 flex justify-center items-center">
					<ButtonArchiveView archiveType="projects" />
				</div>
			</div>
			<div className="projects__container">
				{contentProjectsView ? (
					<AosWrapper
						className={classNames(
							`projects__row divide-y`,
							themeSection === 'primary'
								? 'divide-white/10'
								: themeSection === 'secondary'
								? 'divide-white/10'
								: themeSection === 'tertiary'
								? 'divide-white/10'
								: themeSection === 'white'
								? 'divide-black/10'
								: 'divide-white/10'
						)}
						animation="fade-left"
						duration={0.5}
						stagger={0.1}
					>
						{projects?.map((project, p) => (
							<GridProjectsArticleList
								key={`grid-projects-archive-article-list-item-${p}`}
								{...project}
							/>
						))}
					</AosWrapper>
				) : (
					<AosWrapper
						className="projects__row grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
						animation="fade-left"
						duration={0.5}
						stagger={0.1}
					>
						{projects?.map((project, p) => (
							<GridProjectsArticleGrid
								key={`grid-projects-archive-article-grid-item-${p}`}
								{...project}
							/>
						))}
					</AosWrapper>
				)}
			</div>
		</div>
	);
}

// GridProjectsGrid component
export function GridProjectsGrid(props: GridProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { projects, themeSection = 'default', className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`projects`, className)} data-name={name}>
			<div className="projects__container">
				<AosWrapper
					className="projects__row grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
					animation="fade-left"
					duration={0.5}
					stagger={0.1}
				>
					{projects?.map((project, p) => (
						<GridProjectsArticleGrid
							key={`grid-projects-section-article-link-${p}`}
							{...project}
						/>
					))}
				</AosWrapper>
			</div>
		</div>
	);
}

// GridProjectsList component
export function GridProjectsList(props: GridProjectsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { projects, themeSection = 'default', className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`projects`, className)} data-name={name}>
			<div className="projects__container">
				<AosWrapper
					className={classNames(
						`projects__row divide-y`,
						themeSection === 'primary'
							? 'divide-white/10'
							: themeSection === 'secondary'
							? 'divide-white/10'
							: themeSection === 'tertiary'
							? 'divide-white/10'
							: themeSection === 'white'
							? 'divide-black/10'
							: 'divide-white/10'
					)}
					animation="fade-left"
					duration={0.5}
					stagger={0.1}
				>
					{projects?.map((project, p) => (
						<GridProjectsArticleList
							key={`grid-projects-archive-article-list-item-${p}`}
							{...project}
						/>
					))}
				</AosWrapper>
			</div>
		</div>
	);
}
