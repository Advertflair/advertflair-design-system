---
name: "advertflair-ai-chat-ui"
description: "Advertflair standard for AI chat and assistant UI/UX. Use when building, restyling or reviewing any in-app AI helper, chat panel, voice assistant or command bar, or when rebranding one to a client's colours."
---

# Advertflair AI chat UI/UX

The pattern proven on a live wholesale ordering build: a small helper that sits in a corner, answers questions, carries out instructions ("just say it"), and hands every committing step back to the person. This skill is the standard for any assistant we put inside an app. It pairs with `enterprise-design` (colour, type, layout), `advertflair-ux-motion` (motion, hit targets) and `advertflair-dev` (code).

The code in section 6 is a tested reference (React + TypeScript, plain CSS, Lucide icons). In the design-system repo the same four files are ready to copy from `components/ai-chat/`. Copy it, then change tokens and wiring. Do not redesign the anatomy per project.

## 1. When this pattern fits

Use it when the assistant helps someone finish a task inside a product: ordering, lookup, navigation, data entry.

Do not use it for a full-page conversational product (long threads, documents, history). That needs a thread view, and this skill's "one exchange at a time" rule does not apply there.

## 2. Principles

1. **Helper, not destination.** It sits beside the work and steps aside once it has done something, so the person sees the result on the real screen.
2. **One exchange at a time.** Show the last question and its answer only. A scrolling transcript in a 340px panel hides the product and nobody reads it.
3. **Do, then show.** An instruction is carried out and the answer states exactly what changed, with numbers ("I added 48 units across 6 styles"). A question gets a short answer plus buttons that open the relevant screen.
4. **The person commits.** The assistant may prepare, fill, add and navigate. It never performs the committing or irreversible step: place an order, send a message, pay, delete, sign for a customer. It prepares the step and says whose tap finishes it.
5. **Never a dead end.** Every answer, including "I did not understand", ends with something the person can do next.
6. **Typing and voice are equal.** Anything that can be said can be typed, and every voice feature is offered only where the browser supports it.
7. **State is always readable.** Idle, listening, thinking and speaking are shown by the orb and also written in text. Motion alone never carries meaning.
8. **Honest about limits.** If it could not do all of a request, it says what was left out and why. If something failed, it says nothing was changed.

## 3. Anatomy

| Part | Rule |
|---|---|
| Launcher | Pill, 56px high, orb plus a plain word ("Help"). Bottom right by default. Raised above any bar fixed to the bottom of the page. Hidden while a full-height panel is open. |
| Panel | `min(340px, 100vw - 24px)` wide, body capped at `min(46vh, 340px)` and scrolls inside. Never covers the whole screen on a phone. |
| Header | Orb, title, one status line (live region), read-aloud toggle, move-to-corner, close. |
| Body: empty | Greeting with the person's first name, then exactly three starter requests written the way a person would say them, chosen for their role. |
| Body: answer | "You asked: ...", the answer, up to three action buttons (first one filled), and a link back to the starters. |
| Input row | Microphone (only if supported), text field, send. Voice problems appear as a short note above the row. |
| Orb | Dot sphere on a canvas. Idle: slow turn. Listening: breathing. Thinking: fast turn with a sweeping band. Speaking: ripples. States ease into each other. It is decorative and `aria-hidden`. |

The panel can be moved so it never blocks what the person is working on. The reference jumps between corners with one button, which works for mouse, touch and keyboard, and remembers the choice. Free dragging is an optional addition; if you add it, keep the button, clamp the panel inside the window, and ignore drags shorter than 6px so a tap still opens it.

## 4. Behaviour

**Answer contract.** Every reply is `{ text, actions? }`. Text is two to four sentences in plain words. Actions are things the app does (open a screen, run a search), never links out.

**Order of handling.** Try commands first, then questions, then a fallback:

1. Command router: does the text ask for something to be done? Do it through a narrow set of allowed functions and return what happened.
2. Question matcher: topic answers for the person's role, then lookup of real records by name or code.
3. Fallback: say it was not understood, give two example phrasings and one action.

**Allowed functions ("hands").** The assistant never touches app state directly. Give it an explicit object of functions it may call, and leave committing functions out of that object entirely:

```ts
interface Hands {
  // what it may read
  person: Person; records: Record[]; cartUnits: number;
  // what it may do
  addItems: (picks: Pick[]) => { units: number; short: number };
  go: (screen: 'order' | 'scan' | 'orders') => void;
  // deliberately absent: placeOrder, confirmForCustomer, send, pay, delete
}
```

