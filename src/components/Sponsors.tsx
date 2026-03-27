
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const majorSponsors = [
  {
    name: 'TD Invent',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfauaXxYHkp4_mM2lpVzm-APkdZcBp6xUfHg&s',
    website: 'https://tdinvent.td.com/',
  },
  {
    name: 'Microsoft Reactor',
    logo: 'https://learn.microsoft.com/en-us/shows/learn-live/azure-ai-helping-hand/media/reactors.png',
    website: 'https://developer.microsoft.com/en-us/reactor/',
  },
];

const sponsors = [
  {
    name: 'CIBC Capital Markets',
    logo: 'https://researchcentral.cibccm.com/assets/images/CIBC_LOB_H2L_CM_rgb.png',
    website: 'https://www.cibc.com/en/commercial-banking/capital-markets',
  },
  {
    name: 'DMZ',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/DMZ_logoBlack-01.png',
    website: 'https://dmz.torontomu.ca/',
  },
  {
    name: 'futurpreneur',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjRDrn4LmtXVfumKFiE5aRRqG60gltYSubw&s',
    website: 'https://www.futurpreneur.ca/',
  },
  {
    name: 'CVCA',
    logo: 'https://entrevestor.com/images/uploads/_entry/CVCA_logo_-_2019.jpg',
    website: 'https://www.cvca.ca/',
  },
  {
    name: 'Secure Digital Markets',
    logo: 'https://cdn.prod.website-files.com/6542c558790cbcc1ce789de0/6542c558790cbcc1ce789fcf_logo%20vertical%20-%20color%20black.svg',
    website: 'https://www.securedigitalmarkets.com/',
  },
  {
    name: 'Neo Financial',
    logo: 'https://mms.businesswire.com/media/20241009155090/en/2266539/4/Neo-Financial-Logo_Black-Bordered_RGB.jpg',
    website: 'https://www.neofinancial.com/',
  },
  {
    name: 'Ace Beverage Group',
    logo: 'https://images.squarespace-cdn.com/content/v1/6153b2a0425ae037d899d513/1637011437524-1VTCSKYRW4L2ZRDIQTXC/ace.png',
    website: 'https://www.acebeveragegroup.com/',
  },
  {
    name: 'Red Bull',
    logo: 'https://www.svgrepo.com/download/303227/redbull-logo.svg',
    website: 'https://www.redbull.com/',
  },
];

const Sponsors = () => {
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

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="py-16 md:py-28 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      <style>{`
        @keyframes sp-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sp-scale-in {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        .sp-animate {
          opacity: 0;
        }
        .sp-animate.sp-visible {
          animation: sp-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sp-card-animate {
          opacity: 0;
        }
        .sp-card-animate.sp-visible {
          animation: sp-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sp-logo-card {
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sp-logo-card:hover {
          box-shadow: 0 8px 30px -8px rgba(88, 186, 186, 0.18);
          border-color: rgba(88, 186, 186, 0.3);
        }

        .sp-cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .sp-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(221, 201, 70, 0.5);
        }
        .sp-cta-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .sp-cta-btn:hover::after {
          left: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-20 sp-animate ${isVisible ? 'sp-visible' : ''}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            Our{' '}
            <span className="text-[#58baba]">Sponsors</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 rounded-full bg-[#58baba]" />
            <div className="h-1 w-16 rounded-full bg-[#ddc946]" />
            <div className="h-1 w-8 rounded-full bg-[#1a1a1a]" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with industry leaders who share our vision of fostering
            entrepreneurship and innovation among students.
          </p>
        </div>

        {/* Major Sponsors */}
        <div className="mb-16 md:mb-20">
          <div
            className={`sp-animate ${isVisible ? 'sp-visible' : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase text-center mb-8 md:mb-12 text-[#58baba]">
              Major Sponsors
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            {majorSponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className={`sp-card-animate ${isVisible ? 'sp-visible' : ''}`}
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}
              >
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div
                    className="sp-logo-card bg-white rounded-2xl p-10 md:p-12 border border-gray-100"
                    style={{ boxShadow: '0 2px 16px -4px rgba(0,0,0,0.06)' }}
                  >
                    <div className="h-40 flex items-center justify-center">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Sponsors */}
        <div>
          <div
            className={`sp-animate ${isVisible ? 'sp-visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase text-center mb-8 md:mb-12 text-[#1a1a1a]">
              Supporting Sponsors
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className={`sp-card-animate ${isVisible ? 'sp-visible' : ''}`}
                style={{ animationDelay: `${0.35 + index * 0.06}s` }}
              >
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div
                    className="sp-logo-card bg-white rounded-xl p-4 md:p-6 border border-gray-100 aspect-square flex items-center justify-center"
                    style={{ boxShadow: '0 1px 8px -2px rgba(0,0,0,0.05)' }}
                  >
                     <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-48 w-48 object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-center">
                      <p className="text-gray-400 text-sm font-medium">{sponsor.name}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-14 md:mt-20 sp-animate ${isVisible ? 'sp-visible' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <div
            className="rounded-2xl p-8 md:p-10 text-center border"
            style={{
              backgroundColor: 'white',
              borderColor: 'rgba(88, 186, 186, 0.2)',
            }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Interested in Sponsoring?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of forward-thinking organizations supporting the next generation of entrepreneurs.
            </p>
            <button
              className="sp-cta-btn inline-flex items-center gap-3 text-white px-7 py-3.5 rounded-xl font-bold text-lg shadow-lg bg-[#ddc946]"
            >
              Become a Sponsor
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
