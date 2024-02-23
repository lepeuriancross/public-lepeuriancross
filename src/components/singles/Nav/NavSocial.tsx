// Component: NavSocial
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';

// Scripts (local)
import { classNames, strCapitalize } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { parseListSocial } from '@/sanity/lib/utils';

// Components (node)
import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

// Components (local)
import IconSocial from '@/components/singles/Icon/IconSocial';

/*---------- Static Data ----------*/

// Name
const name = 'NavSocial';

/*---------- Template ----------*/

// Types
export type NavSocialProps = {
	className?: string;
};
export type NavSocialPresenterProps = {
	contactTel?: string;
	contactEmail?: string;
	nav: ListSocial;
	className?: string;
};

// Default component
export default function NavSocial(props: NavSocialProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// State - nav
	const [nav, setNav] = useState<ListSocial>([]);

	// Redux State - contactTel
	const contactTel = useAppSelector((state) => state.globals.contactTel);

	// Redux State - contactEmail
	const contactEmail = useAppSelector((state) => state.globals.contactEmail);

	// Redux state - navSocial
	const navSocial = useAppSelector((state) => state.globals.navSocial);

	/*----- Lifecycle -----*/

	// Watch - pathname, navHomeSlug, navSocial
	useEffect(() => {
		// If no navSocial..
		if (!navSocial) return;

		// Parse navSocial
		const navSocialParsed = parseListSocial(navSocial);

		// Set nav
		setNav(navSocialParsed);
	}, [navSocial]);

	/*----- Init -----*/

	// Presenter props
	const presenterProps: NavSocialPresenterProps = {
		contactTel,
		contactEmail,
		nav,
		className,
	};

	// Return default
	return <NavSocialPresenter {...presenterProps} />;
}

// Presenter component
export function NavSocialPresenter(props: NavSocialPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { contactTel, contactEmail, nav, className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<ul
			className={classNames(`nav flex justify-center space-x-4`, className)}
			data-name={name}
		>
			{contactTel && (
				<Link
					href={`tel:${contactTel}`}
					className="transition-opacity duration-300 ease-out lg:hover:opacity-30 text-white"
				>
					<span className="sr-only">Phone</span>
					<PhoneIcon className="w-6 h-6" />
				</Link>
			)}
			{contactEmail && (
				<Link
					href={`mailto:${contactEmail}`}
					className="transition-opacity duration-300 ease-out lg:hover:opacity-30 text-white"
				>
					<span className="sr-only">Email</span>
					<EnvelopeIcon className="w-6 h-6" />
				</Link>
			)}
			{nav.map((item) => (
				<Link
					key={item.icon}
					href={item.href}
					target={item.target}
					className="transition-opacity duration-300 ease-out lg:hover:opacity-30 text-white"
				>
					<span className="sr-only">{strCapitalize(item.icon)}</span>
					<IconSocial className="w-5 h-5" icon={item.icon} />
				</Link>
			))}
		</ul>
	);
}
