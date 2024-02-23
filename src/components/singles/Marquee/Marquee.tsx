// Component: Marquee
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Children } from 'react';
import ReactFastMarquee from 'react-fast-marquee';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'Marquee';

/*---------- Template ----------*/

// Types
export type MarqueeProps = {
	className?: string;
	children?: React.ReactNode;
};
export type MarqueePresenterProps = {
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function Marquee(props: MarqueeProps) {
	/*----- Props -----*/

	// Get props
	const { className, children } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: MarqueePresenterProps = {
		className,
		children,
	};

	// Return default
	return <MarqueePresenter {...presenterProps} />;
}

// Default component
export function MarqueePresenter(props: MarqueePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`marquee relative max-w-screen-md mx-auto overflow-hidden`,
				className
			)}
			data-name={name}
		>
			<ReactFastMarquee className="relative z-10">
				{Children.map(children, (child, c) => child)}
			</ReactFastMarquee>
			<span className="carousel__fade absolute z-20 top-0 left-0 w-20 h-full bg-gradient-to-r pointer-events-none from-black to-transparent" />
			<span className="carousel__fade absolute z-20 top-0 right-0 w-20 h-full bg-gradient-to-l pointer-events-none from-black to-transparent" />
		</div>
	);
}
