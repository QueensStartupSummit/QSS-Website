/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Mobile-first breakpoint strategy
    screens: {
      'xs': '375px',    // Small mobile devices (iPhone SE)
      'sm': '640px',    // Large mobile devices
      'md': '768px',    // Tablets
      'lg': '1024px',   // Small laptops
      'xl': '1280px',   // Large laptops
      '2xl': '1536px',  // Desktop monitors
    },
    extend: {
      // Custom spacing scale optimized for mobile
      spacing: {
        'mobile-xs': '0.25rem',   // 4px
        'mobile-sm': '0.5rem',    // 8px
        'mobile-md': '0.75rem',   // 12px
        'mobile-lg': '1rem',      // 16px
        'mobile-xl': '1.5rem',    // 24px
        'mobile-2xl': '2rem',     // 32px
        'mobile-3xl': '3rem',     // 48px
        'touch-target': '2.75rem', // 44px - minimum touch target size
        'touch-target-lg': '3rem', // 48px - comfortable touch target
      },
      
      // Mobile-optimized font sizes
      fontSize: {
        'mobile-xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'mobile-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'mobile-base': ['1rem', { lineHeight: '1.5rem' }],    // 16px
        'mobile-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'mobile-xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        'mobile-2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
        'mobile-3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        'mobile-4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
      },
      
      // QSS Brand colors
      colors: {
        qss: {
          teal: '#58baba',
          yellow: '#ddc946',
          green: '#74a84a',
          'teal-light': '#7dd3d8',
          'teal-dark': '#4a9999',
          'yellow-light': '#e8d96b',
          'yellow-dark': '#c4b63d',
        }
      },
      
      // Mobile-optimized container sizes
      maxWidth: {
        'mobile': '100%',
        'mobile-content': '90%',
        'mobile-form': '95%',
      },
      
      // Mobile-friendly border radius
      borderRadius: {
        'mobile-sm': '0.375rem',  // 6px
        'mobile': '0.5rem',       // 8px
        'mobile-lg': '0.75rem',   // 12px
        'mobile-xl': '1rem',      // 16px
      },
      
      // Mobile-optimized shadows
      boxShadow: {
        'mobile-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'mobile': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'mobile-lg': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'mobile-xl': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      
      // Animation durations optimized for mobile
      transitionDuration: {
        'mobile-fast': '150ms',
        'mobile': '200ms',
        'mobile-slow': '300ms',
      },
      
      // Z-index scale for layering
      zIndex: {
        'mobile-dropdown': '1000',
        'mobile-sticky': '1010',
        'mobile-fixed': '1020',
        'mobile-modal': '1030',
        'mobile-popover': '1040',
        'mobile-tooltip': '1050',
      }
    },
  },
  plugins: [
    // Custom plugin for mobile utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Touch target utilities
        '.touch-target': {
          minHeight: theme('spacing.touch-target'),
          minWidth: theme('spacing.touch-target'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.touch-target-lg': {
          minHeight: theme('spacing.touch-target-lg'),
          minWidth: theme('spacing.touch-target-lg'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        
        // Mobile-first container utilities
        '.container-mobile': {
          width: '100%',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        
        // Mobile-optimized text utilities
        '.text-mobile-readable': {
          fontSize: theme('fontSize.mobile-base[0]'),
          lineHeight: theme('fontSize.mobile-base[1].lineHeight'),
          '@screen sm': {
            fontSize: theme('fontSize.base'),
            lineHeight: theme('lineHeight.6'),
          },
        },
        
        // Mobile-first grid utilities
        '.grid-mobile-1': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme('spacing.4'),
          '@screen md': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: theme('spacing.6'),
          },
        },
        '.grid-mobile-2': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: theme('spacing.3'),
          '@screen md': {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: theme('spacing.4'),
          },
        },
        
        // Mobile-optimized button utilities
        '.btn-mobile': {
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          minHeight: theme('spacing.touch-target'),
          borderRadius: theme('borderRadius.mobile'),
          fontSize: theme('fontSize.mobile-base[0]'),
          fontWeight: theme('fontWeight.semibold'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${theme('transitionDuration.mobile')} ease-in-out`,
          '@screen sm': {
            padding: `${theme('spacing.4')} ${theme('spacing.8')}`,
            fontSize: theme('fontSize.base'),
          },
        },
        
        // Mobile-first form utilities
        '.form-input-mobile': {
          width: '100%',
          padding: theme('spacing.3'),
          minHeight: theme('spacing.touch-target'),
          borderRadius: theme('borderRadius.mobile'),
          border: `1px solid ${theme('colors.gray.300')}`,
          fontSize: theme('fontSize.mobile-base[0]'),
          transition: `border-color ${theme('transitionDuration.mobile')} ease-in-out`,
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.qss.teal'),
            boxShadow: `0 0 0 3px ${theme('colors.qss.teal')}20`,
          },
        },
        
        // Mobile-optimized spacing utilities
        '.space-mobile-y > * + *': {
          marginTop: theme('spacing.mobile-lg'),
          '@screen sm': {
            marginTop: theme('spacing.6'),
          },
        },
        '.space-mobile-x > * + *': {
          marginLeft: theme('spacing.mobile-lg'),
          '@screen sm': {
            marginLeft: theme('spacing.6'),
          },
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
}