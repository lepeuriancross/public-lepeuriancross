// Component: NavFooter
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
import { parseListButtons } from '@/sanity/lib/utils';

// Components (node)
import Link from 'next/link';
import { motion } from 'framer-motion';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'NavFooter';

/*---------- Template ----------*/

// Types
export type NavFooterProps = {
	className?: string;
};
export type NavFooterPresenterProps = {
	nav?: ListButtons;
	className?: string;
};

// Default component
export default function NavFooter(props: NavFooterProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	// Get pathname
	const pathname = usePathname();

	/*----- Store -----*/

	// State - nav
	const [nav, setNav] = useState<ListButtons>([]);

	// Redux State - navHomeSlug
	const navHomeSlug = useAppSelector((state) => state.globals.navHomeSlug);

	// Redux state - navFooter
	const navFooter = useAppSelector((state) => state.globals.navFooter);

	/*----- Lifecycle -----*/

	// Watch - pathname, navHomeSlug, navFooter
	useEffect(() => {
		// If no navFooter..
		if (!navFooter) return;

		// Parse navFooter
		const navFooterParsed = parseListButtons(navFooter, {
			home: navHomeSlug,
			pathname,
		});

		// Set nav
		setNav(navFooterParsed);
	}, [pathname, navHomeSlug, navFooter]);

	/*----- Init -----*/

	// Presenter props
	const presenterProps: NavFooterPresenterProps = {
		nav,
		className,
	};

	// Return default
	return <NavFooterPresenter {...presenterProps} />;
}

// Presenter component
export function NavFooterPresenter(props: NavFooterPresenterProps) {
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
				`nav flex justify-center items-center gap-x-3 select-none`,
				className
			)}
			data-name={name}
		>
			{nav?.map((item) => (
				<li
					className="nav__item relative flex justify-center items-center h-full space-x-2"
					key={item.name}
				>
					{item.href === pathname && (
						<motion.span
							layoutId="dot"
							className="nav__dot inline-block w-1.5 h-1.5 rounded-full bg-primary"
						/>
					)}
					<Link
						className="nav__link flex flex-col justify-center items-center h-full text-xs leading-6 transition-opacity duration-300 ease-out lg:hover:opacity-25"
						href={item.href}
						target={item.target ?? '_self'}
					>
						{item.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
