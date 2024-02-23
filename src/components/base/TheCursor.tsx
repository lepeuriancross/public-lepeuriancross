// Component: TheCursor
/*----------------------------------------------------------------------------------------------------*/

'use client';

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
import { useUI } from '@/components/base/TheProviderUI';

/*---------- Static Data ----------*/

// Name
const name = 'TheCursor';

/*---------- Template ----------*/

// Types
export type TheCursorProps = {
	className?: string;
};

// Default component
export default function TheCursor(props: TheCursorProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { cursorDestinationX, cursorDestinationY, cursorTheme, cursorText } =
		ui;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`cursor fixed transform -translate-x-1/2 -translate-y-1/2 hidden w-[80px] h-[80px] pointer-events-none select-none lg:block`,
				className
			)}
			style={{
				left: `${cursorDestinationX}px`,
				top: `${cursorDestinationY}px`,
			}}
			data-name={name}
		>
			<div
				className={classNames(
					`cursor__bg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transiiton-all duration-300 ease-in-out bg-current`,
					cursorTheme === 'default' &&
						'w-[45px] h-[45px] rounded-full opacity-20',
					(cursorTheme === 'pointer-product' ||
						cursorTheme === 'pointer-project' ||
						cursorTheme === 'pointer-post' ||
						cursorTheme === 'pointer-author' ||
						cursorTheme === 'pointer-category') &&
						'w-[80px] h-[80px] rounded-full opacity-100',
					(cursorTheme === 'pointer-hidden' ||
						cursorTheme === 'pointer-link') &&
						'w-[0px] h-[0px] rounded-full opacity-0'
				)}
			/>
			<span
				className={classNames(
					`cursor__text absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-full p-4 font-button text-xs text-center tracking-wider uppercase transition-transform duration-300 ease-out invert`,
					(cursorTheme === 'pointer-product' ||
						cursorTheme === 'pointer-project' ||
						cursorTheme === 'pointer-post' ||
						cursorTheme === 'pointer-author' ||
						cursorTheme === 'pointer-category') &&
						cursorText
						? 'scale-100'
						: 'scale-0'
				)}
			>
				{cursorText}
			</span>
		</div>
	);
}
