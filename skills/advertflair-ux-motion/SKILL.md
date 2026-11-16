---
name: advertflair-ux-motion
description: Advertflair standard for interaction design, motion and UX laws on every device. Use whenever building, styling or reviewing any UI - buttons, forms, modals, drawers, menus, tables, navigation, toasts, loading states, hover and press feedback, transitions, animations, gestures, responsive or mobile layouts - even if the user never says "animation" or "UX". Covers the 12 animation principles adapted to UI, Fitts, Hick, Miller, Doherty, Postel and Jakob laws, the frequency-of-use rule, motion tokens, hit targets, and touch, mouse, keyboard, large-screen and reduced-motion behaviour. Pairs with enterprise-design (colour, type, layout) and advertflair-dev (code).
---

# Advertflair UX and Motion Standard

v1.0 | 2026-11-16 | review quarterly.

This skill decides how every Advertflair interface behaves and moves: how much to animate, how fast, how big targets are, how forgiving inputs are, and how it adapts to phone, tablet, desktop and large screens. It applies to every app, portal, showroom, tool page and marketing site we ship.

Ownership, so the skills never fight:
- `enterprise-design` owns colour, type, geometry and layout.
- `advertflair-dev` owns code structure, security and the loading-state thresholds.
- This skill owns interaction and motion. Where another skill gives a different duration, curve or hit-target size, this one wins.

Precedence: user instruction > repo AGENTS.md / CLAUDE.md > this skill > generic knowledge.

Files in this skill (all optional reading; this page is complete on its own):
- `references/principles.md` - the 20 principles in plain English, with when to use and when to skip.
- `references/devices.md` - phone, tablet, desktop, hybrid and large-screen rules in detail.
- `references/recipes.md` - copy-paste React + Tailwind code for common components.
- `assets/motion.css` and `assets/tailwind-motion-preset.js` - drop-in tokens and utilities.

## How to use this skill (in this order)

1. Set the expression dial for the product (section 2).
2. For each interaction, read its motion budget from how often it happens (section 1).
3. Build it from the recipe table (section 5) using the tokens (section 3). Never invent a duration or curve.
4. Apply the UX laws to layout, forms and choices (section 6).
5. Make it work for touch, mouse and keyboard at every width (section 7).
6. Run the ship gate (section 9) before calling any UI done.

Every animation must do one of four jobs: confirm an input, show cause and effect, keep the user oriented in space, or direct attention. If it does none of these, cut it.

## 1. Frequency of use sets the motion budget (the governing rule)

The more often a person triggers something, the less it should animate. Animation that delights on day one is friction on day thirty.

| How often | Examples | Budget |
|---|---|---|
| Constantly (100+ a day) | typing, keyboard shortcuts, command palette, table row navigation, tab switching, cell editing | No animation. Instant state change. At most a 100ms opacity change. |
| Often (tens a day) | hover, button press, dropdown, tooltip, toggle, checkbox, select | 100 to 150ms. Opacity, colour, small scale only. |
| Occasionally | modal, drawer, bottom sheet, toast, accordion, page change, filter panel | 200 to 300ms. Fade plus small movement. |
| Rarely | onboarding, first run, success moment, empty state, marketing hero, big reveal | Up to 400ms in product UI, up to 600ms on marketing pages. Expressive motion allowed if the dial permits. |

Hard rules that follow from this:
- Anything triggered from the keyboard is instant. No entrance animation on a command palette or shortcut-driven action.
- The same element opened repeatedly in a session never gets slower or more elaborate than its budget.
- When unsure which row applies, pick the faster one.

## 2. Expression dial (how much personality)

| Dial | Product type | What is allowed |
|---|---|---|
| 1 Restrained | enterprise apps, admin consoles, dashboards, data tables, internal tools, portals | Fades, small slides, press feedback. No bounce, no overshoot, no squash, no parallax. |
| 2 Polished | client-facing showrooms, catalogues, client portals, tool pages | Dial 1 plus gentle stagger, shared-element transitions, subtle hover lift on cards. |
| 3 Expressive | marketing sites, landing pages, consumer and mobile moments, celebrations | Dial 2 plus spring and overshoot, scroll-driven reveals, squash on playful elements. Still obeys the frequency budget. |

Default is dial 1 for anything with a login, dial 2 for anything a client's customer sees, dial 3 only for marketing. State the dial at the top of the build so the whole team uses the same one.

