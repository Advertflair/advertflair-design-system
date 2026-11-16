# Component Specs — Enterprise Design System

Geometry, color, and motion taken directly from VaultVue. Examples are React + Tailwind (assuming the `assets/tailwind.config.js` preset), with the raw CSS shown where the values are load-bearing. All components must resolve in both color modes via the tokens — no hard-coded hex.

Shared rules:
- Transition: `transition: all .3s var(--ease)` (Tailwind: `transition-all duration-300 ease-ease`). Fast micro-interactions (stars, checks) may use `.12s`.
- Borders: always `--br`. Focus: `box-shadow: 0 0 0 2px var(--in)`.
- Text uses `--tx` / `--lt` / `--m` by emphasis.

---

## Buttons

Base button is a **pill**, 32px tall, 11.5px Urbanist/Inter, ghost (transparent) by default with a hairline border. Variants change fill only.

```css
.btn{
  height:32px; padding:0 14px; border-radius:var(--r-control, 360px);
  border:1px solid var(--br); background:transparent; color:var(--lt);
  font-size:11.5px; font-weight:500; display:flex; align-items:center; gap:5px;
  white-space:nowrap; transition:all .3s var(--ease); cursor:pointer;
}
.btn:hover{ background:var(--h); color:var(--tx); }
.btn:focus-visible{ box-shadow:0 0 0 2px var(--in); outline:none; }

/* Primary — the signature gradient CTA. Keep label >=14px / weight >=600 for AA. */
.btn-p{ background:linear-gradient(135deg,var(--or),var(--cta-to, var(--wn))); border-color:transparent;
        color:var(--on-cta, #fff); font-size:14px; font-weight:600; }
/* Solid semantic — use the deepened *-fill tokens so white text stays AA (not the bright badge colors) */
.btn-g{ background:var(--ok-fill); border-color:var(--ok-fill); color:#fff; }   /* go / approve */
.btn-r{ background:var(--er-fill); border-color:var(--er-fill); color:#fff; }   /* destructive */
/* Indigo solid (alt primary) */
.btn-in{ background:var(--in); border-color:var(--in); color:#fff; }

.btn-sm{ height:24px; padding:0 7px; font-size:10px; }   /* compact / table rows */
.btn-lg{ height:38px; padding:0 18px; font-size:13px; }
.btn:disabled{ opacity:.5; cursor:not-allowed; }
```

```jsx
function Button({ variant = 'ghost', size, className = '', ...props }) {
  const v = {
    ghost: 'bg-transparent border border-br text-lt hover:bg-h hover:text-tx',
    primary: 'border-transparent text-[color:var(--on-cta,#fff)] bg-[linear-gradient(135deg,var(--or),var(--cta-to,var(--wn)))]',
    indigo: 'bg-in border border-in text-white',
    success: 'bg-ok border border-ok text-white',
    danger: 'bg-er border border-er text-white',
  }[variant];
  const s = size === 'sm' ? 'h-6 px-[7px] text-[10px]'
          : size === 'lg' ? 'h-[38px] px-[18px] text-[13px]'
          : 'h-8 px-[14px] text-[11.5px]';
  return (
    <button
      className={`inline-flex items-center gap-[5px] rounded-pill font-medium whitespace-nowrap
                  transition-all duration-300 ease-ease focus-visible:shadow-[0_0_0_2px_var(--in)]
                  disabled:opacity-50 disabled:cursor-not-allowed ${v} ${s} ${className}`}
      {...props}
    />
  );
}
```

Usage: **one** primary (gradient) action per view. Approvals use `success`, destructive uses `danger`, everything else is ghost. Indigo solid is the alternate primary when a gradient would be too loud (e.g. dense toolbars).

---

## Inputs & form controls

Single-line inputs are pills; multiline uses `--rs`. Inputs sit on `--bg` in dark mode (a recessed look) and on `--s1` with a border in light mode.

```css
.inp{
  width:100%; height:34px; border-radius:17px;
  background:var(--bg); border:1px solid var(--br);
  color:var(--tx); font-size:12px; padding:0 14px; outline:none;
  transition:all .15s var(--ease);
}
.inp::placeholder{ color:var(--m); }
.inp:focus{ border-color:var(--in); box-shadow:0 0 0 2px rgba(73,52,188,.25); }
.inp.with-icon{ padding-left:34px; }   /* search etc. */

.textarea{
  width:100%; min-height:60px; border-radius:8px;
  background:var(--s1); border:1px solid var(--br);
  color:var(--tx); font-size:13px; padding:8px 10px; resize:none;
  font-family:'Inter',sans-serif;
}
/* Underline input — used for large inline/title fields */
.inp-line{
  width:100%; padding:16px 0; background:transparent; border:none;
  border-bottom:1px solid var(--br); color:var(--tx); font-size:16px; outline:none;
}
.inp-line:focus{ border-bottom-color:var(--in); }

label{ font-size:11px; color:var(--lt); font-weight:500; display:block; margin-bottom:6px; }
```

