// Component: SectionImages
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
import GridImages from '@/components/singles/Grid/GridImages';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionImages';

/*---------- Template ----------*/

// Types
export type SectionImagesProps = {
	idx?: number;
	settings?: SanityBlockImages;
	className?: string;
};
export type SectionImagesPresenterProps = {
	images?: (SanityImage | Image | string)[];
	wrapper?: {
		idx?: number;
		paddingTop?: boolean;
		paddingSides?: boolean;
		paddingBottom?: boolean;
		isCard?: boolean;
		isFlipped?: boolean;
		theme?: ThemeSection;
		className?: string;
	};
};

// Default component
export default function SectionImages(props: SectionImagesProps) {
	/*----- Props -----*/

	// Get props
	const { idx, settings, className } = props;

	/*----- Init -----*/

	// Define wrapper props
	const wrapper = {
		idx,
		name,
		paddingTop: props?.settings?.paddingTop ?? true,
		paddingSides: props?.settings?.paddingSides ?? true,
		paddingBottom: props?.settings?.paddingBottom ?? true,
		isCard: props?.settings?.isCard ?? false,
		isFlipped: props?.settings?.isFlipped ?? false,
		theme: props?.settings?.theme ?? 'default',
		className: classNames(props?.settings?.className, props?.className),
	};

	// Presenter props
	const presenterProps: SectionImagesPresenterProps = {
		images: settings?.images,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionImages2
		// case 'section-images-2':
		// 	return <SectionImages2 {...presenterProps} />;

		// Case - SectionImages1
		case 'section-images-1':
		default:
			return <SectionImages1 {...presenterProps} />;
	}
}

// SectionImages1 component
export function SectionImages1(props: SectionImagesPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { images, wrapper = {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-flow-dense grid-cols-1 gap-8 lg:gap-16">
				<div className="section__col space-y-10 text-left">
					{images && images.length > 0 && <GridImages images={images} />}
				</div>
			</div>
		</SectionWrapper>
	);
}

// SectionImages1 component
// ...
