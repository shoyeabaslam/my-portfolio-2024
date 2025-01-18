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
        cardColor: "#0a0a0a",
        strokeColor: "var(--strokeColor)",
        textColor: "#b3b3b3",
        primaryColor: "#C233CC",
        primaryColorLight: "#F39EFA",
        shadowColor: "#1a1a1a1a",
        lighterCardColor: "#1f1f1f"
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
      boxShadow: {
        glow: "0 -28px 84px -24px #e2e8ff1f inset;",
      },
      fontFamily: {
        concertOne: "Concert One, sans-serif",
        Poppins: "Poppins, sans-serif",
        Inspiration: "Inspiration, serif"
      }
    },
  },
  plugins: [],
};
export default config;
