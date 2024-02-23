// Component: NavMenu
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { parseListNavigation } from '@/sanity/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';

// Components (node)
import Link from 'next/link';
import { ArrowLongRightIcon, LinkIcon } from '@heroicons/react/24/solid';

// Components (local)
import NavSocial from '@/components/singles/Nav/NavSocial';
import AosWrapper from '@/components/utility/Aos/AosWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'NavMenu';

/*---------- Template ----------*/

// Types
export type NavMenuProps = {
	className?: string;
};
export type NavMenuPresenterProps = {
	nav?: ListNavigation;
	className?: string;
	showMenu?: (value: boolean) => void;
};

// Default component
export default function NavMenu(props: NavMenuProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// State - nav
	const [nav, setNav] = useState<ListNavigation>([]);

	// Context - useUI
	const ui = useUI();
	const { showMenu } = ui;

	// Redux State - navHomeSlug
	const navHomeSlug = useAppSelector((state) => state.globals.navHomeSlug);

	// Redux state - navHeader
	const navHeader = useAppSelector((state) => state.globals.navHeader);

	/*----- Lifecycle -----*/

	// Watch - pathname, navHomeSlug, navMenu
	useEffect(() => {
		// If no navHeader..
		if (!navHeader) return;

		// Parse navMenu
		const navMenuParsed = parseListNavigation(navHeader, {
			home: navHomeSlug,
			pathname,
		});

		// Set nav
		setNav(navMenuParsed);
	}, [pathname, navHomeSlug, navHeader]);

	/*----- Init -----*/

	// Presenter props
	const presenterProps: NavMenuPresenterProps = {
		nav,
		className,
		showMenu,
	};

	// Return default
	return <NavMenuPresenter {...presenterProps} />;
}

// Presenter component
export function NavMenuPresenter(props: NavMenuPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { nav, className, showMenu = (value: boolean) => {} } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Methods -----*/

	// Function - handleClickLink
	const handleClickLink = () => {
		// Hide menu
		showMenu(false);
	};

	/*----- Init -----*/

	// Return default
	return (
		<ul
			className={classNames(
				`nav flex flex-col justify-center items-stretch h-full select-none`,
				className
			)}
			data-name={name}
		>
			<AosWrapper
				animation="fade-left"
				duration={0.5}
				delay={0.3}
				stagger={0.1}
			>
				{nav?.map((item, i) => (
					<li className="nav__item" key={`nav-menu-item-${item.name}`}>
						{/* Popover Button (tbc) */}
						{/* ... */}

						{/* Link Button */}
						{item.type === 'linkButton' && (
							<Link
								className={classNames(
									`nav__link flex justify-between items-center h-full py-6 space-x-4 grow font-button font-normal text-lg tracking-wider leading-6 uppercase transition-opacity duration-300 ease-out lg:hover:opacity-25`,
									item.href === pathname && 'opacity-25',
									i !== nav.length - 1 && 'border-b border-white/30'
								)}
								href={item.href}
								target={item.target ?? '_self'}
								onClick={handleClickLink}
							>
								<span className="nav__link-name grow">{item.name}</span>
								<span className="nav__link-icon">
									{(item.target ?? '_self') === '_self' ? (
										<ArrowLongRightIcon className="inline-block w-6 h-6" />
									) : (
										<LinkIcon className="inline-block w-5 h-5" />
									)}
								</span>
							</Link>
						)}
					</li>
				))}
				<li
					className={classNames(
						`nav__item border-white/30`,
						nav && nav.length > 0 && 'border-t'
					)}
					key={`nav-menu-item-social`}
				>
					<div className="flex justify-between items-center h-full pb-6 pt-8 space-x-4 grow font-button font-normal text-lg tracking-wider leading-6 uppercase transition-opacity duration-300 ease-out lg:hover:opacity-25">
						<NavSocial />
					</div>
				</li>
			</AosWrapper>
		</ul>
	);
}
