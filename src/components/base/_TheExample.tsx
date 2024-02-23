// Component: TheExample
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TheExample';

/*---------- Template ----------*/

// Types
export type TheExampleProps = {
	className?: string;
};
export type TheExamplePresenterProps = {
	className?: string;
};

// Default component
export default function TheExample(props: TheExampleProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheExamplePresenterProps = {
		className,
	};

	// Return default
	return <TheExamplePresenter {...presenterProps} />;
}

// Presenter component
export function TheExamplePresenter(props: TheExamplePresenterProps) {
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
