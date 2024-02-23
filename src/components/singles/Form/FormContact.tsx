// Component: FormContact
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useRef, useState } from 'react';
import axios from 'axios';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useUI } from '@/components/base/TheProviderUI';
import { useSection } from '@/components/sections/_partials/SectionWrapper';

// Components (node)
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// Components (local)
import IconSpinner from '@/components/singles/Icon/IconSpinner';
import { ButtonText } from '@/components/singles/Button/ButtonDefault';

/*---------- Static Data ----------*/

// Name
const name = 'FormContact';

/*---------- Template ----------*/

// Types
export type FormContactProps = {
	formspreeEndpoint?: string;
	bodySuccess?: SanityBody[] | string;
	bodyError?: SanityBody[] | string;
	className?: string;
};
export type FormContactPresenterProps = {
	formspreeEndpoint: string;
	bodySuccess?: SanityBody[] | string;
	bodyError?: SanityBody[] | string;
	themeSection?: ThemeSection;
	className?: string;
	showModal?: FxnShowModal;
};

// Default component
export default function FormContact(props: FormContactProps) {
	/*----- Props -----*/

	// Get props
	const { formspreeEndpoint, bodySuccess, className } = props;

	/*----- Store -----*/

	// Context - useUI
	const ui = useUI();
	const { isShowingModal, showModal } = ui;

	// Context - useSection
	const section = useSection();
	const themeSection = section.theme;

	/*----- Init -----*/

	// If formspreeEndpoint is not set, return null
	if (!formspreeEndpoint) return null;

	// Presenter props
	const presenterProps: FormContactPresenterProps = {
		formspreeEndpoint,
		themeSection,
		className,
		showModal,
	};

	// Return default
	return <FormContactPresenter {...presenterProps} />;
}

