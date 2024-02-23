// Component: ThePageTransition
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import { motion } from 'framer-motion';

/*---------- Static Data ----------*/

// Name
const name = 'ThePageTransition';

// Motion
const anim = {
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	'fade-up': {
		initial: { opacity: 0, y: 60 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 60 },
	},
};

/*---------- Template ----------*/

// Types
export type ThePageTransitionProps = {
	animation?: ThemeMotion;
	className?: string;
	children?: React.ReactNode;
};
export type ThePageTransitionPresenterProps = {
	animation?: ThemeMotion;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function ThePageTransition(props: ThePageTransitionProps) {
	/*----- Props -----*/

	// Get props
	const { animation = 'fade', className, children } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: ThePageTransitionPresenterProps = {
		animation,
		className,
		children,
	};

	return <ThePageTransitionPresenter {...presenterProps} />;
}

// ThePage component
export function ThePageTransitionPresenter(
	props: ThePageTransitionPresenterProps
) {
	/*----- Props -----*/

	// Get props
	const { animation = 'fade', className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<motion.main
			className={classNames(
				`page relative z-10 flex flex-col w-full grow`,
				className
			)}
			{...anim[animation]}
			data-name={name}
		>
			<div className="page__container w-full">{children}</div>
		</motion.main>
	);
}
