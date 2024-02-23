// Component: GridImages
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useSection } from '@/components/sections/_partials/SectionWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import VideoBuilder from '@/components/utility/Video/VideoBuilder';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'GridImages';

/*---------- Template ----------*/

// Types
export type GridImagesProps = {
	images?: (SanityVideo | SanityImage | Image | string)[];
	className?: string;
};
export type GridImagesPresenterProps = {
	images?: (SanityVideo | SanityImage | Image | string)[];
	className?: string;
};

// Default component
export default function GridImages(props: GridImagesProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: GridImagesPresenterProps = {
		images: props.images,
		className: className,
	};

	// Return default
	return <GridImagesPresenter {...presenterProps} />;
}

// Presenter component
export function GridImagesPresenter(props: GridImagesPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { images, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// Get isEven
	const isEven = images && images?.length % 2 === 0;

	// Return default
	return (
		<div className={classNames(`images`, className)} data-name={name}>
			<div className="images_container grid grid-cols-1 gap-8 w-full lg:grid-cols-2 lg:gap-16">
				{images?.map((item, i) => (
					<>
						{(typeof item === 'object' &&
							item._type &&
							item._type === 'image') ||
						(item && typeof item === 'object' && !item._type) ||
						(item && typeof item === 'string') ? (
							<div
								className={classNames(
									i == 0 && !isEven && 'w-full lg:col-span-2'
								)}
								key={`grid-images-item-image-${i}`}
							>
								<ImageBuilder
									className="w-full rounded-md shadow"
									image={item as SanityImage | Image | string}
								/>
							</div>
						) : (
							<div
								className={classNames(
									i == 0 && !isEven && 'w-full lg:col-span-2'
								)}
								key={`grid-images-item-video-${i}`}
							>
								<VideoBuilder
									className="w-full rounded-md shadow"
									video={item as SanityVideo}
								/>
							</div>
						)}
					</>
				))}
			</div>
		</div>
	);
}
