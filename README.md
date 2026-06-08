# Advertflair Design System

The production design system behind **advertflair.ai** and the Advertflair website pages, exported as portable, framework-agnostic tokens, CSS, and Tailwind config. Drop it into any project (or hand it to any tool / agent) to instantly match the brand.

> Source of truth: `advertflair-design-system.css`, mirrored from the [Figma Make export](https://github.com/Advertflair/Advertflairwebsitepage). Tokens version `1.0.0`.

---

## What's inside

| File | Purpose |
|------|---------|
| `advertflair-design-system.css` | The complete system: tokens, typography, components, animations. Works standalone. |
| `tokens.json` | Machine-readable tokens (colors, type scale, radii, shadows, motion). For Style Dictionary, Figma plugins, or feeding an AI tool. |
| `tailwind.css` | **Tailwind v4** entry: imports Tailwind + the design system so brand tokens become utilities. |
| `tailwind.config.ts` | **Tailwind v3** fallback config (only if you're still on v3). |
| `DESIGN-SYSTEM-GUIDE.md` | Full implementation guide with copy-paste component examples. |
| `index.html` | Live demo: open in a browser to see the system render with a light/dark toggle. |

---

## Brand at a glance

- **Colors:** purple `#4934bc` / pink `#fe2267` / orange `#ff9e02`
- **Primary CTA gradient:** `linear-gradient(135deg, #fe2267, #ff9e02)` (pink to orange)
- **Fonts:** Urbanist (headings) / Inter (body). DM Serif Display + Instrument Sans reserved for blog.
- **Theme:** light default (`#f8fafc`) / dark (`#08060f`), toggled with a `.dark` class on `<html>`.
- **Signature components:** `shiny-cta` button, pill buttons, glass + pipeline cards.
- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` everywhere.

---

## Quick start

### Plain HTML / CSS
```html
<link rel="stylesheet" href="advertflair-design-system.css">
<button class="shiny-cta"><span style="position:relative;z-index:10">Get Started &rarr;</span></button>
```

### Tailwind v4
```css
/* your app entry css */
@import "./tailwind.css";
```
Then use utilities like `bg-af-purple`, `text-af-pink`, `bg-primary`, `text-muted-foreground`.

### Tailwind v3
Use `tailwind.config.ts` and import `advertflair-design-system.css` for the component classes.

### Dark mode toggle
```js
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
```

---

## Live preview

Open `index.html` locally, or enable **GitHub Pages** (Settings -> Pages -> deploy from `main` / root) to get a shareable URL.

---

**Maintained by Advertflair.** Keep `advertflair-design-system.css` as the single source of truth: if the production site changes, update it here and bump the version in `tokens.json`.
