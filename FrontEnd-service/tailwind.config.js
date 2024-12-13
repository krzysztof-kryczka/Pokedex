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
               button: 'var(--color-bg-section-blue-light)', // bg-blue-500
               'button-hover': 'var(--color-bg-section-blue-light-hover)', // bg-blue-600
            },
            dark: {
               background: 'var(--color-bg-dark)',
               text: 'var(--color-text-dark)',
               button: 'var(--color-bg-section-blue-dark)', // bg-blue-700
               'button-hover': 'var(--color-bg-section-blue-dark-hover)', // bg-blue-800
            },
         },
      },
   },
   plugins: [],
}
