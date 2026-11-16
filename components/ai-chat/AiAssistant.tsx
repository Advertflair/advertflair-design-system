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
