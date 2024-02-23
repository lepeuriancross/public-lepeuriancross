// Component: TheMenu
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Components (local)
import { useUI } from '@/components/base/TheProviderUI';
import ButtonDefault from '@/components/singles/Button/ButtonDefault';
import NavMenu from '@/components/singles/Nav/NavMenu';

/*---------- Static Data ----------*/

// Name
const name = 'TheMenu';

/*---------- Template ----------*/

// Types
export type TheMenuProps = {
	className?: string;
};
export type TheMenuPresenterProps = {
	isShowingMenu?: boolean;
	className?: string;
	showMenu?: (value: boolean) => void;
};

// Default component
export default function TheMenu(props: TheMenuProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - UI
	const ui = useUI();
	const { isShowingMenu, showMenu } = ui;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheMenuPresenterProps = {
		isShowingMenu,
		className,
		showMenu,
	};

	// Return default
	return <TheMenuPresenter {...presenterProps} />;
}

// Presenter component
export function TheMenuPresenter(props: TheMenuPresenterProps) {
	/*----- Props -----*/

	// Get props
	const { className, isShowingMenu, showMenu = (value: boolean) => {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<Transition.Root show={isShowingMenu} as={Fragment}>
			<Dialog
				className={classNames(`menu relative`, className)}
				as="div"
				onClose={showMenu}
				data-name={name}
			>
				<div className="menu__bg fixed top-0 left-0 w-full h-screen backdrop-blur cursor-pointer bg-black/10"></div>
				<div className="menu__container fixed z-20 pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
					<Transition.Child
						as={Fragment}
						enter="transform transition ease-out duration-500 sm:duration-700"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transform transition ease-out duration-500 sm:duration-700"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<Dialog.Panel className="menu__panel pointer-events-auto w-screen max-w-md">
							<div className="menu__panel-container flex h-full border-l p-6 flex-col space-y-8 overflow-y-scroll shadow-xl bg-black text-white">
								<div className="menu__row flex justify-between items-center">
									<p className="menu__title font-title font-extrabold text-3xl tracking-wider uppercase lg:text-2xl">
										Navigation
									</p>
									<span className="menu__close">
										<ButtonDefault
											className={classNames(className)}
											settings={{
												component: 'ButtonIcon',
												name: 'Close Menu',
												theme: 'shadow',
											}}
											icon={<XMarkIcon className="w-6 h-6" />}
											themeSection="primary"
											onClick={() => showMenu(false)}
										/>
									</span>
								</div>
								<div className="menu__row">
									<NavMenu />
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
