// Component: LogoHeader
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
// ...

// Scripts (local)
import { classNames, strGetInitials } from '@/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'LogoHeader';

/*---------- Template ----------*/

// Types
export type LogoHeaderProps = {
	className?: string;
};
export type LogoHeaderPresenterProps = {
	initials?: string[];
	className?: string;
};

// Default component
export default function LogoHeader(props: LogoHeaderProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Get title initials
	const initials = strGetInitials(staticMetadata.title);

	// Presenter props
	const presenterProps: LogoHeaderPresenterProps = {
		initials,
		className,
	};

	// Return default
	return <LogoHeaderPresenter {...presenterProps} />;
}

// Presenter component
export function LogoHeaderPresenter(props: LogoHeaderPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { initials, className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<Link
			className={classNames(`logo select-none`, className)}
			href="/"
			data-name={name}
		>
			<h1 className="logo__title font-subtitle font-extrabold text-3xl tracking-wider uppercase">
				{initials?.map((initial, i) => (
					<span
						key={`logo-header-initial-${i}`}
						className="logo__title-initial"
					>
						{initial}
					</span>
				))}
				<span className="text-primary">.</span>
			</h1>
		</Link>
	);
}
