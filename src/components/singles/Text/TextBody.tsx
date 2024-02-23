// Component: TextBody
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames, strRemoveTags } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
import { toHTML } from '@portabletext/to-html';
import { PortableText } from '@portabletext/react';

// Components (local)
// ...

/*---------- Static Content ----------*/

// Name
const name = 'TextBody';

/*---------- Template ----------*/

// Typings
type TextBodyProps = {
	body?: SanityBody[] | string;
	toPlainText?: boolean;
	className?: string;
};

// Default component
export default function TextBody(props: TextBodyProps) {
	/*----- Props -----*/

	// Get props
	const { body, toPlainText = false, className } = props;

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

	// If toPlainText...
	if (toPlainText) {
		return (
			<>
				{body && typeof body == 'string'
					? body
					: strRemoveTags(toHTML(body as SanityBody[]))}
			</>
		);
	}

	// Return default
	return (
		<div className={classNames(`body`, className ?? '')} data-name={name}>
			<div
				className={classNames(
					`body__container leading-6 space-y-4`,
					settingBiggerText === 1
						? 'text-[1.1em]'
						: settingBiggerText === 2
						? 'text-[1.2em]'
						: settingBiggerText === 3
						? 'text-[1.3em]'
						: 'text-[1em]',
					settingLineHeight === 1
						? 'leading-[1.5em]'
						: settingLineHeight === 2
						? 'leading-[1.7em]'
						: settingLineHeight === 3
						? 'leading-[1.9em]'
						: 'leading-[1.3em]'
				)}
			>
				{body && typeof body == 'string' ? (
					<p>{body}</p>
				) : (
					<PortableText
						value={body as SanityBody[]}
						components={{
							block: {
								h1: ({ children }) => (
									<h1 className="body__title text-[6vw] font-bold leading-none md:text-[4vw] lg:text-[3vw]">
										{children}
									</h1>
								),
								h2: ({ children }) => (
									<h2 className="body__subtitle text-normal font-bold leading-none md:text-lg">
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className="body__subtitle text-normal font-bold leading-none md:text-lg">
										{children}
									</h3>
								),
								h4: ({ children }) => (
									<h4 className="body__subtitle text-lg font-bold leading-none md:text-xl">
										{children}
									</h4>
								),
								quote: ({ children }) => (
									<blockquote className="body__quote text-normal font-semibold leading-none md:text-lg">
										{children}
									</blockquote>
								),
							},
							marks: {
								linkButton: ({ children }) => (
									<span className="font-semibold transition-opacity duration-300 ease-out cursor-pointer hover:opacity-50">
										{children}
									</span>
								),
							},
						}}
					/>
				)}
			</div>
		</div>
	);
}
