
import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Users, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';

const opportunities = [
  {
    icon: BookOpen,
    title: 'LEARN',
    number: '01',
    description: 'Develop technical and business skills through expert-led workshops run by our event partners, gaining hands-on experience with industry-relevant expertise.',
    accent: '#58baba',
  },
  {
    icon: Users,
    title: 'NETWORK',
    number: '02',
    description: 'Forge lasting professional connections with company representatives from Canada\'s most successful businesses and expand your professional circle.',
    accent: '#ddc946',
  },
  {
    icon: Lightbulb,
    title: 'GET INSPIRED',
    number: '03',
    description: 'Hear from visionary leaders and innovative organizations across Canada\'s startup ecosystem to ignite your next breakthrough idea.',
    accent: '#1a1a1a',
  },
];

const GetInvolved = () => {
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
      id="get-involved"
      ref={sectionRef}
      className="py-16 md:py-28 bg-gradient-to-br from-gray-100 via-white to-gray-50 overflow-hidden"
    >
      <style>{`
        @keyframes gi-fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gi-slide-in {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gi-scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .gi-animate {
          opacity: 0;
        }
        .gi-animate.gi-visible {
          animation: gi-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gi-card-animate {
          opacity: 0;
        }
        .gi-card-animate.gi-visible {
          animation: gi-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gi-img-animate {
          opacity: 0;
        }
        .gi-img-animate.gi-visible {
          animation: gi-scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .gi-opp-card {
          position: relative;
        }

        .gi-cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .gi-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(221, 201, 70, 0.5);
        }
        .gi-cta-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .gi-cta-btn:hover::after {
          left: 100%;
        }

        .gi-number {
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }

        .gi-img-wrapper {
          position: relative;
        }
        .gi-img-wrapper::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(88, 186, 186, 0.12), rgba(221, 201, 70, 0.08));
          z-index: -1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-20 gi-animate ${isVisible ? 'gi-visible' : ''}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            Get Involved
            <span className="block text-[#58baba]">with QSS</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 rounded-full bg-[#58baba]" />
            <div className="h-1 w-16 rounded-full bg-[#ddc946]" />
            <div className="h-1 w-8 rounded-full bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Left: Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Delegate intro */}
            <div
              className={`gi-card-animate ${isVisible ? 'gi-visible' : ''} mb-8`}
              style={{ animationDelay: '0.15s' }}
            >
              <div
                className="rounded-2xl p-6 sm:p-8 border"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'rgba(88, 186, 186, 0.2)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-[#58baba]"
                  >
                    <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[#58baba]"
                  >
                    BE A DELEGATE
                  </h3>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  No matter your level of experience or background, we believe that everyone has the potential
                  to be entrepreneurial and innovative. Queen's Startup Summit welcomes delegates from all years
                  of academic study, faculties, and universities across Canada.
                </p>
              </div>
            </div>

            {/* Opportunity cards */}
            <div className="space-y-4 mb-8">
              {opportunities.map((opp, index) => (
                <div
                  key={opp.title}
                  className={`gi-opp-card gi-card-animate ${isVisible ? 'gi-visible' : ''} bg-white rounded-xl p-5 sm:p-6 border border-gray-100/80`}
                  style={{
                    animationDelay: `${0.25 + index * 0.1}s`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ backgroundColor: opp.accent }}
                  />
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: opp.accent }}
                      >
                        <opp.icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <span
                        className="gi-number text-xs font-bold"
                        style={{ color: opp.accent, opacity: 0.6 }}
                      >
                        {opp.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-bold text-lg sm:text-xl mb-1.5 tracking-tight"
                        style={{ color: opp.accent }}
                      >
                        {opp.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {opp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`gi-card-animate ${isVisible ? 'gi-visible' : ''}`}
              style={{ animationDelay: '0.55s' }}
            >
              <button
                className="gi-cta-btn flex items-center gap-3 text-white px-7 py-3.5 rounded-xl font-bold text-lg shadow-lg mx-auto lg:mx-0 bg-[#ddc946]"
              >
                Register Now as a Delegate
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className={`gi-img-animate ${isVisible ? 'gi-visible' : ''} h-full`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="gi-img-wrapper h-full">
                <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                  <img
                    src="/summit.webp"
                    alt="Get Involved with QSS"
                    className="w-full h-[420px] sm:h-[500px] lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                    width="800"
                    height="620"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(88, 186, 186, 0.55) 0%, rgba(88, 186, 186, 0.1) 35%, transparent 60%)',
                    }}
                  />
                  {/* Bottom card */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div
                      className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border"
                      style={{ borderColor: 'rgba(88, 186, 186, 0.2)' }}
                    >
                      <p className="font-bold text-base text-[#58baba]">
                        Join Delegates from Across Canada
                      </p>
                      <p className="text-gray-500 text-sm mt-0.5">
                        From a wide range of different faculties and universities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
