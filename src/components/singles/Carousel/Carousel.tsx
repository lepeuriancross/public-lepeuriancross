// Component: Carousel
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import {
	Children,
	useCallback,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { EmblaOptionsType } from 'embla-carousel';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import EmblaCarousel from '@/components/utility/Carousel/EmblaCarousel';

/*---------- Static Data ----------*/

// Name
const name = 'Carousel';

/*---------- Template ----------*/

// Types
export type CarouselProps = {
	component: 'CarouselDocuments' | 'CarouselImages';
	className?: string;
	children?: React.ReactNode;
};
export type CarouselPresenterProps = {
	className?: string;
	children?: React.ReactNode;
};

// Default component
function Carousel(props: CarouselProps, ref: any) {
	/*----- Props -----*/

	// Get props
	const { component = 'CarouselDocuments', className, children } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: CarouselPresenterProps = {
		className,
		children: children,
	};

	// Switch component
	switch (component) {
		// case 'CarouselImages':
		//     return <CarouselImages ref={ref} {...presenterProps} />;

		case 'CarouselDocuments':
		default:
			return <CarouselDocuments {...presenterProps} />;
	}
}
export default forwardRef(Carousel);

// CarouselDocuments component
export const CarouselDocuments = forwardRef(function CarouselDocumentsRef(
	props: CarouselPresenterProps,
	ref: any
) {
	/*----- Props -----*/

	// Get props
	const { className, children } = props;

	// Define options
	const options: EmblaOptionsType = {
		dragFree: true,
		loop: true,
		containScroll: 'trimSnaps',
	};

	/*----- Refs -----*/

	// Ref - carouselEl
	const carouselEl = useRef<any>(null);

	/*----- Methods -----*/

	// Function - scrollPrev
	const scrollPrev = useCallback(
		() => carouselEl.current && carouselEl.current.scrollPrev(),
		[carouselEl]
	);

	// Function - scrollNext
	const scrollNext = useCallback(() => {
		carouselEl.current && carouselEl.current.scrollNext();
	}, [carouselEl]);

	// Function - scrollTo
	const scrollTo = useCallback(
		(index: number) => carouselEl && carouselEl.current.scrollTo(index),
		[carouselEl]
	);

	// Expose custom handles as a ref
	useImperativeHandle(ref, () => ({
		scrollPrev,
		scrollNext,
		scrollTo,
	}));

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`carousel relative max-w-screen mx-auto overflow-hidden`,
				className
			)}
			data-name={name}
		>
			<EmblaCarousel
				ref={carouselEl}
				className="relative z-10"
				options={options}
			>
				{Children.map(children, (child, c) => child)}
			</EmblaCarousel>
		</div>
	);
});
