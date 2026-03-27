import React, { useEffect, useRef, useState } from 'react';
import { Users, Trophy, Lightbulb, School, ArrowRight } from 'lucide-react';

const About = () => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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

  const stats = [
    { icon: Users, number: '600+', label: 'Total Participants' },
    { icon: Trophy, number: '$35K+', label: 'Awarded in Prizes' },
    { icon: Lightbulb, number: '200+', label: 'Ideas Pitched' },
    { icon: School, number: '25+', label: 'Schools Represented' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-28 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden"
    >
      <style>{`
        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ab-scale-in {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        .ab-animate {
          opacity: 0;
        }
        .ab-animate.ab-visible {
          animation: ab-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ab-scale-animate {
          opacity: 0;
        }
        .ab-scale-animate.ab-visible {
          animation: ab-scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ab-cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .ab-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(221, 201, 70, 0.5);
        }
        .ab-cta-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .ab-cta-btn:hover::after {
          left: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div
              className={`ab-animate ${isVisible ? 'ab-visible' : ''}`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
                About Queen's
                <span className="block text-[#58baba]">Startup Summit</span>
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <div className="h-1 w-8 rounded-full bg-[#58baba]" />
                <div className="h-1 w-16 rounded-full bg-[#ddc946]" />
                <div className="h-1 w-8 rounded-full bg-[#1a1a1a]" />
              </div>
            </div>

            <div
              className={`ab-animate ${isVisible ? 'ab-visible' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Queen's Startup Summit (QSS) is a student-run club founded by a group of undergraduate students,
                  in partnership with the Queen's Innovation Connector, in 2013. At QSS, we support the advancement
                  of student entrepreneurship by providing an opportunity for students to collaborate, compete, and
                  realize their potential through our events, including our annual Summit.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  The Summit is a fast-paced competition in which delegates compete in teams to develop ideas into
                  real ventures, incorporating aspects of design, technology, and business. Through engaging speakers,
                  activities, and mentorship provided by industry professionals, we give delegates the knowledge and
                  access to expertise to bring those ideas to life.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  The summit allows delegates to expand their professional network and find inspiration in the speakers,
                  mentors, and judges who attend. <span className="font-semibold text-[#58baba]">It's the perfect opportunity for YOU!</span>
                </p>
              </div>
            </div>

            <div
              className={`ab-animate ${isVisible ? 'ab-visible' : ''} flex justify-center lg:justify-start`}
              style={{ animationDelay: '0.2s' }}
            >
              <button
                className="ab-cta-btn inline-flex items-center gap-3 text-white px-7 py-3.5 rounded-xl font-bold text-lg shadow-lg bg-[#ddc946]"
                onClick={() => scrollToSection('get-involved')}
              >
                Get Involved Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`ab-scale-animate ${isVisible ? 'ab-visible' : ''} relative order-1 lg:order-2 w-full`}
            style={{ animationDelay: '0.15s' }}
          >
            <img
              src="/team.webp"
              alt="QSS Event"
              className="rounded-2xl shadow-xl w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[465px] object-cover"
              width="800"
              height="465"
              loading="lazy"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`ab-scale-animate ${isVisible ? 'ab-visible' : ''} text-center`}
              style={{ animationDelay: `${0.3 + index * 0.08}s` }}
            >
              <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg h-full flex flex-col justify-between min-h-[120px] sm:min-h-[140px] md:min-h-[160px] border border-gray-100">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto mb-2 sm:mb-3 md:mb-4 text-[#58baba]" aria-hidden="true" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight px-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
