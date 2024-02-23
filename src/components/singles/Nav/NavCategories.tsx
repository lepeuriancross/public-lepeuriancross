// Component: NavCategories
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useUI } from '@/components/base/TheProviderUI';
import { useSection } from '@/components/sections/_partials/SectionWrapper';
import AosWrapper from '@/components/utility/Aos/AosWrapper';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'NavCategories';

/*---------- Template ----------*/

// Types
export type NavCategoriesProps = {
	categories?: SanityCategory[];
	className?: string;
};
export type NavCategoriesPresenterProps = {
	nav?: Category[];
	themeSection?: ThemeSection;
	className?: string;
	showModal?: FxnShowModal;
};

// Default component
export default function NavCategories(props: NavCategoriesProps) {
	/*----- Props -----*/

	// Get props
	const { categories, className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { showModal } = ui;

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// If no categories...
	if (!categories) return null;

	// Get categories
	let nav = [] as Category[];
	categories.forEach((category) => {
		// Add to nav
		nav.push({
			_type: 'category',
			name: category.title,
			slug: category.slug?.current,
			description: category.description,
		});
	});

	// Presenter props
	const presenterProps: NavCategoriesPresenterProps = {
		nav,
		themeSection,
		className,
		showModal,
	};

	// Return default
	return <NavCategoriesPresenter {...presenterProps} />;
}

// Default component
export function NavCategoriesPresenter(props: NavCategoriesPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		nav,
		themeSection,
		className,
		showModal = (value?: ThemeModal) => {},
	} = props;

	/*----- Methods -----*/

	// Function - handleClickCategory
	const handleClickCategory = (category: Category) => {
		// Show modal
		showModal(category);
	};

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`categories`, className)} data-name={name}>
			<AosWrapper
				className="categories__container flex justify-center items-center gap-2 flex-wrap lg:justify-start lg:gap-3"
				animation="fade-up"
				delay={0.3}
				stagger={0.1}
			>
				{nav?.map((category, c) => {
					// Return category
					return (
						<button
							className={classNames(
								`categories__category inline-block border-[2px] rounded-full px-5 py-1.5 text-sm transition-colors duration-500 ease-in-out`,
								themeSection === 'primary'
									? 'bg-transparent border-primary text-primary lg:hover:bg-primary lg:hover:text-white'
									: themeSection === 'secondary'
									? 'bg-transparent border-secondary text-secondary lg:hover:bg-secondary lg:hover:text-white'
									: themeSection === 'white'
									? 'bg-transparent border-black text-black lg:hover:bg-black lg:hover:text-white'
									: 'bg-transparent border-white text-white lg:hover:bg-white lg:hover:text-black'
							)}
							key={`${category.slug}-${c}`}
							type="button"
							onClick={() => handleClickCategory(category)}
						>
							{category.name}
						</button>
					);
				})}
			</AosWrapper>
		</div>
	);
}
