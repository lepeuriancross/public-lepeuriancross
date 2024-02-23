// Component: ButtonToggleMenu
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
import { Bars2Icon } from '@heroicons/react/20/solid';

// Components (local)
import ButtonDefault from '@/components/singles/Button/ButtonDefault';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonToggleMenu';

/*---------- Template ----------*/

// Types
export type ButtonToggleMenuProps = {
	className?: string;
};

// Default component
export default function ButtonToggleMenu(props: ButtonToggleMenuProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - UI
	const ui = useUI();
	const { cursorTheme, isShowingMenu, setCursor, showMenu } = ui;

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = () => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}

		// Toggle isShowingMenu
		showMenu(!isShowingMenu);
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
		<>
			<ButtonDefault
				className={classNames(className)}
				settings={{
					component: 'ButtonIcon',
					name: 'Toggle Menu',
					theme: 'shadow',
				}}
				icon={<Bars2Icon className="w-6 h-6" />}
				themeSection="primary"
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
		</>
	);
}
