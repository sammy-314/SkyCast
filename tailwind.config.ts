
import type { Config } from "tailwindcss";

export default {
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
    extend: {
      colors: {
        background: "#000000", // Black background
        neon: {
          turquoise: "#00FFD1", // Neon Turquoise
          purple: "#8A4FFF",    // Vibrant Purple
          red: "#FF1493",       // Neon Red
          blue: "#00BFFF",      // Deep Sky Blue
          orange: "#FF4500"     // Intense Orange
        },
        border: "#333333", // Dark border
        primary: {
          DEFAULT: "#00FFD1", // Neon Turquoise as primary
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#8A4FFF", // Purple as secondary
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#333333",
          foreground: "#888888"
        },
        accent: {
          DEFAULT: "#FF4500", // Orange as accent
          foreground: "#FFFFFF"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)"
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
        "glow": {
          "0%, 100%": { 
            textShadow: "0 0 5px rgba(0, 255, 209, 0.7), 0 0 10px rgba(0, 255, 209, 0.5)" 
          },
          "50%": { 
            textShadow: "0 0 10px rgba(0, 255, 209, 1), 0 0 20px rgba(0, 255, 209, 0.8)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
