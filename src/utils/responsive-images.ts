/**
 * Responsive image utilities for mobile-optimized image serving
 * Provides appropriate image densities and sizes for different devices
 */

export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export interface ImageDensity {
  '1x': string;
  '2x'?: string;
  '3x'?: string;
}

/**
 * Generate responsive image srcSet for different device densities
 */
export const generateSrcSet = (baseSrc: string, densities: ImageDensity): string => {
  const srcSetParts: string[] = [];
  
  Object.entries(densities).forEach(([density, src]) => {
    if (src) {
      srcSetParts.push(`${src} ${density}`);
    }
  });
  
  return srcSetParts.join(', ');
};

/**
 * Get optimized image source based on screen size and device pixel ratio
 */
export const getOptimizedImageSrc = (
  baseSrc: string, 
  screenWidth: number, 
  devicePixelRatio: number = 1
): string => {
  // For mobile devices (< 768px), use smaller images
  if (screenWidth < 768) {
    if (devicePixelRatio >= 3) {
      return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '-mobile@3x.$1');
    } else if (devicePixelRatio >= 2) {
      return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '-mobile@2x.$1');
    } else {
      return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '-mobile.$1');
    }
  }
  
  // For tablet devices (768px - 1024px)
  if (screenWidth < 1024) {
    if (devicePixelRatio >= 2) {
      return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '-tablet@2x.$1');
    } else {
      return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '-tablet.$1');
    }
  }
  
  // For desktop devices, use original or high-res versions
  if (devicePixelRatio >= 2) {
    return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1');
  }
  
  return baseSrc;
};

/**
 * Mobile-first responsive image sizes attribute
 */
export const getResponsiveSizes = (config?: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string => {
  const {
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw'
  } = config || {};
  
  return `(max-width: 767px) ${mobile}, (max-width: 1023px) ${tablet}, ${desktop}`;
};

/**
 * Generate responsive image props for different breakpoints
 */
export const getResponsiveImageProps = (
  src: string,
  alt: string,
  options?: {
    sizes?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
    };
    loading?: 'lazy' | 'eager';
    className?: string;
    priority?: boolean;
  }
): ResponsiveImageConfig => {
  const { sizes, loading = 'lazy', className = '', priority = false } = options || {};
  
  return {
    src,
    alt,
    sizes: getResponsiveSizes(sizes),
    className: `responsive-image ${className}`.trim(),
    loading: priority ? 'eager' : loading,
    priority
  };
};

/**
 * Hook for responsive image loading based on screen size
 */
export const useResponsiveImage = (baseSrc: string) => {
  const getImageSrc = () => {
    if (typeof window === 'undefined') return baseSrc;
    
    const screenWidth = window.innerWidth;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    return getOptimizedImageSrc(baseSrc, screenWidth, devicePixelRatio);
  };
  
  return {
    src: getImageSrc(),
    srcSet: generateSrcSet(baseSrc, {
      '1x': baseSrc,
      '2x': baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1'),
      '3x': baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '@3x.$1')
    })
  };
};

/**
 * Preload critical images for better mobile performance
 */
export const preloadCriticalImages = (images: string[]) => {
  if (typeof window === 'undefined') return;
  
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer for mobile performance
 */
export const createLazyImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Mobile-optimized image loading strategy
 */
export const MobileImageStrategy = {
  // Reduce image quality on slow connections
  getQualityBasedSrc: (src: string, connectionSpeed: 'slow' | 'fast' = 'fast') => {
    if (connectionSpeed === 'slow') {
      return src.replace(/\.(jpg|jpeg)$/i, '-compressed.$1');
    }
    return src;
  },
  
  // Get appropriate image format based on browser support
  getOptimalFormat: (src: string): string => {
    if (typeof window === 'undefined') return src;
    
    // Check for WebP support
    const canvas = document.createElement('canvas');
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (webpSupported) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return src;
  },
  
  // Determine if device is on a slow connection
  isSlowConnection: (): boolean => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return false;
    }
    
    const connection = (navigator as any).connection;
    return connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    );
  }
};

/**
 * Generate responsive background image CSS
 */
export const getResponsiveBackgroundImage = (
  src: string,
  options?: {
    position?: string;
    size?: string;
    repeat?: string;
  }
) => {
  const { position = 'center', size = 'cover', repeat = 'no-repeat' } = options || {};
  
  return {
    backgroundImage: `url(${src})`,
    backgroundPosition: position,
    backgroundSize: size,
    backgroundRepeat: repeat,
    // Mobile-specific optimizations
    '@media (max-width: 767px)': {
      backgroundPosition: 'center 30%', // Better mobile positioning
      backgroundAttachment: 'scroll', // Prevent iOS issues
    }
  };
};