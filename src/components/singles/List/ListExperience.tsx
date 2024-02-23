// Component: ListExperience
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useEffect, useRef, useState } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useSection } from '@/components/sections/_partials/SectionWrapper';
import dayjs from 'dayjs';

// Components (node)
import { PlusIcon } from '@heroicons/react/20/solid';

// Components (local)
import TextBody from '@/components/singles/Text/TextBody';
import AosWrapper from '@/components/utility/Aos/AosWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'ListExperience';

/*---------- Template ----------*/

// Types
export type ListExperienceProps = {
	experience?: SanityExperience[];
	className?: string;
};
export type ListExperiencePresenterProps = {
	experience?: SanityExperience[];
	themeSection?: ThemeSection;
	className?: string;
};

// Dewfault component
export default function ListExperience(props: ListExperienceProps) {
	/*----- Props -----*/

	// Get props
	const { experience, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: ListExperiencePresenterProps = {
		experience,
		themeSection,
		className,
	};

	// Return default
	return <ListExperiencePresenter {...presenterProps} />;
}

// Presenter component
export function ListExperiencePresenter(props: ListExperiencePresenterProps) {
	/*----- Props -----*/

	// Props
	const { experience, themeSection, className } = props;

	/*----- Refs -----*/

	// Ref - parentEl
	const parentEl = useRef<HTMLDivElement>(null);

	// Ref - windowWidth
	const windowWidth = useRef<number>(0);

	// Ref - drawHeights
	const drawHeights = useRef<number[]>([]);

	/*----- Store -----*/

	// State - currentActive
	const [currentActive, setCurrentActive] = useState<number | null>(null);

	/*----- Methods -----*/

	// Method - handleClickToggle
	const handleClickToggle = (i: number) => {
		// Set currentActive
		setCurrentActive(currentActive === i ? null : i);
	};

	/*----- Lifecycle -----*/

	// Watch - on window resize
	useEffect(() => {
		// Function - handleResize
		const handleResize = () => {
			// If no parentEl
			if (!parentEl.current) return;

			// Set drawHeights
			drawHeights.current = Array.from(
				parentEl.current.querySelectorAll('.list__draw-container')
			).map((item) => {
				return item.clientHeight;
			});

			// If window width has changed...
			if (windowWidth.current !== window.innerWidth) {
				// Set windowWidth
				windowWidth.current = window.innerWidth;

				// Set currentActive
				setCurrentActive(null);
			}
		};

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Run
		handleResize();

		// Return cleanup
		return () => {
			// Remove event listener
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	/*----- Init -----*/

	// Return default
	return (
		<div
			ref={parentEl}
			className={classNames(['list flex flex-col justify-start', className])}
		>
			<AosWrapper animation="fade-left" duration={0.5} stagger={0.1}>
				{experience &&
					experience.length > 0 &&
					experience.map((item, i) => {
						return (
							<div
								className={classNames(
									`list__item border-b text-left transition-size duration-500 ease-out`,
									themeSection === 'primary'
										? 'border-white/30'
										: themeSection === 'secondary'
										? 'border-white/30'
										: themeSection === 'tertiary'
										? 'border-white/30'
										: themeSection === 'white'
										? 'border-black/30'
										: 'border-white/30',
									currentActive === i &&
										(themeSection === 'primary'
											? 'bg-white/5'
											: themeSection === 'secondary'
											? 'bg-white/5'
											: themeSection === 'tertiary'
											? 'bg-white/5'
											: themeSection === 'white'
											? 'bg-black/10'
											: 'bg-white/5'),
									i === experience.length - 1 && 'border-b-0'
								)}
								key={`list-experience-item-${i}`}
							>
								<button
									className={classNames(
										`list__button flex justify-between w-full font-button font-extrabold text-sm uppercase group transition-size diration-300 ease-out lg:text-base`,
										currentActive === i ? 'p-6' : i === 0 ? 'pb-6' : 'py-6',
										className
									)}
									type="button"
									onClick={() => handleClickToggle(i)}
								>
									<span className="list__col text-left">{item.title}</span>
									<span className="list__col inline-flex justify-center items-center space-x-3 text-right">
										<span
											className={classNames(
												`list__dates--desktop hidden justify-center items-center space-x-2 transition-opacity duration-500 ease-out xl:inline-flex`,
												currentActive === i
													? 'opacity-100'
													: 'opacity-30 lg:group-hover:opacity-100'
											)}
										>
											{item.start && (
												<>
													<span>{dayjs(item.start).format('MMM YYYY')}</span>
													<span>-</span>
													{item.end ? (
														<span>{dayjs(item.end).format('MMM YYYY')}</span>
													) : (
														<span>Present</span>
													)}
												</>
											)}
										</span>
										<PlusIcon
											className={classNames(
												`w-6 h-6 transform transition-transform duration-500 ease-out`,
												currentActive === i && 'transform rotate-45'
											)}
										/>
									</span>
								</button>

								{(item.subtitle || item.body) && (
									<div
										className="list__draw overflow-hidden transition-all duration-500 ease-out"
										style={{
											maxHeight:
												currentActive === i
													? `${drawHeights.current[i]}px`
													: '0px',
										}}
									>
										<div className="list__draw-container overflow-hidden">
											<AosWrapper
												className="max-w-screen-lg mx-auto px-6 pb-6 space-y-4"
												animation="fade"
												duration={0.5}
												delay={0.3}
												stagger={0.05}
												isActive={currentActive === i}
											>
												{item.subtitle && (
													<p className="opacity-30 text-sm">
														<span>{item.subtitle}</span>
														{item.start && (
															<span className="list__dates--mobile xl:hidden">
																<span>
																	, {dayjs(item.start).format('MMM YYYY')}
																</span>
																<span>-</span>
																{item.end ? (
																	<span>
																		{dayjs(item.end).format('MMM YYYY')}
																	</span>
																) : (
																	<span>Present</span>
																)}
															</span>
														)}
													</p>
												)}
												{item.body && (
													<TextBody className="list__body" body={item.body} />
												)}
											</AosWrapper>
										</div>
									</div>
								)}
							</div>
						);
					})}
			</AosWrapper>
		</div>
	);
}
