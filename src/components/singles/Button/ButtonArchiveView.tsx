// Component: ButtonArchiveView
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/solid';

// Components (local)
import { useUI } from '@/components/base/TheProviderUI';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonArchiveView';

/*---------- Template ----------*/

// Types
export type ButtonArchiveViewProps = {
	archiveType?: 'products' | 'projects' | 'posts';
	className?: string;
};
export type ButtonArchiveViewPresenterProps = {
	archiveType?: 'products' | 'projects' | 'posts';
	className?: string;
};

// Default component
export default function ButtonArchiveView(props: ButtonArchiveViewProps) {
	/*----- Props -----*/

	// Get props
	const { archiveType = 'posts', className } = props;

	/*----- Store -----*/

	// Context - useSection
	// const section = useSection();
	// const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: ButtonArchiveViewPresenterProps = {
		archiveType,
		className,
	};

	// Return default
	return <ButtonArchiveViewPresenter {...presenterProps} />;
}

// Default component
export function ButtonArchiveViewPresenter(
	props: ButtonArchiveViewPresenterProps
) {
	/*----- Props -----*/

	// Get props
	const { archiveType = 'posts', className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const {
		cursorTheme,
		setCursor,
		contentProductsView,
		contentProjectsView,
		contentPostsView,
		setContentProductsView,
		setContentProjectsView,
		setContentPostsView,
	} = ui;

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	// State - view
	const [view, setView] = useState<boolean>(
		archiveType === 'products'
			? contentProductsView
			: archiveType === 'projects'
			? contentProjectsView
			: contentPostsView
	);

	/*----- Methods -----*/

	// Function - handleClick
	const handleClick = (value: boolean) => {
		// Switch - archiveType
		switch (archiveType) {
			case 'products':
				// Set contentProductsView
				setContentProductsView(value);
				break;
			case 'projects':
				// Set contentProjectsView
				setContentProjectsView(value);
				break;
			case 'posts':
				// Set contentPostsView
				setContentPostsView(value);
				break;
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

	/*----- Lifecycle -----*/

	// Watch - archiveType, contentProductsView
	useEffect(() => {
		// If products...
		if (archiveType === 'products') {
			// Set view
			setView(contentProductsView);
		}
	}, [archiveType, contentProductsView]);

	// Watch - archiveType, contentProjectsView
	useEffect(() => {
		// If projects...
		if (archiveType === 'projects') {
			// Set view
			setView(contentProjectsView);
		}
	}, [archiveType, contentProjectsView]);

	// Watch - archiveType, contentPostsView
	useEffect(() => {
		// If posts...
		if (archiveType === 'posts') {
			// Set view
			setView(contentPostsView);
		}
	}, [archiveType, contentPostsView]);

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(`button-wrapper inline-flex`, className)}
			data-name={name}
		>
			<div className="button__container flex justify-center items-center space-x-4">
				<button
					className={classNames(
						`button inline-flex justify-center items-center border rounded px-3 py-2 space-x-2 transiiton-color duration-300 ease-out`,
						view
							? themeSection === 'primary'
								? 'border-white text-white'
								: themeSection === 'secondary'
								? 'border-white text-white'
								: themeSection === 'tertiary'
								? 'border-white text-white'
								: themeSection === 'white'
								? 'border-black text-black'
								: 'border-white text-white'
							: themeSection === 'primary'
							? 'border-white bg-white text-black'
							: themeSection === 'secondary'
							? 'border-white bg-white text-black'
							: themeSection === 'tertiary'
							? 'border-white bg-white text-black'
							: themeSection === 'white'
							? 'border-black bg-black text-white'
							: 'border-white bg-white text-black'
					)}
					type="button"
					onClick={() => handleClick(false)}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className="button__switch-icon">
						<Squares2X2Icon className="w-4 h-4" />
					</div>
					<div className="button__switch-name">Grid</div>
				</button>

				<button
					className={classNames(
						`button inline-flex justify-center items-center border rounded px-3 py-2 space-x-2 transiiton-color duration-300 ease-out`,
						!view
							? themeSection === 'primary'
								? 'border-white text-white'
								: themeSection === 'secondary'
								? 'border-white text-white'
								: themeSection === 'tertiary'
								? 'border-white text-white'
								: themeSection === 'white'
								? 'border-black text-black'
								: 'border-white text-white'
							: themeSection === 'primary'
							? 'border-white bg-white text-black'
							: themeSection === 'secondary'
							? 'border-white bg-white text-black'
							: themeSection === 'tertiary'
							? 'border-white bg-white text-black'
							: themeSection === 'white'
							? 'border-black bg-black text-white'
							: 'border-white bg-white text-black'
					)}
					type="button"
					onClick={() => handleClick(true)}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className="button__switch-icon">
						<ListBulletIcon className="w-4 h-4" />
					</div>
					<div className="button__switch-name">List</div>
				</button>
			</div>
		</div>
	);
}
