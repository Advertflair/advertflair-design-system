# Layout, Density & Patterns — Enterprise Design System

How to assemble the tokens and components into screens that feel like the VaultVue family. Enterprise software is dense, fast, and keyboard-friendly — not a spacious marketing page.

## Spacing scale

Use a compact 4px-based scale. Default gaps are small.

```
4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 48
```

- Inside controls/cards: 6–12px.
- Between cards / grid gap: 10–16px.
- Section padding: 16–24px.
- Page gutters: 20–24px (not 64px+ like a landing page).

Grids: dashboards use `repeat(auto-fill, minmax(220px, 1fr))` for card walls; stat rows use fixed columns (`repeat(5,1fr)` → `repeat(3,1fr)` → `repeat(2,1fr)` as it narrows).

## Application shell

The standard layout is a three-zone app shell:

1. **Topbar** (sticky, ~52px) — workspace switcher, global search, notifications, avatar/menu.
2. **Left nav** (~220px, collapsible to icon rail) — role-aware sections.
3. **Content** — scrolls independently; its own sticky sub-header for page title + primary action + filters.

Right-side **drawers/sheets** are preferred over full-page navigation for detail views (e.g. opening a task, an asset, a record) so the user keeps context.

## Density & information hierarchy

- Lead with data, not chrome. Tables, boards, and card walls are the primary surfaces.
- One clear primary action per view (the gradient button). Everything else is ghost.
- Use color sparingly: surfaces are neutral; brand/semantic color marks *interactivity and status*, not decoration.
- Group with hairline `--br` dividers and `--s2` raised blocks rather than heavy boxes or drop shadows everywhere.

## Motion

- One curve everywhere: `cubic-bezier(.23,1,.32,1)`, ~`.3s` for surfaces (cards, modals, drawers), `.12–.15s` for micro-interactions (hover tints, stars, checks, focus rings).
- Entrances: fade + small translate (8px). Drawers slide from the edge. Don't bounce or overshoot beyond the easing curve.
- Respect `prefers-reduced-motion`: drop translices/scales, keep instant opacity changes.

## States — design them all

For every interactive surface, define: default, hover, focus (visible ring), active/selected, disabled, loading, empty, error.

- **Loading:** skeleton blocks using `--s2` with a subtle shimmer; never a bare spinner on a blank page for primary content.
- **Empty:** a centered, quiet message in `--m` + one primary action to create the first item. Keep it on-brand, not jokey.
- **Error:** inline near the cause, `--er` text + icon; destructive confirmations use a `danger` button in a modal.

## Dual-mode discipline

- Build and **review every screen in both modes** before calling it done. The fastest bug here is text that vanishes because it was hard-coded instead of using `--tx`/`--lt`/`--m`.
- Shadows differ by mode: colored indigo glow in dark, soft neutral in light (see `tokens.md` §7). Don't reuse dark glows on light surfaces — they look muddy.
- Images/media: provide a neutral `--bg` placeholder so thumbnails don't flash white in dark mode.

## Accessibility baseline

- WCAG AA contrast (see `tokens.md` §8). Never ship color-only status.
- Full keyboard operability: every action reachable by tab, visible focus, `Esc` closes overlays, arrow keys move within tables/boards/menus.
- Hit targets ≥ 24px (use `.btn-sm` as the floor for clickable controls; 32px default).
- Label every input; associate errors via `aria-describedby`.

## Do / Don't

**Do**
- Reference tokens for every color, radius, and easing.
- Pair Urbanist (display/numbers/chrome) with Inter (body).
- Keep one gradient primary action per view.
- Prefer drawers over page jumps for detail.
- Keep it dense and calm; let data be the visual interest.

**Don't**
- Hard-code hex values or one-off radii.
- Use marketing-scale type or whitespace.
- Scatter the pink/indigo accents as decoration.
- Mix in unrelated easing curves or shadow styles.
- Ship a screen that's only been checked in one color mode.
- Pull in the generic frontend-design / canvas / art skills for app UI — this system governs enterprise app builds.

## When to deviate

The system is a strong default, not a cage. If a specific product need conflicts (e.g. a data-viz surface needs a categorical palette beyond the semantic tokens, or a print/export view needs light-only), extend deliberately: add new tokens following the naming convention, keep them themeable, and document the addition rather than hard-coding around the system.