// Presenter component
export function FormContactPresenter(props: FormContactPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		formspreeEndpoint,
		bodySuccess = `Your message has been sent successfully. Thank you for reaching out!`,
		bodyError = `Sorry, there was a problem submitting your message.`,
		themeSection = 'default',
		className,
		showModal = (value?: ThemeModal) => {},
	} = props;

	/*----- Refs -----*/

	// Ref - inputEls
	const inputEls = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
		[]
	);

	// Ref - inputValues
	const inputValues = useRef<{
		'first-name': string;
		'last-name': string;
		email: string;
		'phone-number': string;
		message: string;
	} | null>();

	/*----- Store -----*/

	// State - isFetching
	const [isFetching, setIsFetching] = useState<boolean>(false);

	// State - hasErrors
	const [hasErrors, setHasErrors] = useState<string | false>(false);

	// State - inputErrors
	const [inputErrors, setInputErrors] = useState<{
		'first-name'?: string;
		'last-name'?: string;
		email?: string;
		'phone-number'?: string;
		message?: string;
	}>({
		'first-name': undefined,
		'last-name': undefined,
		email: undefined,
		'phone-number': undefined,
		message: undefined,
	});

	/*----- Methods -----*/

	// Function - validateFirstName
	const validateFirstName = () => {
		// Get inputValues
		const { 'first-name': firstName } = inputValues.current || {};

		// If firstName is empty, return
		if (!firstName) return `Please enter your first name`;

		// If firstName is invalid, set inputErrors
		if (firstName.length < 2) return `Please enter a valid first name`;

		// Return undefined
		return undefined;
	};

	// Function - validateLastName
	const validateLastName = () => {
		// Get inputValues
		const { 'last-name': lastName } = inputValues.current || {};

		// If lastName is empty, return
		if (!lastName) return `Please enter your last name`;

		// If lastName is invalid, set inputErrors
		if (lastName.length < 2) return `Please enter a valid last name`;

		// Return undefined
		return undefined;
	};

	// Function - validateEmail
	const validateEmail = () => {
		// Get inputValues
		const { email } = inputValues.current || {};

		// If email is empty, return
		if (!email) return `Please enter your email address`;

		// If email is invalid, set inputErrors
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return `Please enter a valid email address`;

		// Return undefined
		return undefined;
	};

	// Function - validatePhoneNumber
	const validatePhoneNumber = () => {
		// Get inputValues
		const { 'phone-number': phoneNumber } = inputValues.current || {};

		// If phoneNumber is empty, return
		if (!phoneNumber) return `Please enter your phone number`;

		// Return undefined
		return undefined;
	};

	// Function - validateForm
	const validateForm = () => {
		// Define isValid
		let isValid = false;

		// Get inputValues
		const {
			'first-name': firstName,
			'last-name': lastName,
			email,
			message,
		} = inputValues.current || {};

		// Set inputErrors
		setInputErrors({
			'first-name': validateFirstName(),
			'last-name': validateLastName(),
			email: email ? undefined : validateEmail(),
			'phone-number': validatePhoneNumber(),
			message: message ? undefined : `Please enter your message`,
		});

		// If all object values are undefined...
		if (
			!Object.values(inputErrors).some((error) => error) &&
			firstName &&
			lastName &&
			email &&
			message
		) {
			// Set isValid
			isValid = true;
		}

		// Return isValid
		setHasErrors(!isValid ? 'Please correct the errors below *' : false);
		return isValid;
	};

	// Function - handleServerResponse
	const handleServerResponse = (ok: boolean, msg?: null | string) => {
		if (ok) {
			// Set showModal
			showModal({
				_type: 'modalMessage',
				title: 'Message Sent',
				body: bodySuccess,
			});

			// Loop through inputEls
			inputEls.current.forEach((el) => {
				// If el is not null...
				if (el) {
					// Set value
					el.value = '';
				}
			});
		} else {
			// Set setHasErrors
			setHasErrors(msg ? `${bodyError} ${msg}` : `${bodyError}`);

			// Show modal
			showModal({
				_type: 'modalError',
				title: 'Error Submitting Form',
				body: bodyError,
			});
		}

		// Set isFetching
		setIsFetching(false);
	};

	// Function - handleFormSubmit
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// Prevent default
		e.preventDefault();

		// If isFetching, return
		if (isFetching) return;

		// Get form
		const form = e.currentTarget;

		// Get form data
		const formData = new FormData(form);

		// Get form action
		const formAction = form.getAttribute('action');

		// If no form action, return
		if (!formAction) return;

		// Set inputValues
		inputValues.current = {
			'first-name': formData.get('first-name') as string,
			'last-name': formData.get('last-name') as string,
			email: formData.get('email') as string,
			'phone-number': formData.get('phone-number') as string,
			message: formData.get('message') as string,
		};

		// Validate form
		const isValid = validateForm();

		// If not valid, return
		if (!isValid) return;

		// Set isFetching
		setIsFetching(true);

		// Send axios request
		axios({
			method: 'POST',
			url: formspreeEndpoint,
			data: inputValues,
		})
			// If successful...
			.then((response) => {
				handleServerResponse(true);
			})
			// If unsuccessful...
			.catch((error) => {
				handleServerResponse(false, error.response.data.error);
			});
	};

	/*----- Init -----*/

	// Return default
	return (
		<form
			className={classNames(`form text-left`, className)}
			data-name={name}
			action="#"
			method="POST"
			onSubmit={handleFormSubmit}
		>
			<div className="mx-auto lg:mr-0">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					{hasErrors && (
						<div className="flex flex-col justify-center items-center rounded-lg p-3 gap-y-3 text-left sm:col-span-2 lg:flex-row lg:justify-start lg:gap-y-0 lg:gap-x-4 bg-black text-white">
							<span>
								<ExclamationTriangleIcon
									className="w-5 h-auto"
									aria-hidden="true"
								/>
							</span>
							<span className="font-semibold text-xs uppercase">
								{hasErrors}
							</span>
						</div>
					)}
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-semibold leading-6"
						>
							First name
						</label>
						<div className="mt-2.5 space-y-3">
							<input
								ref={(el) => (inputEls.current[0] = el)}
								type="text"
								name="first-name"
								id="first-name"
								autoComplete="given-name"
								className={classNames(
									`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
									themeSection === 'primary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'secondary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'white'
										? `bg-black/5 text-black ring-black/30 focus:ring-secondary`
										: `bg-white/5 text-white ring-white/30 focus:ring-primary`
								)}
							/>
							{inputErrors['first-name'] && (
								<p className="font-semibold text-xs uppercase text-black">
									* {inputErrors['first-name']}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm font-semibold leading-6"
						>
							Last name
						</label>
						<div className="mt-2.5 space-y-3">
							<input
								ref={(el) => (inputEls.current[1] = el)}
								type="text"
								name="last-name"
								id="last-name"
								autoComplete="family-name"
								className={classNames(
									`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
									themeSection === 'primary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'secondary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'white'
										? `bg-black/5 text-black ring-black/30 focus:ring-secondary`
										: `bg-white/5 text-white ring-white/30 focus:ring-primary`
								)}
							/>
							{inputErrors['last-name'] && (
								<p className="font-semibold text-xs uppercase text-black">
									* {inputErrors['last-name']}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6"
						>
							Email
						</label>
						<div className="mt-2.5 space-y-3">
							<input
								ref={(el) => (inputEls.current[2] = el)}
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className={classNames(
									`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
									themeSection === 'primary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'secondary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'white'
										? `bg-black/5 text-black ring-black/30 focus:ring-secondary`
										: `bg-white/5 text-white ring-white/30 focus:ring-primary`
								)}
							/>
							{inputErrors.email && (
								<p className="font-semibold text-xs uppercase text-black">
									* {inputErrors.email}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone-number"
							className="block text-sm font-semibold leading-6"
						>
							Phone number
						</label>
						<div className="mt-2.5 space-y-3">
							<input
								ref={(el) => (inputEls.current[3] = el)}
								type="tel"
								name="phone-number"
								id="phone-number"
								autoComplete="tel"
								className={classNames(
									`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
									themeSection === 'primary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'secondary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'white'
										? `bg-black/5 text-black ring-black/30 focus:ring-secondary`
										: `bg-white/5 text-white ring-white/30 focus:ring-primary`
								)}
							/>
							{inputErrors['phone-number'] && (
								<p className="font-semibold text-xs uppercase text-black">
									* {inputErrors['phone-number']}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6"
						>
							Message
						</label>
						<div className="mt-2.5 space-y-3">
							<textarea
								ref={(el) => (inputEls.current[4] = el)}
								name="message"
								id="message"
								rows={4}
								className={classNames(
									`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
									themeSection === 'primary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'secondary'
										? `bg-white/5 text-white ring-white/30 focus:ring-white`
										: themeSection === 'white'
										? `bg-black/5 text-black ring-black/30 focus:ring-secondary`
										: `bg-white/5 text-white ring-white/30 focus:ring-primary`
								)}
								defaultValue={''}
							/>
							{inputErrors.message && (
								<p className="font-semibold text-xs uppercase text-black">
									* {inputErrors.message}
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="mt-8 flex justify-start">
					{isFetching ? (
						<IconSpinner text={'Sending...'} />
					) : (
						<ButtonText
							className="min-w-full mx-auto sm:min-w-[150px] lg:ml-0"
							name="Send message"
							type="submit"
							color={
								themeSection === 'primary'
									? 'outline'
									: themeSection === 'secondary'
									? 'outline'
									: themeSection === 'white'
									? 'secondary'
									: 'primary'
							}
						/>
					)}
				</div>
			</div>
		</form>
	);
}
