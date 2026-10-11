import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080C16",
        surface: {
          DEFAULT: "#0F1424",
          elevated: "#151B2E",
          hover: "#1B223B",
          subtle: "#0B0F1C",
        },
        border: {
          DEFAULT: "#1C243B",
          subtle: "#141A2B",
          strong: "#283352",
        },
        brand: {
          purple: {
            DEFAULT: "#7C3AED",
            hover: "#6D28D9",
            light: "#9333EA",
            subtle: "rgba(124, 58, 237, 0.10)",
          },
          cyan: {
            DEFAULT: "#06B6D4",
            light: "#38BDF8",
            subtle: "rgba(6, 182, 212, 0.10)",
          },
        },
        content: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
          dim: "#475569",
        },
        // Neo-Brutalist Design Tokens
        nb: {
          yellow: "#ffe17c",
          charcoal: "#171e19",
          sage: "#b7c6c2",
          white: "#ffffff",
          black: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        cabinet: ['"Cabinet Grotesk"', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        satoshi: ['"Satoshi"', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em', fontWeight: '600' }],
        'section-title': ['1rem', { lineHeight: '1.375rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'card-title': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.005em', fontWeight: '500' }],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px -1px rgba(0, 0, 0, 0.2)",
        dropdown: "0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)",
        modal: "0 16px 36px -8px rgba(0, 0, 0, 0.65)",
        // Neo-Brutalist Hard Offset Shadows
        'hard-xs': "2px 2px 0px #000000",
        'hard-sm': "3px 3px 0px #000000",
        'hard': "4px 4px 0px #000000",
        'hard-md': "5px 5px 0px #000000",
        'hard-lg': "6px 6px 0px #000000",
        'hard-xl': "8px 8px 0px #000000",
        'hard-2xl': "10px 10px 0px #000000",
      },
    },
  },
  plugins: [],
};
export default config;