## 3. Motion tokens

Use these everywhere. `--ease-out` is the same curve as `--ease` in `enterprise-design`, so existing apps do not change feel.

```css
:root {
  --dur-instant: 100ms;  /* press, check, focus ring */
  --dur-fast: 150ms;     /* hover, tooltip, dropdown, toggle */
  --dur-base: 200ms;     /* popover, toast, accordion, small modal */
  --dur-slow: 300ms;     /* modal, drawer, bottom sheet */
  --dur-page: 400ms;     /* route change, large reveal: the ceiling in product UI */

  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);     /* entering, and the default */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);          /* leaving */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    /* moving from A to B while staying on screen */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* dial 3 only */

  --dist-sm: 4px;   /* tooltip, dropdown */
  --dist-md: 8px;   /* modal, toast, card */
  --dist-lg: 16px;  /* page or section reveal */
  --scale-press: 0.97;  /* pressed button */
  --scale-pop: 0.96;    /* popover or menu start scale */
  --stagger: 30ms;      /* per item, never more than 6 items or 200ms in total */
}
```

Rules:
- Entering uses `--ease-out`. Leaving uses `--ease-in` and runs one duration step faster than the entrance (a 300ms drawer closes in 200ms).
- Never use `linear` (except progress bars and spinners) and never use the browser default `ease`.
- Animate `transform` and `opacity` only. Not width, height, top, left, margin or box-shadow. One exception: accordion and collapse may animate `grid-template-rows` from `0fr` to `1fr`.
- Use CSS transitions for state changes so they can be interrupted and reversed mid-way. Keyframes only for entrances, loops and choreography.
- Motion never blocks input. The user can click, type or dismiss while something is still animating.
- Tooling order: CSS transitions, then View Transitions and scroll-driven CSS, then the Motion library (`motion/react`) only for gestures, layout animation, springs and exit animations.

## 4. The 12 animation principles, as UI rules

| # | Principle | What it means in our UI | Dial |
|---|---|---|---|
| 1 | Squash and stretch | Pressed controls compress slightly (`scale(.97)`) and return. Actual squash or stretch is for playful elements only. | press: all. squash: 3 |
| 2 | Anticipation | A hint before the action: hover state before click, button press before the modal opens, drag handle lifting before it moves. Never add a wind-up delay. | all |
| 3 | Staging | One thing moves at a time and it is the thing that matters. Dim the background behind a modal. Never animate two competing areas at once. | all |
| 4 | Pose to pose | Design the start state and the end state of every component, then let the browser interpolate. Every state (default, hover, focus, active, disabled, loading, empty, error) is designed, not improvised. | all |
| 5 | Follow through | Parts settle at slightly different times: a list staggers in, a drawer's content fades in just after the panel lands. Overshoot settle is dial 3. | stagger: 2+. overshoot: 3 |
| 6 | Slow in and slow out | Nothing starts or stops abruptly. Use the easing tokens. | all |
| 7 | Arcs | Things travel on natural paths and come from where they were triggered: a menu grows from its button (`transform-origin`), a thumbnail expands into its detail view. | origin: all. curved paths: 3 |
| 8 | Secondary action | A small supporting motion that reinforces the main one: a badge count ticks when an item is added, an icon rotates as an accordion opens. It never competes. | all, sparingly |
| 9 | Timing | Duration carries meaning. Small and near is fast, large and far is slower. Use the duration tokens and the frequency budget. | all |
| 10 | Exaggeration | Feedback must be noticeable. A state change the user cannot see has failed. Errors may shake (dial 2+); on dial 1 use colour plus icon plus text. | all |
| 11 | Solid drawing | One consistent depth model: page, raised surface, overlay, modal. Things higher up cast larger, softer shadows and appear above, never below. | all |
| 12 | Appeal | Consistency is the appeal. The same action looks and moves the same way everywhere in the product. | all |

## 5. Recipes (use these, do not improvise)

