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
        cardColor: "#0d0d0d",
        strokeColor: "var(--strokeColor)",
        textColor:"#b3b3b3",
        primaryColor:"#C233CC",
        primaryColorLight:"#F39EFA"
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
      boxShadow: {
        glow: "0 -28px 84px -24px #e2e8ff1f inset;",
      },
      fontFamily:{
       concertOne: "Concert One, sans-serif",
       Poppins: "Poppins, sans-serif",
       Inspiration:"Inspiration, serif"
      }
    },
  },
  plugins: [],
};
export default config;
