/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#006994',
				},
				crimson: {
					DEFAULT: '#5C0000',
				},
			},
		},
	},
	plugins: [],
};