| Component | Enter | Exit | Notes |
|---|---|---|---|
| Button press | `scale(.97)` in 100ms | back in 150ms | On `:active`. Works for touch and mouse. |
| Hover | colour or surface tint, 150ms | 150ms | Only inside `@media (hover: hover) and (pointer: fine)`. Never the only way to reach something. |
| Focus ring | instant | instant | 2px ring, 2px offset, `:focus-visible`. Never animated, never removed. |
| Tooltip | fade + 4px, 100ms, after a 500ms hover delay | 100ms | Instant on keyboard focus. Next tooltip in the same group shows with no delay. |
| Dropdown, popover, menu | fade + `scale(.96)` to 1, 150ms, origin at the trigger | 100ms | Opened from keyboard: instant. |
| Toggle, checkbox, radio | 100 to 150ms | same | State change is visible within 100ms of the tap. |
| Tabs | content swaps instantly; the indicator slides 200ms | - | Never slide the whole panel in a dense app. |
| Accordion | `grid-template-rows` 0fr to 1fr, 200ms; chevron rotates | 150ms | Dial 1 may be instant in dense tables. |
| Toast | fade + 8px from its edge, 200ms | 150ms | Stays 5s minimum, pauses on hover and focus, announced with `role="status"`. |
| Modal, dialog | backdrop fade 200ms; panel fade + 8px rise, 200 to 300ms | 150 to 200ms | Focus moves in, is trapped, Esc closes, focus returns to the trigger. |
| Drawer, side sheet | slides from its edge, 300ms | 200ms | Desktop detail views. Content fades in 50ms after the panel. |
| Bottom sheet | slides up, 300ms | 200ms | Phone replacement for modals and drawers. Drag down to dismiss plus a visible close button. |
| List or grid load | fade + 8px, 200ms, 30ms stagger | - | First 6 items only; the rest appear together. Never on re-sort or filter. |
| Skeleton to content | cross-fade 150ms | - | Thresholds and sizing rules are in `advertflair-dev` section 4. |
| Page or route change | cross-fade 150 to 200ms | - | No slides between pages on desktop. Shared-element transitions on dial 2+. |
| Drag and drop | item lifts: `scale(1.02)` + larger shadow, 150ms | settles 200ms | Always provide a non-drag alternative (menu or buttons). |
| Error | field border + icon + message appear, 150ms | - | Shake (3 cycles, 4px, 300ms) only on dial 2+. Never colour alone. |
| Success | check icon draws or fades, 200 to 300ms | - | Celebrations only for rare, meaningful moments. |
| Number change | instant, tabular numerals | - | Count-up animation only on marketing pages. |

## 6. The UX laws, as build rules

**Fitts's law - big and close is fast.**
- The primary action is the largest target in the view and sits where the hand already is: bottom of the screen on phones, end of the form or top-right of the page header on desktop.
- Open menus and popovers at the cursor or trigger, not across the screen.
- Keep destructive actions away from the primary action and smaller than it.
- Screen edges and corners are easy targets with a mouse; use them for persistent controls.

**Bigger hit areas - the tappable zone is larger than the visible one.**
- Touch (`pointer: coarse`): at least 44 by 44 CSS px, 48 for primary actions.
- Mouse (`pointer: fine`): at least 24 by 24 CSS px, 32 default control height.
- At least 8px between neighbouring targets.
- Small icons get their hit area extended with padding or a pseudo-element (`.ux-hit` in `assets/motion.css`). The whole row, card or label is clickable, not only its text.

**Hick's law - more choices, slower decisions.**
- One primary action per view. Everything else is secondary or tucked in a menu.
- No more than 7 top-level navigation items. More than about 10 options in a list becomes a searchable combobox.
- Use sensible defaults and progressive disclosure: show the common path, hide advanced options behind "More".
- Break long tasks into steps with one decision per step.

**Miller's law - people hold only a few things in mind.**
- Chunk content: form sections of 3 to 5 fields, grouped table columns, formatted numbers (cards, phones, IDs).
- Never make the user remember something from a previous screen. Carry it forward and show it.
- This is about memory, not a rule that every menu must have seven items.

**Doherty threshold - respond within 400ms.**
- Every input gets visible acknowledgement within 100ms (press state, focus, spinner on the button).
- If the result takes longer than 400ms, show progress. Use optimistic updates for fast, safe actions.
- Loading patterns by wait time are defined in `advertflair-dev` section 4; follow them.

**Postel's law - accept anything reasonable, output one clean format.**
- Accept phone numbers, dates, card numbers and codes in any common format; trim spaces; ignore case where it does not matter. Normalise on the server.
- Never block paste. Never clear a form on error. Keep what the user typed.
- Validate on blur or submit, not on every keystroke. Say what is wrong and how to fix it.
- What we display is strict and consistent: one date format, one number format, one terminology.

