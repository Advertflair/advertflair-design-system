# Branding a build for a client

The design system is one structure with a swappable brand layer. Layout, spacing, components, motion and accessibility stay the same for every client. Colours, fonts and corner shape come from one file.

## 1. Ask these before building

1. **Brand:** Advertflair, a named client, or neutral white-label?
2. **Colours:** primary brand colour (hex). Primary button solid or a two-colour gradient? Any secondary accent?
3. **Fonts:** heading and body families (Google Fonts name, or licensed files the client supplies). Or keep Urbanist + Inter.
4. **Shape and theme:** pill, rounded or square controls. Light default, dark default, or both. Light is the default for client-facing work.
5. **Source to match:** logo, brand guide or existing site.

The `enterprise-design` skill asks the same questions as its Step 0, so Claude will ask them when a build starts.

## 2. Apply the answers

1. Copy `brand/client-brand.css` to `brand/<client>.css`.
2. Edit only section 1 (brand inputs).

   | Input | Answer it comes from |
   |---|---|
   | `--brand-primary`, `--brand-on-primary` | primary colour, and white or near-black text on it |
   | `--brand-primary-on-dark`, `--brand-on-primary-on-dark` | a lighter tint of the primary for dark mode |
   | `--brand-cta-from`, `--brand-cta-to`, `--brand-on-cta` | primary button; set both to the same colour for a solid button |
   | `--brand-font-heading`, `--brand-font-body` | fonts |
   | `--brand-radius`, `--brand-radius-control` | shape |

3. Load the client's fonts in the app (Google Fonts link, `next/font`, or self-hosted files).
4. Import the brand file last, after the design-system CSS, enterprise tokens, `motion.css` and `ai-chat.css`.
5. Run the contrast check and fix anything that fails:

   ```bash
   node brand/check-contrast.mjs --primary '#0b3d2e' --on-primary '#ffffff' \
     --cta-from '#0b3d2e' --cta-to '#14532d' --on-cta '#ffffff' \
     --primary-on-dark '#6ee7b7' --on-primary-on-dark '#111111'
   ```

6. Check every screen in light and dark, and on a phone.
7. Write the answers into the project README so nobody asks twice.

If a client or admin picks the colour at runtime, use `applyBrand()` from `components/ai-chat/brand.ts` for the AI helper; it refuses a colour that text cannot sit on.

## 3. What the brand layer changes

- Website and shadcn tokens: `--primary`, `--ring`, sidebar primary, `--af-purple`, `--af-pink`, `--af-orange`, `--radius`
- Enterprise app tokens: `--in`, `--in-2`, `--or`, plus `--cta-to`, `--on-cta`, `--font-display`, `--font-body`, `--r-control`
- AI chat tokens: `--ai-accent`, `--ai-on-accent`, `--ai-orb`, `--ai-font`
- Heading and body fonts everywhere
- Gradient, pill-button, focus and glow classes that hard-code the Advertflair colours

## 4. What never changes

- Spacing, density, layout shell, component anatomy and states
- Semantic colours: success, warning and error mean the same in every brand
- Motion and hit targets (`skills/advertflair-ux-motion`)
- Lucide icons, no emojis
- Accessibility: 4.5:1 for text, 3:1 for outlines and icons, visible focus, keyboard support

## 5. Rules

- One accent. Do not introduce a second brand colour for secondary buttons or headers.
- A light brand colour (yellow, mint) can be the primary with dark text on it, but cannot be used as text on a white surface. Use a darker variant for links.
- Dark mode usually needs a lighter tint of the primary. Set `--brand-primary-on-dark`.
- Known exception: Advertflair's own white label on the pink-to-orange button measures 3.7:1 and 2.1:1, below the 4.5:1 target. Client brands must pass; fixing the Advertflair button is a separate decision.

## 6. Examples

Monochrome client with serif headings:

```css
:root {
  --brand-primary: #000000;  --brand-on-primary: #ffffff;
  --brand-primary-on-dark: #ffffff;  --brand-on-primary-on-dark: #111111;
  --brand-cta-from: #000000;  --brand-cta-to: #000000;  --brand-on-cta: #ffffff;
  --brand-font-heading: 'Playfair Display', serif;
  --brand-font-body: 'Inter', sans-serif;
  --brand-radius: 0.125rem;  --brand-radius-control: 2px;
}
```

Green client, rounded controls:

```css
:root {
  --brand-primary: #0b3d2e;  --brand-on-primary: #ffffff;
  --brand-primary-on-dark: #6ee7b7;  --brand-on-primary-on-dark: #111111;
  --brand-cta-from: #0b3d2e;  --brand-cta-to: #14532d;  --brand-on-cta: #ffffff;
  --brand-font-heading: 'Fraunces', serif;
  --brand-font-body: 'Inter', sans-serif;
  --brand-radius: 0.5rem;  --brand-radius-control: 10px;
}
```
