/* ============================================================
 * Enterprise Design System — Tailwind preset
 * Advertflair standard for new enterprise app builds.
 *
 * Usage:
 *   // tailwind.config.js
 *   const enterprise = require('./enterprise-design/assets/tailwind.config.js');
 *   module.exports = {
 *     presets: [enterprise],
 *     content: ['./src/**\/*.{js,jsx,ts,tsx,html}'],
 *   };
 *
 * Import assets/tokens.css once at the app root so the CSS
 * variables these utilities reference are defined per color mode.
 * ============================================================ */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Token-driven theming is handled by data-color-mode + CSS vars,
  // so utilities work in both modes automatically. `darkMode` is set
  // to the attribute in case any `dark:` variants are also desired.
  darkMode: ['selector', '[data-color-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        s1: 'var(--s1)',
        s2: 'var(--s2)',
        h:  'var(--h)',
        tx: 'var(--tx)',
        lt: 'var(--lt)',
        m:  'var(--m)',
        in: 'var(--in)',
        'in-2': 'var(--in-2)',   // indigo text/links on dark
        or: 'var(--or)',
        wn: 'var(--wn)',
        ok: 'var(--ok)',
        er: 'var(--er)',
        'ok-fill': 'var(--ok-fill)',  // solid success button fill (AA w/ white text)
        'er-fill': 'var(--er-fill)',  // solid danger button fill (AA w/ white text)
        br: 'var(--br)',
      },
      borderColor: {
        DEFAULT: 'var(--br)',
        br: 'var(--br)',
      },
      borderRadius: {
        r: 'var(--r)',     // 14px — cards, panels, modals
        rs: 'var(--rs)',   // 8px  — inner elements, chips
        pill: '360px',     // buttons, single-line controls
      },
      fontFamily: {
        display: ["var(--font-display, 'Urbanist')", 'sans-serif'],
        sans: ["var(--font-body, 'Inter')", 'sans-serif'],
      },
      fontSize: {
        // compact enterprise scale
        '2xs': ['9.5px', '1.3'],
        xs: ['11px', '1.3'],
        sm: ['12px', '1.4'],
        base: ['13px', '1.5'],
        md: ['15px', '1.4'],
        lg: ['18px', '1.3'],
        xl: ['22px', '1.2'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(.23, 1, .32, 1)',
      },
      boxShadow: {
        1: 'var(--sh-1)',
        2: 'var(--sh-2)',
        pop: 'var(--sh-pop)',
      },
      backdropBlur: {
        panel: '12px',
      },
      backgroundImage: {
        // signature primary-CTA gradient
        'cta': 'linear-gradient(135deg, var(--or), var(--wn))',
        'in-glow': 'linear-gradient(135deg, var(--in), var(--or))',
      },
      ringColor: {
        in: 'var(--in)',
      },
    },
  },
  plugins: [],
};
