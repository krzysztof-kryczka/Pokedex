/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,jsx}'],
   theme: {
      extend: {
         colors: {
            light: { background: 'var(--color-bg-light)', text: 'var(--color-text-light)' },
            dark: { background: 'var(--color-bg-dark)', text: 'var(--color-text-dark)' },
         },
      },
   },
   plugins: [],
}
