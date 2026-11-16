---
name: enterprise-design
description: The official Advertflair design system for building NEW enterprise web applications. Use this skill whenever building, styling, or theming any internal enterprise app, admin console, dashboard, portal, B2B SaaS interface, multi-role workspace, settings page, data table, or any production app UI for the company — even if the user does not explicitly say "design system." Targets React + Tailwind CSS and codifies the exact VaultVue tokens, typography (Urbanist + Inter), components, and dual light/dark theming. This is the standard for enterprise application builds ONLY. Do NOT use it for marketing sites, landing pages, generative/algorithmic art, posters, slide decks, or the generic frontend-design skill — those are separate. When both an enterprise app build and another design skill seem relevant, this one wins for the application UI.
---

# Enterprise Design System (VaultVue Standard)

This skill is the single source of truth for the visual and interaction design of **new enterprise applications** built at Advertflair. It codifies the design language already shipping in VaultVue so every new internal tool, admin console, portal, or B2B product looks like it belongs to the same family.

The aesthetic in one sentence: **a dense, dark-first enterprise SaaS look — deep indigo-black surfaces, an indigo→pink accent system, Urbanist display type over Inter body text, generous pill/rounded geometry, glassy translucent panels, and confident colored-glow shadows** — with a fully equal light mode.

Use it for: admin consoles, dashboards, role-aware portals, settings, data tables, review/annotation surfaces, task boards, internal SaaS. Do **not** use it for marketing pages, public landing pages, art, or decks.

## Step 0: whose brand is this? Ask before building

The system is one structure with a swappable brand layer, so the same build serves Advertflair and any client. Before wiring tokens, ask these in one short round. Skip anything already answered. If nobody is there to answer, build as Advertflair and say so at the top of the work.

1. **Brand:** Advertflair, a named client, or neutral white-label?
2. **Colours:** the primary brand colour (hex); primary button as a solid colour or a two-colour gradient; any secondary accent.
3. **Fonts:** heading and body families (Google Fonts name or licensed files), or keep Urbanist + Inter.
4. **Shape and theme:** pill, rounded or square controls; light default, dark default, or both. Light is the default for client-facing work.
5. **Source to match:** logo, brand guide or existing site, if there is one.

For Advertflair, use the tokens as shipped. For a client or white-label build, change only the brand layer, loaded after `tokens.css`:

```css
/* The only block edited per client. Values shown are an example. */
:root, [data-color-mode="dark"], [data-color-mode="light"] {
  --in: #0b3d2e;        /* primary: interactivity, focus, links, selected */
  --or: #0b3d2e;        /* primary button gradient start */
  --cta-to: #14532d;    /* primary button gradient end (same as start = solid) */
  --on-cta: #ffffff;    /* primary button label, 4.5:1 or better */
  --font-display: 'Client Serif', serif;
  --font-body: 'Client Sans', sans-serif;
  --r-control: 360px;   /* 360px pill, 10px rounded, 2px square */
}
:root, [data-color-mode="dark"] { --in-2: #6ee7b7; }  /* primary as text or links on dark: lighten until 4.5:1 */
[data-color-mode="light"] { --in-2: #0b3d2e; }
```

So that one block is enough, every build (Advertflair included) reads brand values through variables with the Advertflair value as fallback, never as literals:

- Fonts: `font-family: var(--font-display, 'Urbanist', sans-serif)` and `var(--font-body, 'Inter', sans-serif)`. Load the client's font files in the app.
- Primary button: `background: linear-gradient(135deg, var(--or), var(--cta-to, var(--wn)))`, label `color: var(--on-cta, #fff)`.
- Control radius: `border-radius: var(--r-control, 360px)`.
- AI helper: set `--ai-accent` to the same primary (see `advertflair-ai-chat-ui`).

What never changes with the brand: spacing, density, the app shell, component anatomy and states, the semantic colours (`--ok`, `--wn`, `--er` keep their meaning and are never remapped), motion and hit targets (`advertflair-ux-motion`), Lucide icons, and the accessibility rules.

Before shipping a client brand: text on the primary colour and the primary button label pass 4.5:1; the primary colour passes 4.5:1 as text on the surface (otherwise use the `--in-2` variant); one accent only; checked in light and dark. Record the answers in the repo README so nobody has to ask twice. The design-system repo ships this as `brand/client-brand.css`, with the questions in `brand/BRANDING.md` and a contrast checker.

## How to use this skill

