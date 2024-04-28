import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#703BF7",
        darkGray: "#212121",
        bgColor: "#141414",
        
    }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
