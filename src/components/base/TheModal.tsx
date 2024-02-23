// Component: TheModal
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Fragment, useEffect, useState } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { useUI } from '@/components/base/TheProviderUI';
import { Dialog, Transition } from '@headlessui/react';

// Components (local)
import TextBody from '@/components/singles/Text/TextBody';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import { ButtonText } from '@/components/singles/Button/ButtonDefault';

/*---------- Static Data ----------*/

// Name
const name = 'TheModal';

/*---------- Template ----------*/

// Types
export type TheModalProps = {
	className?: string;
};
export type TheModalPresenterProps = {
	isShowingModal?: boolean;
	title?: string | null;
	description?: SanityBody[] | string | null;
	className?: string;
	showModal?: FxnShowModal;
};

// Default component
export default function TheModal(props: TheModalProps) {
	/*----- Props -----*/

	// Get props
	const { className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { isShowingModal, modalTitle, modalBody, showModal } = ui;

	/*----- Init -----*/

	// Presenter props
	const presenterProps: TheModalPresenterProps = {
		isShowingModal,
		title: modalTitle,
		description: modalBody,
		className,
		showModal,
	};

	// Return default
	return <TheModalPresenter {...presenterProps} />;
}

// Presenter component
export function TheModalPresenter(props: TheModalPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		isShowingModal = false,
		title,
		description,
		className,
		showModal,
	} = props;

	/*----- Store -----*/

	// State - open
	const [open, setOpen] = useState<boolean>(isShowingModal);

	/*----- Methods -----*/

	// Function - handleSetOpen
	const handleSetOpen = (value: boolean) => {
		if (value === false) {
			// Set open
			showModal && showModal(false);
		}
	};

	/*----- Lifecycle -----*/

	// Watch - isShowingModal
	useEffect(() => {
		// Set open
		setOpen(isShowingModal);
	}, [isShowingModal]);

	/*----- Init -----*/

	// Return default
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				className={classNames(`modal relative z-10`, className)}
				as="div"
				onClose={handleSetOpen ?? ((value: boolean) => {})}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="modal__bg fixed inset-0 bg-opacity-75 transition-opacity bg-black" />
				</Transition.Child>

				<div className="modal__container fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="modal__container-inner flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="modal__panel relative transform overflow-hidden border rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 bg-black border-white/30 text-white">
								<div>
									<div className="mt-3 text-center space-y-4 sm:mt-5">
										{title && (
											<Dialog.Title
												as="h3"
												className="modal__title text-3xl font-semibold leading-6"
											>
												<TextSubtitle subtitle={title} />
											</Dialog.Title>
										)}
										{description && (
											<div className="modal__body">
												<TextBody body={description} />
											</div>
										)}
									</div>
								</div>
								<div className="modal__buttons flex justify-center items-center mt-5 sm:mt-6">
									<ButtonText
										className="min-w-[120px]"
										name="Close"
										color="primary"
										onClick={() => handleSetOpen(false)}
									/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
