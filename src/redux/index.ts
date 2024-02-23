// Redux: Index
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop, configPortfolio, configBlog } from '@/data/config';

// Scripts (node)
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// Scripts (local)
import { configureStore } from '@reduxjs/toolkit';
import globals from './slices/sliceGlobals';
import accessibility from './slices/sliceAccessibility';
import shop from './slices/sliceShop';

/*---------- Config ----------*/

// Config
const store = configureStore({
	reducer: {
		globals,
		accessibility,
		...(configShop.isActive ? { shop } : {}),
	},
});

/*---------- Exports ----------*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store };
