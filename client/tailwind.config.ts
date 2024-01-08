import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
    },
  },
  plugins: [],
};
export default config;
