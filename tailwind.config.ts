import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '200px',   // Small screens
        'ipad': '550px',
        'tablet': '768px',   // Medium screens
        'laptop': '1024px',  // Large screens
        'desktop': '1280px',  // Extra-large screens
      }
    },
  },
  plugins: [],
};
export default config;
