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
