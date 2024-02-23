// Component: Page
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop, configPortfolio, configBlog } from '@/data/config';

// Scripts (node)
import { type SchemaTypeDefinition } from 'sanity';

// Singles
import settings from '@/sanity/schemas/settings';

// Documents
import page from '@/sanity/schemas/page';
import product from '@/sanity/schemas/product';
import project from '@/sanity/schemas/project';
import post from '@/sanity/schemas/post';
import author from '@/sanity/schemas/author';
import category from '@/sanity/schemas/category';

// Blocks
import {
	blockHero,
	blockHeading,
	blockBody,
	blockImages,
	blockExperience,
	blockClients,
	blockReviews,
	blockContactForm,
	blockSubscriptions,
	blockProduct,
	blockProjects,
	blockPosts,
} from './schemas/blocks';

// Objects
import {
	experience,
	review,
	detail,
	service,
	video,
} from '@/sanity/schemas/items';
import {
	popoverButton,
	archiveButton,
	referenceButton,
	linkButton,
	socialButton,
} from '@/sanity/schemas/buttons';
import blockContent from '@/sanity/schemas/blockContent';

/*---------- Exports ----------*/

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Singles
		settings,
		// Documents
		page,
		...(configShop.isActive ? [product] : []),
		...(configPortfolio.isActive ? [project] : []),
		...(configBlog.isActive ? [post] : []),
		author,
		category,
		// Blocks
		blockHero,
		blockHeading,
		blockBody,
		blockImages,
		blockExperience,
		blockClients,
		blockReviews,
		blockContactForm,
		...(configShop.isActive ? [blockProduct] : []),
		...(configShop.isActive ? [blockSubscriptions] : []),
		...(configPortfolio.isActive ? [blockProjects] : []),
		...(configBlog.isActive ? [blockPosts] : []),
		// Objects
		experience,
		review,
		detail,
		service,
		video,
		popoverButton,
		archiveButton,
		referenceButton,
		linkButton,
		socialButton,
		blockContent,
	],
};
