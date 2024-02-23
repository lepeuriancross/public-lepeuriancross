// Component: ButtonDefault
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
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ButtonDefault';

/*---------- Template ----------*/

// Types
export type ButtonDefaultProps = {
	settings?: {
		component?: ComponentButton;
		name?: string;
		description?: SanityBody[] | string;
		theme?: ThemeButton;
	};
	icon?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	themeCursor?: ThemeCursor;
	themeSection?: ThemeSection;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type ButtonDefaultPresenterProps = {
	name?: string;
	theme?: ThemeButton;
	icon?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	themeCursor?: ThemeCursor;
	color?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'shadow'
		| 'outline'
		| 'default';
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// Default component
export default function ButtonDefault(props: ButtonDefaultProps) {
	/*----- Props -----*/

	// Get props
	const {
		settings = {
			component: 'ButtonText',
			name: 'Button Text',
			description: 'Button description',
			theme: 'block',
		},
		icon,
		type = 'button',
		themeCursor = 'pointer-hidden',
		themeSection = 'default',
		className,
		onClick = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {},
	} = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: ButtonDefaultPresenterProps = {
		name: settings?.name ?? undefined,
		icon,
		theme: settings?.theme ?? 'default',
		type,
		color:
			settings?.theme === 'block'
				? themeSection === 'primary'
					? 'primary'
					: themeSection === 'secondary'
					? 'secondary'
					: themeSection === 'tertiary'
					? 'tertiary'
					: themeSection === 'white'
					? 'secondary'
					: 'primary'
				: settings?.theme === 'shadow'
				? 'shadow'
				: settings?.theme === 'outline'
				? 'outline'
				: 'default',
		themeCursor,
		className,
		onClick,
		onMouseEnter,
		onMouseLeave,
	};

	// Switch - component
	switch (settings.component) {
		case 'ButtonIcon':
			// Return ButtonIcon
			return <ButtonIcon className={className} {...presenterProps} />;

		case 'ButtonText':
		default:
			// Return ButtonText
			return <ButtonText className={className} {...presenterProps} />;
	}
}

// Button Text presenter component
export function ButtonText(props: ButtonDefaultPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		name,
		icon,
		type,
		theme,
		color,
		themeCursor = 'pointer-hidden',
		className,
		onClick = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {},
	} = props;

	/*----- Store -----*/

	// Context - useSection
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	/*----- Methods -----*/

	// Function - handleClick (click event)
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}

		// Call onClick
		onClick(e);
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor(themeCursor);
		}

		// Call onMouseEnter
		onMouseEnter(e);
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}

		// Call onMouseLeave
		onMouseLeave(e);
	}

	/*----- Init -----*/

	// Return default
	return (
		<button
			className={classNames(
				`button relative inline-flex justify-center items-center group select-none`,
				theme !== 'default' && 'h-[45px]',
				color === 'primary' && `text-white`,
				color === 'secondary' && `text-white`,
				color === 'tertiary' && `text-white`,
				color === 'shadow' && `text-current`,
				color === 'outline' && `text-current`,
				className
			)}
			type={type}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{theme !== 'default' && <ButtonBackground {...props} />}
			<div
				className={classNames(
					`button__container relative z-20 inline-flex justify-center items-center space-x-4`
				)}
			>
				{name && (
					<span
						className={classNames(
							`button__name inline-flex justify-center items-center font-button text-xs tracking-wider uppercase`,
							theme !== 'default' && 'h-[45px] pl-6',
							theme !== 'default' && !icon && 'pr-6'
						)}
					>
						{name}
					</span>
				)}
				{icon && (
					<span
						className={classNames(
							`button__icon relative inline-flex justify-center items-center w-[45px] h-[45px]`
						)}
					>
						<div className="button__icon-inner inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							{icon}
						</div>
					</span>
				)}
			</div>
		</button>
	);
}

// ButtonIcon presenter component
export function ButtonIcon(props: ButtonDefaultPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		name,
		icon,
		type,
		theme,
		color,
		themeCursor = 'pointer-hidden',
		className,
		onClick = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {},
		onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {},
	} = props;

	/*----- Store -----*/

	// Context - useSection
	const ui = useUI();
	const { cursorTheme, setCursor } = ui;

	/*----- Methods -----*/

	// Function - handleClick (click event)
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}

		// Call onClick
		onClick(e);
	};

	// Function - handleMouseEnter
	function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme is default...
		if (cursorTheme == 'default') {
			// Set cursor
			setCursor(themeCursor);
		}

		// Call onMouseEnter
		onMouseEnter(e);
	}

	// Function - handleMouseLeave
	function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
		// If cursorTheme isn't default...
		if (cursorTheme !== 'default') {
			// Set cursor
			setCursor('default');
		}

		// Call onMouseLeave
		onMouseLeave(e);
	}

	/*----- Init -----*/

	// Return default
	return (
		<button
			className={classNames(
				`button relative group transition-position duration-300 ease-out select-none lg:hover:scale-125`,
				color === 'primary' && `text-white`,
				color === 'secondary' && `text-white`,
				color === 'tertiary' && `text-white`,
				color === 'shadow' && `text-current`,
				color === 'outline' && `text-current`,
				className
			)}
			type={type}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{theme !== 'default' && <ButtonBackground {...props} />}
			<div
				className={classNames(
					`button__container relative z-20`,
					theme !== 'default' && 'w-[45px] h-[45px]'
				)}
			>
				{name && <span className="button__name sr-only">{name}</span>}
				{icon && (
					<span
						className={classNames(
							`button__icon relative inline-flex justify-center items-center w-[45px] h-[45px]`
						)}
					>
						<div className="button__icon-inner inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							{icon}
						</div>
					</span>
				)}
			</div>
		</button>
	);
}

// ButtonBackground partial
export function ButtonBackground(props: ButtonDefaultPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { icon, color } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`button__bg absolute top-0 right-0 w-full h-full rounded-full border-[2px] transform-size duration-300 ease-out`,
				color === 'primary' && `bg-primary border-primary`,
				color === 'secondary' && `bg-secondary border-secondary`,
				color === 'tertiary' && `bg-tertiary border-tertiary`,
				color === 'shadow' &&
					`opacity-20 bg-current border-current lg:group-hover:opacity-30`,
				color === 'outline' && `bg-transparrent border-current`,
				icon
					? 'lg:group-hover:w-[45px]'
					: 'transition-position duration-300 ease-out lg:group-hover:scale-110'
			)}
		/>
	);
}