If a model (LLM) sits behind `respond`, the same rule holds: it gets these functions as its only tools, its output is rendered as text only (never as HTML), and anything it reads from records or documents is data, not instructions.

**Timing.** Show "Finding that..." for at least 380ms so the change of answer is noticeable, even when the answer is instant. Skip the beat under reduced motion. For real waits over about 1 second keep the thinking state; over about 8 seconds say it is taking longer and let the person cancel by closing. A late answer for a closed panel is dropped.

**Voice in.** Stop any speech before listening so the microphone never hears the assistant. The microphone turns the danger colour while live, with `aria-pressed`. Blocked or failed microphone gets a specific sentence and always offers typing.

**Voice out.** Off by default, one toggle. Stops on close, on a new question and before listening. For fixed sentences a studio recording keyed by a hash of the text can replace the browser voice, with the browser voice as fallback. API keys for voice services stay in the environment and never ship to the browser or the repo.

**Context.** Starters, wording and permissions follow the signed-in role. A new person signing in clears the exchange. Use only the first name.

## 5. Brand theming

All colour comes from CSS variables. To rebrand, change tokens, not component rules.

| Token | Used for | Requirement |
|---|---|---|
| `--ai-accent` | Primary button, pressed toggles, focus ring | Brand colour |
| `--ai-on-accent` | Text and icons on the accent | 4.5:1 against the accent |
| `--ai-orb` | Orb dots | 3:1 against the surface |
| `--ai-surface`, `--ai-text` | Panel and body text | 4.5:1 |
| `--ai-muted` | Secondary text, placeholder | 4.5:1 against the surface |
| `--ai-control` | Outlines of inputs and chips | 3:1 against the surface |
| `--ai-line` | Dividers only | None, decorative |
| `--ai-danger`, `--ai-on-danger` | Live microphone, errors | 4.5:1 between them |
| `--ai-radius`, `--ai-font`, `--ai-shadow` | Shape and type | Inherit the host app's font |

**Three ways to set a brand**

1. Static: override the tokens in the app's stylesheet (`:root { --ai-accent: #0b3d2e; ... }`).
2. Theme: `data-theme="dark"` on any ancestor switches the dark set. Light is the default.
3. Runtime: `applyBrand('#0b3d2e')` (section 6) sets the accent, picks white or near-black text for it, and refuses a colour no text can sit on. Use this when a client or admin picks the colour.

**Presets**

| Brand | Accent | On accent | Notes |
|---|---|---|---|
| Advertflair light (default) | `#4934bc` | `#ffffff` | 8.4:1 |
| Advertflair dark | `#8b7cf6` | `#111111` | Lightened purple so it reads on `#08060f`. Confirm against the design system before treating as canonical. |
| Monochrome client | `#000000` | `#ffffff` | Serif headings come from the host app |

**Rules that brand colours do not override**

- Advertflair pink `#fe2267` and orange `#ff9e02` fail with white text (3.7:1 and 2.1:1). If a pink-to-orange gradient is used on the primary button, its label is `#111111`, never white.
- One accent only. Do not colour starters, secondary actions or the header with a second brand colour.
- Danger stays red in every brand, so a live microphone is never mistaken for a brand element.
- A light brand colour (yellow, mint) still works as the accent with dark text, but cannot colour the orb on a white surface. `applyBrand` falls back to the text colour for the orb in that case.
- Check every new brand in light and dark, with the larger-text setting on, before shipping.

## 6. Reference implementation

Four files. Type-checked and browser-tested in three themes; every button measures at least 44px.

### ai-chat.css

