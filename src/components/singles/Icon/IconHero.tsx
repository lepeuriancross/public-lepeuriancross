// Component: IconHero
/*----------------------------------------------------------------------------------------------------*/

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
// ...

/*---------- Static Data ----------*/

// Name
const name = 'IconHero';

/*---------- Template ----------*/

// Types
export type IconHeroProps = {
	className?: string;
};

// Default component
export default function IconHero(props: IconHeroProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Return default
	return <></>;
}
