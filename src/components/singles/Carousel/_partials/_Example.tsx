// Component: Example
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)

// Scripts (local)
import { classNames } from '@/lib/utils';
// import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'Example';

/*---------- Template ----------*/

// Types
export type ExampleProps = {
	className?: string;
};
export type ExamplePresenterProps = {
	className?: string;
};

// Default component
export default function Example(props: ExampleProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - useSection
	// const section = useSection();
	// const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: ExamplePresenterProps = {
		className,
	};

	// Return default
	return <ExamplePresenter {...presenterProps} />;
}

// Default component
export function ExamplePresenter(props: ExamplePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`example`, className)} data-name={name}>
			<div className="example__container">[{name}]</div>
		</div>
	);
}
