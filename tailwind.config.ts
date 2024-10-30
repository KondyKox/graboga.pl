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
        rare: "var(--clr-rare)",
        "rare-hover": "var(--clr-rare-hover)",
        common: "var(--clr-common)",
        special: "var(--clr-special)",
        legendary: "var(--clr-legendary)",
        epic: "var(--clr-epic)",
      },
      dropShadow: {
        logo: "0 0 1rem var(--clr-epic)",
        common: "0 0 0.5rem var(--clr-common)",
        rare: "0 0 0.5rem var(--clr-rare)",
        epic: "0 0 0.5rem var(--clr-epic)",
        legendary: "0 0 0.5rem var(--clr-legendary)",
        special: "0 0 0.5rem var(--clr-special)",
      },
      boxShadow: {
        common: "inset 0 0 10px 5px var(--clr-common)",
        rare: "inset 0 0 10px 5px var(--clr-rare)",
        epic: "inset 0 0 10px 5px var(--clr-epic)",
        legendary: "inset 0 0 10px 5px var(--clr-legendary)",
        special: "inset 0 0 10px 5px var(--clr-special)",
      },
    },
  },
  plugins: [],
};
export default config;
