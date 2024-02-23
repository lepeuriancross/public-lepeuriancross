// Component: GridClients
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
// ...

// Components (local)
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';

/*---------- Static Data ----------*/

// Name
const name = 'GridClients';

/*---------- Template ----------*/

// Types
export type GridClientsProps = {
	images?: (SanityImage | Image | string)[];
	className?: string;
};
export type GridClientsPresenterProps = {
	images?: (SanityImage | Image | string)[];
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function GridClients(props: GridClientsProps) {
	/*----- Props -----*/

	// Get props
	const { images, className } = props;

	/*----- Store -----*/

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: GridClientsPresenterProps = {
		images,
		themeSection,
		className,
	};

	// Return default
	return <GridClientsPresenter {...presenterProps} />;
}

// Default component
export function GridClientsPresenter(props: GridClientsPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { images, themeSection, className } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div className={classNames(`clients`, className)} data-name={name}>
			<div className="clients__container">
				<AosWrapper
					className="clients__row grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
					animation="fade-left"
					duration={0.5}
					stagger={0.1}
				>
					{images?.map((image, idx) => (
						<div className="clients__col" key={`clients-image-${idx}`}>
							<span
								className={classNames(
									`clients__image inline-flex justify-center items-center border w-full rounded px-6 py-4`,
									themeSection === 'primary'
										? 'border-white/30'
										: themeSection === 'secondary'
										? 'border-white/30'
										: themeSection === 'white'
										? 'border-black/30'
										: 'border-white/30'
								)}
							>
								<ImageBuilder
									className="clients__image-img w-auto h-[40px]"
									image={image}
								/>
							</span>
						</div>
					))}
				</AosWrapper>
			</div>
		</div>
	);
}
