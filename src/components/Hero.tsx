import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

// Lazy load the 3D component to reduce initial bundle size
const Badge3D = lazy(() => import('./Badge3D'));

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background - optimized for mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-center"
        style={{
          backgroundImage: 'url(/Banner-hero.webp)',
          backgroundPosition: isMobile ? 'center 30%' : 'center center'
        }}
      ></div>



      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-0">
        {/* Mobile-first single column layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
          {/* Content Section - mobile-first approach */}
          <div className="w-full text-center lg:text-left lg:col-span-2 mb-8 lg:mb-0">
            <div className="bg-white/98 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 text-gray-900 max-w-2xl mx-auto lg:mx-0 relative overflow-hidden">
              <div className="relative z-10">
                {/* QSS Logo - responsive sizing */}
                <div className="flex justify-center mb-4 md:mb-6">
                  <img
                    src="/qss-full-logo.webp"
                    alt="Queen's Startup Summit"
                    className="h-28 sm:h-32 md:h-36 lg:h-36 xl:h-40 w-auto max-w-full"
                    width="400"
                    height="292"
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>

                {/* Subtitle - improved mobile readability */}
                <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-gray-600 leading-relaxed font-light px-2 sm:px-0">
                  Students supporting students getting into the startup world across Canada.
                  <span className="block mt-1 font-medium text-gray-700">
                    Any school, any year, any program.
                  </span>
                </p>

                {/* Event Details - mobile-optimized layout */}
                <div className="flex flex-col gap-3 md:gap-4 justify-center lg:justify-start items-center mb-6 md:mb-8">
                  <div className="flex items-center text-sm sm:text-base text-gray-700 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-100 w-full sm:w-auto justify-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#58baba] flex-shrink-0" />
                    <span className="font-medium">Nov 14-16, 2025</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base text-gray-700 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-100 w-full sm:w-auto justify-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#58baba] flex-shrink-0" />
                    <span className="font-medium">Queen's University, Kingston</span>
                  </div>
                </div>

                {/* Action Buttons - mobile-first touch targets (44px minimum) */}
                <div className="flex flex-col gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
                  <button className="group bg-gradient-to-r from-[#58baba] to-[#ddc946] text-white px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:from-[#ddc946] hover:to-[#58baba] flex items-center justify-center shadow-xl hover:shadow-2xl border-none cursor-pointer relative overflow-hidden w-full sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative text-sm sm:text-base">Register Now</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 relative group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    className="group border-2 border-[#58baba] text-[#58baba] bg-transparent px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-xl font-semibold transition-all duration-300 hover:bg-[#58baba] hover:text-white hover:shadow-lg cursor-pointer relative overflow-hidden w-full sm:w-auto"
                    onClick={() => scrollToSection('about')}
                  >
                    <span className="relative text-sm sm:text-base">Learn More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Badge3D Section - lazy loaded and conditionally rendered only on desktop */}
          {!isMobile && (
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center h-full w-full p-8">
              <div className="relative w-full h-full max-w-full max-h-full flex justify-center items-center">
                <div className="relative w-full h-full flex justify-center items-center">
                  <Suspense fallback={
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58baba]"></div>
                    </div>
                  }>
                    <Badge3D />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;