Checkbox/radio: 18px box, `--rs`/round, border `rgba(255,255,255,.5)` on dark; checked fills `--in`. Toggle: pill track, `--m` off / `--in` on.

---

## Cards & panels (glassy)

The defining surface. Translucent, blurred, hairline border, large radius.

```css
.card{
  background:color-mix(in srgb, var(--s1) 60%, transparent);  /* dark: rgba(17,14,28,.6) */
  backdrop-filter:blur(12px);
  border:1px solid var(--br); border-radius:var(--r);
  overflow:hidden; transition:all .3s var(--ease); position:relative;
}
.card:hover{ border-color:rgba(73,52,188,.4); box-shadow:var(--sh-1); }
.card-body{ padding:10px; }
.card-title{ font-size:11.5px; font-weight:600; color:var(--tx); line-height:1.3;
  font-family:'Urbanist',sans-serif; }
```

In light mode `--s1` is `#ffffff`; keep the blur and border for the same physicality (the translucency reads as a subtle frost over the page bg). Media thumbnails inside cards sit on `--bg`.

---

## Badges, chips & status

```css
.badge{
  display:inline-flex; align-items:center; gap:4px;
  height:18px; padding:0 8px; border-radius:360px;
  font-size:9.5px; font-weight:600; font-family:'Urbanist',sans-serif;
  letter-spacing:.02em;
}
/* tinted badge: colored text on a low-alpha wash of the same color */
.badge-ok{ color:var(--ok); background:color-mix(in srgb,var(--ok) 14%,transparent); }
.badge-wn{ color:var(--wn); background:color-mix(in srgb,var(--wn) 16%,transparent); }
.badge-er{ color:var(--er); background:color-mix(in srgb,var(--er) 14%,transparent); }
.badge-in{ color:var(--in); background:color-mix(in srgb,var(--in) 16%,transparent); }

/* status dot */
.dot{ width:6px; height:6px; border-radius:50%; }   /* bg = semantic token */
```

Use tinted badges (text + wash) for inline status; use solid fills with white text only for high-emphasis pills (e.g. a count, a "LIVE" flag with `box-shadow:0 0 8px rgba(254,34,103,.4)` glow on dark).

---

## Topbar & navigation

- **Topbar:** sticky, height ~52px, background `--s1` (or a `90deg` gradient fading `--bg`→transparent on hero pages), bottom border `--br`, contains workspace switcher (left), search (center, pill `.inp.with-icon`), notifications bell + avatar (right).
- **Sidebar / nav:** background `--s1`, items are 32px rows, `--rs` radius, `--lt` text; hover → `--h` + `--tx`; **active** → `--s2` background with a 2px `--in` left indicator and `--tx` text. Section labels in `--m`, 10px, uppercase, Urbanist.
- The portal/nav shown is chosen at runtime from `user.role` — design nav as data-driven, not hard-coded per build.

---

## Modals & sheets

```css
.overlay{ position:fixed; inset:0; background:rgba(0,0,0,.6); backdrop-filter:blur(2px); }
.modal{
  background:var(--s1); border:1px solid var(--br); border-radius:var(--r);
  box-shadow:var(--sh-2);   /* dark: includes indigo glow */
  max-width:560px; width:100%;
}
.sheet{ /* right-side drawer */
  background:var(--s1); border-left:1px solid var(--br);
  box-shadow:-8px 0 32px rgba(0,0,0,.4);
}
```

Header: Urbanist 600, 15–16px. Footer: actions right-aligned, primary gradient button last. Animate in with `--ease` (fade + 8px rise for modals, slide for sheets).

---

## Data tables

Enterprise apps live in tables — get these right.

- Header row: `--s2` background, `--m` text, 10.5px Urbanist 600 uppercase, sticky.
- Body rows: 36–40px tall, `--br` bottom divider, `--tx` text 12px; hover → `--h`.
- Selected row: `--s2` + 2px `--in` left border.
- Numeric columns: right-aligned, `tabular-nums`, Urbanist 600.
- Inline actions appear on row hover, using `.btn-sm` ghost buttons.
- Zebra striping is optional and subtle (`color-mix(--s1 50%, transparent)`); prefer dividers over stripes for density.

---

## Tabs, toasts, tooltips

- **Tabs:** ghost text `--lt`; active tab gets `--tx` text + a 2px `--in` underline. Pill-style tab groups sit in a `--s2` track with the active pill filled `--s1`.
- **Toasts:** bottom-center or top-right, `--s1` surface, `--br` border, `--sh-pop`, 4px left accent in the semantic color, auto-dismiss ~4s. Login pattern: one-shot unread-notifications toast.
- **Tooltips:** `--s2` bg, `--tx` text 10.5px, `--rs` radius, small `--sh-pop`.

---

## Iconography & imagery

- Line icons, ~1.5–2px stroke, sized 14–18px in chrome. Lucide-react is the default set (already used across the family). Tint with `currentColor` so they inherit token text colors.
- Avatars: circular, fall back to initials on an `--in`/`--or` gradient.
- Media/thumbnails: `--bg` placeholder, `--rs` corners inside cards.
