# Recipes - React + Tailwind

Assumes `assets/motion.css` is imported and `assets/tailwind-motion-preset.js` is in the Tailwind config, alongside the `enterprise-design` preset. Colour classes (`bg-s1`, `text-tx`, `border-br`) come from `enterprise-design`; swap them for the project's own tokens elsewhere.

## Button with press, hover and loading

```tsx
export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      className="ux-press inline-flex min-h-control items-center justify-center gap-2 rounded-full px-4
                 transition-colors duration-fast ease-out hover:bg-h
                 disabled:opacity-50 disabled:pointer-events-none"
    >
      {loading && <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />}
      {children}
    </button>
  );
}
```

- Press feedback comes from `.ux-press` and works on touch and mouse.
- `min-h-control` is 32px with a mouse and 44px on touch, automatically.
- Show the loading state within 100ms of the click; keep the label so the button does not change width.

## Icon button with an extended hit area

```tsx
<button aria-label="Close" className="ux-hit ux-press grid size-6 place-items-center rounded-full">
  <X className="size-4" aria-hidden />
</button>
```

The icon stays 16px, the visible button 24px, and the tappable area is 44px on touch.

## Dropdown or popover (shadcn/ui, Radix)

```tsx
<DropdownMenuContent
  className="ux-pop origin-[var(--radix-dropdown-menu-content-transform-origin)]"
  data-instant={openedByKeyboard ? '' : undefined}
/>
```

Grows from its trigger in 150ms, closes in 100ms, and skips the entrance when opened from the keyboard.

## Modal on desktop, bottom sheet on phone

```tsx
<DialogOverlay className="ux-fade fixed inset-0 bg-black/50" />
<div className="fixed inset-0 z-50 grid place-items-end md:place-items-center pointer-events-none">
  <DialogContent
    className="ux-dialog ux-safe-bottom pointer-events-auto w-full bg-s1
               rounded-t-2xl md:w-[min(560px,calc(100vw-48px))] md:rounded-2xl"
  />
</div>
```

- `.ux-dialog` slides up as a sheet under 768px and fades and rises as a centred modal above it.
- Centre with the grid wrapper, not `translate(-50%, -50%)`: a centring transform would be overridden by the entrance animation and the panel would jump.
- Radix handles focus trap, Esc and focus return. Do not rebuild them.

## Right-side drawer for detail views

```tsx
<SheetContent side="right" className="ux-drawer-end fixed inset-y-0 end-0 w-[min(480px,100vw)] bg-s1" />
```

## Accordion

```tsx
<div className="ux-collapse" data-state={open ? 'open' : 'closed'}>
  <div>{children}</div>
</div>
```

## Staggered first load

```tsx
<ul className="ux-stagger grid gap-3">
  {items.map((item, i) => (
    <li key={item.id} style={{ '--i': i } as React.CSSProperties}>...</li>
  ))}
</ul>
```

Use it once, on first render. Do not key the list in a way that replays it on filter or sort.

## Toast

```tsx
<div role="status" className="ux-rise pointer-events-auto rounded-xl bg-s2 px-4 py-3">
  Saved
</div>
```

Minimum 5 seconds on screen, pause the timer on hover and focus, include an Undo action instead of a confirmation dialog where the action is reversible.

## Forgiving input (Postel)

```tsx
<input
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  enterKeyHint="next"
  className="min-h-control w-full rounded-[17px] px-3 text-base md:text-sm"
  onBlur={(e) => setPhone(normalisePhone(e.target.value))}
  aria-invalid={!!error}
  aria-describedby={error ? 'phone-error' : undefined}
/>
{error && <p id="phone-error" className="text-er text-sm">{error}</p>}
```

- Accept spaces, dashes, brackets and a leading plus; normalise on blur and again on the server with zod.
- `text-base` (16px) on phones stops iOS zooming; `md:text-sm` restores the compact size on desktop.
- Validate on blur or submit. Keep the value on error.

## Hover that does not stick on touch

```tsx
<article className="transition-transform duration-base ease-out hover:-translate-y-0.5">
```

With `hoverOnlyWhenSupported` in the preset, `hover:` only applies on devices that hover. In plain CSS wrap it in `@media (hover: hover) and (pointer: fine)`.

## Optimistic toggle (Doherty)

```tsx
const [optimisticOn, setOptimisticOn] = useOptimistic(on);
<Switch
  checked={optimisticOn}
  onCheckedChange={(next) => startTransition(async () => {
    setOptimisticOn(next);
    await saveSetting(next); // on failure React reverts; show a toast with Retry
  })}
/>
```

Only for fast, high-success, reversible actions. Never for payments or deletes.

## Motion library (only when CSS cannot do it)

```tsx
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';

<MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
  <LazyMotion features={domAnimation} strict>
    <m.div layout />
  </LazyMotion>
</MotionConfig>
```

Use for drag gestures, layout and shared-layout animation, springs (dial 3) and exit animations outside Radix. Check the installed Motion version before copying import paths.

## Keyboard-opened surfaces are instant

```tsx
const openedByKeyboard = useRef(false);
onKeyDown={() => (openedByKeyboard.current = true)}
onPointerDown={() => (openedByKeyboard.current = false)}
// then: data-instant={openedByKeyboard.current ? '' : undefined}
```

The command palette always renders with `data-instant`.
