
import React, { useEffect, useRef, useState } from 'react';

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-28 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      <style>{`
        @keyframes tm-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tm-scale-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .tm-animate {
          opacity: 0;
        }
        .tm-animate.tm-visible {
          animation: tm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .tm-card-animate {
          opacity: 0;
        }
        .tm-card-animate.tm-visible {
          animation: tm-scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`tm-card-animate ${isVisible ? 'tm-visible' : ''}`}
          >
            <div
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border relative overflow-hidden"
              style={{ borderColor: 'rgba(88, 186, 186, 0.15)' }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#58baba]/10 to-[#58baba]/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ddc946]/5 to-[#ddc946]/10 rounded-full translate-y-12 -translate-x-12" />

              {/* Quote icon */}
              <div
                className={`tm-animate ${isVisible ? 'tm-visible' : ''} flex justify-center mb-8`}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="bg-[#58baba] p-4 rounded-full shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              <blockquote className="relative z-10 text-center">
                <div
                  className={`tm-animate ${isVisible ? 'tm-visible' : ''}`}
                  style={{ animationDelay: '0.2s' }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 italic leading-relaxed mb-6 md:mb-8 font-light">
                    "While case competitions & hackathons tackle each of these aspects independently,
                    the marrying of the two at QSS closely mirrors startup development in the real world."
                  </p>
                </div>

                <footer
                  className={`tm-animate ${isVisible ? 'tm-visible' : ''} flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6`}
                  style={{ animationDelay: '0.35s' }}
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg overflow-hidden"
                    style={{ border: '3px solid #58baba' }}
                  >
                    <img
                      src="/jacob-andreou.webp"
                      alt="Jacob Andreou"
                      className="w-full h-full object-cover object-center"
                      width="96"
                      height="96"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <cite className="font-bold text-lg sm:text-xl not-italic block" style={{ color: '#58baba' }}>Jacob Andreou</cite>
                    <p className="text-gray-600 text-sm sm:text-base">Chief Vice President Microsoft AI</p>
                    <p className="text-gray-600 text-sm sm:text-base">& Former Senior Vice President Snapchat</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
