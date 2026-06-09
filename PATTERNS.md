# Patterns

Copy-paste building blocks that define the Advertflair look. These use the CSS classes from `advertflair-design-system.css` plus the shadcn components. Animations use `motion/react` (Framer Motion v12+).

---

## Shiny CTA — the signature button

```html
<a href="/pricing#pilot-form" class="shiny-cta px-8 py-4">
  <span class="relative z-10">Start $2K Pilot &rarr;</span>
</a>
```

The inner `<span>` **must** keep `relative z-10` so the label sits above the animated layers (spinning border, light sweep, dot grid).

Size variants:

```html
<!-- Small (navigation) -->
<a class="shiny-cta px-5 py-2 text-sm"><span class="relative z-10">Start $2K Pilot</span></a>
<!-- Medium -->
<a class="shiny-cta px-6 py-3"><span class="relative z-10">Start $2K Pilot</span></a>
<!-- Large (hero) -->
<a class="shiny-cta px-8 py-4"><span class="relative z-10">Start $2K Pilot &rarr;</span></a>
<!-- Full width -->
<a class="shiny-cta w-full block text-center px-8 py-4"><span class="relative z-10">Start $2K Pilot</span></a>
```

React with icon:

```tsx
import { ArrowRight } from "lucide-react";

<a href="/pricing#pilot-form" className="shiny-cta inline-flex items-center gap-2 px-8 py-4">
  <span className="relative z-10 inline-flex items-center gap-2">
    Start $2K Pilot <ArrowRight className="w-4 h-4" />
  </span>
</a>
```

Recolor by overriding three variables: `--_highlight`, `--_shine`, `--_base`.

---

## Pill buttons

```html
<button class="pill-button pill-button-primary">Get Started &rarr;</button>
<button class="pill-button pill-button-secondary">Learn More</button>
<button class="pill-button pill-button-ghost">Cancel</button>
```

---

## Hero section

```tsx
import { motion } from "motion/react";

<section className="relative py-32 md:py-40 overflow-hidden border-b border-border">
  <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-af-pink/15 blur-[100px] pointer-events-none" />
  <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-af-purple/15 blur-[100px] pointer-events-none" />

  <div className="container mx-auto px-6 relative z-10">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="eyebrow text-af-pink block mb-6">For Enterprise Retailers</span>
      <h1 className="max-w-[880px] mb-6">
        Transform your visual production with{" "}
        <em className="not-italic bg-gradient-to-r from-af-pink to-af-orange bg-clip-text text-transparent">
          AI-powered imaging
        </em>
      </h1>
      <p className="text-xl text-muted-foreground max-w-[720px] mb-10 leading-relaxed">
        Campaign-grade product photography in 3 days. 60% cost reduction. Zero compromise on brand quality.
      </p>
      <div className="flex flex-wrap gap-3.5">
        <a href="/pricing#pilot-form" className="shiny-cta px-8 py-4"><span className="relative z-10">Start $2K Pilot &rarr;</span></a>
        <a href="#features" className="px-7 py-3.5 rounded-full border border-border bg-transparent text-foreground hover:border-af-purple hover:text-af-purple transition-all duration-300">See how it works</a>
      </div>
    </motion.div>
  </div>
</section>
```

---

## Feature grid

```tsx
import { motion } from "motion/react";
import { CheckCircle, Clock, TrendingDown } from "lucide-react";

const features = [
  { icon: CheckCircle, title: "78% First-Pass Approval", description: "Most previews approved without revision cycles" },
  { icon: Clock, title: "3-Day Turnaround", description: "From garment upload to approved campaign assets" },
  { icon: TrendingDown, title: "60% Cost Reduction", description: "Compared to traditional studio workflows" },
];

<section className="py-20 md:py-28 border-b border-border">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="p-8 rounded-lg border border-border bg-card hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #fe2267, #ff9e02)" }}>
            <f.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl mb-2">{f.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{f.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

## CTA section (dark)

```tsx
<section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-af-dark via-af-elevated to-af-card text-white border-b border-white/10">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-af-purple/30 blur-[80px] pointer-events-none" />
  <div className="container mx-auto px-6 relative z-10 text-center">
    <h2 className="text-5xl mb-6 text-white">
      Ready to <em className="not-italic bg-gradient-to-r from-af-pink to-af-orange bg-clip-text text-transparent">transform</em> your visual production?
    </h2>
    <p className="text-white/75 text-lg max-w-[640px] mx-auto mb-10">
      Start with a $2K pilot. 10 SKUs, 14 days, zero commitment.
    </p>
    <a href="/pricing#pilot-form" className="shiny-cta inline-block px-8 py-4"><span className="relative z-10">Start $2K Pilot &rarr;</span></a>
  </div>
</section>
```

---

## Sticky navigation (gradient bar + glass)

```tsx
<div className="sticky top-0 z-[100]">
  <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #4934bc, #fe2267, #ff9e02)" }} />
  <nav className="backdrop-blur-xl bg-white/80 dark:bg-[#08060f]/80 border-b border-border">
    {/* logo + links + theme toggle + shiny-cta */}
  </nav>
</div>
```

Footer uses `border-t border-border bg-muted/30 py-16` with Platform / Resources / Legal / Social columns.

---

## Horizontal scroll gallery (scroll-linked)

Vertical scroll drives horizontal slide. Desktop uses `useScroll` + `useTransform`; mobile falls back to native snap-scroll.

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type GallerySlide = { src: string; alt: string; label: string; title: string };

function DesktopGallery({ slides }: { slides: GallerySlide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const totalCards = slides.length;
  const trackWidth = totalCards * 42 + 20;          // 40vw card + 2vw gap, + 20vw trailing spacer
  const xEnd = -(trackWidth - 100);
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${xEnd}vw`]);
  const stickyHeight = `${Math.max(250, totalCards * 75)}vh`;

  return (
    <div ref={containerRef} style={{ height: stickyHeight, position: "relative" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-[2vw] pl-[6vw]" style={{ x }}>
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-shrink-0 w-[40vw] h-[70vh] rounded-2xl overflow-hidden group">
              <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="text-xs text-white/50 uppercase tracking-[0.15em] block mb-1">{slide.label}</span>
                <p className="text-white text-lg md:text-xl">{slide.title}</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>
      </div>
    </div>
  );
}

function MobileGallery({ slides }: { slides: GallerySlide[] }) {
  return (
    <div className="overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
      <div className="flex gap-4" style={{ width: "max-content" }}>
        {slides.map((slide, i) => (
          <div key={i} className="relative flex-shrink-0 w-[80vw] aspect-[3/4] snap-center rounded-2xl overflow-hidden">
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </div>
  );
}
```

Hide the scrollbar on mobile:

```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
```

---

## Contact form

`ContactForm` props: `defaultInterest?`, `accentFrom?` (default `#fe2267`), `accentTo?` (default `#ff9e02`), `darkBg?` (default `true`). Use `darkBg={false}` on light sections. Submit button uses the brand gradient with an `ArrowRight` icon; labels are 10px uppercase with `0.12em` tracking.

---

## New-page checklist

- Hero with gradient blob backgrounds
- Eyebrow label above the H1; gradient text on 1–2 keywords
- `shiny-cta` for the primary action
- Section spacing `py-20 md:py-28`, divider `border-b border-border`
- Lucide icons; `motion` fade-in on scroll (`whileInView`, `viewport={{ once: true }}`)
- Contact form near the bottom
- Works in light + dark
