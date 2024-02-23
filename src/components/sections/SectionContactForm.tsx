// Component: SectionContactForm
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';

// Scripts (local)
import { classNames, strCapitalize } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { parseListSocial } from '@/sanity/lib/utils';

// Components (node)
import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextBody from '@/components/singles/Text/TextBody';
import NavButtons from '@/components/singles/Nav/NavButtons';
import TextTitle from '@/components/singles/Text/TextTitle';
import IconSocial from '@/components/singles/Icon/IconSocial';
import FormContact from '@/components/singles/Form/FormContact';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionContactForm';

/*---------- Template ----------*/

// Types
export type SectionContactFormProps = {
	idx?: number;
	settings?: SanityBlockContactForm;
	className?: string;
};
export type SectionContactFormPresenterProps = {
	title?: string;
	formspreeEndpoint?: string;
	subtitle?: string;
	contactTel?: string;
	contactEmail?: string;
	nav: ListSocial;
	body?: SanityBody[] | string;
	buttons?: SanityListButtons;
	wrapper?: {
		idx?: number;
		paddingTop?: boolean;
		paddingSides?: boolean;
		paddingBottom?: boolean;
		isCard?: boolean;
		isFlipped?: boolean;
		theme?: ThemeSection;
		className?: string;
	};
};

// Default component
export default function SectionContactForm(props: SectionContactFormProps) {
	/*----- Props -----*/

	// Get props
	const { idx, settings, className } = props;

	/*----- Store -----*/

	// State - nav
	const [nav, setNav] = useState<ListSocial>([]);

	// Redux State - contactTel
	const contactTel = useAppSelector((state) => state.globals.contactTel);

	// Redux State - contactEmail
	const contactEmail = useAppSelector((state) => state.globals.contactEmail);

	// Redux state - navSocial
	const navSocial = useAppSelector((state) => state.globals.navSocial);

	/*----- Lifecycle -----*/

	// Watch - pathname, navHomeSlug, navSocial
	useEffect(() => {
		// If no navSocial..
		if (!navSocial) return;

		// Parse navSocial
		const navSocialParsed = parseListSocial(navSocial);

		// Set nav
		setNav(navSocialParsed);
	}, [navSocial]);

	/*----- Init -----*/

	// Define wrapper props
	const wrapper = {
		idx,
		name,
		paddingTop: props?.settings?.paddingTop ?? true,
		paddingSides: props?.settings?.paddingSides ?? true,
		paddingBottom: props?.settings?.paddingBottom ?? true,
		isCard: props?.settings?.isCard ?? false,
		isFlipped: props?.settings?.isFlipped ?? false,
		theme: props?.settings?.theme ?? 'default',
		className: classNames(props?.settings?.className, props?.className),
	};

	// Presenter props
	const presenterProps: SectionContactFormPresenterProps = {
		title: settings?.title,
		formspreeEndpoint: settings?.formspreeEndpoint,
		subtitle: settings?.subtitle,
		contactTel,
		contactEmail,
		nav,
		body: settings?.body,
		buttons: settings?.buttons,
		wrapper,
	};

	// Switch - component
	switch (settings?.component) {
		// Case - SectionContactForm2
		// case 'section-contact-2':
		// 	return <SectionContactForm2 {...presenterProps} />;

		// Case - SectionContactForm1
		case 'section-contact-1':
		default:
			return <SectionContactForm1 {...presenterProps} />;
	}
}

// SectionContactForm1 component
export function SectionContactForm1(props: SectionContactFormPresenterProps) {
	/*----- Props -----*/

	// Get props
	const {
		title,
		formspreeEndpoint,
		subtitle,
		contactTel,
		contactEmail,
		nav,
		body,
		buttons,
		wrapper = {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper {...wrapper}>
			<div className="section__row grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
				<div className="section__col space-y-10 lg:text-left">
					{(title ||
						subtitle ||
						body ||
						contactTel ||
						contactEmail ||
						buttons) && (
						<TextWrapper className="max-w-screen-lg mx-auto space-y-4">
							{title && (
								<div className="section__title text-[14vw] md:text-[10vw] lg:text-[100px]">
									<TextTitle as="h2" title={title} />
								</div>
							)}
							{subtitle && (
								<div className="section__subtitle text-normal">
									<h3 className="leading-none font-bold">{subtitle}</h3>
								</div>
							)}
							{body && (
								<div className="section__body">
									<TextBody body={body} />
								</div>
							)}
							{contactTel && contactEmail && (
								<dl className="section__contact mt-10 space-y-4 text-base leading-7">
									{contactTel && (
										<div>
											<Link
												className="inline-block transiiton-opacity duration-300 ease-out lg:hover:opacity-30"
												href={`tel:${contactTel}`}
											>
												<div className="flex gap-x-4">
													<dt className="flex items-center">
														<span className="sr-only">Telephone</span>
														<PhoneIcon
															className="w-6 h-auto"
															aria-hidden="true"
														/>
													</dt>
													<dd>{contactTel}</dd>
												</div>{' '}
											</Link>
										</div>
									)}
									{contactEmail && (
										<div>
											<Link
												className="inline-block transiiton-opacity duration-300 ease-out lg:hover:opacity-30"
												href={`mailto:${contactEmail}`}
											>
												<div className="flex gap-x-4">
													<dt className="flex items-center">
														<span className="sr-only">Email</span>
														<EnvelopeIcon
															className="w-6 h-auto"
															aria-hidden="true"
														/>
													</dt>
													<dd>{contactEmail}</dd>
												</div>
											</Link>
										</div>
									)}
									{nav.map((item) => (
										<div key={item.icon}>
											<Link
												href={item.href}
												target={item.target}
												className="inline-block transiiton-opacity duration-300 ease-out lg:hover:opacity-30"
											>
												<div className="flex gap-x-4">
													<dt className="flex items-center">
														<IconSocial
															className="w-6 h-auto"
															icon={item.icon}
														/>
													</dt>
													<dd>{strCapitalize(item.icon)}</dd>
												</div>
											</Link>
										</div>
									))}
								</dl>
							)}
							{buttons && (
								<div className="section__buttons">
									<NavButtons buttons={buttons} />
								</div>
							)}
						</TextWrapper>
					)}
				</div>
				<AosWrapper className="section__col space-y-10 lg:text-left">
					{formspreeEndpoint && (
						<AosWrapper animation="fade-up" delay={0.3} stagger={0.1}>
							<FormContact formspreeEndpoint={formspreeEndpoint} />
						</AosWrapper>
					)}
				</AosWrapper>
			</div>
		</SectionWrapper>
	);
}

// SectionContactForm1 component
// ...
