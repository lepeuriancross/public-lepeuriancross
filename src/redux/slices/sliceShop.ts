// Redux: Slice / Shop
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Types
type InitialState = {
	// UI
	isShowingCart: boolean;

	// Cart
	cartCurrency: string;
	cartItems: {
		id?: string;
		name?: string;
		href?: string;
		price?: number;
		quantity?: number;
		image: Image | SanityImage | string;
	}[];
};

// Initial State
const initialState = {
	// UI
	isShowingCart: false,

	// Cart
	cartItems: [
		{
			id: '1',
			quantity: 1,
			name: 'Throwback Hip Bag',
			href: '/',
			price: 9000,
			image:
				'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
		},
		{
			id: '2',
			quantity: 1,
			name: 'Medium Stuff Satchel',
			href: '/',
			price: 3200,
			image:
				'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
		},
	],
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// UI
		setIsShowingCart: (state, action: PayloadAction<boolean>) => {
			state.isShowingCart = action.payload;
		},

		// Cart
	},
});

/*---------- Exports ----------*/

export const {
	// UI
	setIsShowingCart,
} = content.actions;
export default content.reducer;
