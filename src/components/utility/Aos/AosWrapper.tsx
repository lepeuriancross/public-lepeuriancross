// Component: AosWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Children, useRef, useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { motion } from 'framer-motion';

// Components (local)
import { useUI } from '@/components/base/TheProviderUI';

/*---------- Static Data ----------*/

// Name
const name = 'AosWrapper';

// Motion
const fadeXDistance = 50;
const fadeYDistance = 50;
const animFade = {
	initial: {
		opacity: 0,
	},
	animate: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 1,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
	exit: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 0,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
};
const animFadeUp = {
	initial: {
		opacity: 0,
		y: `${fadeYDistance}px`,
	},
	animate: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
	exit: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 0,
		y: `${fadeYDistance}px`,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
};
const animFadeRight = {
	initial: {
		opacity: 0,
		x: `-${fadeXDistance}px`,
	},
	animate: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
	exit: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 0,
		x: `-${fadeXDistance}px`,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
};
const animFadeDown = {
	initial: {
		opacity: 0,
		y: `-${fadeYDistance}px`,
	},
	animate: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
	exit: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 0,
		y: `-${fadeYDistance}px`,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
};
const animFadeLeft = {
	initial: {
		opacity: 0,
		x: `${fadeXDistance}px`,
	},
	animate: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
	exit: (params: {
		idx: number;
		duration: number;
		delay: number;
		stagger: number;
	}) => ({
		opacity: 0,
		x: `${fadeXDistance}px`,
		transition: {
			duration: params.duration,
			ease: 'easeInOut',
			delay: params.delay + params.stagger * params.idx,
		},
	}),
};

/*---------- Template ----------*/

// Types
export type AosWrapperProps = {
	animation?: ThemeAosAnimation;
	duration?: number;
	delay?: number;
	stagger?: number;
	isActive?: boolean;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function AosWrapper(props: AosWrapperProps) {
	/*----- Props -----*/

	// Get props
	const {
		animation = 'fade-up',
		duration = 0.3,
		delay = 0,
		stagger = 0,
		isActive = true,
		className,
		children,
	} = props;

	/*----- Refs -----*/

	// Ref - parentEl
	const parentEl = useRef<HTMLDivElement>(null);

	// Ref - scrollY
	const scrollY = useRef<number>(0);

	// Ref - positionY
	const positionY = useRef<number>(0);

	/*----- Store -----*/

	// State - isVisable
	const [isVisable, setIsVisable] = useState<boolean>(false);

	// Context - useUI
	const ui = useUI();
	const { isShowingContent } = ui;

	/*----- Lifecycle -----*/

	// Watch - isShowingContent
	useEffect(() => {
		// Function - handleScroll
		const handleScroll = () => {
			// If no parentEl...
			if (!parentEl.current) return;

			// Get scrollY
			scrollY.current = window.scrollY;

			// Get positionY
			positionY.current = parentEl.current.getBoundingClientRect().top;

			// Get window height
			const windowHeight = window.innerHeight * 0.9;

			// Get isInView
			const isInView = positionY.current - windowHeight < 0;

			// If not active...
			if (!isVisable) {
				// If active and in view...
				if (isActive && isInView && isShowingContent) {
					// Set active
					setIsVisable(true);
				}
			} else {
				// If inactive or not in view...
				if (!isActive || !isInView) {
					// Set active
					setIsVisable(false);
				}
			}
		};

		// Add event listener - window scroll
		window.addEventListener('scroll', handleScroll);

		// Add event listener - window resize
		window.addEventListener('resize', handleScroll);

		// Init
		handleScroll();

		// Return function
		return () => {
			// Remove event listeners
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [isActive, isVisable, isShowingContent]);

	/*----- Init -----*/

	// Define variants
	const variants =
		animation === 'fade-up'
			? animFadeUp
			: animation === 'fade-right'
			? animFadeRight
			: animation === 'fade-down'
			? animFadeDown
			: animation === 'fade-left'
			? animFadeLeft
			: animFade;

	// Return default
	return (
		<div
			ref={parentEl}
			className={classNames(`aos-wrapper--${animation}`, className)}
			data-name={name}
		>
			{Children.map(children, (child, c) => (
				<motion.div
					key={`aos-wrapper-child-${c}`}
					initial="initial"
					animate={isVisable ? 'animate' : 'initial'}
					exit="exit"
					variants={variants}
					custom={{
						idx: c,
						duration,
						delay,
						stagger,
					}}
				>
					{/* Render child */}
					{child}
				</motion.div>
			))}
		</div>
	);
}
