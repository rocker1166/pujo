import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Festive Durga Puja color palette
      colors: {
        durgaRed: "#FF5733",
        dhakBrown: "#8B4513",
        kashfulWhite: "#FFFDD0",
        festiveOrange: "#FF7F50",
        mandalaGold: "#FFD700",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom animations for a festive vibe
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        diagonalMove: "diagonalMove 10s linear infinite",
        swing: "swing 3s ease-in-out infinite",
        slideUp: "slideUp 1s ease-out forwards", // New animation for the Durga image
      },
      keyframes: {
        // Float effect for subtle movement
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        // Pulse effect to add glow-like effects
        pulse: {
          "0%, 100%": { opacity: '0.8' },
          "50%": { opacity: '1' },
        },
        // Diagonal move for smooth floating
        diagonalMove: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, 20px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        // Swinging motion for dynamic feel
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        // Slide up effect for the Durga image
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: '0' }, // Start from the bottom
          "100%": { transform: "translateY(0)", opacity: '1' },   // Slide up to the original position
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
