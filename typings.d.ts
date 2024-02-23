// Typings: Global
/*----------------------------------------------------------------------------------------------------*/

/*---------- Router ----------*/

interface RouteParams {
	_type: string;
	documentType: SanityThemeDocument;
	params: {
		slug?: string;
	};
}

/*---------- UI ----------*/

// Cursor
type ThemeCursor =
	| 'default'
	| 'pointer-product'
	| 'pointer-project'
	| 'pointer-post'
	| 'pointer-author'
	| 'pointer-category'
	| 'pointer-question'
	| 'pointer-expand'
	| 'pointer-hidden'
	| 'pointer-link';

// Modals
interface ModalMessage {
	_type: 'modalMessage';
	title: string;
	body: SanityBody[] | string;
}
interface ModalError {
	_type: 'modalError';
	title: string;
	body: SanityBody[] | string;
}
type ThemeModal = ModalMessage | ModalError | Category;

// Navigation
interface NavigationItem {
	name: string;
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}
type Navigation = NavigationItem[];

// Archive
type ThemeArchive = 'grid' | 'list';

// Document
interface Category {
	_type: 'category';
	name?: string;
	slug?: string;
	description?: SanityBody[] | string;
}
type ThemePage =
	| 'sitemap'
	| 'index'
	| 'indexMetadata'
	| 'archive'
	| 'archiveMetadata'
	| 'document'
	| 'documentMetadata'
	| '404'
	| '404Metadata';

// Sections
interface Section {
	key: string;
	block: SanityBlock;
	theme?: ThemeSection;
}
type ThemeSection = 'primary' | 'secondary' | 'tertiary' | 'white' | 'default';

// Lists
type ListSections = Section[];
type ListNavigation = (PopoverButton | LinkButton)[];
type ListButtons = LinkButton[];
type ListSocial = SocialButton[];

// Images
interface Image {
	_type?: 'nextjs-image';
	src: string;
	height: number;
	width: number;
	blurDataURL: string;
	blurWidth: number;
	blurHeight: number;
}
interface Video {
	_type?: 'nextjs-video';
	title?: string;
	component?: 'VideoEmbedYoutube' | 'VideoEmbedBrightcove' | 'VideoEmbedVimeo';
	embedId: string;
	height: number;
	width: number;
}
type ThemeIconSocial =
	| 'linkedin'
	| 'facebook'
	| 'instagram'
	| 'github'
	| 'youtube';

// Buttons
interface PopoverButton {
	type: 'popoverButton';
	name: string;
	description?: SanityBody[] | string;
	items?: LinkButton[];
	ctas?: LinkButton[];
	icon?: React.ComponentType;
}
interface LinkButton {
	type: 'linkButton';
	name: string;
	description?: SanityBody[] | string;
	href: string;
	target: '_self' | '_blank';
	theme: ThemeButton;
	icon?: React.ComponentType;
}
interface SocialButton {
	type: 'socialButton';
	href: string;
	target: '_self' | '_blank';
	icon: ThemeIconSocial;
}
type ComponentButton = 'ButtonText' | 'ButtonIcon';
type ThemeButton = 'block' | 'shadow' | 'outline' | 'default';

// Motion
type ThemeMotion = 'fade' | 'fade-up';
type ThemeAosAnimation =
	| 'fade'
	| 'fade-up'
	| 'fade-down'
	| 'fade-left'
	| 'fade-right';

// Functions
type FxnShowModal = (value?: ThemeModal | false) => void;

/*---------- Sanity ----------*/

// Sanity SanityBase
type SanityBase = {
	_id: string;
	_type: string;
	_rev: string;
	_key: string;
	_updatedAt: string;
};
interface SanityBaseBlock extends SanityBase {
	_id: string;
	_rev: string;
	_key: string;
	_type: string;
	isActive: boolean;
	key: string;
	paddingTop?: boolean;
	paddingSides?: boolean;
	paddingBottom?: boolean;
	isCard?: boolean;
	isFlipped?: boolean;
	theme?: ThemeSection;
	className?: string;
}

