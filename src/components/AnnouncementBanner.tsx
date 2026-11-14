import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

// --- Event config: update these as details are confirmed ---
const EVENT_NAME = "Queen's AI Startup Catalyst & Pitchathon";
const EVENT_SHORT_NAME = 'AI Startup Catalyst';
const EVENT_DATE = 'Nov 27, 2026';
const EVENT_DATE_SHORT = 'Nov 27';
const EVENT_TAGLINE = 'Founder panel, pitchathon & networking';
// Points to the on-site sign-up section if it exists, otherwise opens this URL.
const SIGNUP_SECTION_ID = 'signup';
const SIGNUP_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSerFeAHVnw3SQ22GNZE6w48x8H9zZ0gSP6pYNLOwz5vgJ5-EA/viewform';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleSignUp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById(SIGNUP_SECTION_ID);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isExternal = SIGNUP_URL.length > 0;

  return (
    <div
      role="region"
      aria-label={`${EVENT_NAME} sign-up announcement`}
      className="relative w-full bg-gradient-to-r from-[#4a9999] via-[#58baba] to-[#74a84a] text-white"
    >
      <div className="max-w-7xl mx-auto pl-3 pr-9 sm:px-12 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm sm:text-base">
        <span className="flex items-center gap-1.5 font-semibold whitespace-nowrap">
          <Sparkles size={16} className="text-[#ddc946] shrink-0" aria-hidden="true" />
          <span className="hidden lg:inline">{EVENT_NAME}</span>
          <span className="lg:hidden">{EVENT_SHORT_NAME}</span>
          <span className="font-normal text-white/90">
            · <span className="hidden sm:inline">{EVENT_DATE}</span>
            <span className="sm:hidden">{EVENT_DATE_SHORT}</span>
          </span>
        </span>
        <span className="hidden xl:inline text-white/90">— {EVENT_TAGLINE}</span>
        <a
          href={isExternal ? SIGNUP_URL : `#${SIGNUP_SECTION_ID}`}
          onClick={isExternal ? undefined : handleSignUp}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 rounded-full bg-[#ddc946] hover:bg-[#c4b63d] text-gray-900 font-semibold px-3 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#58baba]"
        >
          Sign Up<span className="hidden sm:inline">&nbsp;Now</span>
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
