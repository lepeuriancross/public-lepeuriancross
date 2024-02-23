// Component: EmblaCarousel
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import {
	Children,
	useCallback,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'EmblaCarousel';

/*---------- Template ----------*/

// Types
type EmblaCarouselProps = {
	options?: EmblaOptionsType;
	defaultSlide?: number;
	className?: string;
	children?: React.ReactNode;
	onSelect?: (index: number) => void;
};

// Default component
const EmblaCarousel = (props: EmblaCarouselProps, ref: any) => {
	/*----- Props -----*/

	// Get props
	const {
		options,
		defaultSlide = 0,
		className,
		children,
		onSelect = (index: any) => {},
	} = props;

	/*----- Refs -----*/

	// Ref - emblaRef
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			...options,
		},
		[Autoplay()]
	);

	/*----- Methods -----*/

	// Function - scrollPrev
	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);

	// Function - scrollNext
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);

	// Function - scrollTo
	const scrollTo = useCallback(
		(index: number) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi]
	);

	// Expose custom handles as a ref
	useImperativeHandle(ref, () => ({
		scrollPrev,
		scrollNext,
		scrollTo,
	}));

	/*----- Lifecycle -----*/

	// Watch - scrollTo
	useEffect(() => {
		// If no emblaApi, return
		if (!emblaApi) return;

		// Scroll to default slide
		emblaApi.scrollTo(defaultSlide);
	}, [defaultSlide, emblaApi]);

	// Watch - emblaApi, onSelect, handleSelect
	useEffect(() => {
		// If no emblaApi, return
		if (!emblaApi) return;

		// Event handlers
		emblaApi.on('reInit', () => {
			onSelect(emblaApi.selectedScrollSnap());
		});
		emblaApi.on('select', () => {
			onSelect(emblaApi.selectedScrollSnap());
		});

		// Init
		onSelect(emblaApi.selectedScrollSnap());
	}, [emblaApi, onSelect]);

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`embla`, className)}>
			<div className="embla__viewport" ref={emblaRef}>
				<div
					className={classNames(`embla__container flex touch-pan-y md:-ml-4`)}
				>
					{Children.map(children, (child, c) => (
						<div
							key={`embla-carousel-slide-${c}`}
							className="carousel__slide flex-[0_0_auto] md:pl-6"
						>
							{child}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default forwardRef(EmblaCarousel);
