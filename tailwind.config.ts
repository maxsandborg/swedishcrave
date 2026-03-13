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
        // Scandinavian clean base
        "sc-bg": "#FAFAF8",
        "sc-bg-alt": "#F3F1ED",
        "sc-card": "#FFFFFF",
        "sc-text": "#1A1A1A",
        "sc-text-muted": "#6B7280",
        "sc-text-light": "#9CA3AF",
        "sc-border": "#E8E5DF",

        // Candy energy accents
        "sc-pink": "#FF2D87",
        "sc-pink-hover": "#E6196F",
        "sc-yellow": "#FFD23F",
        "sc-yellow-soft": "#FFF3D0",
        "sc-lime": "#7BF178",
        "sc-lime-soft": "#E8FCE7",
        "sc-purple": "#6C5CE7",
        "sc-purple-soft": "#EDE8FF",
        "sc-blue": "#4FACFE",
        "sc-coral": "#FF6B6B",
        "sc-mint": "#55EFC4",

        // Swedish flag
        "sc-swedish-blue": "#006AA7",
        "sc-swedish-yellow": "#FECC02",

        // Legacy aliases (mapped to new design)
        "sc-primary": "#FF2D87",
        "sc-secondary": "#FFD23F",
        "sc-cta": "#FF2D87",
        "sc-success": "#7BF178",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: {
        "sc-sm": "8px",
        "sc-md": "14px",
        "sc-lg": "20px",
        "sc-xl": "28px",
        "sc-full": "100px",
      },
      boxShadow: {
        "sc-sm": "0 1px 3px rgba(0,0,0,0.06)",
        "sc-md": "0 4px 12px rgba(0,0,0,0.08)",
        "sc-lg": "0 8px 30px rgba(0,0,0,0.1)",
        "sc-candy": "0 4px 20px rgba(255,45,135,0.15)",
        "sc-hover": "0 12px 40px rgba(0,0,0,0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.3)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
