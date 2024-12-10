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
        common: "var(--clr-common)",
        cursed: "var(--clr-cursed)",
        legendary: "var(--clr-legendary)",
        epic: "var(--clr-epic)",
      },
      backgroundImage: {
        gradient: "var(--gradient)",
      },
      dropShadow: {
        logo: "0 0 1rem var(--clr-epic)",
        common: "0 0 0.5rem var(--clr-common)",
        rare: "0 0 0.5rem var(--clr-rare)",
        epic: "0 0 0.5rem var(--clr-epic)",
        legendary: "0 0 0.5rem var(--clr-legendary)",
        cursed: "0 0 0.5rem var(--clr-cursed)",
      },
      boxShadow: {
        common: "inset 0 0 10px 5px var(--clr-common)",
        rare: "inset 0 0 10px 5px var(--clr-rare)",
        epic: "inset 0 0 10px 5px var(--clr-epic)",
        legendary: "inset 0 0 10px 5px var(--clr-legendary)",
        cursed: "inset 0 0 10px 5px var(--clr-cursed)",
      },
      animation: {
        rolling: "rolling 0.5s linear infinite", // Animacja przelatywania
      },
      keyframes: {
        rolling: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
