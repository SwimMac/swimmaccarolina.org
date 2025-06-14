module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem'
      },
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F97900',
          'dark': '#d66800'
        },
        'secondary': {
          DEFAULT: '#0E1840'
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
  content: ['src/**/*.njk', 'src/**/*.js', '.eleventy.js'],
  purge: process.env.NODE_ENV === 'production' ? {
    enabled: true,
    content: ['src/**/*.njk', 'src/**/*.js', '.eleventy.js'],
    options: {
      safelist: {
        standard: [
        "responsive-embed",
        "flex-video",
        "responsive-embed iframe",
        "responsive-embed object",
        "responsive-embed embed",
        "responsive-embed video",
        "flex-video iframe",
        "flex-video object",
        "flex-video embed",
        "flex-video video",
        "widescreen",
        "lg\:w-2\/3"
        ],
        greedy: [/widescreen$/]
      }
    }
  } : {}
}
