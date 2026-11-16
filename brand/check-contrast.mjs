#!/usr/bin/env node
// Checks a brand's colour pairs against WCAG AA before it ships.
// Usage:
//   node brand/check-contrast.mjs --primary #0b3d2e --on-primary #ffffff \
//     --cta-from #0b3d2e --cta-to #14532d --on-cta #ffffff \
//     [--surface #ffffff] [--dark-surface #08060f] [--primary-on-dark #6ee7b7] [--on-primary-on-dark #111111]
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const hex = (v) => {
  const h = String(v || '').replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`Not a hex colour: ${v}`);
  return full;
};
const lum = (v) => {
  const n = parseInt(hex(v), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((x) => {
    const c = x / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const surface = args.surface || '#ffffff';
const dark = args['dark-surface'] || '#08060f';
const checks = [];
const add = (label, a, b, min) => a && b && checks.push({ label, ratio: contrast(a, b), min });
try {
  if (!args.primary) throw new Error('Pass at least --primary and --on-primary. See the usage note at the top of this file.');
  add('Text on primary', args['on-primary'], args.primary, 4.5);
  add('Primary as text or link on light surface', args.primary, surface, 4.5);
  add('Primary as outline, icon or orb on light surface', args.primary, surface, 3);
  add('Primary button label on gradient start', args['on-cta'], args['cta-from'], 4.5);
  add('Primary button label on gradient end', args['on-cta'], args['cta-to'], 4.5);
  add('Primary (dark-mode variant) as text on dark surface', args['primary-on-dark'], dark, 4.5);
  add('Text on primary (dark-mode variant)', args['on-primary-on-dark'], args['primary-on-dark'], 4.5);
} catch (e) {
  console.error(e.message);
  process.exit(2);
}
let failed = 0;
for (const c of checks) {
  const ok = c.ratio >= c.min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.ratio.toFixed(2)}:1 (needs ${c.min}:1)  ${c.label}`);
}
console.log(failed ? `\n${failed} check(s) failed. Adjust the colours before shipping.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
