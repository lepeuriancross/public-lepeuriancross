// Component: NavButtons
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useSection } from '@/components/sections/_partials/SectionWrapper';
import { parseListButtons } from '@/sanity/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
import ButtonDefault from '@/components/singles/Button/ButtonDefault';
import AosWrapper from '@/components/utility/Aos/AosWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'NavButtons';

/*---------- Template ----------*/

// Types
export type NavButtonsProps = {
	buttons?: SanityListButtons;
	className?: string;
	children?: React.ReactNode;
};
export type NavButtonsPresenterProps = {
	buttons?: ListButtons;
	themeSection?: ThemeSection;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function NavButtons(props: NavButtonsProps) {
	/*----- Props -----*/

	// Get props
	const { buttons, className, children } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: NavButtonsPresenterProps = {
		buttons: parseListButtons(buttons ?? []),
		themeSection,
		className,
		children,
	};

	// Return default
	return <NavButtonsPresenter {...presenterProps} />;
}

// Presenter component
export function NavButtonsPresenter(props: NavButtonsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { buttons, themeSection, className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`nav inline-flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4`,
				className
			)}
		>
			{buttons?.map((button, b) => (
				<Link key={`nav-link-${b}`} href={button.href} target={button.target}>
					<ButtonDefault
						className="w-full sm:w-auto sm:min-w-[150px]"
						settings={{
							component: 'ButtonText',
							name: button.name,
							description: button.description,
							theme: button.theme,
						}}
						themeSection={themeSection}
					/>
				</Link>
			))}
			{children}
		</div>
	);
}
