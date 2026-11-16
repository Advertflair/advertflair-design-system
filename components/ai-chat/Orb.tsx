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