```css
/* Brand tokens. Change these, never the component rules below. */
:root {
  --ai-accent: #4934bc;      /* primary buttons, focus ring */
  --ai-on-accent: #ffffff;   /* text and icons on the accent, 4.5:1 or better */
  --ai-orb: #4934bc;         /* orb dots, 3:1 or better against the surface */
  --ai-surface: #ffffff;
  --ai-text: #111111;
  --ai-muted: #525252;       /* secondary text, 4.5:1 or better */
  --ai-line: #e5e5e5;        /* dividers only */
  --ai-control: #8a8a8a;     /* input and chip outlines, 3:1 or better */
  --ai-danger: #b91c1c;      /* microphone while live, errors */
  --ai-on-danger: #ffffff;
  --ai-radius: 16px;
  --ai-font: inherit;
  --ai-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
}
[data-theme='dark'] {
  --ai-accent: #8b7cf6;
  --ai-on-accent: #111111;
  --ai-orb: #8b7cf6;
  --ai-surface: #08060f;
  --ai-text: #f5f5f5;
  --ai-muted: #9ca3af;
  --ai-line: #3a3350;
  --ai-control: #7d7894;
  --ai-danger: #f87171;
  --ai-on-danger: #111111;
  --ai-shadow: 0 12px 32px rgb(0 0 0 / 0.6);
}

.ai { position: fixed; z-index: 40; right: 20px; bottom: 20px; font-family: var(--ai-font); color: var(--ai-text);
  padding-bottom: env(safe-area-inset-bottom); }
.ai[data-raised] { bottom: 96px; }              /* clears a bar fixed to the bottom */
.ai[data-corner='1'] { right: auto; left: 20px; }
.ai[data-corner='2'] { right: auto; left: 20px; bottom: auto; top: 20px; }
.ai[data-corner='3'] { bottom: auto; top: 20px; }
:where(.ai) button { font: inherit; color: inherit; cursor: pointer; background: none; border: 0; }
.ai :focus-visible { outline: 2px solid var(--ai-accent); outline-offset: 2px; }

.ai-launcher { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px 0 8px; border-radius: 999px;
  background: var(--ai-surface); border: 1px solid var(--ai-text); box-shadow: var(--ai-shadow);
  font-size: 14px; font-weight: 600; }

.ai-panel { width: min(340px, calc(100vw - 24px)); background: var(--ai-surface); border: 1px solid var(--ai-text);
  border-radius: var(--ai-radius); box-shadow: var(--ai-shadow); overflow: hidden; }
.ai-head { display: flex; align-items: center; gap: 8px; padding: 8px 8px 8px 12px; border-bottom: 1px solid var(--ai-line); }
.ai-head-text { flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.25; }
.ai-head-text strong { font-size: 14px; }
.ai-head-text span { font-size: 12px; color: var(--ai-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ai-icon { min-width: 44px; min-height: 44px; display: grid; place-items: center; border-radius: 999px; }
.ai-icon:hover { background: var(--ai-line); }
.ai-icon[aria-pressed='true'] { background: var(--ai-accent); color: var(--ai-on-accent); }

.ai-body { display: flex; flex-direction: column; gap: 8px; padding: 12px; max-height: min(46vh, 340px); overflow-y: auto; }
.ai-body p { margin: 0; }
.ai-answer { font-size: 14px; line-height: 1.6; }
.ai-asked, .ai-muted, .ai-note { font-size: 12px; color: var(--ai-muted); }
.ai-asked span { color: var(--ai-text); }
.ai-chip, .ai-action { min-height: 44px; padding: 8px 16px; border-radius: 999px; text-align: left; font-size: 14px;
  border: 1px solid var(--ai-control); display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ai-chip:hover, .ai-action:hover { border-color: var(--ai-text); }
.ai-action { font-weight: 600; border-color: var(--ai-text); }
.ai .ai-primary { background: var(--ai-accent); color: var(--ai-on-accent); border-color: var(--ai-accent); }
.ai-link { align-self: flex-start; min-height: 44px; font-size: 12px; color: var(--ai-muted); text-decoration: underline; text-underline-offset: 4px; }

.ai-form { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px; border-top: 1px solid var(--ai-line); }
.ai-note { width: 100%; margin: 0; padding: 0 6px; color: var(--ai-text); }
.ai-form input { flex: 1; min-width: 0; min-height: 44px; padding: 0 16px; border-radius: 999px; font: inherit; font-size: 16px;
  color: var(--ai-text); background: var(--ai-surface); border: 1px solid var(--ai-control); }
.ai-form input::placeholder { color: var(--ai-muted); }
.ai-round { min-width: 44px; min-height: 44px; display: grid; place-items: center; border-radius: 999px; border: 1px solid var(--ai-text); }
.ai-round[data-live] { background: var(--ai-danger); color: var(--ai-on-danger); border-color: var(--ai-danger); }
.ai-round:disabled { opacity: 0.4; cursor: default; }

@media (prefers-reduced-motion: no-preference) {
  .ai-panel { animation: ai-in 160ms ease-out; }
  .ai-icon, .ai-chip, .ai-action, .ai-round { transition: background-color 120ms, border-color 120ms; }
}
@keyframes ai-in { from { opacity: 0; transform: translateY(8px); } }
```

The input is 16px so iOS does not zoom the page when it is focused.

