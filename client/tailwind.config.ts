import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      // Whites and grays
      snowWhite: "#FFFFFF",
      cloudGray: "#F9F9F9",
      smokeGray: "#C7C7C7",

      // Blues
      skyBlue: "#8FC9FF",
      oceanBlue: "#0084FF",
      navyBlue: "#00519D",

      // Dark shades
      midnight: "#16181F",
      eclipse: "#121318",
      overlay: "rgba(0,0,0,0.8)",

      red: "#C10000",
    },
    extend: {
      screens: {
        md: "1200px",
        lg: "1400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        "latest-container-column": "70% 30%",
        "invoice-grid": "1fr auto",
        "invoice-form": "2fr 1fr",
      },
      gridTemplateRows: {
        "invoice-grid": "auto auto",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
