// Component: NavHeader
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

// Components (node)
import Link from 'next/link';
import { motion } from 'framer-motion';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'NavHeader';

/*---------- Template ----------*/

// Types
export type NavHeaderProps = {
	className?: string;
};
export type NavHeaderPresenterProps = {
	nav?: ListNavigation;
	className?: string;
};

// Default component
export default function NavHeader(props: NavHeaderProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// State - nav
	const [nav, setNav] = useState<ListNavigation>([]);

	// Redux State - navHomeSlug
	const navHomeSlug = useAppSelector((state) => state.globals.navHomeSlug);

	// Redux state - navHeader
	const navHeader = useAppSelector((state) => state.globals.navHeader);

	/*----- Lifecycle -----*/

	// Watch - pathname, navHomeSlug, navHeader
	useEffect(() => {
		// If no navHeader..
		if (!navHeader) return;

		// Parse navHeader
		const navHeaderParsed = parseListNavigation(navHeader, {
			home: navHomeSlug,
			pathname,
		});

		// Set nav
		setNav(navHeaderParsed);
	}, [pathname, navHomeSlug, navHeader]);

	/*----- Init -----*/

	// Presenter props
	const presenterProps: NavHeaderPresenterProps = {
		nav,
		className,
	};

	// Return default
	return <NavHeaderPresenter {...presenterProps} />;
}

// Presenter component
export function NavHeaderPresenter(props: NavHeaderPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { nav, className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Init -----*/

	// Return default
	return (
		<ul
			className={classNames(
				`nav flex justify-center items-center h-full gap-x-8 select-none`,
				className
			)}
			data-name={name}
		>
			{nav?.map((item) => (
				<li
					className="nav__item relative flex flex-col justify-center items-center h-full"
					key={item.name}
				>
					{/* Popover Button (tbc) */}
					{/* ... */}

					{/* Link Button */}
					{item.type === 'linkButton' && (
						<>
							{item.href === pathname && (
								<motion.span
									layoutId="underline"
									className="nav__underline absolute top-0 left-0 w-full h-1.5 bg-primary"
								/>
							)}
							<Link
								className="nav__link flex flex-col justify-center items-center h-full font-button font-normal text-xs tracking-wider leading-6 uppercase transition-opacity duration-300 ease-out lg:hover:opacity-25"
								href={item.href}
								target={item.target ?? '_self'}
							>
								{item.name}
							</Link>
						</>
					)}
				</li>
			))}
		</ul>
	);
}
