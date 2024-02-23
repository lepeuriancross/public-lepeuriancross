// Component: TheIntro
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';

// Components (node)
import Image from 'next/image';
import { AnimatePresence, usePresence, motion } from 'framer-motion';
import { Freeze } from 'react-freeze';

// Components (local)
import IconSpinner from '@/components/singles/Icon/IconSpinner';

// Images
import imgProfile from '../../../public/img/image/image_profile-1.jpg';

/*---------- Static Data ----------*/

// Name
const name = 'TheIntro';

// Motion
const animBackground = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};
const animSvg = {
	animate: (isScrolling: boolean) => ({
		transform: isScrolling
			? 'translate(calc(-100% + 100vw), -53%)'
			: 'translate(0, -55%)',
		transition: {
			duration: 10,
			ease: 'linear',
		},
	}),
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

/*---------- Template ----------*/

// Types
export type TheIntroProps = {
	className?: string;
};
export type TheIntroPresenterProps = {
	className?: string;
};

// Default component
export default function TheIntro(props: TheIntroProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheIntroPresenterProps = {
		className,
	};

	// Return default
	return <TheIntroPresenter {...presenterProps} />;
}

// Presenter component
export function TheIntroPresenter(props: TheIntroPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// State - backgroundIsVisible
	const [backgroundIsVisible, setBackgroundIsVisible] =
		useState<boolean>(false);

	// State - svgIsScrolling
	const [svgIsScrolling, setSvgIsScrolling] = useState<boolean>(false);

	// Context - useUI
	const ui = useUI();
	const { isShowingIntro, showIntro } = ui;

	/*----- Lifecycle -----*/

	// On mount...
	useEffect(() => {
		// If no showIntro...
		if (!showIntro) return;

		// Set timeout - showBackground
		const showBackground = setTimeout(() => {
			// Show background
			setBackgroundIsVisible(true);
		}, 0);

		// Set timeout - svgIsScrolling
		const svgIsScrolling = setTimeout(() => {
			// Show svg
			setSvgIsScrolling(true);
		}, 0);

		// Set timeout - isShowingIntro
		const isShowingIntro = setTimeout(() => {
			// Show intro
			showIntro(false);
		}, 3000);

		// Return cleanup
		return () => {
			clearTimeout(showBackground);
			clearTimeout(svgIsScrolling);
		};
	}, [showIntro]);

	/*----- Init -----*/

	// Use presence
	const [isPresent, safeToRemove] = usePresence();

	// Return default
	return (
		<div
			className={classNames(
				`intro fixed top-0 left-0 w-full h-screen transition-opacity duration-500 ease-out bg-black text-black`,
				!isShowingIntro && 'opacity-0 pointer-events-none',
				className
			)}
			data-name={name}
		>
			<AnimatePresence mode="wait">
				{isShowingIntro && (
					<motion.div
						className="intro__bg absolute z-10 top-0 left-0 w-full h-full"
						initial="initial"
						animate={backgroundIsVisible ? 'animate' : 'exit'}
						exit="exit"
						variants={animBackground}
						onAnimationComplete={() => {
							if (!isPresent) safeToRemove();
						}}
					>
						<Freeze freeze={!isPresent}>
							<Image
								className="w-full h-full object-cover object-center"
								src={imgProfile.src}
								width={imgProfile.width}
								height={imgProfile.height}
								alt=""
								priority
							/>
						</Freeze>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{isShowingIntro && (
					<div className="intro__container absolute z-20 w-full h-full overflow-hidden">
						<motion.div
							className="intro__mask absolute top-1/2 left-0 h-screen"
							initial="animate"
							animate="animate"
							exit="exit"
							variants={animSvg}
							custom={svgIsScrolling}
						>
							<Freeze freeze={!isPresent}>
								<svg
									className="intro__mask-svg h-[110vh] w-auto"
									version="1.1"
									id="Layer_1"
									x="0px"
									y="0px"
									viewBox="0 0 823 71"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									xmlSpace="preserve"
									fill="currentColor"
								>
									<g>
										<polygon points="548.2,48.3 558.8,48.3 553.5,12.9" />
										<path d="M380.4,10.5h-5.2v23.7h5.2c3.5,0,5.4-1.6,5.4-6.6V17.1C385.8,12.1,383.9,10.5,380.4,10.5z" />
										<path d="M238.9,10.5h-6.2v50h6.2c3.5,0,5.6-1.8,5.6-6.8V17.3C244.5,12.3,242.4,10.5,238.9,10.5z" />
										<path d="M197.8,10.5h-5.3V32h4.3c4.1,0,6.6-1.8,6.6-7.4v-6.9C203.4,12.7,201.7,10.5,197.8,10.5z" />
										<path d="M494.8,10.5h-5.3V32h4.3c4.1,0,6.6-1.8,6.6-7.4v-6.9C500.4,12.7,498.7,10.5,494.8,10.5z" />
										<polygon points="151.3,48.3 161.9,48.3 156.6,12.9" />
										<path d="M823,12.5V-0.3h-15.8C816.3-0.3,821.6,4.3,823,12.5z" />
										<path d="M813,16.6c0-5-2-6.9-5.5-6.9s-5.5,1.9-5.5,6.9c0,13.1,17.8,16.5,21,32.1V19.5h-10V16.6z" />
										<path d="M16.6,10.5h-5.3V32h4.3c4.1,0,6.6-1.8,6.6-7.4v-6.9C22.2,12.7,20.5,10.5,16.6,10.5z" />
										<path d="M58.6,53.7V17.3C58.6,6.1,64.2-0.3,75-0.3H0V71h71.2C62.9,69.6,58.6,63.5,58.6,53.7z M23.3,70.5c-0.6-1.8-1-2.9-1-8.6v-11 c0-6.5-2.2-8.9-7.2-8.9h-3.8v28.5h-11v-70h16.6c11.4,0,16.3,5.3,16.3,16.1v5.5c0,7.2-2.3,11.9-7.2,14.2c5.5,2.3,7.3,7.6,7.3,14.9 V62c0,3.4,0.1,5.9,1.2,8.5H23.3z M51.5,70.5h-11v-70h11V70.5z" />
										<path d="M635.7,53.7V17.3c0-11.2,5.6-17.6,16.4-17.6H75c10.8,0,16.4,6.4,16.4,17.6v6.8H81v-7.5c0-5-2.2-6.9-5.7-6.9 s-5.7,1.9-5.7,6.9v37.8c0,5,2.2,6.8,5.7,6.8s5.7-1.8,5.7-6.8v-10h10.4v9.3c0,9.8-4.3,15.9-12.6,17.3h371.5 c-8-1.5-12.1-7.6-12.1-17.2V0.5h11v54c0,5,2.2,6.8,5.7,6.8s5.7-1.8,5.7-6.8v-54H471v53.3c0,9.6-4.1,15.7-12.1,17.2h189.4 C640,69.6,635.7,63.5,635.7,53.7z M132.8,70.5h-11.2v-30h-12.5c0,0,0,30,0,30h-11v-70h11v30h12.5v-30h11.2V70.5z M165.3,70.5 l-1.9-12.7h-13.5L148,70.5h-10.1l11.2-70h16.1l11.2,70H165.3z M204.5,70.5c-0.6-1.8-1-2.9-1-8.6v-11c0-6.5-2.2-8.9-7.2-8.9h-3.8 v28.5h-11v-70h16.6c11.4,0,16.3,5.3,16.3,16.1v5.5c0,7.2-2.3,11.9-7.2,14.2c5.5,2.3,7.3,7.6,7.3,14.9V62c0,3.4,0.1,5.9,1.2,8.5 H204.5z M255.5,53.2c0,11.2-5.4,17.3-16.4,17.3h-17.4v-70h17.4c11,0,16.4,6.1,16.4,17.3V53.2z M307.1,70.5H278v-70h11v60h18.1V70.5 z M341.9,10.5h-19V30H338v10h-15.1v20.5h19v10h-30v-70h30V10.5z M396.8,26.9c0,11.2-5.4,17.3-16.4,17.3h-5.2v26.3h-11v-70h16.2 c11,0,16.4,6.1,16.4,17.3V26.9z M431.9,10.5h-19V30H428v10h-15.1v20.5h19v10h-30v-70h30V10.5z M501.5,70.5c-0.6-1.8-1-2.9-1-8.6 v-11c0-6.5-2.2-8.9-7.2-8.9h-3.8v28.5h-11v-70h16.6c11.4,0,16.3,5.3,16.3,16.1v5.5c0,7.2-2.3,11.9-7.2,14.2 c5.5,2.3,7.3,7.6,7.3,14.9V62c0,3.4,0.1,5.9,1.2,8.5H501.5z M529.7,70.5h-11v-70h11V70.5z M562.2,70.5l-1.9-12.7h-13.5l-1.9,12.7 h-10.1l11.2-70h16.1l11.2,70H562.2z M613.2,70.5h-11.3l-13.7-50.7v50.7h-9.9v-70h13.8l11.3,41.9V0.5h9.8V70.5z" />
										<path d="M731.2,9.7c-3.5,0-5.7,1.9-5.7,6.9v37.8c0,5,2.2,6.9,5.7,6.9s5.7-1.9,5.7-6.9V16.6C736.9,11.6,734.7,9.7,731.2,9.7z" />
										<path d="M691.5,10.5h-5.3V32h4.3c4.1,0,6.6-1.8,6.6-7.4v-6.9C697.1,12.7,695.4,10.5,691.5,10.5z" />
										<path d="M714.5,53.7V17.3c0-11.2,5.9-17.6,16.7-17.6h-79.1c10.8,0,16.4,6.4,16.4,17.6v6.8h-10.4v-7.5c0-5-2.2-6.9-5.7-6.9 s-5.7,1.9-5.7,6.9v37.8c0,5,2.2,6.8,5.7,6.8s5.7-1.8,5.7-6.8v-10h10.4v9.3c0,9.8-4.3,15.9-12.6,17.3h71.4 C719,69.6,714.5,63.5,714.5,53.7z M698.2,70.5c-0.6-1.8-1-2.9-1-8.6v-11c0-6.5-2.2-8.9-7.2-8.9h-3.8v28.5h-11v-70h16.6 c11.4,0,16.3,5.3,16.3,16.1v5.5c0,7.2-2.3,11.9-7.2,14.2c5.5,2.3,7.3,7.6,7.3,14.9V62c0,3.4,0.1,5.9,1.2,8.5H698.2z" />
										<path d="M790.7,53.7v-4.3h10.4v5c0,5,2.2,6.8,5.7,6.8s5.7-1.8,5.7-6.8c0-14.4-21.5-17.1-21.5-37.1c0-11.2,5.5-17.6,16.2-17.6h-37.4 c10.7,0,16.2,6.4,16.2,17.6v2.2h-10.4v-2.9c0-5-2-6.9-5.5-6.9s-5.5,1.9-5.5,6.9c0,14.4,21.5,17.1,21.5,37.1 c0,9.8-4.3,15.9-12.6,17.3h29.8C795,69.6,790.7,63.5,790.7,53.7z" />
										<path d="M753.3,53.7v-4.3h10.4v5c0,5,2.2,6.8,5.7,6.8s5.7-1.8,5.7-6.8c0-14.4-21.5-17.1-21.5-37.1c0-11.2,5.5-17.6,16.2-17.6h-38.6 c10.8,0,16.7,6.4,16.7,17.6v36.4c0,9.8-4.5,15.9-12.9,17.3h30.8C757.6,69.6,753.3,63.5,753.3,53.7z" />
										<path d="M823,59c-1.3,6.7-5.4,10.9-12.1,12H823V59z" />
										<path d="M75,71.3c1.4,0,2.6-0.1,3.8-0.3h-7.6C72.4,71.2,73.6,71.3,75,71.3z" />
										<path d="M454.6,71.4c1.5,0,3-0.1,4.3-0.4h-8.6C451.6,71.3,453.1,71.4,454.6,71.4z" />
										<path d="M652.1,71.3c1.4,0,2.6-0.1,3.8-0.3h-7.6C649.5,71.2,650.7,71.3,652.1,71.3z" />
										<path d="M731.2,71.3c1.4,0,2.6-0.1,3.8-0.3h-7.7C728.6,71.2,729.8,71.3,731.2,71.3z" />
										<path d="M769.7,71.3c1.4,0,2.6-0.1,3.8-0.3h-7.6C767.1,71.2,768.3,71.3,769.7,71.3z" />
										<path d="M807.1,71.3c1.4,0,2.6-0.1,3.8-0.3h-7.6C804.5,71.2,805.7,71.3,807.1,71.3z" />
										<path d="M823.5,53.7c0-1.8-0.2-3.5-0.5-5V59C823.3,57.4,823.5,55.6,823.5,53.7z" />
										<path d="M823.4,19.5v-2.2c0-1.7-0.1-3.3-0.4-4.8v7H823.4z" />
									</g>
								</svg>
							</Freeze>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<div className="intro__spinner absolute z-30 bottom-6 right-6 lg:bottom-8 lg:right-8 text-white">
				<IconSpinner text={'Loading...'} />
			</div>
		</div>
	);
}
