// Component: ListSections
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import dynamic from 'next/dynamic';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import SectionHero from '@/components/sections/SectionHero';
const SectionHeading = dynamic(
	() => import('@/components/sections/SectionHeading'),
	{ ssr: false }
);
const SectionBody = dynamic(() => import('@/components/sections/SectionBody'), {
	ssr: false,
});
const SectionImages = dynamic(
	() => import('@/components/sections/SectionImages'),
	{ ssr: false }
);
const SectionExperience = dynamic(
	() => import('@/components/sections/SectionExperience'),
	{ ssr: false }
);
const SectionClients = dynamic(
	() => import('@/components/sections/SectionClients'),
	{ ssr: false }
);
const SectionContactForm = dynamic(
	() => import('@/components/sections/SectionContactForm'),
	{ ssr: false }
);
const SectionProjects = dynamic(
	() => import('@/components/sections/SectionProjects'),
	{ ssr: false }
);
const SectionPosts = dynamic(
	() => import('@/components/sections/SectionPosts'),
	{ ssr: false }
);

/*---------- Static Data ----------*/

// Name
const name = 'ListSections';

/*---------- Template ----------*/

// Types
export type ListSectionsProps = {
	listSections?: ListSections;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function ListSections(props: ListSectionsProps) {
	/*----- Props -----*/

	// Get props
	const { listSections, className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<>
			{children}
			{listSections?.map((section, idx) => (
				<div
					id={section.key}
					key={`list-sections-wrapper-${section.key}`}
					className="section-wrapper"
				>
					{section.block._type === 'blockHero' && (
						<SectionHero
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockHeading' && (
						<SectionHeading
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockBody' && (
						<SectionBody
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockImages' && (
						<SectionImages
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockExperience' && (
						<SectionExperience
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockClients' && (
						<SectionClients
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockContactForm' && (
						<SectionContactForm
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockProjects' && (
						<SectionProjects
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{section.block._type === 'blockPosts' && (
						<SectionPosts
							key={`list-sections-section-${section.key}`}
							idx={idx}
							settings={section.block}
							className={classNames(className)}
						/>
					)}
					{idx < listSections.length - 1 &&
						section.block.theme === 'default' &&
						listSections[idx + 1].theme === 'default' && (
							<div className="break w-full h-[1px] container mx-auto opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
						)}
				</div>
			))}
		</>
	);
}