### brand.ts

```ts
/** WCAG contrast ratio between two hex colours. */
export function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const n = parseInt(hex.replace('#', ''), 16);
    const [r, g, bl] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Applies a brand colour. Returns false, and changes nothing, if text on it could not be read. */
export function applyBrand(accent: string, el: HTMLElement = document.documentElement): boolean {
  const onAccent = contrast(accent, '#ffffff') >= contrast(accent, '#111111') ? '#ffffff' : '#111111';
  if (contrast(accent, onAccent) < 4.5) return false;
  el.style.setProperty('--ai-accent', accent);
  el.style.setProperty('--ai-on-accent', onAccent);
  // The orb and outlines sit on the surface, so the accent must also read against it.
  const surface = getComputedStyle(el).getPropertyValue('--ai-surface').trim() || '#ffffff';
  el.style.setProperty('--ai-orb', contrast(accent, surface) >= 3 ? accent : getComputedStyle(el).getPropertyValue('--ai-text').trim() || '#111111');
  return true;
}
```

Pass six-digit hex. Call it before the assistant mounts, or remount the orb after, because the orb reads its colour once.

### Orb.tsx

```tsx
import { useEffect, useRef } from 'react';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

/** Dot sphere that shows what the assistant is doing. Decorative: state is also given in text. */
export function Orb({ size = 40, state = 'idle' as OrbState }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const live = useRef<OrbState>(state);
  live.current = state;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    // The dot colour comes from the brand token, so a theme change needs no code change.
    const color = getComputedStyle(canvas).getPropertyValue('--ai-orb').trim() || '#000';

    const count = size <= 32 ? 70 : size <= 56 ? 130 : 220;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const dots = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
    });

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cosT = Math.cos(0.42);
    const sinT = Math.sin(0.42);
    let angle = 0.6, clock = 0, last = performance.now(), frame = 0;
    let speed = 0.5, breathe = 0, ripple = 0, sweep = 0;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const s = live.current;
      const ease = Math.min(1, dt * 5); // states glide, never jump
      speed += ((s === 'thinking' ? 2.6 : s === 'speaking' ? 0.9 : s === 'listening' ? 0.35 : 0.5) - speed) * ease;
      breathe += ((s === 'listening' ? 1 : 0) - breathe) * ease;
      ripple += ((s === 'speaking' ? 1 : 0) - ripple) * ease;
      sweep += ((s === 'thinking' ? 1 : 0) - sweep) * ease;
      angle += speed * dt;

      const cosA = Math.cos(angle), sinA = Math.sin(angle), half = size / 2;
      const base = half * 0.8 * (1 + breathe * 0.09 * Math.sin(clock * 4.2));
      const dot = Math.max(0.7, size / 46);
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = color;
      for (const d of dots) {
        const wave = 1 + ripple * 0.13 * Math.sin(d.y * 7 - clock * 9);
        const x0 = d.x * cosA + d.z * sinA;
        const z0 = -d.x * sinA + d.z * cosA;
        const y1 = d.y * cosT - z0 * sinT;
        const depth = (d.y * sinT + z0 * cosT + 1) / 2;
        const band = sweep * Math.max(0, 1 - Math.abs((((x0 + clock * 1.4) % 2) + 2) % 2 - 1) * 3.2);
        ctx.globalAlpha = Math.min(1, 0.16 + depth * 0.84 + band * 0.5);
        ctx.beginPath();
        ctx.arc(half + x0 * base * wave, half + y1 * base * wave, dot * (0.45 + depth * 0.75 + band * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!still) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [size]);

  return <canvas ref={ref} aria-hidden="true" style={{ width: size, height: size, display: 'block' }} />;
}
```

Under reduced motion the orb draws one still frame.

### AiAssistant.tsx

