// Tailwind v3 fallback config.
// On Tailwind v4 you do NOT need this file - use tailwind.css instead
// (the design system exposes tokens via @theme inline). This maps the same
// CSS variables to v3 utilities for projects still on v3.
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        destructive: "var(--destructive)",
        "af-purple": "#4934bc",
        "af-pink": "#fe2267",
        "af-orange": "#ff9e02",
        "af-dark": "#08060f",
        "af-card": "#110e1c",
        "af-elevated": "#1a1530",
      },
      fontFamily: {
        heading: ["Urbanist", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        "blog-serif": ["DM Serif Display", "serif"],
        "blog-sans": ["Instrument Sans", "sans-serif"],
      },
      borderRadius: { sm: "10px", md: "12px", lg: "14px", xl: "18px", pill: "360px" },
      transitionTimingFunction: { brand: "cubic-bezier(0.23, 1, 0.32, 1)" },
    },
  },
  plugins: [],
} satisfies Config;
