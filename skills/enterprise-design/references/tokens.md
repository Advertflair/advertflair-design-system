# Design Tokens — Enterprise Design System

This is the foundation. Wire these in before building anything. Values are taken directly from VaultVue (`frontend.html`, `client.html`, `portal.html`, `admin.html`, `settings-theme.js`) so new apps match the shipping product, with a light mode derived for full parity.

## 1. The semantic token set

Tokens are deliberately terse (matching VaultVue's source) but each has one job. Always reference the token, never the raw value — that's what keeps every app in the family.

| Token | Meaning | When to use |
|-------|---------|-------------|
| `--bg` | Application background | The deepest layer; page/body, input fields in dark mode |
| `--s1` | Surface 1 | Cards, panels, sidebars — the primary content surface |
| `--s2` | Surface 2 (raised) | Popovers, menus, raised/active rows, secondary panels |
| `--h`  | Hover surface | Row/item hover, ghost-button hover |
| `--br` | Hairline border | All 1px borders and dividers (translucent on purpose) |
| `--tx` | Primary text | Headings, primary copy, high-emphasis values |
| `--lt` | Secondary text | Labels, secondary copy, button text on ghost buttons |
| `--m`  | Muted text | Placeholders, timestamps, captions, disabled |
| `--in` | Primary / indigo | Interactivity: focus rings, links, selected, primary actions |
| `--or` | Accent / pink | The signature accent; primary-CTA gradient start, highlights |
| `--wn` | Warning / amber | Warnings, the primary-CTA gradient end, "needs attention" |
| `--ok` | Success / green | Success states, approvals, positive deltas |
| `--er` | Error / red | Errors, destructive actions, rejections |
| `--r`  | Radius large | Cards, panels, modals — `14px` |
| `--rs` | Radius small | Inner elements, chips, small controls — `8px` |
| `--ease` | Motion easing | All transitions — `cubic-bezier(.23,1,.32,1)` |

Buttons and single-line inputs override radius to a full pill (`360px` / `17px`) — see `components.md`.

## 2. Dark mode (default, authoritative)

These are the exact VaultVue values.

```
--bg:  #08060f;
--s1:  #110e1c;
--s2:  #1a1530;
--h:   #1e1a2e;
--br:  rgba(255,255,255,0.08);
--tx:  #e2e8f0;
--lt:  #cbd5e1;
--m:   #94a3b8;
--in:  #4934bc;
--or:  #fe2267;
--wn:  #ff9e02;
--ok:  #22c55e;
--er:  #ef4444;
--r:   14px;
--rs:  8px;
--ease: cubic-bezier(0.23, 1, 0.32, 1);
```

## 3. Light mode (full parity)

Derived to mirror the dark semantics: a cool near-white base, white content surfaces, faint indigo-tinted raised surfaces, dark indigo-leaning text. Brand hues (`--in`, `--or`) are unchanged so identity carries across modes; the three remaining semantic colors are deepened so icons/text on white pass WCAG AA.

```
--bg:  #f6f6fb;
--s1:  #ffffff;
--s2:  #f0edfa;
--h:   #e9e5f7;
--br:  rgba(17,13,38,0.10);
--tx:  #15121f;
--lt:  #3c3750;
--m:   #6a6580;
--in:  #4934bc;
--or:  #fe2267;
--wn:  #b45309;   /* amber-ink; fill use can keep #ff9e02 with dark text */
--ok:  #15803d;   /* green-ink; fill use can keep #22c55e with white text */
--er:  #dc2626;
--r:   14px;
--rs:  8px;
--ease: cubic-bezier(0.23, 1, 0.32, 1);
```

### Fill vs. ink for semantic colors

In dark mode, semantic colors appear as saturated **fills** with white text (`.btn-g`, status dots, badges). In light mode the same saturated fill still works *with white text*, but the color as **text/icon on a white surface** needs to be darker to be readable. So:

- **As a fill with white text** (badge background, solid button): the brighter dark-mode value is fine in both modes — `--ok #22c55e`, `--er #ef4444`, `--wn #ff9e02`.
- **As ink** (colored text, icons, thin outlines on `--bg`/`--s1`): use the deepened light-mode value above.

If you only want one variable per color, ship the deepened values in light mode (as in the block above) and lighten the *background tint* behind them (e.g. `--ok` text on a `rgba(21,128,61,.08)` chip). `components.md` shows this for status badges.

## 4. Theming mechanism

VaultVue flips modes by setting an attribute on the root and a class on the body (`settings-theme.js`). Reuse the same contract so shared CSS keeps working:

```css
/* tokens.css — see assets/tokens.css for the full file */
:root,
[data-color-mode="dark"] { /* dark values */ }

[data-color-mode="light"] { /* light values */ }
```

```js
// Apply a mode
function applyColorMode(mode) {
  const resolved = mode === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-color-mode', resolved);
  document.body.classList.toggle('vv-light', resolved === 'light');
  document.body.classList.toggle('vv-dark', resolved !== 'light');
}
```

- Persist the choice (VaultVue caches `vv:prefs` in `localStorage` and reads the authoritative value from `/api/settings/me`). In a React app, lift this into a `ThemeProvider` / context.
- Apply the cached mode synchronously on first paint to avoid a flash of the wrong theme.
- Default mode: **dark**. Honor `prefers-color-scheme` only on first run if the user has no saved preference.

## 5. Tailwind theme mapping

Tokens drive Tailwind via CSS variables so utilities resolve per-mode automatically. See `assets/tailwind.config.js`. Summary of the mapping:

```
colors: {
  bg: 'var(--bg)', s1: 'var(--s1)', s2: 'var(--s2)', h: 'var(--h)',
  tx: 'var(--tx)', lt: 'var(--lt)', m: 'var(--m)',
  in: 'var(--in)', or: 'var(--or)', wn: 'var(--wn)',
  ok: 'var(--ok)', er: 'var(--er)',
  br: 'var(--br)',
},
borderColor: { DEFAULT: 'var(--br)', br: 'var(--br)' },
borderRadius: { r: 'var(--r)', rs: 'var(--rs)', pill: '360px' },
fontFamily: {
  display: ['Urbanist','sans-serif'],
  sans: ['Inter','sans-serif'],
},
transitionTimingFunction: { ease: 'cubic-bezier(.23,1,.32,1)' },
```

Then: `bg-bg`, `bg-s1`, `text-tx`, `text-m`, `border-br`, `rounded-r`, `rounded-pill`, `font-display`, `ease-ease`, etc.

## 6. Typography scale

Compact, enterprise-dense. Pull sizes from this scale rather than inventing values.

| Use | Size | Family / weight |
|-----|------|-----------------|
| Page title | 18–22px | Urbanist 700–800 |
| Section heading | 15–16px | Urbanist 600–700 |
| Card title / strong label | 11.5–13px | Urbanist 600 / Inter 500 |
| Body | 12–13px | Inter 400 |
| Secondary / label | 11–12px | Inter 400–500, color `--lt`/`--m` |
| Caption / meta | 8–10.5px | Inter 400, color `--m` |
| Numeric / data | tabular, Urbanist 600 | use `font-variant-numeric: tabular-nums` |

Line-height ~1.3 for dense UI text, ~1.5 for paragraphs.

## 7. Elevation / shadow

Dark mode uses deep shadows often paired with a faint indigo glow (`--in` at low alpha). Light mode uses soft neutral shadows only (no glow).

```
/* dark */
--sh-1: 0 8px 24px rgba(0,0,0,.4);
--sh-2: 0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(73,52,188,0.06);  /* modal/glow */
--sh-pop: 0 8px 24px rgba(0,0,0,.5);

/* light */
--sh-1: 0 1px 3px rgba(17,13,38,.08), 0 4px 12px rgba(17,13,38,.06);
--sh-2: 0 12px 40px rgba(17,13,38,.14);
--sh-pop: 0 6px 20px rgba(17,13,38,.12);
```

## 8. Accessibility notes (verified contrast)

Target WCAG AA: 4.5:1 for normal text, 3:1 for large/bold text and UI boundaries. The numbers below are measured against the token values in this file.

**Text tokens — pass AA comfortably in both modes:**

| Pair | Dark | Light |
|------|------|-------|
| `--tx` on `--bg` / `--s1` | 16.3 / 15.4 | 17.1 / 18.5 |
| `--lt` on `--bg` / `--s1` | 13.6 / 12.8 | 10.5 / 11.3 |
| `--m` on `--bg` / `--s1` | 7.9 / 7.4 | 5.2 / 5.6 |

Use `--tx`/`--lt`/`--m` freely for text in either mode.

**Indigo text/links:** `--in` (#4934bc) is only **2.3:1 as text on dark surfaces** — do not use it for small text or links in dark mode. Use **`--in-2`** (a lightened indigo) for indigo text/links on dark; on light, `--in` is 8.4:1 and fine. `--in` remains correct everywhere for *fills, borders, and focus rings*.

**Semantic colors — fill vs. ink (this is the important one):**
- As **text/icons on a surface**: the light-mode "ink" values (`--ok #15803d`, `--er #dc2626`, `--wn #b45309`) pass AA. The bright dark-mode values (`--ok #22c55e`, `--er #ef4444`, `--wn #ff9e02`) are great as ink **on dark** (`--ok` 8.4, `--er` 5.1, `--wn` 9.2 on `--s1`).
- As a **solid button fill with white text**: white on bright `--ok #22c55e` is only **2.3:1 (fails)**, and white on `--or`/`--er` is ~3.7 (large-text only). So solid success/danger buttons must use the deepened **`--ok-fill` / `--er-fill`** tokens (white text → ~5:1 AA) rather than the bright badge colors. The bright values are for dots, glows, and tinted badges (colored text on a low-alpha wash), where they pass.

**Primary CTA gradient (`--or`→`--wn`):** white text over the pink end is ~3.7:1 — only AA for *large* text. Keep CTA label text ≥14px and weight ≥600, or it won't meet AA. (VaultVue's 11.5px button text is below this bar; new builds should size the primary CTA up.)

**Always:**
- Focus visible: `box-shadow: 0 0 0 2px var(--in)` (or `0 0 0 3px rgba(73,52,188,.4)` on dark). Never remove focus rings.
- Never encode meaning in color alone — pair status colors with an icon or label.
