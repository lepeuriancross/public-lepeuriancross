// Component: ProviderRedux
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Provider } from 'react-redux';

// Scripts (local)
import { store } from '@/redux';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ProviderRedux';

/*---------- Component ----------*/

// Types
type ProviderReduxProps = {
	children?: React.ReactNode;
};

// Export default component
export default function ProviderRedux({ children }: ProviderReduxProps) {
	return <Provider store={store}>{children}</Provider>;
}
