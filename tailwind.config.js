/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette officielle Get Both - Youthful & Modern
        navy: {
          DEFAULT: '#02255E', // Couleur principale
          50: '#eef3fa',
          100: '#d7e4f4',
          200: '#b4cfea',
          300: '#86b2dd',
          400: '#5290cc',
          500: '#02255E', // Main Electric Navy
          600: '#021e4d',
          700: '#01173c',
          800: '#01102b',
          900: '#010a1b',
        },
        steel: {
          DEFAULT: '#243B5A', // Profondeur
          50: '#f0f3f6',
          100: '#dbe2ec',
          200: '#b8c6d9',
          300: '#8ea3c1',
          400: '#647ea3',
          500: '#243B5A', // Main Steel Blue
          600: '#1d2f48',
          700: '#172437',
          800: '#101927',
          900: '#0b1019',
        },
        tunisian: {
          DEFAULT: '#C73542', // Énergie
          50: '#fcf2f3',
          100: '#f9e1e3',
          200: '#f3c4c8',
          300: '#e99ca3',
          400: '#db6c77',
          500: '#C73542', // Main Tunisian Red
          600: '#af2632',
          700: '#8d1e27',
          800: '#6c171e',
          900: '#4c1015',
        },
        fresh: {
          DEFAULT: '#4B8FE8', // Jeunesse
          50: '#f2f7fd',
          100: '#e1eefb',
          200: '#c5def8',
          300: '#9ac5f3',
          400: '#67a5ec',
          500: '#4B8FE8', // Main Fresh Blue
          600: '#2e74d6',
          700: '#235bb2',
          800: '#1b468a',
          900: '#143364',
        },
        blush: {
          DEFAULT: '#F4E9E7', // Douceur
          50: '#fdfbfa',
          100: '#f9f4f3',
          200: '#F4E9E7', // Main Soft Blush
          300: '#e9d6d3',
          400: '#ddbfba',
          500: '#cca099',
          600: '#b57d74',
        },
        sunny: {
          DEFAULT: '#F5B942', // Optimisme
          50: '#fefaf0',
          100: '#fdf3dd',
          200: '#fbe5b8',
          300: '#f8d28a',
          400: '#F5B942', // Main Sunny Yellow
          500: '#df9c25',
          600: '#be7b1a',
          700: '#955815',
          800: '#713e13',
          900: '#522b10',
        },
        // Compatible aliases
        brand: {
          50: '#f2f7fd',
          100: '#e1eefb',
          200: '#c5def8',
          400: '#4B8FE8',
          500: '#02255E',
          600: '#021e4d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(2, 37, 94, 0.05), 0 10px 24px -2px rgba(2, 37, 94, 0.03)',
        'card': '0 0 0 1px rgba(36, 59, 90, 0.06), 0 2px 4px rgba(2, 37, 94, 0.03), 0 12px 24px -4px rgba(2, 37, 94, 0.05)',
        'float': '0 20px 48px -12px rgba(2, 37, 94, 0.14), 0 1px 3px rgba(2, 37, 94, 0.06)',
        'glow-fresh': '0 0 24px rgba(75, 143, 232, 0.3)',
        'glow-tunisian': '0 0 24px rgba(199, 53, 66, 0.3)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