// Sanity Singletons
interface SanityMainSettings extends Base {
	_type: 'settings';
	title?: string;
	subtitle?: string;
	image?: Image | SanityImage | string;
	description?: SanityBody[] | string;
	author?: SanityAuthor;
	homepage?: SanityPage;
	navHeader: (
		| SanityPopoverButton
		| SanityArchiveButton
		| SanityReferenceButton
		| SanityLinkButton
	)[];
	navFooter: (SanityArchiveButton | SanityReferenceButton | SanityLinkButton)[];
	navSocial: SanitySocialButton[];

	productTitle: string;
	productBody: SanityBody[] | string;
	projectTitle: string;
	projectBody: SanityBody[] | string;
	postTitle: string;
	postBody: SanityBody[] | string;
	authorTitle: string;
	authorBody: SanityBody[] | string;

	contactTel: string;
	contactEmail: string;

	comingSoonIsActive: boolean;
	comingSoonTitle: string;
	comingSoonBody: SanityBody[] | string;
}

// Sanity Documents
interface SanityPage extends SanityBase {
	_type: 'page';
	isActive: boolean;
	title: string;
	slug: SanitySlug;
	subtitle: string;
	description: SanityBody[] | string;
	author: SanityAuthor;
	image: Image | SanityImage | string;
	categories: SanityCategory[];
	publishedAt: string;
	body: SanityBody[] | string;
}
interface SanityProduct extends SanityBase {
	_type: 'product';
	isActive: boolean;
	title: string;
	slug: SanitySlug;
	subtitle: string;
	description: SanityBody[] | string;
	author: SanityAuthor;
	image: Image | SanityImage | string;
	categories: SanityCategory[];
	publishedAt: string;
	body: SanityBody[] | string;
}
interface SanityProject extends SanityBase {
	_type: 'project';
	isActive: boolean;
	title: string;
	slug: SanitySlug;
	subtitle: string;
	description: SanityBody[] | string;
	author: SanityAuthor;
	image: Image | SanityImage | string;
	categories: SanityCategory[];
	url?: string;
	publishedAt: string;
	body: SanityBody[] | string;
}
interface SanityPost extends SanityBase {
	_type: 'post';
	isActive: boolean;
	title: string;
	slug: SanitySlug;
	subtitle: string;
	description: SanityBody[] | string;
	author: SanityAuthor;
	image: Image | SanityImage | string;
	categories: SanityCategory[];
	publishedAt: string;
	body: SanityBody[] | string;
}
interface SanityAuthor extends SanityBase {
	_type: 'author';
	title: string;
	slug: SanitySlug;
	subtitle: string;
	description: SanityBody[] | string;
	image: Image | SanityImage | string;
	body: SanityBody[] | string;
}
interface SanityCategory extends SanityBase {
	_type: 'category';
	title: string;
	slug: SanitySlug;
	image: Image | SanityImage | string;
	description?: SanityBody[] | string;
}
type SanityThemeDocument =
	| 'page'
	| 'product'
	| 'project'
	| 'post'
	| 'author'
	| 'category';

