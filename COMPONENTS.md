# Components

The Advertflair UI is built on **shadcn/ui** (Radix primitives + `class-variance-authority`), themed entirely by the tokens in `advertflair-design-system.css`. Every component reads semantic tokens (`bg-primary`, `text-muted-foreground`, `border-ring`, etc.), so it inherits light/dark and the brand palette with zero extra config.

## What's in the repo

The most-used primitives are vendored under `components/ui/` as live, version-locked copies of what runs on the site:

`button` · `input` · `textarea` · `label` · `badge` · `switch` · `toggle` · `checkbox` · `progress` · `separator` · `skeleton` · `aspect-ratio` · plus the `utils.ts` (`cn()` helper) and `use-mobile.ts` hook they depend on.

## Full component set (46)

These are the components used across the Advertflair sites. The ones not yet vendored are stock shadcn — install them with one command (below) and they'll theme automatically against this repo's CSS.

| | | | |
|---|---|---|---|
| accordion | alert | alert-dialog | aspect-ratio ✓ |
| avatar | badge ✓ | breadcrumb | button ✓ |
| calendar | card | carousel | chart |
| checkbox ✓ | collapsible | command | context-menu |
| dialog | drawer | dropdown-menu | form |
| hover-card | input ✓ | input-otp | label ✓ |
| menubar | navigation-menu | pagination | popover |
| progress ✓ | radio-group | resizable | scroll-area |
| select | separator ✓ | sheet | sidebar |
| skeleton ✓ | slider | sonner | switch ✓ |
| table | tabs | textarea ✓ | toggle ✓ |
| toggle-group | tooltip | | |

`✓ = vendored in this repo. Unmarked = install via CLI.`

## Install the rest in one command

```bash
# point your project at this repo's config first (components.json is included)
npx shadcn@latest add accordion alert alert-dialog avatar breadcrumb calendar \
  card carousel chart collapsible command context-menu dialog drawer \
  dropdown-menu form hover-card input-otp menubar navigation-menu pagination \
  popover radio-group resizable scroll-area select sheet sidebar slider \
  sonner table tabs toggle-group tooltip
```

## Dependencies

```bash
npm install \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress \
  @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot \
  @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle \
  @radix-ui/react-toggle-group @radix-ui/react-tooltip \
  class-variance-authority clsx tailwind-merge lucide-react motion \
  cmdk vaul sonner recharts react-resizable-panels react-hook-form \
  react-day-picker next-themes input-otp embla-carousel-react
```

## Notes

- **Imports are flat/relative** in the vendored files (`import { cn } from "./utils"`), matching the Figma Make export convention. If you prefer `@/` path aliases, adjust `components.json` and the import lines.
- **Brand components** (`shiny-cta`, `pill-button`, `card`, `glass-card`, `pipeline-card-sweep`) are plain CSS classes in `advertflair-design-system.css` — not React components — so they work in any framework. See `PATTERNS.md` for usage.
