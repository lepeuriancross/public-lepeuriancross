// Component: ImageParallax
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useRef, useState, useLayoutEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import ImageBuilder from '@/components/utility/Image/ImageBuilder';

/*---------- Static Data ----------*/

// Name
const name = 'ImageParallax';

// Motion
const scrollDistance = 200; // px

/*---------- Template ----------*/

// Types
export type ImageParallaxProps = {
	image?: Image | SanityImage | string;
	className?: string;
};
export type ImageParallaxPresenterProps = {
	image?: Image | SanityImage | string;
	className?: string;
};

// Default component
export default function ImageParallax(props: ImageParallaxProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// If no image, return null
	if (!props.image) return null;

	// Presenter props
	const presenterProps: ImageParallaxPresenterProps = {
		...props,
	};

	// Return default
	return <ImageParallaxPresenter {...presenterProps} />;
}

// Presenter component
export function ImageParallaxPresenter(props: ImageParallaxProps) {
	/*----- Props -----*/

	// Get props
	const { image, className } = props;

	/*----- Refs -----*/

	// Ref - parentEl
	const parentEl = useRef<HTMLDivElement>(null);

	// Ref - containerEl
	const containerEl = useRef<HTMLDivElement>(null);

	// Ref - scrollPercent
	const scrollPercent = useRef<number>(0);

	/*----- Store -----*/

	// State - scrollTop
	const [scrollTop, setScrollTop] = useState<number>(0);

	/*----- Lifecycle -----*/

	// On mount
	useLayoutEffect(() => {
		// Get containerEl rect
		const rect = containerEl.current?.getBoundingClientRect();

		// Get scrollPercent (a percentage from bottom of vewport to top)
		scrollPercent.current = rect
			? (rect.top + rect.height) / window.innerHeight
			: 0;

		// Set scrollTop
		setScrollTop(scrollPercent.current * scrollDistance);
	}, []);

	// Add event listener - window scroll
	useLayoutEffect(() => {
		// Get parentEl
		const el = parentEl.current;

		// Return if no parentEl
		if (!el) return;

		// Function - handleScroll
		const handleScroll = () => {
			// Get containerEl rect
			const rect = containerEl.current?.getBoundingClientRect();

			// Get scrollPercent (a percentage from bottom of vewport to top)
			scrollPercent.current = rect
				? (rect.top + rect.height) / window.innerHeight
				: 0;

			// Set scrollTop
			setScrollTop(scrollPercent.current * scrollDistance);
		};

		// Add event listener - window scroll
		window.addEventListener('scroll', handleScroll);

		// Add event listener - window resize
		window.addEventListener('resize', handleScroll);

		// Return function to remove event listener
		return () => {
			// Remove event listeners
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [scrollTop]);

	/*----- Init -----*/

	// Return default
	return (
		<div
			ref={parentEl}
			className={classNames(`image-parallax overflow-hidden`, className)}
			data-name={name}
		>
			<div
				ref={containerEl}
				className="image-parallax__container absolute left-0 w-full"
				style={{
					top: `-${scrollTop}px`,
					height: `calc(100% + ${scrollDistance}px)`,
				}}
			>
				{image && (
					<ImageBuilder className="w-full h-full object-cover" image={image} />
				)}
			</div>
		</div>
	);
}
