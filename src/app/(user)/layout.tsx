// Component: LayoutRoot
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMetadata } from '@/data/content';

// Scripts (node)
import type { Metadata } from 'next';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TheProviderRedux from '@/components/base/TheProviderRedux';
import TheProviderUI from '@/components/base/TheProviderUI';
import TheCursor from '@/components/base/TheCursor';
import TheHeader from '@/components/base/TheHeader';

// Styles
import '@/styles/globals.scss';

// Fonts
import { Bebas_Neue, Source_Sans_3 } from 'next/font/google';
import TheMenu from '@/components/base/TheMenu';
import TheIntro from '@/components/base/TheIntro';
import TheFooter from '@/components/base/TheFooter';
import TheModal from '@/components/base/TheModal';

/*---------- Static Data ----------*/

// Name
const name = 'LayoutRoot';

// Fonts
const fontTitle = Bebas_Neue({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-title',
});
const fontSubtitle = Source_Sans_3({
	weight: '700',
	subsets: ['latin'],
	variable: '--font-subtitle',
});
const fontButton = Source_Sans_3({
	weight: '700',
	subsets: ['latin'],
	variable: '--font-button',
});
const fontBody = Source_Sans_3({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-body',
});

// Metadata
export const metadata: Metadata = {
	title: staticMetadata.title,
	description: staticMetadata.description,
};

/*---------- Template ----------*/

// Types
export type LayoutRootProps = {
	children: React.ReactNode;
};

// Default component
export default function RootLayout({ children }: LayoutRootProps) {
	/*----- Init -----*/

	// Return default
	return (
		<html lang="en">
			<body
				className={classNames(
					`body`,
					fontTitle.variable,
					fontSubtitle.variable,
					fontButton.variable,
					fontBody.variable
				)}
			>
				<TheProviderRedux>
					<TheProviderUI>
						<div className="frame min-h-screen flex flex-col justify-center items-stretch text-center bg-black text-white">
							<TheCursor className="z-100" />
							<TheModal className="z-90" />
							<TheIntro className="z-80" />
							<TheMenu className="z-30" />
							<TheHeader className="z-20" />
							{children}
							<TheFooter className="z-10" />
						</div>
					</TheProviderUI>
				</TheProviderRedux>
			</body>
		</html>
	);
}