// Sanity Blocks
interface SanityBlockExample extends SanityBaseBlock {
	_type: 'blockExample';
	title?: string;
	component:
		| 'section-example-1'
		| 'section-example-2'
		| 'section-example-3'
		| 'section-example-4'
		| 'section-example-5'
		| 'section-example-6'
		| 'section-example-7'
		| 'section-example-8'
		| 'section-example-9'
		| 'section-example-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
	buttons?: SanityListButtons;
}
interface SanityBlockHero extends SanityBaseBlock {
	_type: 'blockHero';
	title?: string;
	component:
		| 'section-hero-1'
		| 'section-hero-2'
		| 'section-hero-3'
		| 'section-hero-4'
		| 'section-hero-5'
		| 'section-hero-6'
		| 'section-hero-7'
		| 'section-hero-8'
		| 'section-hero-9'
		| 'section-hero-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
	buttons?: SanityListButtons;
}
interface SanityBlockHeading extends SanityBaseBlock {
	_type: 'blockHeading';
	title?: string;
	component:
		| 'section-heading-1'
		| 'section-heading-2'
		| 'section-heading-3'
		| 'section-heading-4'
		| 'section-heading-5'
		| 'section-heading-6'
		| 'section-heading-7'
		| 'section-heading-8'
		| 'section-heading-9'
		| 'section-heading-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	categories?: SanityCategory[];
	url?: string;
	buttons?: SanityListButtons;
}
interface SanityBlockBody extends SanityBaseBlock {
	_type: 'blockBody';
	title?: string;
	component:
		| 'section-body-1'
		| 'section-body-2'
		| 'section-body-3'
		| 'section-body-4'
		| 'section-body-5'
		| 'section-body-6'
		| 'section-body-7'
		| 'section-body-8'
		| 'section-body-9'
		| 'section-body-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
	buttons?: SanityListButtons;
}
interface SanityBlockImages extends SanityBaseBlock {
	_type: 'blockImages';
	component:
		| 'section-images-1'
		| 'section-images-2'
		| 'section-images-3'
		| 'section-images-4'
		| 'section-images-5'
		| 'section-images-6'
		| 'section-images-7'
		| 'section-images-8'
		| 'section-images-9'
		| 'section-images-10';
	images?: (SanityImage | Image | string)[];
	buttons?: SanityListButtons;
}
interface SanityBlockExperience extends SanityBaseBlock {
	_type: 'blockExperience';
	title?: string;
	component:
		| 'section-experience-1'
		| 'section-experience-2'
		| 'section-experience-3'
		| 'section-experience-4'
		| 'section-experience-5'
		| 'section-experience-6'
		| 'section-experience-7'
		| 'section-experience-8'
		| 'section-experience-9'
		| 'section-experience-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	experience?: SanityExperience[];
	buttons?: SanityListButtons;
}
interface SanityBlockClients extends SanityBaseBlock {
	_type: 'blockClients';
	title?: string;
	component:
		| 'section-clients-1'
		| 'section-clients-2'
		| 'section-clients-3'
		| 'section-clients-4'
		| 'section-clients-5'
		| 'section-clients-6'
		| 'section-clients-7'
		| 'section-clients-8'
		| 'section-clients-9'
		| 'section-clients-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	images?: (SanityImage | Image | string)[];
	buttons?: SanityListButtons;
}
interface SanityBlockContactForm extends SanityBaseBlock {
	_type: 'blockContactForm';
	title?: string;
	component:
		| 'section-contact-1'
		| 'section-contact-2'
		| 'section-contact-3'
		| 'section-contact-4'
		| 'section-contact-5'
		| 'section-contact-6'
		| 'section-contact-7'
		| 'section-contact-8'
		| 'section-contact-9'
		| 'section-contact-10';
	formspreeEndpoint?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	bodySuccess?: SanityBody[] | string;
	buttons?: SanityListButtons;
}
interface SanityBlockProjects extends SanityBaseBlock {
	_type: 'blockProjects';
	title?: string;
	component:
		| 'section-projects-1'
		| 'section-projects-2'
		| 'section-projects-3'
		| 'section-projects-4'
		| 'section-projects-5'
		| 'section-projects-6'
		| 'section-projects-7'
		| 'section-projects-8'
		| 'section-projects-9'
		| 'section-projects-10';
	body?: SanityBody[] | string;
	projects?: SanityProject[];
	buttons?: SanityListButtons;
}
interface SanityBlockPosts extends SanityBaseBlock {
	_type: 'blockPosts';
	title?: string;
	component:
		| 'section-posts-1'
		| 'section-posts-2'
		| 'section-posts-3'
		| 'section-posts-4'
		| 'section-posts-5'
		| 'section-posts-6'
		| 'section-posts-7'
		| 'section-posts-8'
		| 'section-posts-9'
		| 'section-posts-10';
	body?: SanityBody[] | string;
	posts?: SanityPosts[];
	buttons?: SanityListButtons;
}
interface SanityBlockArticle extends SanityBaseBlock {
	_type: 'blockArticle';
	title?: string;
	component:
		| 'section-article-1'
		| 'section-article-2'
		| 'section-article-3'
		| 'section-article-4'
		| 'section-article-5'
		| 'section-article-6'
		| 'section-article-7'
		| 'section-article-8'
		| 'section-article-9'
		| 'section-article-10';
	subtitle?: string;
	body?: SanityBody[] | string;
	image?: Image | SanityImage | string;
	author: SanityAuthor;
	categories?: SanityCategory[];
	buttons?: SanityListButtons;
}
interface SanityBlock404 extends SanityBaseBlock {
	_type: 'blockHero';
	title?: string;
	subtitle?: string;
	body?: SanityBody[] | string;
	buttons?: SanityListButtons;
}
type SanityBlock =
	| SanityBlockExample
	| SanityBlockHero
	| SanityBlockHeading
	| SanityBlockBody
	| SanityBlockImages
	| SanityBlockExperience
	| SanityBlockClients
	| SanityBlockContactForm
	| SanityBlockProjects
	| SanityBlockPosts;