**Jakob's law - people expect your product to work like the ones they already use.**
- Follow platform and web conventions: logo goes home, search at the top, account top-right, Esc closes overlays, Cmd/Ctrl+K opens the command palette, swipe back on iOS, underlined or coloured links.
- Use native controls on mobile (date pickers, selects, keyboards) unless there is a strong reason not to.
- Do not reinvent scrollbars, selection, or the back button. Novelty goes into the content, not the controls.

**Frequency of use** - section 1.

## 7. Every device and input

Design for the input, not the screen size. A laptop can have a touchscreen; a tablet can have a mouse.

| Input | Detect with | Rules |
|---|---|---|
| Touch | `@media (pointer: coarse)` | 44px targets, press state on `:active`, no reliance on hover, primary actions within thumb reach (bottom third), bottom sheets instead of centred modals, `touch-action: manipulation`. |
| Mouse or trackpad | `@media (hover: hover) and (pointer: fine)` | Hover states, tooltips, denser 32px controls, right-click and drag are extras, never the only path. |
| Keyboard | always supported | Everything reachable by Tab in a logical order, visible `:focus-visible` ring, Esc closes, arrows move inside menus, tables and tabs, Enter and Space activate. Keyboard actions are instant. |
| Large screen, kiosk, TV | wide viewport, distant viewer | Bigger type and targets, focus-driven navigation, cap content width, no hover dependence. |

Layout and platform rules:
- Mobile first. Works from 320px wide with no horizontal scroll. Tailwind breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. Use container queries for components that live in different-width slots.
- Use `100dvh`, not `100vh`. Pad fixed bars with `env(safe-area-inset-*)` and set `viewport-fit=cover`.
- Form inputs are at least 16px font size on phones (smaller makes iOS zoom the page). Set `inputmode`, `autocomplete` and `enterkeyhint` on every field.
- Every gesture (swipe, pinch, drag, long-press) has a visible button alternative.
- Works in portrait and landscape. Text can scale to 200 percent without breaking. Use logical properties (`inline-start`, `inline-end`) so directional motion mirrors in right-to-left languages.
- Phone pattern swaps: modal becomes bottom sheet, side nav becomes bottom tab bar or drawer, table becomes cards or a horizontally scrollable table with a sticky first column, hover menu becomes tap menu.
- Budget for slow devices: test animations at 4 to 6x CPU throttle. If it drops frames, simplify it.

Reduced motion (`prefers-reduced-motion: reduce`): less, not none. Keep opacity fades and colour changes; remove slides, scales, parallax, stagger and anything that loops. Also provide a pause control for any motion that runs longer than 5 seconds, and never flash more than 3 times a second.

## 8. Anti-patterns (reject in review)

- Animation on something used constantly, or on any keyboard-triggered action.
- Durations over 400ms in product UI, or made-up values like 250ms or 350ms.
- Bounce or overshoot in an enterprise app.
- Functionality that only appears on hover.
- Icon buttons smaller than the hit-area minimum, or targets packed with no gap.
- Entrance animation replayed on every re-render, filter or sort.
- Animating layout properties, or many elements animating at once.
- Spinners with no label on a blank page; skeletons that do not match the final layout.
- Inputs that reject pasted or formatted values, or forms that clear on error.
- Custom controls that ignore platform conventions (custom scrollbars, hijacked back button, scroll-jacking).
- Colour as the only signal for state.

## 9. Ship gate (all must pass)

- [ ] Dial stated, and every animation within its frequency budget.
- [ ] Only token durations and curves; only `transform` and `opacity` animated.
- [ ] Every input acknowledged within 100ms; anything over 400ms shows progress.
- [ ] Every interactive element has default, hover, focus, active, disabled, loading and error states.
- [ ] Hit targets: 44px on touch, 24px minimum on mouse, 8px gaps.
- [ ] One primary action per view; destructive actions separated and confirmed.
- [ ] Forms accept pasted and loosely formatted input, keep values on error, and explain errors in text.
- [ ] Fully usable by keyboard alone, with a visible focus ring and focus returned after overlays close.
- [ ] Nothing depends on hover or on a gesture without a button alternative.
- [ ] Checked at 320px, 768px and 1280px+, in portrait and landscape, with safe areas respected.
- [ ] Checked on a real phone or a touch emulator, not only a resized desktop window.
- [ ] `prefers-reduced-motion` handled; light and dark themes both checked.
- [ ] Smooth at 4x CPU throttle.
