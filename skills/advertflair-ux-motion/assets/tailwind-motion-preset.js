/* Advertflair UX and Motion Standard - Tailwind 3.4 preset. v1.0
   Usage in tailwind.config.js:
     presets: [require('./tailwind-motion-preset')],
   List it after the enterprise-design preset. Import assets/motion.css as well:
   this preset maps the tokens to utilities, motion.css defines them. */

const plugin = require('tailwindcss/plugin');

module.exports = {
  // hover: utilities only apply on devices that really hover (no sticky hover on touch).
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
        page: 'var(--dur-page)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        in: 'var(--ease-in)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },
      spacing: {
        hit: 'var(--hit)',
        control: 'var(--control-h)',
      },
      minHeight: { hit: 'var(--hit)', control: 'var(--control-h)' },
      minWidth: { hit: 'var(--hit)', control: 'var(--control-h)' },
      scale: { press: 'var(--scale-press)' },
      keyframes: {
        'ux-fade-in': { from: { opacity: '0' } },
        'ux-rise-in': { from: { opacity: '0', transform: 'translateY(var(--dist-md))' } },
        'ux-pop-in': { from: { opacity: '0', transform: 'scale(var(--scale-pop))' } },
      },
      animation: {
        'fade-in': 'ux-fade-in var(--dur-base) var(--ease-out) both',
        'rise-in': 'ux-rise-in var(--dur-slow) var(--ease-out) both',
        'pop-in': 'ux-pop-in var(--dur-fast) var(--ease-out) both',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // touch:min-h-hit, mouse:text-sm, instant:animate-none
      addVariant('touch', '@media (pointer: coarse)');
      addVariant('mouse', '@media (hover: hover) and (pointer: fine)');
      addVariant('instant', '&[data-instant]');
    }),
  ],
};
