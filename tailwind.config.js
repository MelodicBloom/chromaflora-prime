/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--main-hue), 80%, 60%)',
          glow: 'hsla(var(--main-hue), 80%, 60%, var(--glow-opacity))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        warp: 'warp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        bloom: 'bloom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        warp: {
          '0%': { transform: 'scale(1)', filter: 'blur(0px) brightness(1)' },
          '50%': {
            transform: 'scale(1.1) skewX(2deg)',
            filter: 'blur(20px) brightness(3)',
          },
          '100%': { transform: 'scale(1)', filter: 'blur(0px) brightness(1)' },
        },
        bloom: {
          '0%': {
            opacity: '0',
            filter: 'blur(20px)',
            transform: 'scale(0.9) translateY(10px)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0px)',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
