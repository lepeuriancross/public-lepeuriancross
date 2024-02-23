// Component: TextTitle
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
// ...

// Components (local)
import ButtonTitle from '@/components/singles/Button/ButtonTitle';

/*---------- Static Data ----------*/

// Name
const name = 'TextTitle';

/*---------- Template ----------*/

// Types
export type TextTitleProps = {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	title?: string;
	useButton?: boolean;
	className?: string;
};
export type TextTitlePresenterProps = {
	Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	title?: string;
	titleSplit?: string[][];
	textSize?: number;
	leadingSize?: number;
	useButton?: boolean;
	className?: string;
};

// Default component
export default function TextTitle(props: TextTitleProps) {
	/*----- Props -----*/

	// Get props
	const { as = 'h2', title, useButton, className } = props;

	/*----- Store -----*/

	// Redux state - settingBiggerText
	const settingBiggerText = useAppSelector(
		(state) => state.accessibility.settingBiggerText
	);

	// Redux state - settingLineHeight
	const settingLineHeight = useAppSelector(
		(state) => state.accessibility.settingLineHeight
	);

	/*----- Init -----*/

	// Split title string into span elements
	const titleSplit = title?.split(' ').map((word, w) => {
		let wordSplit: string[] = word.split('').map((letter, l) => {
			return letter;
		});
		return wordSplit;
	});

	// Presenter props
	const presenterProps: TextTitlePresenterProps = {
		Tag: as,
		title,
		titleSplit,
		textSize: settingBiggerText,
		leadingSize: settingLineHeight,
		useButton,
		className,
	};

	// Return default
	return <TextTitlePresenter {...presenterProps} />;
}

// Presenter component
export function TextTitlePresenter(props: TextTitlePresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		Tag = 'h2',
		title,
		titleSplit,
		textSize = 0,
		leadingSize = 0,
		useButton,
		className,
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<>
			{title && (
				<Tag
					className={classNames(
						`title font-title font-black leading-none uppercase`,
						className
					)}
					data-name={name}
				>
					<span
						className={classNames(
							`title__container`,
							textSize === 1
								? 'text-[1.1em]'
								: textSize === 2
								? 'text-[1.2em]'
								: textSize === 3
								? 'text-[1.3em]'
								: 'text-[1em]',
							leadingSize === 1
								? 'leading-[1em]'
								: leadingSize === 2
								? 'leading-[1.2em]'
								: leadingSize === 3
								? 'leading-[1.4em]'
								: 'leading-[.8em]'
						)}
					>
						{titleSplit && titleSplit.length > 0 ? (
							<>
								{titleSplit?.map((word, w) => (
									<span key={`title-word-${w}`}>
										<span className="title__word whitespace-nowrap">
											{word.map((letter, l) => (
												<span
													className="title__letter inline-flex"
													key={`title-letter-${w}-${l}`}
												>
													{letter === 'o' && useButton ? (
														<ButtonTitle />
													) : (
														letter
													)}
												</span>
											))}
										</span>
										{w < titleSplit.length - 1 && (
											<span className="title__space"> </span>
										)}
									</span>
								))}
							</>
						) : (
							<span className="inline-block">{title}</span>
						)}
					</span>
				</Tag>
			)}
		</>
	);
}
