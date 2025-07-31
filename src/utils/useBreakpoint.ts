import { useState, useEffect } from 'react';

/**
 * Breakpoint definitions matching Tailwind config
 */
export const breakpoints = {
  xs: 375,   // Small mobile devices (iPhone SE)
  sm: 640,   // Large mobile devices
  md: 768,   // Tablets
  lg: 1024,  // Small laptops
  xl: 1280,  // Large laptops
  '2xl': 1536, // Desktop monitors
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Device type based on screen width
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Get device type based on screen width
 */
export const getDeviceType = (width: number): DeviceType => {
  if (width < breakpoints.md) return 'mobile';
  if (width < breakpoints.lg) return 'tablet';
  return 'desktop';
};

/**
 * Check if current screen width matches a breakpoint
 */
export const isBreakpoint = (width: number, breakpoint: Breakpoint): boolean => {
  return width >= breakpoints[breakpoint];
};

/**
 * Get the current active breakpoint
 */
export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * Hook for responsive breakpoint management
 */
export const useBreakpoint = () => {
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return breakpoints.lg; // Default to desktop for SSR
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Use ResizeObserver if available for better performance
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(document.documentElement);
      
      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback to window resize event
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const currentBreakpoint = getCurrentBreakpoint(screenWidth);
  const deviceType = getDeviceType(screenWidth);

  return {
    // Current screen width
    screenWidth,
    
    // Current breakpoint
    currentBreakpoint,
    
    // Device type
    deviceType,
    
    // Breakpoint checks
    isXs: currentBreakpoint === 'xs',
    isSm: isBreakpoint(screenWidth, 'sm'),
    isMd: isBreakpoint(screenWidth, 'md'),
    isLg: isBreakpoint(screenWidth, 'lg'),
    isXl: isBreakpoint(screenWidth, 'xl'),
    is2Xl: isBreakpoint(screenWidth, '2xl'),
    
    // Device type checks
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    
    // Utility functions
    isBreakpointUp: (breakpoint: Breakpoint) => isBreakpoint(screenWidth, breakpoint),
    isBreakpointDown: (breakpoint: Breakpoint) => screenWidth < breakpoints[breakpoint],
    isBreakpointBetween: (min: Breakpoint, max: Breakpoint) => 
      screenWidth >= breakpoints[min] && screenWidth < breakpoints[max],
  };
};

/**
 * Hook for mobile-specific responsive behavior
 */
export const useMobileBreakpoint = () => {
  const breakpoint = useBreakpoint();
  
  return {
    ...breakpoint,
    
    // Mobile-specific checks
    isSmallMobile: breakpoint.screenWidth < breakpoints.sm,
    isLargeMobile: breakpoint.screenWidth >= breakpoints.sm && breakpoint.screenWidth < breakpoints.md,
    
    // Touch device detection
    isTouchDevice: typeof window !== 'undefined' && 'ontouchstart' in window,
    
    // Mobile orientation
    isPortrait: typeof window !== 'undefined' && window.innerHeight > window.innerWidth,
    isLandscape: typeof window !== 'undefined' && window.innerWidth > window.innerHeight,
    
    // Mobile-specific utilities
    shouldShowMobileMenu: breakpoint.screenWidth < breakpoints.md,
    shouldHide3D: breakpoint.screenWidth < breakpoints.lg,
    shouldStackVertically: breakpoint.screenWidth < breakpoints.md,
    shouldUseCarousel: breakpoint.screenWidth < breakpoints.lg,
    
    // Mobile performance considerations
    shouldReduceAnimations: breakpoint.screenWidth < breakpoints.md,
    shouldLazyLoadImages: breakpoint.screenWidth < breakpoints.lg,
    shouldPreloadCritical: breakpoint.screenWidth >= breakpoints.lg,
  };
};

/**
 * Hook for responsive values based on breakpoints
 */
export const useResponsiveValue = <T>(values: Partial<Record<Breakpoint | DeviceType, T>>) => {
  const { currentBreakpoint, deviceType } = useBreakpoint();
  
  // Try device type first, then specific breakpoint, then fallback
  return values[deviceType] || values[currentBreakpoint] || values.xs || values.mobile;
};

/**
 * Media query utilities for CSS-in-JS
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  
  // Max-width queries
  maxXs: `@media (max-width: ${breakpoints.xs - 1}px)`,
  maxSm: `@media (max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpoints.xl - 1}px)`,
  max2Xl: `@media (max-width: ${breakpoints['2xl'] - 1}px)`,
  
  // Device-specific queries
  mobile: `@media (max-width: ${breakpoints.md - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.lg}px)`,
  
  // Orientation queries
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  
  // High DPI queries
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  
  // Reduced motion
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  
  // Dark mode
  dark: '@media (prefers-color-scheme: dark)',
  
  // Hover capability
  hover: '@media (hover: hover)',
  noHover: '@media (hover: none)',
};

/**
 * Responsive grid columns utility
 */
export const getResponsiveColumns = (
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3
) => {
  const { deviceType } = useBreakpoint();
  
  switch (deviceType) {
    case 'mobile':
      return mobile;
    case 'tablet':
      return tablet;
    case 'desktop':
      return desktop;
    default:
      return mobile;
  }
};

/**
 * Responsive spacing utility
 */
export const getResponsiveSpacing = (
  mobile: string = '1rem',
  tablet: string = '1.5rem',
  desktop: string = '2rem'
) => {
  const { deviceType } = useBreakpoint();
  
  switch (deviceType) {
    case 'mobile':
      return mobile;
    case 'tablet':
      return tablet;
    case 'desktop':
      return desktop;
    default:
      return mobile;
  }
};