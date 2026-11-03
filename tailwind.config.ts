import type { Config } from "tailwindcss";

// Every brand colour is a CSS variable from app/globals.css, so a colour is changed in one place.
// <alpha-value> keeps the opacity modifiers working (bg-navy-deep/85, border-white/15 ...).
const tokenColor = (name: string) => `color-mix(in srgb, var(--color-${name}) calc(<alpha-value> * 100%), transparent)`;
const colorNames = [
  "navy",
  "navy-dark",
  "navy-deep",
  "navy-soft",
  "gold",
  "gold-bright",
  "gold-light",
  "gold-pale",
  "ink",
  "body",
  "muted",
  "line",
  "mist",
  "ivory",
  "bone",
  "page",
];

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      colors: Object.fromEntries(colorNames.map((name) => [name, tokenColor(name)])),
      borderColor: {
        DEFAULT: "currentColor",
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
        display: ["var(--font-heading)"],
      },
      // Easing for hovers and scroll animations.
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        curtain: "cubic-bezier(0.77, 0, 0.18, 1)",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
      },
      scale: {
        112: "1.12",
        116: "1.16",
      },
    },
  },
  plugins: [],
};
export default config;
