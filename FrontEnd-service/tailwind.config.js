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
               section: 'var(--color-bg-section-light)',
               button: 'var(--color-bg-button-light)',
               'button-hover': 'var(--color-bg-button-light-hover)',
               'row-even': 'var(--color-bg-row-light)',
               'row-header': 'var(--color-bg-row-header-light)',
            },
            dark: {
               background: 'var(--color-bg-dark)',
               text: 'var(--color-text-dark)', // text-dark-text
               section: 'var( --color-bg-section-dark)',
               button: 'var(--color-bg-button-dark)',
               'button-hover': 'var(--color-bg-button-dark-hover)',
               input: 'var(--color-bg-input-dark)',
               'row-even': 'var(--color-bg-row-dark)',
               'row-header': 'var(--color-bg-row-header-dark)',
               border: 'var(--color-border-dark)', //border-dark-border
            },
         },
      },
   },
   plugins: [],
}
