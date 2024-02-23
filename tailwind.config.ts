// Config: Tailwind
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import type { Config } from 'tailwindcss';

/*---------- Config ----------*/

// Default config
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				'loop-scroll': 'loop-scroll 5s linear infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: {
					DEFAULT: '#0da34e',
					dark: '#048D40',
				},
				secondary: {
					DEFAULT: '#4f5bff',
					dark: '#3C47E6',
				},
				tertiary: {
					DEFAULT: '#FFAE00',
					dark: '#E59C01',
				},
				black: {
					DEFAULT: '#111111',
					dark: '#000000',
				},
				white: {
					DEFAULT: '#ffffff',
					dark: '#F8F8F8',
				},
			},
			fontFamily: {
				title: ['var(--font-title)'],
				subtitle: ['var(--font-subtitle)'],
				button: ['var(--font-button)'],
				body: ['var(--font-body)'],
			},
			fontSize: {
				'2xs': '11px',
				'3xs': '10px',
			},
			keyframes: {
				'loop-scroll': {
					from: { transform: 'translateX(0%)' },
					to: { transform: 'translateX(-50%)' },
				},
			},
			transitionProperty: {
				size: 'width, height, margin, padding',
				position: 'top, left, transform',
				fade: 'transform, opacity',
			},
			zIndex: {
				100: '100',
				90: '90',
				80: '80',
				70: '70',
				60: '60',
				50: '50',
				40: '40',
				30: '30',
				20: '20',
				10: '10',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};

/*---------- Exports ----------*/

export default config;
