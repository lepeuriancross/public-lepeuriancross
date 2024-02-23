// Component: ButtonAuthor
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import ImageBuilder from '@/components/utility/Image/ImageBuilder';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonAuthor';

/*---------- Template ----------*/

// Types
export type ButtonAuthorProps = {
	author?: SanityAuthor;
	className?: string;
};
export type ButtonAuthorPresenterProps = {
	author?: SanityAuthor;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function ButtonAuthor(props: ButtonAuthorProps) {
	/*----- Props -----*/

	// Get props
	const { author, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// If no author, return null
	if (!props.author) return null;

	// Presenter props
	const presenterProps: ButtonAuthorPresenterProps = {
		author,
		themeSection,
		className,
	};

	// Return default
	return <ButtonAuthorPresenter {...presenterProps} />;
}

// Presenter component
export function ButtonAuthorPresenter(props: ButtonAuthorPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { author, themeSection, className } = props;

	/*----- Init -----*/

	// If no author, return null
	if (!author) return null;

	// Return default
	return (
		<div
			className={classNames(
				`section__author flex flex-col justify-center items-center space-y-4 lg:flex-row lg:justify-start lg:space-y-0 lg:space-x-4`,
				className
			)}
			data-name={name}
		>
			{author.image && (
				<div className="section__author-image relative w-12 border rounded-full overflow-hidden bg-current">
					<span className="section__image-spacer relative z-10 block pt-[100%]" />
					<ImageBuilder
						className="section__author-img absolute z-20 inset-0 w-full h-full object-cover object-center"
						image={author.image}
					/>
				</div>
			)}
			{(author.title || author.subtitle) && (
				<div className="section__name flex flex-col justify-center items-center lg:items-start">
					{author.title && <h4 className="text-lg">{author.title}</h4>}
					{author.subtitle && <p className="text-xs">{author.subtitle}</p>}
				</div>
			)}
		</div>
	);
}
