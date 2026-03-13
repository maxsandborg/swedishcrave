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
        // Scandinavian premium aesthetic
        "sc-bg": "#F5F2ED",
        "sc-card": "#FFFFFF",
        "sc-text": "#1A1A1A",
        "sc-text-muted": "#6B7280",
        "sc-primary": "#4A7BA7",
        "sc-secondary": "#D4A574",
        "sc-cta": "#C41E3A",
        "sc-success": "#6B8E5F",
        "sc-border": "#E0D9D0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
