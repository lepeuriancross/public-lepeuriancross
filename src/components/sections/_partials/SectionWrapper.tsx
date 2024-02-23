// Component: SectionWrapper
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import {
	createContext,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const defaultName = 'SectionWrapper';

/*---------- Context ----------*/

// Types
export type SectionContextProps = {
	name?: string;
	idx?: number;
	paddingTop?: boolean;
	paddingSides?: boolean;
	paddingBottom?: boolean;
	isCard?: boolean;
	isFlipped?: boolean;
	theme?: ThemeSection;
};

// Context
const SectionContext = createContext<SectionContextProps>({
	name: defaultName,
	idx: 0,
	paddingTop: true,
	paddingSides: true,
	paddingBottom: true,
	isCard: false,
	isFlipped: false,
	theme: 'default',
});

// Functions
export function useSection() {
	return useContext(SectionContext);
}

/*---------- Template ----------*/

// Types
export type SectionWrapperProps = {
	name?: string;
	idx?: number;
	paddingTop?: boolean;
	paddingSides?: boolean;
	paddingBottom?: boolean;
	isCard?: boolean;
	isFlipped?: boolean;
	theme?: ThemeSection;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};
export type SectionWrapperPresenterProps = {
	name?: string;
	idx?: number;
	paddingTop?: boolean;
	paddingSides?: boolean;
	paddingBottom?: boolean;
	isCard?: boolean;
	isFlipped?: boolean;
	theme?: ThemeSection;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

// Default component
export default function SectionWrapper(props: SectionWrapperProps) {
	/*----- Props -----*/

	// Get props
	const {
		name = defaultName,
		idx,
		paddingTop,
		paddingSides,
		paddingBottom,
		isCard,
		isFlipped,
		theme,
		className,
		style,
		children,
	} = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: SectionWrapperPresenterProps = {
		name,
		idx,
		paddingTop,
		paddingSides,
		paddingBottom,
		isCard,
		isFlipped,
		theme,
		className,
		style,
		children,
	};

	// Return default
	return <SectionWrapperPresenter {...presenterProps} />;
}

// Presenter component
export function SectionWrapperPresenter(props: SectionWrapperPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		name,
		idx = 0,
		paddingTop = true,
		paddingSides = true,
		paddingBottom = true,
		isCard = false,
		isFlipped = false,
		theme = 'default',
		className,
		style,
		children,
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<>
			<SectionContext.Provider
				value={{
					name,
					idx,
					paddingTop,
					paddingSides,
					paddingBottom,
					isCard,
					isFlipped,
					theme,
				}}
			>
				<section
					className={classNames(
						`section flex flex-col justify-center items-stretch max-w-[100vw] overflow-hidden`,
						theme === 'primary'
							? 'bg-primary text-white'
							: theme === 'secondary'
							? 'bg-secondary text-white'
							: theme === 'white'
							? 'bg-white text-black'
							: '',
						className
					)}
					style={style}
					data-idx={idx}
					data-name={name}
				>
					<div
						className={classNames(
							`section__container`,
							paddingTop && 'pt-20',
							paddingSides && 'px-6 lg:px-8',
							paddingBottom && 'pb-20'
						)}
					>
						<div
							className={classNames(
								`section__container-inner space-y-10`,
								paddingSides && 'container mx-auto'
							)}
						>
							{children}
						</div>
					</div>
				</section>
			</SectionContext.Provider>
		</>
	);
}
