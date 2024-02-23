// Component: TextWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import AosWrapper from '@/components/utility/Aos/AosWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'TextWrapper';

/*---------- Template ----------*/

// Types
export type TextWrapperProps = {
	isActive?: boolean;
	className?: string;
	children?: React.ReactNode;
};

export type TextWrapperPresenterProps = {
	isActive?: boolean;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function TextWrapper(props: TextWrapperProps) {
	/*----- Props -----*/

	// Get props
	const { isActive = true, className, children } = props;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TextWrapperPresenterProps = {
		isActive,
		className,
		children,
	};

	// Return default
	return <TextWrapperPresenter {...presenterProps} />;
}

// Presenter component
export function TextWrapperPresenter(props: TextWrapperPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { isActive = true, className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<AosWrapper
			className={classNames(`text-wrapper`, className)}
			animation="fade-up"
			duration={0.5}
			stagger={0.05}
			isActive={isActive}
		>
			{children}
		</AosWrapper>
	);
}
