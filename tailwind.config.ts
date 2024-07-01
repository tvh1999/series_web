import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      1: "0.063rem",
      2: "0.125rem",
      3: "0.188rem",
      4: "0.25rem",
      5: "0.313rem",
      6: "0.375rem",
      8: "0.5rem",
      10: "0.625rem",
      11: "0.688rem",
      12: "0.75rem",
      14: "0.875rem",
      15: "0.938rem",
      16: "1rem",
      18: "1.125rem",
      20: "1.25rem",
      24: "1.5rem",
      25: "1.563rem",
      28: "1.75rem",
      32: "2rem",
      36: "2.25rem",
      40: "2.5rem",
      44: "2.75rem",
      48: "3rem",
      50: "3.125rem",
      56: "3.5rem",
      64: "4rem",
      72: "4.5rem",
      75: "4.688rem",
      80: "5rem",
      90: "5.625rem",
      100: "6.25rem",
    },
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          red: "#FC4747",
        },
        dark: {
          300: "#151821",
          400: "#212734",
          "dark-blue": "#10141E",
          "semi-dark-blue": "#161D2F",
          "pure-white": "#FFFFFF",
          "darker-greyish-blue": "#5A698F",
        },
        light: {
          700: "#DCE3F1",
          900: "#FFFFFF",
          "light-blue": "#99CCFF",
          "semi-light-blue": "#79B6C9",
          "pure-black": "#000000",
          "lighter-greyish-blue": "#B7C9E2",
        },
      },
      fontFamily: {
        workSans: "[var(--font-workSans)]",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
