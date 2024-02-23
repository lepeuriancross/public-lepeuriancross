// Component: TheProviderUI
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configCMS } from '@/data/config';

// Scripts (node)
import {
	createContext,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/router';

// Scripts (local)
import { strCapitalize } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TheProviderUI';

/*---------- Context ----------*/

// Types
export type TheContextUIProps = {
	// Cursor
	cursorMouseX: number;
	cursorMouseY: number;
	cursorDestinationX: number;
	cursorDestinationY: number;
	cursorDistanceX: number;
	cursorDistanceY: number;
	cursorKey: number;
	cursorTheme: ThemeCursor;
	cursorText?: string | null;
	setCursor: (value: ThemeCursor) => void;
	// Intro
	isShowingIntro: boolean;
	showIntro: (value: boolean) => void;
	// Menu
	isShowingMenu: boolean;
	showMenu: (value: boolean) => void;
	// Modal
	isShowingModal: boolean;
	modalTitle?: string | null;
	modalBody?: SanityBody[] | string | null;
	showModal: FxnShowModal;
	// Content
	isShowingContent?: boolean;
	contentProductsView: boolean;
	contentProjectsView: boolean;
	contentPostsView: boolean;
	setContentProductsView: (value: boolean) => void;
	setContentProjectsView: (value: boolean) => void;
	setContentPostsView: (value: boolean) => void;
};

// Context
const TheContextUI = createContext<TheContextUIProps>({
	// Cursor
	cursorMouseX: 0,
	cursorMouseY: 0,
	cursorDestinationX: 0,
	cursorDestinationY: 0,
	cursorDistanceX: 0,
	cursorDistanceY: 0,
	cursorKey: -1,
	cursorTheme: 'default',
	cursorText: null,
	setCursor: (value: ThemeCursor) => {},
	// Intro
	isShowingIntro: false,
	showIntro: (value: boolean) => {},
	// Menu
	isShowingMenu: false,
	modalTitle: null,
	modalBody: null,
	showMenu: (value: boolean) => {},
	// Modal
	isShowingModal: false,
	showModal: (value?: ThemeModal | false) => {},
	// Content
	isShowingContent: false,
	contentProductsView: false,
	contentProjectsView: false,
	contentPostsView: true,
	setContentProductsView: (value: boolean) => {},
	setContentProjectsView: (value: boolean) => {},
	setContentPostsView: (value: boolean) => {},
});

// Functions
export const useUI = () => useContext(TheContextUI);

/*---------- Template ----------*/

// Types
export type TheProviderUIProps = {
	children?: React.ReactNode;
};

// Default component
export default function TheProviderUI(props: TheProviderUIProps) {
	/*----- Props -----*/

	// Get props
	const { children } = props;

	/*----- Refs -----*/

	// Ref - cursorPosition
	const cursorPosition = useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: -1,
	});

	/*----- Store -----*/

	// States - Cursor
	const [cursorMouseX, setCursorMouseX] = useState<number>(0);
	const [cursorMouseY, setCursorMouseY] = useState<number>(0);
	const [cursorDestinationX, setCursorDestinationX] = useState<number>(0);
	const [cursorDestinationY, setCursorDestinationY] = useState<number>(0);
	const [cursorDistanceX, setCursorDistanceX] = useState<number>(0);
	const [cursorDistanceY, setCursorDistanceY] = useState<number>(0);
	const [cursorKey, setCursorKey] = useState<number>(-1);
	const [cursorTheme, setCursorTheme] = useState<ThemeCursor>('default');
	const [cursorText, setCursorText] = useState<string | null>();

	// States - Intro
	const [isShowingIntro, setIsShowingIntro] = useState<boolean>(true);

	// States - Menu
	const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);

	// States - Modal
	const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string | null>();
	const [modalBody, setModalBody] = useState<SanityBody[] | string | null>();

	// States - Content
	const [isShowingContent, setIsShowingContent] = useState<boolean>(false);
	const [contentProductsView, setContentProductsView] =
		useState<boolean>(false);
	const [contentProjectsView, setContentProjectsView] =
		useState<boolean>(false);
	const [contentPostsView, setContentPostsView] = useState<boolean>(true);

	/*----- Methods -----*/

	// Cursor
	const setCursor = (value: ThemeCursor) => {
		// Switch - value
		switch (value) {
			case 'pointer-product':
				setCursorText(`View ${strCapitalize(configCMS.documents.product)}`);
				break;

			case 'pointer-project':
				setCursorText(`View ${strCapitalize(configCMS.documents.project)}`);
				break;

			case 'pointer-post':
				setCursorText(`View ${strCapitalize(configCMS.documents.post)}`);
				break;

			case 'pointer-author':
				setCursorText(`View ${strCapitalize(configCMS.documents.author)}`);
				break;

			case 'pointer-category':
			case 'pointer-question':
			case 'pointer-expand':
			case 'pointer-hidden':
			case 'pointer-link':
			default:
				break;
		}

		// Set cursorTheme
		setCursorTheme(value);
	};

	// Intro
	const showIntro = (value: boolean) => {
		setIsShowingIntro(value);
	};

	// Menu
	const showMenu = (value: boolean) => {
		setIsShowingMenu(value);
	};

	// Modal
	const showModal = (value?: ThemeModal | false) => {
		// If value...
		if (value) {
			// Switch - _type
			switch (value._type) {
				case 'category':
					// Set modalTitle
					setModalTitle(value.name);
					// Set modalBody
					setModalBody(value.description);
					// Show modal
					setIsShowingModal(true);
					break;
				case 'modalMessage':
					// Set modalTitle
					setModalTitle(value.title);
					// Set modalBody
					setModalBody(value.body);
					// Show modal
					setIsShowingModal(true);
					break;
			}
		} else {
			// Hide modal
			setIsShowingModal(false);
		}
	};

	// Content
	// ...

	/*----- Lifecycle -----*/

	// Watch - mousemove
	function useMousemove() {
		// Layout Effect - update mousemove
		const remove = useLayoutEffect(() => {
			// Function - handle mousemove
			const handleMousemove = (e: MouseEvent) => {
				// Update cursorPosition
				cursorPosition.current.mouseX = e.clientX;
				cursorPosition.current.mouseY = e.clientY;

				// Dispatch - setCursorMouseX / setCursorMouseY
				setCursorMouseX(cursorPosition.current.mouseX);
				setCursorMouseY(cursorPosition.current.mouseY);
			};

			// Function - resting animation frame
			let isRafing = true;
			const raf = () => {
				// Get cursorPosition data
				const {
					mouseX,
					mouseY,
					destinationX,
					destinationY,
					distanceX,
					distanceY,
				} = cursorPosition.current;

				// If cursorPosition is not at destination...
				if (!destinationX || !destinationY) {
					// Update cursorPosition
					cursorPosition.current.destinationX = mouseX;
					cursorPosition.current.destinationY = mouseY;
				} else {
					// Update cursorPosition
					cursorPosition.current.distanceX = (mouseX - destinationX) * 0.15;
					cursorPosition.current.distanceY = (mouseY - destinationY) * 0.15;

					// If cursorPosition is close to destination...
					if (
						Math.abs(cursorPosition.current.distanceX) +
							Math.abs(cursorPosition.current.distanceY) <
						0.2
					) {
						// Set cursorPosition to destination
						cursorPosition.current.destinationX = mouseX;
						cursorPosition.current.destinationY = mouseY;
					} else {
						// Update cursorPosition
						cursorPosition.current.destinationX += distanceX;
						cursorPosition.current.destinationY += distanceY;
					}
				}

				// Dispatch - setCursorDestinationX / setCursorDestinationY / setCursorDistanceX / setCursorDistanceY / setCursorKey
				setCursorDestinationX(cursorPosition.current.destinationX);
				setCursorDestinationY(cursorPosition.current.destinationY);
				setCursorDistanceX(cursorPosition.current.distanceX);
				setCursorDistanceY(cursorPosition.current.distanceY);
				setCursorKey(cursorPosition.current.key);

				// Request next raf
				if (isRafing) {
					cursorPosition.current.key = requestAnimationFrame(raf);
				}
			};
			raf();

			// Add event - document mouse move
			window.addEventListener('mousemove', handleMousemove);

			// Return
			return () => {
				window.removeEventListener('mousemove', handleMousemove);
				isRafing = false;
			};
		}, []);

		// Return
		return remove;
	}
	useMousemove();

	// Watch - isShowingIntro, isShowingMenu, isShowingModal
	useLayoutEffect(() => {
		// If isShowingIntro, isShowingMenu, or isShowingModal...
		if (isShowingIntro || isShowingMenu || isShowingModal) {
			// Prevent scrolling
			document.body.style.overflow = 'hidden';
		} else {
			// Allow scrolling
			document.body.style.overflow = 'auto';
		}

		// If not isShowingIntro...
		if (!isShowingIntro) {
			// Show content
			setIsShowingContent(true);
		} else {
			// Hide content
			setIsShowingContent(false);
		}
	}, [isShowingIntro, isShowingMenu, isShowingModal]);

	/*----- Init -----*/

	// Return default
	return (
		<TheContextUI.Provider
			value={{
				// Cursor
				cursorMouseX,
				cursorMouseY,
				cursorDestinationX,
				cursorDestinationY,
				cursorDistanceX,
				cursorDistanceY,
				cursorKey,
				cursorTheme,
				cursorText,
				setCursor,
				// Intro
				isShowingIntro,
				showIntro,
				// Menu
				isShowingMenu,
				modalTitle,
				modalBody,
				showMenu,
				// Modal
				isShowingModal,
				showModal,
				// Content
				isShowingContent,
				contentProductsView,
				contentProjectsView,
				contentPostsView,
				setContentProductsView,
				setContentProjectsView,
				setContentPostsView,
			}}
		>
			{children}
		</TheContextUI.Provider>
	);
}
