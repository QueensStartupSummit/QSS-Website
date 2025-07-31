/**
 * Mobile-first responsive utilities and breakpoint management
 * Centralized exports for all mobile optimization utilities
 */

// Breakpoint management
export {
  useBreakpoint,
  useMobileBreakpoint,
  useResponsiveValue,
  breakpoints,
  mediaQueries,
  getDeviceType,
  isBreakpoint,
  getCurrentBreakpoint,
  getResponsiveColumns,
  getResponsiveSpacing,
  type Breakpoint,
  type DeviceType,
} from './useBreakpoint';

// Responsive image utilities
export {
  generateSrcSet,
  getOptimizedImageSrc,
  getResponsiveSizes,
  getResponsiveImageProps,
  useResponsiveImage,
  preloadCriticalImages,
  createLazyImageObserver,
  MobileImageStrategy,
  getResponsiveBackgroundImage,
  type ResponsiveImageConfig,
  type ImageDensity,
} from './responsive-images';

// Theme and styling utilities
export {
  mobileTheme,
  themeUtils,
  useTheme,
  getThemeProviderValue,
  getTailwindTheme,
  generateThemeCSS,
  type MobileTheme,
  type ThemeColors,
  type ThemeSpacing,
  type ThemeTypography,
  type ThemeBorderRadius,
  type ThemeShadows,
  type ThemeTransitions,
} from './theme';

// Re-export commonly used combinations
export const MobileUtils = {
  // Breakpoint utilities
  breakpoints,
  mediaQueries,
  
  // Theme utilities
  theme: mobileTheme,
  themeUtils,
  
  // Image utilities
  imageStrategy: MobileImageStrategy,
};

// Common mobile-first patterns
export const MobilePatterns = {
  // Touch target sizing
  touchTarget: {
    minHeight: '2.75rem', // 44px
    minWidth: '2.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Mobile-first container
  container: {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  
  // Mobile-optimized button
  button: {
    padding: '0.75rem 1.5rem',
    minHeight: '2.75rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 200ms ease-in-out',
  },
  
  // Mobile-first form input
  input: {
    width: '100%',
    minHeight: '2.75rem',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  
  // Mobile-optimized card
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    padding: '1rem',
  },
  
  // Mobile-first grid
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  
  // Mobile-optimized text
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '0.75rem',
  },
};