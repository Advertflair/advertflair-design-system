# Advertflair Design System Documentation

Complete design system export for implementation in other applications.

---

## Table of Contents

1. Color Palette
2. Typography
3. Buttons
4. Cards
5. Animations
6. Dark Mode
7. Implementation Guide

---

## Color Palette

### Brand Colors
```css
--af-purple: #4934bc;  /* Primary brand color */
--af-pink: #fe2267;    /* Accent/CTA color */
--af-orange: #ff9e02;  /* Gradient accent */
```

### Light Mode (Default)
```css
--background: #f8fafc;
--foreground: #1a1530;
--card: #ffffff;
--border: rgba(0,0,0,0.08);
--muted-foreground: #64748b;
```

### Dark Mode
```css
--background: #08060f;
--foreground: #e2e8f0;
--card: #110e1c;
--border: rgba(255,255,255,0.08);
--muted-foreground: #94a3b8;
```

### Gradient Combinations
```css
/* Primary (Pink -> Orange) */
background: linear-gradient(135deg, #fe2267, #ff9e02);
/* Secondary (Purple -> Pink) */
background: linear-gradient(135deg, #4934bc, #fe2267);
/* Full brand */
background: linear-gradient(135deg, #4934bc, #fe2267, #ff9e02);
/* Dark background */
background: linear-gradient(135deg, #08060f 0%, #1a1530 50%, #110e1c 100%);
```

---

## Typography

**Headings (Urbanist):** weights 400, 600, 700, 800
**Body (Inter):** weights 400, 500
**Blog (optional):** DM Serif Display, Instrument Sans

```css
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
```

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| h1 | 60px (3.75rem) | 800 | 1.1 | -0.02em |
| h2 | 40px (2.5rem) | 700 | 1.2 | - |
| h3 | 24px (1.5rem) | 600 | 1.4 | - |
| h4 | 18px (1.125rem) | 600 | 1.5 | - |
| p | 18px (1.125rem) | 400 | 1.6 | - |
| label / button | 16px (1rem) | 500 | 1.5 | - |

Utility classes: `.eyebrow` (uppercase, 14px, 700, 0.1em), `.caption` (14px), and text gradients `.text-gradient-brand`, `.text-gradient-purple-pink`, `.gradient-brand-full`.

---

## Buttons

### Shiny CTA (hero)
```html
<button class="shiny-cta">
  <span style="position: relative; z-index: 10;">$2K Pilot - Prove It Or Walk &rarr;</span>
</button>
```
Spinning conic gradient border (4s idle, 2s hover), light sweep beam, dot-grid texture, glass blur, 3D lift. Padding `0.875rem 1.75rem`.

### Pill buttons
```html
<button class="pill-button pill-button-primary">Get Started &rarr;</button>
<button class="pill-button pill-button-secondary">Learn More</button>
<button class="pill-button pill-button-ghost">Cancel</button>
```
Radius `360px`, padding `0.875rem 1.75rem`, font 14px/500, easing `cubic-bezier(0.23, 1, 0.32, 1)`.

---

## Cards

- `.card` - basic, padding 2rem, radius 14px, lifts 2px on hover.
- `.glass-card` - rgba background + 12px blur, best on dark/gradient backgrounds.
- `.pipeline-card-sweep` - spinning gradient border + light sweep (content needs `position: relative; z-index: 1;`).

---

## Animations

Easing: `cubic-bezier(0.23, 1, 0.32, 1)`.
Classes: `.fade-in` (+ `-delay-1/2/3`), `.scale-in`, `.slide-in-left`, `.slide-in-right`, `.glow-purple/pink/orange`, `.glow-pulse`.

---

## Dark Mode

Add `.dark` to `<html>`; all tokens swap automatically.
```js
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
```

---

## Implementation Guide

1. **Install fonts** - add the Urbanist + Inter `<link>` to `<head>`.
2. **Include CSS** - `<link rel="stylesheet" href="advertflair-design-system.css">`.
3. **Tailwind v4 (optional)** - `@import "tailwindcss";` then `@import "./advertflair-design-system.css";`. The `@theme inline` block extends Tailwind with the brand tokens.
4. **Init dark mode** - run the snippet above before first paint.
5. **Use components** - see `index.html` for a working page.

### Design Tokens Quick Reference

**Spacing:** `--section-padding: 5rem 1.5rem` (mobile), `7rem 1.5rem` (md+). Container max 1280px.
**Radius:** 10 / 12 / 14 (cards) / 18px.
**Shadows (light):** subtle `0 4px 12px rgba(0,0,0,0.1)`, medium `0 10px 30px rgba(0,0,0,0.15)`, strong `0 20px 60px rgba(0,0,0,0.3)`. Dark mode uses higher opacity (0.5/0.6/0.8).
**Glass:** `backdrop-filter: blur(20px)` with `rgba(255,255,255,0.8)` (light) or `rgba(8,6,15,0.8)` (dark).

### Breakpoints
sm 640px / md 768px / lg 1024px / xl 1280px / 2xl 1536px.

### Accessibility
- Animations respect `prefers-reduced-motion`.
- Visible `:focus-visible` outlines on interactive elements.
- Text meets WCAG AA contrast.
- `.sr-only` for screen-reader-only content.

---

**Design System Version:** 1.0
**Based on:** advertflair.ai production site
