// Component: TheHeader
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
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/solid';

// Components (local)
import { useUI } from '@/components/base/TheProviderUI';
import LogoHeader from '@/components/singles/Logo/LogoHeader';
import NavHeader from '@/components/singles/Nav/NavHeader';
import {
	ButtonText,
	ButtonIcon,
} from '@/components/singles/Button/ButtonDefault';
import ButtonToggleMenu from '@/components/singles/Button/ButtonToggleMenu';

/*---------- Static Data ----------*/

// Name
const name = 'TheHeader';

/*---------- Template ----------*/

// Types
export type TheHeaderProps = {
	component?: 'header-1' | 'header-2' | 'header-3' | 'header-4' | 'header-5';
	className?: string;
};
export type TheHeader1Props = {
	isActive?: boolean;
	className?: string;
};

// Default component
export default function TheHeader(props: TheHeaderProps) {
	/*----- Props -----*/

	// Get props
	const { component = 'header-1', className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { isShowingContent } = ui;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheHeader1Props = {
		isActive: isShowingContent,
		className,
	};

	// Switch - component
	switch (component) {
		// case 'header-2':
		// 	return <TheHeader1 {...presenterProps} />;

		case 'header-1':
		default:
			return <TheHeader1 {...presenterProps} />;
	}
}

// TheHeader1 component
export function TheHeader1(props: TheHeader1Props) {
	/*----- Props -----*/

	// Get props
	const { isActive, className } = props;

	/*----- Store -----*/

	// State - isScrolled
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	/*----- Lifecycle -----*/

	// Add event listener - window scroll
	useEffect(() => {
		// Define function - handleScroll
		const handleScroll = () => {
			// Get scroll position
			const scrollPosition = window.scrollY;

			// Check scroll position
			if (scrollPosition > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		// Add event listener
		window.addEventListener('scroll', handleScroll);

		// Return function - remove event listener
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	/*----- Init -----*/

	// Return default
	return (
		<header
			className={classNames(
				`header sticky top-0 transform w-full h-[80px] transition-opacity duration-500 delay-300 ease-out bg-black text-white`,
				!isActive && 'opacity-0',
				isScrolled && 'is-scrolled',
				className
			)}
			data-name={name}
		>
			<div className="header__container px-6 lg:px-8">
				<nav
					className={classNames(
						`header__container-inner grid grid-cols-2 container h-[80px] mx-auto border-b transition-color duration-300 ease-out lg:grid-cols-6`,
						isScrolled ? 'border-transparent' : 'border-current'
					)}
				>
					<div className="header__col flex justify-start items-center text-left">
						<LogoHeader />
					</div>
					<div className="header__col hidden justify-center items-center text-center lg:flex lg:col-span-4">
						<NavHeader />
					</div>
					<div className="header__col flex justify-end items-center space-x-2 text-right">
						<Link className="header__button lg:hidden" href="/contact">
							<ButtonIcon
								name="Let's Talk"
								theme="block"
								color="primary"
								icon={
									<PencilIcon className="w-4 h-4 transiiton-all duration-300 ease-out lg:group-hover:-rotate-[30deg]" />
								}
							/>
						</Link>
						<ButtonToggleMenu className="lg:hidden" />
						<Link
							className="header__button hidden lg:inline-flex"
							href="/contact"
						>
							<ButtonText
								name="Let's Talk"
								theme="block"
								color="primary"
								icon={
									<PencilIcon className="w-4 h-4 transiiton-all duration-300 ease-out lg:group-hover:-rotate-[30deg]" />
								}
							/>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
