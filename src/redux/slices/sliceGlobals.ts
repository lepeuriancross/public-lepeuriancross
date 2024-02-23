// Redux: Slice / Globals
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Types
type InitialState = {
	// Metadata
	metaTitle: string;

	// Contact
	contactTel?: string;
	contactEmail?: string;

	// Navigation
	navHomeSlug?: string;
	navHeader?: SanityListNavigation;
	navFooter?: SanityListButtons;
	navSocial?: SanityListSocial;
};

// Initial State
const initialState = {
	// UI
	isShowingIntro: true,
	isShowingLoader: false,
	isScrolled: 0,
	isResized: [0, 0],
	isShowingMenu: false,
	isDarkMode: false,

	// Metadata
	metaTitle: staticMetadata.title,

	// Contact
	contactTel: undefined,
	contactEmail: undefined,

	// Navigation
	navHomeSlug: undefined,
	navHeader: [],
	navFooter: [],
	navSocial: [],
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// Metadata
		setMetaTitle: (state, action: PayloadAction<string>) => {
			state.metaTitle = action.payload;
		},

		// Contact
		setContactTel: (state, action: PayloadAction<string>) => {
			state.contactTel = action.payload;
		},
		setContactEmail: (state, action: PayloadAction<string>) => {
			state.contactEmail = action.payload;
		},

		// Navigation
		setNavHomeSlug: (state, action: PayloadAction<string>) => {
			state.navHomeSlug = action.payload;
		},
		setNavHeader: (state, action: PayloadAction<SanityListNavigation>) => {
			state.navHeader = action.payload;
		},
		setNavFooter: (state, action: PayloadAction<SanityListButtons>) => {
			state.navFooter = action.payload;
		},
		setNavSocial: (state, action: PayloadAction<SanityListSocial>) => {
			state.navSocial = action.payload;
		},
	},
});

/*---------- Exports ----------*/

export const {
	// Metadata
	setMetaTitle,

	// Contact
	setContactTel,
	setContactEmail,

	// Navigation
	setNavHomeSlug,
	setNavHeader,
	setNavFooter,
	setNavSocial,
} = content.actions;
export default content.reducer;
