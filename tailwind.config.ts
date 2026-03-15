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
        // SwedishCrave — Candy-forward, vibrant, warm
        // Core tokens (mapped from old sc-* names for compatibility)
        "sc-bg": "#FFF8F0",
        "sc-card": "#FFFFFF",
        "sc-text": "#1A1A2E",
        "sc-text-muted": "#4A4A5A",
        "sc-primary": "#E8362A",
        "sc-secondary": "#FF8C42",
        "sc-cta": "#E8362A",
        "sc-success": "#22C55E",
        "sc-border": "#F0EAE0",

        // Extended candy palette
        "sc-cream": "#FFF3E6",
        "sc-yellow": "#FECC02",
        "sc-yellow-soft": "#FFF8D6",
        "sc-pink": "#FF4D9B",
        "sc-pink-soft": "#FFE8F1",
        "sc-blue": "#2D7FF9",
        "sc-blue-soft": "#EBF3FF",
        "sc-green": "#22C55E",
        "sc-green-soft": "#ECFDF5",
        "sc-teal": "#00C9B7",
        "sc-teal-soft": "#E6FBF8",
        "sc-orange": "#FF8C42",
        "sc-orange-soft": "#FFF2E8",
        "sc-purple": "#8B5CF6",
        "sc-purple-soft": "#F3EEFF",
        "sc-dark": "#1A1A2E",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        "sc-sm": "12px",
        "sc-md": "20px",
        "sc-lg": "28px",
        "sc-full": "100px",
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": {
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            transform: "translateY(0)",
          },
          "33%": {
            borderRadius: "50% 60% 40% 60% / 60% 40% 60% 40%",
            transform: "translateY(-8px)",
          },
          "66%": {
            borderRadius: "40% 50% 60% 40% / 40% 60% 50% 60%",
            transform: "translateY(4px)",
          },
        },
        "float-candy": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(10deg)" },
        },
      },
      animation: {
        "blob-float": "blob-float 8s ease-in-out infinite",
        "float-candy": "float-candy 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;import type { Config } from "tailwindcss";

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
