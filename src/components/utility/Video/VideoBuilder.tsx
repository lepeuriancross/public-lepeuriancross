// Component: VideoBuilder
/*----------------------------------------------------------------------------------------------------
* Youtube: https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2
----------------------------------------------------------------------------------------------------*/

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
// ...

/*---------- Static Data ----------*/

// Name
const name = 'VideoBuilder';

/*---------- Template ----------*/

// Types
export type VideoBuilderProps = {
	component?:
		| 'VideoBuilderYoutube'
		| 'VideoBuilderVimeo'
		| 'VideoBuilderBrightcove';
	video?: SanityVideo;
	className?: string;
};
export type VideoBuilderPresenterProps = {
	title?: string;
	embedId?: string;
	width?: number;
	height?: number;
	className?: string;
};

// Default component
export default function VideoBuilder(props: VideoBuilderProps) {
	/*----- Props -----*/

	// Get props
	const { component = 'VideoBuilderYoutube', video, className } = props;

	/*----- Init -----*/

	// If no video, return null
	if (!video) return null;

	// Presenter props
	const presenterProps: VideoBuilderPresenterProps = {
		embedId: video.embedId,
		title: video.title,
		width: video.width,
		height: video.height,
		className: className,
	};

	// Switch component
	switch (component) {
		// case 'VideoBuilderVimeo':
		// 	return <VideoBuilderVimeo {...presenterProps} />;

		// case 'VideoBuilderBrightcove':
		// 	return <VideoBuilderBrightcove {...presenterProps} />;

		case 'VideoBuilderYoutube':
		default:
			return <VideoBuilderYoutube {...presenterProps} />;
	}
}

// VideoBuilderYoutube component
export function VideoBuilderYoutube(props: VideoBuilderPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		embedId,
		title = 'Embedded youtube',
		width = 853,
		height = 480,
		className,
	} = props;

	/*----- Init -----*/

	// If no embedId, return null
	if (!embedId) return null;

	// Get aspect percentage
	const aspect = (100 / width) * height;

	// Return default
	return (
		<div
			className={classNames(`video relative h-0 overflow-hidden`, className)}
			style={{ paddingBottom: `${aspect}%` }}
			data-name={name}
		>
			<iframe
				className="video__iframe absolute top-0 left-0 w-full h-full"
				title={title}
				width={width}
				height={height}
				src={`https://www.youtube.com/embed/${embedId}`}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
}

// VideoBuilderBrightcove component
// ...

// VideoBuilderVimeo component
// ...
