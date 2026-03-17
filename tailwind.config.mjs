/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,mdoc,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brutalist: {
          bg: '#111111',
          line: '#444444',
          text: '#CCCCCC',
          accent: '#135bec',
        },
        zinc: {
          500: '#444444',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}