```tsx
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mic, Move, Send, Volume2, VolumeX, X } from 'lucide-react';
import { Orb, OrbState } from './Orb';

export interface AiAction { label: string; run: () => void }
export interface AiAnswer { text: string; actions?: AiAction[] }

interface Props {
  title?: string;
  greeting: string;
  /** Three example requests, written as the person would say them. */
  starters: string[];
  /** Commands first, then questions. Must always return an answer, never throw silently. */
  respond: (text: string) => AiAnswer | Promise<AiAnswer>;
  /** Hide while a full-height panel is open. */
  hidden?: boolean;
  /** Start above a bar fixed to the bottom of the page. */
  raised?: boolean;
  storageKey?: string;
}

const Recognition: any = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
const MIN_BEAT = 380; // long enough to notice the answer changed, short enough to feel instant

export function AiAssistant({ title = 'Help', greeting, starters, respond, hidden, raised, storageKey = 'ai-help-corner' }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [exchange, setExchange] = useState<{ question: string; answer: AiAnswer } | null>(null);
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [corner, setCorner] = useState(() => {
    try { return Number(window.localStorage.getItem(storageKey)) || 0; } catch { return 0; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const recognition = useRef<any>(null);
  const turn = useRef(0);
  const wasOpen = useRef(false);

  const state: OrbState = listening ? 'listening' : thinking ? 'thinking' : speaking ? 'speaking' : 'idle';
  const status = listening ? 'Listening…' : thinking ? 'Finding that…' : speaking ? 'Reading aloud…' : 'Ask or tell me';

  const hush = () => { if (canSpeak) window.speechSynthesis.cancel(); setSpeaking(false); };
  const say = (text: string) => {
    if (!canSpeak) return;
    hush();
    const u = new SpeechSynthesisUtterance(text);
    u.onend = u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (open) { wasOpen.current = true; inputRef.current?.focus({ preventScroll: true }); return; }
    if (wasOpen.current) openerRef.current?.focus(); // closing hands focus back to the launcher
    hush();
    recognition.current?.abort?.();
    turn.current++; // drop any answer still on its way
    setThinking(false); setListening(false); setNote(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (raw: string) => {
    const question = raw.trim();
    if (!question || thinking) return;
    hush(); setInput(''); setNote(null); setThinking(true);
    const mine = ++turn.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let answer: AiAnswer;
    try {
      [answer] = await Promise.all([respond(question), new Promise((r) => setTimeout(r, reduce ? 0 : MIN_BEAT))]);
    } catch {
      answer = { text: 'That did not work, and nothing was changed. Try again, or ask it another way.' };
    }
    if (mine !== turn.current) return;
    setThinking(false);
    setExchange({ question, answer });
    if (readAloud) say(answer.text);
  };

  const listen = () => {
    if (!Recognition) return;
    if (listening) return recognition.current?.stop?.();
    hush(); setNote(null); // never let the microphone hear the assistant talking
    const r = new Recognition();
    r.lang = document.documentElement.lang || 'en-US';
    r.interimResults = false;
    r.onresult = (e: any) => {
      const heard = e.results?.[0]?.[0]?.transcript || '';
      if (heard.trim()) ask(heard); else setNote('I did not catch that. Try again, or type it.');
    };
    r.onerror = (e: any) => setNote(e.error === 'not-allowed' || e.error === 'service-not-allowed'
      ? 'The microphone is blocked. Allow it in your browser, or type it.'
      : 'I did not catch that. Try again, or type it.');
    r.onend = () => setListening(false);
    recognition.current = r;
    try { r.start(); setListening(true); } catch { setNote('The microphone could not start. Type it instead.'); }
  };

  const nextCorner = () => {
    const next = (corner + 1) % 4;
    setCorner(next);
    try { window.localStorage.setItem(storageKey, String(next)); } catch { /* resets next visit */ }
  };

  if (hidden) return null;

  return (
    <div className="ai" data-corner={corner} data-raised={raised || undefined}>
      {!open ? (
        <button ref={openerRef} className="ai-launcher" onClick={() => setOpen(true)} aria-label={`Open ${title}`}>
          <Orb size={40} />
          <span>{title}</span>
        </button>
      ) : (
        <section className="ai-panel" role="dialog" aria-label={title}>
          <header className="ai-head">
            <Orb size={32} state={state} />
            <div className="ai-head-text">
              <strong>{title}</strong>
              <span aria-live="polite">{status}</span>
            </div>
            {canSpeak && (
              <button className="ai-icon" aria-pressed={readAloud} aria-label={readAloud ? 'Read aloud is on. Turn it off.' : 'Read aloud is off. Turn it on.'}
                onClick={() => { if (readAloud) hush(); setReadAloud(!readAloud); }}>
                {readAloud ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            )}
            <button className="ai-icon" onClick={nextCorner} aria-label="Move to another corner"><Move size={16} /></button>
            <button className="ai-icon" onClick={() => setOpen(false)} aria-label={`Close ${title}`}><X size={16} /></button>
          </header>

          <div className="ai-body" aria-live="polite">
            {thinking ? (
              <p className="ai-muted">Finding that…</p>
            ) : exchange ? (
              <>
                <p className="ai-asked">You asked: <span>{exchange.question}</span></p>
                <p className="ai-answer">{exchange.answer.text}</p>
                {exchange.answer.actions?.map((a, i) => (
                  <button key={a.label} className={i === 0 ? 'ai-action ai-primary' : 'ai-action'} onClick={() => { a.run(); setOpen(false); }}>
                    {a.label}<ArrowRight size={16} />
                  </button>
                ))}
                <button className="ai-link" onClick={() => setExchange(null)}>See suggested questions</button>
              </>
            ) : (
              <>
                <p className="ai-answer">{greeting}</p>
                {starters.slice(0, 3).map((q) => <button key={q} className="ai-chip" onClick={() => ask(q)}>{q}</button>)}
              </>
            )}
          </div>

          <form className="ai-form" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            {note && !listening && <p role="status" className="ai-note">{note}</p>}
            {Recognition && (
              <button type="button" className="ai-round" data-live={listening || undefined} aria-pressed={listening}
                aria-label={listening ? 'Stop listening' : 'Speak your question'} onClick={listen}><Mic size={16} /></button>
            )}
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} aria-label="Your question"
              placeholder={listening ? 'Listening…' : 'Ask a question'} />
            <button type="submit" className="ai-round ai-primary" disabled={!input.trim() || thinking} aria-label="Send"><Send size={16} /></button>
          </form>
        </section>
      )}
    </div>
  );
}
```