// Sanity Lists
type SanityListArchive = (
	| SanityPage
	| SanityProduct
	| SanityProject
	| SanityPost
	| SanityAuthor
	| SanityCategory
)[];
type SanityListBlocks = SanityBlock[];
type SanityListNavigation = (
	| SanityPopoverButton
	| SanityArchiveButton
	| SanityReferenceButton
	| SanityLinkButton
)[];
type SanityListButtons = (
	| SanityArchiveButton
	| SanityReferenceButton
	| SanityLinkButton
)[];
type SanityListSocial = SanitySocialButton[];

// Sanity Objects
interface SanityBody extends SanityBase {
	_type: 'block';
	_key: string;
	children?: SanitySpan[];
	markDefs: any[];
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
}
interface SanityImage extends SanityBase {
	_type: 'image';
	asset?: SanityReference;
	alt?: string;
	crop: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	hotspot: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
	palette: {
		_type: 'sanity.imagePalette';
		[
			key:
				| 'dominant'
				| 'darkMuted'
				| 'muted'
				| 'lightVibrant'
				| 'darkVibrant'
				| 'lightMuted'
				| 'vibrant'
		]: {
			_type: 'sanity.imagePaletteSwatch';
			background: string;
			foreground: string;
			title: string;
			population: number;
		};
	};
}
interface SanityVideo {
	_type?: 'video';
	title?: string;
	embedId: string;
	height: number;
	width: number;
}
interface SanityExperience extends SanityBase {
	title: string;
	subtitle?: string;
	start?: string;
	end?: string;
	body?: SanityBody[] | string;
}
interface SanityReview extends SanityBase {
	title: string;
	body?: SanityBody[] | string;
}
interface SanityPopoverButton extends SanityBase {
	_type: 'popoverButton';
	title: string;
	description?: SanityBody[] | string;
	items?: (SanityArchiveButton | SanityReferenceButton | SanityLinkButton)[];
	ctas?: (SanityArchiveButton | SanityReferenceButton | SanityLinkButton)[];
}
interface SanityArchiveButton extends SanityBase {
	_type: 'archiveButton';
	title: string;
	description?: SanityBody[] | string;
	type: SanityThemeDocument;
	theme?: ThemeButton;
	icon?: string;
}
interface SanityReferenceButton extends SanityBase {
	_type: 'referenceButton';
	title: string;
	description?: SanityBody[] | string;
	reference: Page | Product | Project | Post | Author | Category;
	theme?: ThemeButton;
	icon?: string;
}
interface SanityLinkButton extends SanityBase {
	_type: 'linkButton';
	title: string;
	href: string;
	description?: SanityBody[] | string;
	target: '_self' | '_blank';
	theme?: ThemeButton;
	icon?: string;
}
interface SanitySocialButton extends SanityBase {
	_type: 'socialButton';
	href: string;
	target: '_self' | '_blank';
	icon?: ThemeIconSocial;
}

// Sanity Vanilla
interface SanityReference extends SanityBase {
	_type: 'reference';
	_ref: string;
}
interface SanitySlug extends SanityBase {
	_type: 'slug';
	current: string;
}
interface SanitySpan extends SanityBase {
	_type: 'span';
	_key: string;
	marks: string[];
	text: string;
}

// Sanity Result
interface SanityResult {
	mainSettings?: SanityMainSettings;
	pageSettings?:
		| SanityPage
		| SanityProduct
		| SanityProject
		| SanityPost
		| SanityAuthor
		| SanityCategory;
	listBlocks?: SanityListBlocks;
	listArchive?: SanityListArchive;
}
