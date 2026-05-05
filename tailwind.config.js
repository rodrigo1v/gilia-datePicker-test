/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        dp: {
          primary: 'var(--dp-primary)',
          accent:  'var(--dp-accent)',
          bg:      'var(--dp-bg)',
          surface: 'var(--dp-surface)',
          border:  'var(--dp-border)',
          text:    'var(--dp-text)',
          muted:   'var(--dp-muted)',
        },
      },
    },
  },
  plugins: [],
}
