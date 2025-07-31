/**
 * Mobile-first theme configuration with CSS custom properties
 * Provides consistent theming across all components with responsive values
 */

export interface ThemeColors {
  qss: {
    teal: string;
    yellow: string;
    green: string;
    tealLight: string;
    tealDark: string;
    yellowLight: string;
    yellowDark: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  touchTarget: string;
  touchTargetLg: string;
}

export interface ThemeTypography {
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface ThemeBorderRadius {
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

export interface ThemeShadows {
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

export interface ThemeTransitions {
  fast: string;
  base: string;
  slow: string;
}

export interface MobileTheme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

/**
 * Mobile-first theme configuration
 */
export const mobileTheme: MobileTheme = {
  colors: {
    qss: {
      teal: 'var(--qss-teal)',
      yellow: 'var(--qss-yellow)',
      green: 'var(--qss-green)',
      tealLight: 'var(--qss-teal-light)',
      tealDark: 'var(--qss-teal-dark)',
      yellowLight: 'var(--qss-yellow-light)',
      yellowDark: 'var(--qss-yellow-dark)',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: 'var(--mobile-space-xs)',
    sm: 'var(--mobile-space-sm)',
    md: 'var(--mobile-space-md)',
    lg: 'var(--mobile-space-lg)',
    xl: 'var(--mobile-space-xl)',
    '2xl': 'var(--mobile-space-2xl)',
    '3xl': 'var(--mobile-space-3xl)',
    touchTarget: 'var(--touch-target-min)',
    touchTargetLg: 'var(--touch-target-comfortable)',
  },
  typography: {
    fontSize: {
      xs: 'var(--mobile-text-xs)',
      sm: 'var(--mobile-text-sm)',
      base: 'var(--mobile-text-base)',
      lg: 'var(--mobile-text-lg)',
      xl: 'var(--mobile-text-xl)',
      '2xl': 'var(--mobile-text-2xl)',
      '3xl': 'var(--mobile-text-3xl)',
      '4xl': '2.5rem', // 40px
    },
    lineHeight: {
      tight: 'var(--mobile-leading-tight)',
      normal: 'var(--mobile-leading-normal)',
      relaxed: 'var(--mobile-leading-relaxed)',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borderRadius: {
    sm: 'var(--mobile-radius-sm)',
    base: 'var(--mobile-radius)',
    lg: 'var(--mobile-radius-lg)',
    xl: 'var(--mobile-radius-xl)',
  },
  shadows: {
    sm: 'var(--mobile-shadow-sm)',
    base: 'var(--mobile-shadow)',
    lg: 'var(--mobile-shadow-lg)',
    xl: 'var(--mobile-shadow-xl)',
  },
  transitions: {
    fast: 'var(--mobile-duration-fast)',
    base: 'var(--mobile-duration)',
    slow: 'var(--mobile-duration-slow)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1010,
    fixed: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050,
  },
};

/**
 * Generate CSS custom properties for theme values
 */
export const generateThemeCSS = (theme: MobileTheme): string => {
  const cssVars: string[] = [];
  
  // Add color variables
  Object.entries(theme.colors.qss).forEach(([key, value]) => {
    if (value.startsWith('var(')) {
      // Skip if already a CSS variable
      return;
    }
    cssVars.push(`--qss-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`);
  });
  
  return `:root {\n  ${cssVars.join('\n  ')}\n}`;
};

/**
 * Theme utility functions
 */
export const themeUtils = {
  /**
   * Get color with opacity
   */
  colorWithOpacity: (color: string, opacity: number): string => {
    if (color.startsWith('var(')) {
      return `rgba(${color.replace('var(', '').replace(')', '')}, ${opacity})`;
    }
    
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
  
  /**
   * Get responsive spacing value
   */
  getSpacing: (size: keyof ThemeSpacing, multiplier: number = 1): string => {
    const value = mobileTheme.spacing[size];
    if (multiplier === 1) return value;
    return `calc(${value} * ${multiplier})`;
  },
  
  /**
   * Get responsive font size
   */
  getFontSize: (size: keyof ThemeTypography['fontSize']): string => {
    return mobileTheme.typography.fontSize[size];
  },
  
  /**
   * Generate button styles
   */
  getButtonStyles: (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: mobileTheme.spacing.touchTarget,
      padding: `${mobileTheme.spacing.md} ${mobileTheme.spacing.xl}`,
      borderRadius: mobileTheme.borderRadius.base,
      fontSize: mobileTheme.typography.fontSize.base,
      fontWeight: mobileTheme.typography.fontWeight.semibold,
      transition: `all ${mobileTheme.transitions.base} ease-in-out`,
      cursor: 'pointer',
      border: 'none',
      textDecoration: 'none',
    };
    
    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${mobileTheme.colors.qss.teal}, ${mobileTheme.colors.qss.yellow})`,
          color: 'white',
          boxShadow: mobileTheme.shadows.base,
          '&:hover': {
            background: `linear-gradient(135deg, ${mobileTheme.colors.qss.yellow}, ${mobileTheme.colors.qss.teal})`,
            boxShadow: mobileTheme.shadows.lg,
            transform: 'translateY(-1px)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${themeUtils.colorWithOpacity(mobileTheme.colors.qss.teal, 0.3)}`,
          },
        };
      
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: mobileTheme.colors.gray[100],
          color: mobileTheme.colors.gray[700],
          '&:hover': {
            backgroundColor: mobileTheme.colors.gray[200],
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${themeUtils.colorWithOpacity(mobileTheme.colors.gray[400], 0.3)}`,
          },
        };
      
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: mobileTheme.colors.qss.teal,
          border: `2px solid ${mobileTheme.colors.qss.teal}`,
          '&:hover': {
            backgroundColor: mobileTheme.colors.qss.teal,
            color: 'white',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${themeUtils.colorWithOpacity(mobileTheme.colors.qss.teal, 0.3)}`,
          },
        };
      
      default:
        return baseStyles;
    }
  },
  
  /**
   * Generate input styles
   */
  getInputStyles: () => ({
    width: '100%',
    minHeight: mobileTheme.spacing.touchTarget,
    padding: mobileTheme.spacing.md,
    border: `1px solid ${mobileTheme.colors.gray[300]}`,
    borderRadius: mobileTheme.borderRadius.base,
    fontSize: mobileTheme.typography.fontSize.base,
    transition: `border-color ${mobileTheme.transitions.base} ease-in-out`,
    '&:focus': {
      outline: 'none',
      borderColor: mobileTheme.colors.qss.teal,
      boxShadow: `0 0 0 3px ${themeUtils.colorWithOpacity(mobileTheme.colors.qss.teal, 0.1)}`,
    },
  }),
  
  /**
   * Generate card styles
   */
  getCardStyles: () => ({
    backgroundColor: 'white',
    borderRadius: mobileTheme.borderRadius.lg,
    boxShadow: mobileTheme.shadows.base,
    padding: mobileTheme.spacing.lg,
    transition: `box-shadow ${mobileTheme.transitions.base} ease-in-out`,
    '&:hover': {
      boxShadow: mobileTheme.shadows.lg,
    },
  }),
};

/**
 * Responsive theme hook
 */
export const useTheme = () => {
  return {
    theme: mobileTheme,
    utils: themeUtils,
  };
};

/**
 * CSS-in-JS theme provider values
 */
export const getThemeProviderValue = () => ({
  ...mobileTheme,
  utils: themeUtils,
});

/**
 * Generate Tailwind-compatible theme object
 */
export const getTailwindTheme = () => ({
  colors: {
    qss: {
      teal: '#58baba',
      yellow: '#ddc946',
      green: '#74a84a',
      'teal-light': '#7dd3d8',
      'teal-dark': '#4a9999',
      'yellow-light': '#e8d96b',
      'yellow-dark': '#c4b63d',
    },
    ...mobileTheme.colors.gray,
  },
  spacing: {
    'mobile-xs': '0.25rem',
    'mobile-sm': '0.5rem',
    'mobile-md': '0.75rem',
    'mobile-lg': '1rem',
    'mobile-xl': '1.5rem',
    'mobile-2xl': '2rem',
    'mobile-3xl': '3rem',
    'touch-target': '2.75rem',
    'touch-target-lg': '3rem',
  },
  fontSize: {
    'mobile-xs': ['0.75rem', { lineHeight: '1rem' }],
    'mobile-sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'mobile-base': ['1rem', { lineHeight: '1.5rem' }],
    'mobile-lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'mobile-xl': ['1.25rem', { lineHeight: '1.75rem' }],
    'mobile-2xl': ['1.5rem', { lineHeight: '2rem' }],
    'mobile-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    'mobile-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
});