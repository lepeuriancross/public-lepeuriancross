// Component: TextSubtitle
/*----------------------------------------------------------------------------------------------------*/

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
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TextSubtitle';

/*---------- Template ----------*/

// Types
export type TextSubtitleProps = {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	subtitle?: string;
	className?: string;
};
export type TextSubtitlePresenterProps = {
	Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	subtitle?: string;
	textSize?: number;
	leadingSize?: number;
	className?: string;
};

// Default component
export default function TextSubtitle(props: TextSubtitleProps) {
	/*----- Props -----*/

	// Get props
	const { as = 'h3', subtitle, className } = props;

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

	// Presenter props
	const presenterProps: TextSubtitlePresenterProps = {
		Tag: as,
		subtitle,
		textSize: settingBiggerText,
		leadingSize: settingLineHeight,
		className,
	};

	// Return default
	return <TextSubtitlePresenter {...presenterProps} />;
}

// Default component
export function TextSubtitlePresenter(props: TextSubtitlePresenterProps) {
	/*----- Props -----*/

	// Get props
	const { Tag = 'h3', subtitle, textSize, leadingSize, className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<Tag className={classNames(`subtitle`, className)} data-name={name}>
			<span
				className={classNames(
					`subtitle__container font-subtitle leading-none uppercase`,
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
				<span className="subtitle__word whitespace-nowrap">{subtitle}</span>
				<span className="subtitle__dot text-[1.3em] text-primary"> .</span>
			</span>
		</Tag>
	);
}
