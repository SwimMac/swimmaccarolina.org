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
          DEFAULT: '#003756'
        },
        'secondary': {
          DEFAULT: '#F97900',
          'dark': '#d46700'
        }
      }
    },
  },
  variants: {},
  plugins: [],
  purge: process.env.NODE_ENV === 'production' ? {
    enabled: true,
    content: ['src/**/*.njk', 'src/**/*.js'],
  } : {}
}