import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "var(--clr-blue)",
        'blue-hover': "var(--clr-blue-hover)",
        green: "var(--clr-grenn)",
        red: "var(--clr-red)",
        gold: "var(--clr-gold)",
        purple: "var(--clr-purple)",
      },
      dropShadow: {
        logo: "0 0 0.5rem var(--clr-blue)",
      },
    },
  },
  plugins: [],
};
export default config;
