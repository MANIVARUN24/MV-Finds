/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE5D8',
          300: '#DDD5C3',
          400: '#CFC3AC',
        },
        charcoal: {
          50: '#F6F6F5',
          100: '#E7E6E4',
          200: '#D0CEC9',
          300: '#A9A69F',
          400: '#7E7A71',
          500: '#5E5A52',
          600: '#48443E',
          700: '#36332E',
          800: '#262420',
          900: '#1A1816',
          950: '#11100E',
        },
        sand: {
          50: '#FBF9F6',
          100: '#F3EFEA',
          200: '#E7E1D7',
          300: '#D5CBBF',
          400: '#BAADA0',
          500: '#9E8F80',
          600: '#837466',
        },
        terracotta: {
          50: '#FCF7F4',
          100: '#F8ECE4',
          200: '#F1D6C6',
          300: '#E7B8A0',
          400: '#D79271',
          500: '#C27854',
          600: '#A65E3C',
          700: '#87472D',
        },
        sage: {
          50: '#F6F8F6',
          100: '#E9EFE9',
          200: '#D4DFD3',
          300: '#B4C7B3',
          400: '#8EA78D',
          500: '#718C70',
          600: '#567055',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', '"Lora"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px -1px rgba(26, 24, 22, 0.04), 0 1px 3px -1px rgba(26, 24, 22, 0.03)',
        'soft-md': '0 6px 20px -2px rgba(26, 24, 22, 0.06), 0 2px 6px -1px rgba(26, 24, 22, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(26, 24, 22, 0.08), 0 4px 12px -2px rgba(26, 24, 22, 0.04)',
        'card-hover': '0 16px 36px -6px rgba(26, 24, 22, 0.09), 0 6px 16px -3px rgba(26, 24, 22, 0.05)',
      },
      borderRadius: {
        'editorial': '14px',
      }
    },
  },
  plugins: [],
}