1. **Always start from the tokens.** Read `references/tokens.md` and wire the CSS custom properties + Tailwind theme into the project before writing any component. Never hard-code a hex value that a token already covers — that is the #1 way apps drift out of the family.
2. **Build dual-mode from the start.** Light and dark are equal first-class modes. Toggle via `data-color-mode="dark|light"` on `<html>` (mirrored to `.vv-dark` / `.vv-light` on `<body>`). Every surface and text color must resolve correctly in both. Don't bolt light mode on at the end.
3. **Compose from the component specs.** Read `references/components.md` for buttons, inputs, cards, badges, nav, modals, tables, etc. Match the geometry and motion exactly — pill buttons, 360px-radius controls, the shared easing curve.
4. **Respect the density and layout rules** in `references/patterns.md`. Enterprise = information-dense and compact. This is not a spacious marketing layout.
5. **Drop in the ready-made files** in `assets/` (`tokens.css`, `tailwind.config.js`) rather than retyping values.
6. **Load `advertflair-ux-motion` for interaction and motion on every build.** It owns how much to animate, hit-target sizes, touch/mouse/keyboard behaviour on every device, and the UX laws; this skill owns colour, type, geometry and layout. Where the two differ on motion timing or target size, `advertflair-ux-motion` wins. Run its ship gate before calling a screen done. For an in-app AI helper or chat panel, load `advertflair-ai-chat-ui` as well.

If the project is plain HTML rather than React, the same tokens and CSS apply — Tailwind is the default target but the system is token-first and stack-portable.

## The non-negotiables (read before building)

These are the things that, if you get them wrong, immediately make an app look "off-brand." Everything else is guidance. The first four (type pairing, primary colour, accent gradient, control shape) are Advertflair's brand values: on a client build they are replaced by the Step 0 answers through the brand layer. The rest hold for every brand.

- **Type pairing is fixed:** `Urbanist` (weights 400–800) for headings, display, numbers, and UI chrome; `Inter` (weights 300–600) for body, paragraphs, and long-form. Load both from Google Fonts. Never substitute a system font stack as the primary face.
- **Primary brand color is indigo `#4934bc` (`--in`).** It carries interactivity, focus rings, links, and selected states.
- **The signature accent is the indigo→pink/amber gradient.** The primary call-to-action button uses `linear-gradient(135deg, var(--or), var(--wn))` (pink→amber), not a flat fill. This is the most recognizable VaultVue element.
- **Controls are pill-shaped.** Buttons and inputs use fully-rounded geometry (`border-radius: 360px` for buttons, `~17px` for single-line inputs). Cards/panels use `--r` (14px) / `--rs` (8px).
- **Panels are glassy.** Cards use a translucent surface + `backdrop-filter: blur(12px)` + the hairline `--br` border, not opaque flat boxes.
- **Motion follows the `advertflair-ux-motion` skill.** `--ease: cubic-bezier(.23, 1, .32, 1)` stays the signature curve for entrances and moves (it is `--ease-out` there); exits use `--ease-in`; durations come from the `--dur-*` tokens (100–300ms in app UI). Enterprise apps run at expression dial 1: no bounce, no overshoot. Don't invent ad hoc curves or durations.
- **The type scale is compact.** Enterprise UI runs 10–18px for most chrome and body; reserve larger sizes for page titles. Don't inflate to marketing-site sizes.

## Quick token reference

Full values, light + dark, are in `references/tokens.md`. The semantic set:

| Token | Role | Dark | Light |
|-------|------|------|-------|
| `--bg` | app background | `#08060f` | `#f6f6fb` |
| `--s1` | surface / cards | `#110e1c` | `#ffffff` |
| `--s2` | raised surface | `#1a1530` | `#f0edfa` |
| `--h` | hover surface | `#1e1a2e` | `#e9e5f7` |
| `--br` | hairline border | `rgba(255,255,255,.08)` | `rgba(17,13,38,.10)` |
| `--tx` | primary text | `#e2e8f0` | `#15121f` |
| `--lt` | secondary text | `#cbd5e1` | `#3c3750` |
| `--m` | muted text | `#94a3b8` | `#6a6580` |
| `--in` | primary / indigo | `#4934bc` | `#4934bc` |
| `--or` | accent / pink | `#fe2267` | `#fe2267` |
| `--wn` | warning / amber | `#ff9e02` | `#b45309`¹ |
| `--ok` | success / green | `#22c55e` | `#15803d`¹ |
| `--er` | error / red | `#ef4444` | `#dc2626`¹ |
| `--r` / `--rs` | radius lg / sm | `14px` / `8px` | same |
| `--ease` | motion curve | `cubic-bezier(.23,1,.32,1)` | same |

¹ Semantic colors are deepened in light mode so text/icons stay legible on white. As large fills with white text, the dark values also work — `references/tokens.md` documents the fill-vs-ink split.

## Reference files

- `references/tokens.md` — Complete token system: CSS custom properties for both modes, the Tailwind theme mapping, the theming mechanism, and accessibility/contrast notes. **Start here.**
- `references/components.md` — Component specs (buttons, inputs, cards, badges, nav/topbar, modals, tables, tabs, toasts) as React + Tailwind, with the exact geometry and states from VaultVue.
- `references/patterns.md` — Layout, density, spacing scale, motion, iconography, empty/loading states, and do/don't guidance.
- `assets/tokens.css` — Drop-in CSS file defining all variables for both modes. Import once at the app root.
- `assets/tailwind.config.js` — Tailwind preset that maps the tokens to utility classes (`bg-bg`, `text-tx`, `border-br`, `rounded-r`, etc.).
