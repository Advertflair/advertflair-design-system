# Every device and input

Design for the input method and the viewing distance, not for a list of device names. Detect capability with media queries; never sniff the user agent.

## 1. Capability queries

```css
@media (pointer: coarse) { /* finger: bigger targets, no hover */ }
@media (hover: hover) and (pointer: fine) { /* mouse or trackpad: hover, dense controls */ }
@media (any-pointer: coarse) { /* hybrid laptop with a touchscreen: keep targets generous */ }
@media (prefers-reduced-motion: reduce) { /* less motion */ }
@media (prefers-color-scheme: dark) { /* system theme */ }
@media (forced-colors: active) { /* Windows high contrast: do not rely on background colour or shadow */ }
```

With the Tailwind preset: `touch:` and `mouse:` variants, and `hover:` only applies where hover exists.

## 2. Phone (touch, one hand, roughly 320 to 430px wide)

- Targets 44 by 44 CSS px minimum, 48 for primary actions, 8px apart.
- Primary action in the bottom third, full width, above the safe area. Top corners are the hardest area to reach.
- Bottom sheet instead of centred modal or side drawer. Drag down to dismiss, plus a visible close button.
- Bottom tab bar (3 to 5 items) or a menu drawer instead of a side nav.
- Tables become stacked cards, or scroll horizontally with a sticky first column.
- Press feedback on `:active`. No hover. Tooltips become inline help text or a tap target.
- Inputs: 16px font minimum, correct `type`, `inputmode`, `autocomplete` and `enterkeyhint`; labels above fields; the keyboard must not cover the focused field or the submit button.
- Use `100dvh` and `env(safe-area-inset-*)`. Add `viewport-fit=cover` to the viewport meta tag.
- Respect system gestures: do not put swipe targets on the left and right screen edges (back gesture) or at the very bottom (home indicator).
- Performance: assume a mid-range phone. Fewer simultaneous animations, no large blurred layers animating, images sized for the device.

## 3. Tablet (touch, sometimes keyboard and trackpad, roughly 744 to 1366px)

- Treat as touch first: 44px targets stay.
- Use the width: two-pane layouts (list and detail), popovers anchored to their trigger instead of full-screen sheets.
- Support both orientations; the layout reflows, it does not lock.
- Because a trackpad may be attached, hover states can exist but nothing depends on them.

## 4. Desktop and laptop (mouse, trackpad, keyboard, 1024px and up)

- Controls 32px high by default, 24 by 24 minimum hit area, 8px apart.
- Hover states and tooltips (500ms delay). Right-click menus and drag and drop are accelerators with a visible alternative.
- Keyboard is a first-class input: logical tab order, visible focus, Esc closes, arrow keys inside menus, tabs, tables and grids, Cmd/Ctrl+K command palette, shortcuts shown in tooltips and menus.
- Detail views open in a right-side drawer so context is kept; dialogs are for decisions.
- Cap line length (60 to 80 characters for reading) and content width on very wide screens.
- Hybrid laptops with touchscreens: if `any-pointer: coarse` matches, keep critical targets at 44px.

## 5. Large screens, kiosks and TV

- Viewed from a distance: larger type and targets, higher contrast, generous spacing.
- Navigation is focus driven (remote or keyboard): a clear, large focus state and predictable up, down, left, right movement.
- Kiosks are touch: 48px and up, no hover, no reliance on a keyboard, idle reset.
- Avoid edge-to-edge content on TVs; keep a safe margin.

## 6. Breakpoints and layout

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

- Mobile first: base styles are the phone layout; add complexity upward.
- Must work at 320px wide without horizontal scrolling (tables and code are the exceptions and scroll inside their own container).
- Use container queries for components reused in slots of different widths (cards, panels, drawers).
- Fluid type and spacing with `clamp()` on marketing pages; fixed compact scale in enterprise apps.

## 7. Accessibility requirements that are device related (WCAG 2.2)

- Target size: 24 by 24 CSS px minimum (AA); we go to 44 on touch.
- Pointer gestures: every multi-point or path gesture has a single-tap alternative.
- Dragging: every drag has a non-drag alternative.
- Orientation: not locked unless essential.
- Reflow: usable at 320 CSS px wide and at 400 percent zoom.
- Text resize: 200 percent without loss of content.
- Focus visible, and focus not hidden behind sticky headers or bars.
- Motion: anything that moves for more than 5 seconds can be paused; no more than 3 flashes per second; honour `prefers-reduced-motion`.
- Announce loading, success and error with `role="status"` or `role="alert"` without moving focus.

## 8. Right-to-left and localisation

- Use logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`).
- Directional motion mirrors: a drawer from the inline end slides from the left in right-to-left layouts (`assets/motion.css` handles this).
- Leave room for text to grow by about 30 percent in translation; never fix button widths to the English label.

## 9. Test matrix (minimum before release)

| Check | How |
|---|---|
| 320, 375, 768, 1024, 1280, 1536px widths | browser responsive mode |
| Real touch | an actual phone, or device emulation with touch enabled |
| Keyboard only | unplug the mouse; complete the main journey |
| Reduced motion | OS setting or DevTools rendering emulation |
| Light and dark | both themes |
| Slow device | DevTools CPU 4x to 6x throttle, network Fast 4G |
| Zoom | browser zoom at 200 percent |
| Screen reader smoke test | VoiceOver or NVDA on the main journey |
| Safari iOS and Chrome Android | both; they differ on viewport units, safe areas and input zoom |
