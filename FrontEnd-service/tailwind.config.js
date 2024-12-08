/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,jsx}'],
   darkMode: 'selector',
   theme: {
      extend: {
         colors: {
            light: {
               background: 'var(--color-bg-light)',
               text: 'var(--color-text-light)',
               blue: 'var(--color-bg-blue-light)',
            },
            dark: {
               background: 'var(--color-bg-dark)',
               text: 'var(--color-text-dark)',
            },
         },
      },
   },
   plugins: [],
}
