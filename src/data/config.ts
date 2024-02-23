// Data: Config
/*----------------------------------------------------------------------------------------------------*/

// User interface configuration
export const configUI = {
	useIntro: true, // <-- enables intro animation
	useDesktopNav: true, // <-- enables desktop navigation, otherwise mobile navigation is used on all screen sizes
	names: {
		contact: 'Get in touch', // <-- cta for contact page
	},
};

// Content management configuration
export const configCMS = {
	isActive: true, // <-- enables sanity functionality
	archives: {
		// If you have custom routes for your sanity archives, you set them here (format is 'documentType': 'route')
		product: 'shop',
		project: 'project',
		post: 'post',
		author: 'author',
	},
	documents: {
		// If you have custom routes for your sanity documents, you set them here (format is 'documentType': 'route')
		product: 'product',
		project: 'project',
		post: 'post',
		author: 'author',
	},
};

// Shop configuration
export const configShop = {
	isActive: false, // <-- enables stripe functionality
	useCart: true, // <-- Include cart panel and 'add to cart' buttons, otherwise 'buy now' buttons navigate directly to checkout
	names: {
		cart: 'cart', // <-- What is the name of the cart ('bag' | 'cart' | 'basket' | 'trolley' | 'box' | 'hamper' | 'crate')
	},
};

// Portfolio configuration
export const configPortfolio = {
	isActive: true, // <-- enables portfolio functionality
};

// Blog configuration
export const configBlog = {
	isActive: true, // <-- enables blog functionality
};
