// Component: LayoutStudio
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
// ...

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
// ...

// Fonts
// ...

// Styles
import '@/styles/studio.scss';

/*---------- Imports ----------*/

// Name
const name = 'LayoutStudio';

// Matadata
export const metadata = {
	title: `${staticMetadata} - Studio`,
	description: staticMetadata.description,
};

/*---------- Component ----------*/

// Types
export type LayoutStudioProps = {
	children: React.ReactNode;
};

// Default component
export default function RootLayout({ children }: LayoutStudioProps) {
	// Return default
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
