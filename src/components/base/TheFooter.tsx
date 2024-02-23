// Component: TheFooter
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
import IconSocial from '@/components/singles/Icon/IconSocial';
import NavFooter from '@/components/singles/Nav/NavFooter';
import NavSocial from '../singles/Nav/NavSocial';

/*---------- Static Data ----------*/

// Name
const name = 'TheFooter';

// Motion
const navigation = [
	{
		name: 'Facebook',
		href: '#',
		icon: 'facebook',
	},
	{
		name: 'Instagram',
		href: '#',
		icon: 'instagram',
	},
	{
		name: 'GitHub',
		href: '#',
		icon: 'github',
	},
	{
		name: 'YouTube',
		href: '#',
		icon: 'youtube',
	},
] as {
	name: string;
	href: string;
	icon: ThemeIconSocial;
}[];

/*---------- Template ----------*/

// Types
export type TheFooterProps = {
	className?: string;
};
export type TheFooterPresenterProps = {
	className?: string;
};

// Default component
export default function TheFooter(props: TheFooterProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheFooterPresenterProps = {
		className,
	};

	// Return default
	return <TheFooterPresenter {...presenterProps} />;
}

// Presenter component
export function TheFooterPresenter(props: TheFooterPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<footer className={classNames(`footer`, className)} data-name={name}>
			<div className="footer__container px-6 lg:px-8">
				<div className="footer__container-inner flex flex-col justify-between items-center container min-h-[80px] mx-auto py-8 lg:flex-row">
					<div className="footer__social lg:order-2">
						<NavSocial />
					</div>
					<div className="footer__copyright mt-8 space-y-2 lg:order-1 lg:mt-0">
						<p className="footer__copyright-text text-center text-xs leading-5 lg:text-left text-white">
							&copy; {new Date().getFullYear()} {staticMetadata.title}
						</p>
						<div className="footer__nav">
							<NavFooter />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
