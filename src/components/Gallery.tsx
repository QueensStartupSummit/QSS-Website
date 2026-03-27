import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const allImages = [
  { src: '/gallery/qss-break-time-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-dinner-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-mentor-presentation-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-networking-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-speaker-panel-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-symposium-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-symposium2-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-day1-symposium3-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-exec-party-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-exec-party2-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-executive-presentation-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-executive-presentation2-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-executives-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-final-results-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-final-results2-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-first-place-winners-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-first-place-winners-startup-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-first-place-winners-vc-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-opening-final-day-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-opening-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-second-place-winners-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-second-place-winners-startup-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-second-place-winners-vc-2024.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-speaker-presentation-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-sponsor-presentation-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-sponsor-presentation2-pre2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-summit-2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-summit-exec-team-2021.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations10-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations2-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations3-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations4-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations5-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations6-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations7-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations8-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-team-final-presentations9-2022.webp', alt: 'QSS Event Photo' },
  { src: '/gallery/qss-third-place-winners-2022.webp', alt: 'QSS Event Photo' },
];

const TOTAL = allImages.length;

const imageCache = new Set<string>();
function preloadImage(src: string) {
  if (imageCache.has(src)) return;
  const img = new Image();
  img.src = src;
  imageCache.add(src);
}

const CarouselImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(imageCache.has(src));

  return (
    <div className="gallery-slide-inner">
      <img
        src={src}
        alt={alt}
        className="gallery-slide-img"
        decoding="async"
        loading="lazy"
        fetchPriority={loaded ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {!loaded && <div className="gallery-slide-placeholder" />}
    </div>
  );
});
CarouselImage.displayName = 'CarouselImage';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightGalleryLoaded, setLightGalleryLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lgContainerRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<{ openGallery: (index: number) => void; destroy: () => void } | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      containScroll: false,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  // Track selected slide for progress indicator + preloading
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      // Preload nearby images
      for (let i = -2; i <= 5; i++) {
        const target = ((idx + i) % TOTAL + TOTAL) % TOTAL;
        preloadImage(allImages[target].src);
      }
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!isVisible) return;

    allImages.slice(0, 2).forEach((image) => preloadImage(image.src));
  }, [isVisible]);

  // Intersection observer — lazy mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // LightGallery — lazy load
  const loadLightGallery = useCallback(async () => {
    if (lightGalleryLoaded || !isVisible) return;
    try {
      const { default: lightGallery } = await import('lightgallery');
      const lgThumbnail = await import('lightgallery/plugins/thumbnail');
      const lgZoom = await import('lightgallery/plugins/zoom');
      await import('lightgallery/css/lightgallery.css');
      await import('lightgallery/css/lg-zoom.css');
      await import('lightgallery/css/lg-thumbnail.css');

      if (lgContainerRef.current) {
        if (lightGalleryInstance.current) {
          try { lightGalleryInstance.current.destroy(); } catch {}
          lightGalleryInstance.current = null;
        }
        const isMobile = window.innerWidth < 768;
        lightGalleryInstance.current = lightGallery(lgContainerRef.current, {
          selector: '.gallery-lg-item',
          plugins: [lgThumbnail.default, lgZoom.default],
          thumbnail: !isMobile,
          animateThumb: !isMobile,
          speed: isMobile ? 300 : 500,
          enableSwipe: true,
          enableDrag: true,
          closable: true,
          escKey: true,
          controls: true,
          download: false,
          zoom: !isMobile,
          fullScreen: true,
          loop: true,
          preload: isMobile ? 1 : 2,
          pager: false,
          galleryId: 'qss-gallery',
          mobileSettings: {
            controls: true,
            showCloseIcon: true,
            download: false,
          },
        });
        setLightGalleryLoaded(true);
      }
    } catch {
      setLightGalleryLoaded(false);
    }
  }, [isVisible, lightGalleryLoaded]);

  useEffect(() => {
    if (isVisible && !lightGalleryLoaded) loadLightGallery();
    return () => {
      if (lightGalleryInstance.current) {
        try { lightGalleryInstance.current.destroy(); } catch {}
        lightGalleryInstance.current = null;
      }
    };
  }, [isVisible, loadLightGallery, lightGalleryLoaded]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Placeholder before visible
  if (!isVisible) {
    return (
      <section id="gallery" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 flex items-center justify-center">
            <div className="text-gray-400">Loading gallery...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 md:py-28 bg-gradient-to-br from-gray-50 via-gray-100 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            Event{' '}
            <span className="text-[#58baba]">Gallery</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 rounded-full bg-[#58baba]" />
            <div className="h-1 w-16 rounded-full bg-[#ddc946]" />
            <div className="h-1 w-8 rounded-full bg-[#1a1a1a]" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Take a look at some memorable moments from our previous Queen's Startup Summit events
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="gallery-embla-container">
          <div className="gallery-embla-viewport" ref={emblaRef}>
            <div className="gallery-embla-track">
              {allImages.map((image, index) => (
                <div className="gallery-embla-slide" key={image.src}>
                  <div
                    className="gallery-embla-slide-content"
                    onClick={() => {
                      // Open lightgallery at this index
                      if (lightGalleryInstance.current) {
                        lightGalleryInstance.current.openGallery(index);
                      }
                    }}
                  >
                    <CarouselImage src={image.src} alt={image.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons — desktop only */}
          <button
            onClick={scrollPrev}
            className="gallery-nav gallery-nav-prev"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="gallery-nav gallery-nav-next"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress */}
          <div className="gallery-progress">
            <span className="text-sm text-gray-500">
              {selectedIndex + 1} / {TOTAL}
            </span>
          </div>
        </div>

        {/* Hidden container for LightGallery data */}
        <div ref={lgContainerRef} style={{ display: 'none' }}>
          {allImages.map((image) => (
            <a
              key={image.src}
              className="gallery-lg-item"
              href={image.src}
              data-src={image.src}
              data-thumb={image.src}
              data-sub-html="<p>QSS Event Photo</p>"
            >
              {image.alt}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