### Wiring it into an app

```tsx
import './ai-chat.css';
import { AiAssistant, AiAnswer } from './AiAssistant';

const respond = (text: string): AiAnswer =>
  runCommand(text, hands)            // 1. did they ask for something to be done?
  ?? answerQuestion(text, role)      // 2. is it a question we know?
  ?? { text: 'I am not sure what you mean. Try "add my last order" or "what is in stock".',
       actions: [{ label: 'Browse products', run: () => go('shop') }] };

<AiAssistant
  greeting={`Hi ${firstName}. Ask a question or tell me what to do:`}
  starters={startersFor(role)}
  respond={respond}
  raised={hasBottomBar}
  hidden={orderSheetOpen}
/>
```

`respond` may also be async and call a model. The panel behaves the same.

## 7. Writing for the assistant

- Plain words, short sentences, sentence case. No jargon, no exclamation marks, no emojis.
- Start a completed instruction with "Done." and then the numbers. Start a refusal with what it can do instead.
- State limits once and plainly: "Placing the order is always your tap."
- Errors say what happened, that nothing was changed, and what to try. Never show a raw error.
- Text that will be read aloud avoids symbols, abbreviations and anything that sounds odd spoken.
- Buttons name the destination or the result ("Open the order sheet"), never "Click here" or "OK".
- Call it "Help" or a plain role word in the interface. Do not give it a human name or imply it is a person.

## 8. Accessibility and devices

- Every control is at least 44 by 44px and has an `aria-label`. Toggles use `aria-pressed`.
- Status and answers are in `aria-live="polite"` regions. The orb is `aria-hidden`.
- Keyboard: Enter sends, Escape closes, focus moves to the input on open and back to the launcher on close.
- Visible focus ring in the accent colour on everything.
- Reduced motion: no thinking beat, no panel animation, still orb.
- Phone: the panel never exceeds the viewport, respects the safe area, sits above fixed bottom bars, and a 16px input prevents zoom.
- Works with the host app's larger-text setting: sizes in the panel must grow with it.

## 9. Review checklist

Before shipping an assistant, confirm each line:

- [ ] Committing actions are absent from the allowed functions, and the copy says who finishes the step.
- [ ] Every answer has a next step. The fallback gives example phrasings.
- [ ] Completed instructions report exact numbers and anything left out.
- [ ] A failed request says nothing was changed.
- [ ] Three starters per role, written as a person would say them.
- [ ] Tokens only. No hard-coded colours in component rules.
- [ ] Accent text 4.5:1, orb and outlines 3:1, checked in light and dark.
- [ ] Microphone and read-aloud appear only where supported, and typing always works.
- [ ] Speech stops on close, on a new question and before listening.
- [ ] Does not cover the primary action on a 375px-wide phone. Raised above bottom bars, hidden behind full-height panels.
- [ ] Keyboard-only and screen-reader pass. Reduced motion pass.
- [ ] No API keys, client prices or personal data in the bundle, in logs, or in anything sent to a model beyond what the task needs.
- [ ] Model output is rendered as text, never as HTML.