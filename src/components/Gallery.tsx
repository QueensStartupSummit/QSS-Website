import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lightGalleryLoaded, setLightGalleryLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [autoPlayKey, setAutoPlayKey] = useState(0); // Key to reset auto-play timer
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const allImages = [
    { src: '/gallery/qss-break-time-pre2021.webp', thumb: '/gallery/qss-break-time-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-dinner-2022.webp', thumb: '/gallery/qss-day1-dinner-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-mentor-presentation-2024.webp', thumb: '/gallery/qss-day1-mentor-presentation-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-networking-2024.webp', thumb: '/gallery/qss-day1-networking-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-speaker-panel-2022.webp', thumb: '/gallery/qss-day1-speaker-panel-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-symposium-2022.webp', thumb: '/gallery/qss-day1-symposium-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-symposium2-2022.webp', thumb: '/gallery/qss-day1-symposium2-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-day1-symposium3-2022.webp', thumb: '/gallery/qss-day1-symposium3-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-exec-party-pre2021.webp', thumb: '/gallery/qss-exec-party-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-exec-party2-pre2021.webp', thumb: '/gallery/qss-exec-party2-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-executive-presentation-pre2021.webp', thumb: '/gallery/qss-executive-presentation-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-executive-presentation2-pre2021.webp', thumb: '/gallery/qss-executive-presentation2-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-executives-2022.webp', thumb: '/gallery/qss-executives-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-final-results-2022.webp', thumb: '/gallery/qss-final-results-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-final-results2-2022.webp', thumb: '/gallery/qss-final-results2-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-first-place-winners-2022.webp', thumb: '/gallery/qss-first-place-winners-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-first-place-winners-startup-2024.webp', thumb: '/gallery/qss-first-place-winners-startup-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-first-place-winners-vc-2024.webp', thumb: '/gallery/qss-first-place-winners-vc-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-opening-final-day-2024.webp', thumb: '/gallery/qss-opening-final-day-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-opening-pre2021.webp', thumb: '/gallery/qss-opening-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-second-place-winners-2022.webp', thumb: '/gallery/qss-second-place-winners-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-second-place-winners-startup-2024.webp', thumb: '/gallery/qss-second-place-winners-startup-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-second-place-winners-vc-2024.webp', thumb: '/gallery/qss-second-place-winners-vc-2024.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-speaker-presentation-pre2021.webp', thumb: '/gallery/qss-speaker-presentation-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-sponsor-presentation-pre2021.webp', thumb: '/gallery/qss-sponsor-presentation-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-sponsor-presentation2-pre2021.webp', thumb: '/gallery/qss-sponsor-presentation2-pre2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-summit-2021.webp', thumb: '/gallery/qss-summit-2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-summit-exec-team-2021.webp', thumb: '/gallery/qss-summit-exec-team-2021.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations-2022.webp', thumb: '/gallery/qss-team-final-presentations-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations10-2022.webp', thumb: '/gallery/qss-team-final-presentations10-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations2-2022.webp', thumb: '/gallery/qss-team-final-presentations2-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations3-2022.webp', thumb: '/gallery/qss-team-final-presentations3-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations4-2022.webp', thumb: '/gallery/qss-team-final-presentations4-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations5-2022.webp', thumb: '/gallery/qss-team-final-presentations5-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations6-2022.webp', thumb: '/gallery/qss-team-final-presentations6-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations7-2022.webp', thumb: '/gallery/qss-team-final-presentations7-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations8-2022.webp', thumb: '/gallery/qss-team-final-presentations8-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-team-final-presentations9-2022.webp', thumb: '/gallery/qss-team-final-presentations9-2022.webp', alt: 'QSS Event Photo' },
    { src: '/gallery/qss-third-place-winners-2022.webp', thumb: '/gallery/qss-third-place-winners-2022.webp', alt: 'QSS Event Photo' }
  ];

  // Use images in original order
  const shuffledImages = allImages;

  // Calculate slide width - full width on mobile for single image display
  const [slideWidth, setSlideWidth] = useState(520);
  
  useEffect(() => {
    const updateSlideWidth = () => {
      if (isMobile) {
        setSlideWidth(window.innerWidth - 32); // Full width minus padding on mobile
      } else {
        setSlideWidth(520); // 500px + 20px margin on desktop
      }
    };
    
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [isMobile]);

  // Mobile detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Preload images for smoother carousel experience - reduced count for mobile
  useEffect(() => {
    if (!isVisible) return;

    const preloadImages = () => {
      // Reduce preload count on mobile for better performance
      const preloadCount = isMobile ? 4 : 8;
      for (let i = 0; i < Math.min(preloadCount, shuffledImages.length); i++) {
        const index = (currentIndex + i) % shuffledImages.length;
        const imageSrc = shuffledImages[index].thumb;

        if (!loadedImages.has(imageSrc)) {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(imageSrc));
          };
          img.src = imageSrc;
        }
      }
    };

    preloadImages();
  }, [currentIndex, shuffledImages, isVisible, loadedImages, isMobile]);



  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  // Auto-play functionality - only when visible, with mobile-appropriate behavior
  useEffect(() => {
    if (!isVisible) return;

    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Mobile-appropriate auto-play: slower on mobile or disabled based on preference
    const autoPlayInterval = isMobile ? 5000 : 3000; // Slower on mobile
    
    // Start new interval
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    }, autoPlayInterval);

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [shuffledImages.length, isVisible, autoPlayKey, isMobile]); // Include isMobile to adjust timing

  // Touch gesture handling for mobile swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(false);
    // Pause auto-play during touch interaction
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Set dragging state if user has moved significantly
    const distance = Math.abs(touchStart - currentTouch);
    if (distance > 10) {
      setIsDragging(true);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) {
      // Resume auto-play if no swipe occurred
      setAutoPlayKey(prev => prev + 1);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    } else {
      // Resume auto-play if swipe wasn't significant enough
      setAutoPlayKey(prev => prev + 1);
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Lazy load LightGallery only when needed - with mobile optimizations
  const loadLightGallery = useCallback(async () => {
    if (lightGalleryLoaded || !isVisible) return;

    try {
      const { default: lightGallery } = await import('lightgallery');
      const lgThumbnail = await import('lightgallery/plugins/thumbnail');
      const lgZoom = await import('lightgallery/plugins/zoom');

      await import('lightgallery/css/lightgallery.css');
      await import('lightgallery/css/lg-zoom.css');
      await import('lightgallery/css/lg-thumbnail.css');

      if (carouselRef.current) {
        // Destroy existing instance safely
        if (lightGalleryInstance.current) {
          try {
            lightGalleryInstance.current.destroy();
          } catch (e) {
            console.log('Error destroying lightGallery instance');
          }
          lightGalleryInstance.current = null;
        }

        // Initialize new instance with mobile-optimized settings
        lightGalleryInstance.current = lightGallery(carouselRef.current, {
          selector: '.carousel-cell',
          plugins: [lgThumbnail.default, lgZoom.default],
          thumbnail: !isMobile, // Disable thumbnails on mobile for better performance
          animateThumb: !isMobile,
          allowMediaOverlap: true,
          toggleThumb: !isMobile,
          speed: isMobile ? 300 : 500, // Faster transitions on mobile
          swipeThreshold: 50, // Touch-friendly swipe threshold
          enableSwipe: true,
          enableDrag: true,
          closable: true,
          escKey: true,
          keyPress: true,
          controls: true,
          mousewheel: !isMobile, // Disable mousewheel on mobile
          download: false, // Disable download on mobile
          zoom: !isMobile, // Disable zoom on mobile for better touch experience
          fullScreen: true,
          autoplayFirstVideo: false,
          pager: false,
          galleryId: 'qss-gallery',
          startClass: 'lg-start-zoom',
          backdropDuration: 300,
          hideBarsDelay: 2000,
          useLeft: false,
          loop: true,
          hideControlOnEnd: false,
          preload: isMobile ? 1 : 2, // Reduce preload on mobile
          showAfterLoad: true,
          selectWithin: '',
          nextHtml: '',
          prevHtml: '',
          index: 0,
          iframeMaxWidth: '100%',
          iframeMaxHeight: '100%',
          mobileSettings: {
            controls: true,
            showCloseIcon: true,
            download: false,
            rotate: false
          }
        });

        setLightGalleryLoaded(true);
      }
    } catch (error) {
      console.log('LightGallery not available');
    }
  }, [isVisible, lightGalleryLoaded, isMobile]);

  // Initialize LightGallery when visible
  useEffect(() => {
    if (isVisible && !lightGalleryLoaded) {
      loadLightGallery();
    }

    return () => {
      if (lightGalleryInstance.current) {
        try {
          lightGalleryInstance.current.destroy();
        } catch (e) {
          console.log('Error destroying lightGallery instance on cleanup');
        }
        lightGalleryInstance.current = null;
      }
    };
  }, [isVisible, loadLightGallery, lightGalleryLoaded]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    // Reset auto-play timer when user manually navigates
    setAutoPlayKey(prev => prev + 1);
  }, [shuffledImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length);
    // Reset auto-play timer when user manually navigates
    setAutoPlayKey(prev => prev + 1);
  }, [shuffledImages.length]);

  // Optimized image component with global loading state
  const CarouselImage = ({ src, alt, className }: {
    src: string;
    alt: string;
    className?: string;
  }) => {
    const isLoaded = loadedImages.has(src);

    return (
      <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={src}
          alt={alt}
          className="carousel-image"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        />
        {!isLoaded && (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center absolute inset-0">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
      </div>
    );
  };

  // Don't render anything until visible
  if (!isVisible) {
    return (
      <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 flex items-center justify-center">
            <div className="text-gray-400">Loading gallery...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Event
            <span className="block" style={{ color: '#58baba' }}>Gallery</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#ddc946' }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Take a look at some memorable moments from our previous Queen's Startup Summit events
          </p>
        </div>

        {/* Flickity-style Carousel with Touch Support */}
        <div className="carousel-container">
          <div
            ref={carouselRef}
            id="flickity-carousel-gallery-demo"
            className="main-carousel"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <div
              className="flickity-slider"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
                transition: 'transform 0.5s ease'
              }}
            >
              {shuffledImages.map((image, index) => {
                return (
                  <a
                    key={index}
                    href={image.src}
                    data-lg-size="1600-1200"
                    data-src={image.src}
                    data-thumb={image.thumb}
                    data-sub-html={`<p>QSS Event Photo</p>`}
                    className={`carousel-cell ${isDragging ? 'dragging' : ''}`}
                  >
                    <CarouselImage
                      src={image.thumb}
                      alt={image.alt}
                      className="w-full h-full"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on Mobile */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="carousel-nav carousel-nav-prev"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="carousel-nav carousel-nav-next"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Mobile Touch Indicator and Progress */}
          {isMobile && (
            <div className="mobile-touch-indicator">
              <div className="flex items-center justify-center mt-4 mb-2">
                <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                  <span className="mr-2">👆</span>
                  Swipe left or right to browse images
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-1">
                {shuffledImages.slice(0, Math.min(5, shuffledImages.length)).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentIndex % 5 ? 'bg-[#58baba]' : 'bg-gray-300'
                    }`}
                  />
                ))}
                {shuffledImages.length > 5 && (
                  <span className="text-xs text-gray-400 ml-2">
                    {currentIndex + 1} / {shuffledImages.length}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
          .carousel-container {
            position: relative;
            max-width: 1400px;
            margin: 0 auto;
            touch-action: pan-y pinch-zoom; /* Allow vertical scrolling and pinch zoom but handle horizontal touches */
          }

          .main-carousel {
            overflow: hidden;
            border-radius: 12px;
            background: #f8f9fa;
            touch-action: pan-y pinch-zoom;
            user-select: none;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
          }

          .flickity-slider {
            display: flex;
            width: fit-content;
          }

          .carousel-cell {
            width: ${isMobile ? 'calc(100vw - 32px)' : '500px'};
            height: ${isMobile ? '250px' : '350px'};
            margin-right: ${isMobile ? '0px' : '20px'};
            flex-shrink: 0;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
            display: block;
            touch-action: manipulation;
          }

          .carousel-cell:hover {
            transform: ${isMobile ? 'none' : 'scale(1.05)'};
          }

          .carousel-cell:active {
            transform: ${isMobile ? 'scale(0.98)' : 'scale(1.05)'};
          }

          .carousel-cell.dragging {
            transition: none;
            transform: scale(0.98);
          }

          .carousel-cell img,
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
          }

          .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(88, 186, 186, 0.8);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }

          .carousel-nav:hover {
            background: rgba(88, 186, 186, 1);
            transform: translateY(-50%) scale(1.1);
          }

          .carousel-nav:active {
            transform: translateY(-50%) scale(0.95);
            background: rgba(88, 186, 186, 1);
          }

          .carousel-nav-prev {
            left: ${isMobile ? '10px' : '-25px'};
          }

          .carousel-nav-next {
            right: ${isMobile ? '10px' : '-25px'};
          }

          .mobile-touch-indicator {
            margin-top: 16px;
            opacity: 0.7;
          }

          /* Mobile-specific responsive adjustments */
          @media (max-width: 480px) {
            .carousel-cell {
              width: calc(100vw - 32px) !important;
              height: 220px;
            }
          }

          /* LightGallery mobile optimizations */
          :global(.lg-item img) {
            height: ${isMobile ? 'auto' : '600px'} !important;
            max-height: ${isMobile ? '80vh' : '600px'} !important;
            object-fit: contain;
          }

          :global(.lg-outer) {
            touch-action: manipulation;
          }

          :global(.lg-thumb-outer) {
            display: ${isMobile ? 'none' : 'block'} !important;
          }

          :global(.lg-toolbar) {
            background: ${isMobile ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.45)'} !important;
          }

          :global(.lg-actions .lg-next),
          :global(.lg-actions .lg-prev) {
            width: ${isMobile ? '44px' : '50px'} !important;
            height: ${isMobile ? '44px' : '50px'} !important;
            line-height: ${isMobile ? '44px' : '50px'} !important;
            font-size: ${isMobile ? '18px' : '24px'} !important;
          }

          :global(.lg-sub-html) {
            display: ${isMobile ? 'none' : 'block'} !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Gallery;