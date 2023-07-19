/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				alice: ["Alice", "serif"],
				chivo: ["Chivo", "sans-serif"],
			},
		},
	},
	plugins: [],
};
