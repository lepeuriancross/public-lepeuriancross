// Component: Loading
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
import IconSpinner from '@/components/singles/Icon/IconSpinner';

/*---------- Static Data ----------*/

// Name
const name = 'Loading';

/*---------- Template ----------*/

// Types
export type LoadingProps = {};

// Default component
export default function Loading(props: LoadingProps) {
	/*----- Props -----*/

	// Props
	const {} = props;

	/*----- Init -----*/

	return (
		<div className="loading min-h-screen">
			<span className="loading__spinner fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<IconSpinner text={'Loading...'} />
			</span>
		</div>
	);
}
