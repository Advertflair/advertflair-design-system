# Advertflair Design System

The production design system behind **advertflair.ai** and the Advertflair website pages, exported as portable tokens, CSS, Tailwind config, the shadcn/ui component set, and copy-paste page patterns. Drop it into any project (or hand it to any tool / agent) to instantly match the brand.

> Source of truth: `advertflair-design-system.css`, mirrored from the [Figma Make export](https://github.com/Advertflair/Advertflairwebsitepage). Tokens version `1.1.0`.

---

## What's inside

| File / folder | Purpose |
|------|---------|
| `advertflair-design-system.css` | The complete system: tokens, typography, brand components, animations. Works standalone. |
| `theme-extensions.css` | Semantic status colors (success/warning/error/info) + opt-in `.theme-classic` neutral palette. |
| `tokens.json` | Machine-readable tokens. For Style Dictionary, Figma plugins, or feeding an AI tool. |
| `tailwind.css` | **Tailwind v4** entry. |
| `tailwind.config.ts` | **Tailwind v3** fallback config. |
| `components.json` | shadcn/ui config, pre-pointed at this repo's CSS + tokens. |
| `components/ui/` | Vendored core shadcn primitives (button, input, badge, switch…) + `utils.ts`, `use-mobile.ts`. |
| `COMPONENTS.md` | Full 46-component list, one-command install for the rest, dependency list. |
| `PATTERNS.md` | Shiny-CTA usage, hero/feature/CTA/nav templates, scroll gallery, contact form. |
| `DESIGN-SYSTEM-GUIDE.md` | Implementation guide with examples. |
| `index.html` | Live demo with a light/dark toggle. |

---

## Brand at a glance

- **Colors:** purple `#4934bc` / pink `#fe2267` / orange `#ff9e02` (+ `#ff6b35` alt)
- **Primary CTA gradient:** `linear-gradient(135deg, #fe2267, #ff9e02)` (pink to orange)
- **Semantic:** success `#22c55e` / warning `#f59e0b` / error `#ef4444` / info `#3b82f6`
- **Fonts:** Urbanist (headings) / Inter (body). DM Serif Display + Instrument Sans reserved for blog.
- **Theme:** light default (`#f8fafc`) / dark (`#08060f`), toggled with a `.dark` class on `<html>`.
- **Signature components:** `shiny-cta` button, pill buttons, glass + pipeline cards.
- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` everywhere.

### Two neutral palettes
The default neutrals are the **production** values (`#f8fafc` / `#1a1530` / `#110e1c`, 60px H1). A second **classic** palette from the brand-guide lineage (`#ffffff` / `#0a0a0a` / `#1a1625`) ships as an opt-in: add `class="theme-classic"` (or `class="dark theme-classic"`) on `<html>`. Both share the same brand colors and dark `#08060f` — only the neutrals differ.

---

## Quick start

### Plain HTML / CSS
```html
<link rel="stylesheet" href="advertflair-design-system.css">
<link rel="stylesheet" href="theme-extensions.css">
<button class="shiny-cta"><span style="position:relative;z-index:10">Get Started &rarr;</span></button>
```

### Tailwind v4
```css
@import "./tailwind.css";          /* Tailwind + design system */
@import "./theme-extensions.css";  /* semantic + classic palette */
```
Then use utilities like `bg-af-purple`, `text-af-pink`, `bg-primary`, `text-success`.

### Components
See `COMPONENTS.md` — the core primitives are in `components/ui/`; install the rest with one `npx shadcn add` command. See `PATTERNS.md` for the page-level building blocks.

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

Open `index.html` locally, or enable **GitHub Pages** (Settings → Pages → deploy from `main` / root) for a shareable URL.

---

**Maintained by Advertflair.** Keep `advertflair-design-system.css` as the single source of truth — if the production site changes, update it here and bump the version in `tokens.json`.
