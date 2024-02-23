// Component: ButtonTitle
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';

// Components (node)
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/solid';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ButtonTitle';

/*---------- Template ----------*/

// Types
export type ButtonTitleProps = {
	className?: string;
};

// Default component
export default function ButtonTitle(props: ButtonTitleProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - useSection
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = () => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor('pointer-hidden');
		}
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}
	}

	/*----- Init -----*/

	// Return default
	return (
		<Link href="/contact">
			<button
				className={classNames(`button inline-flex group mx-[.05em]`, className)}
				type="button"
				data-name={name}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="button__container relative">
					<span className="button__spacer relative z-10 mx-[.15em] opacity-0">
						o
					</span>
					<span className="button__bg absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[56%] w-[110%] rounded-full overflow-hidden transition-transform duration-300 ease-out lg:group-hover:scale-90 bg-primary text-white">
						<span className="button__spacer-padding relative z-10 block w-full pt-[100%]" />
					</span>
					<PencilIcon className="button__icon absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-1/3 transiiton-all duration-300 ease-out lg:group-hover:-rotate-[30deg]" />
				</div>
			</button>
		</Link>
	);
}
