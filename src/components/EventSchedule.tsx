import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock, Download, MapPin } from "lucide-react";

const EVENT_NAME = "Queen's AI Startup Catalyst & Pitchathon";
const EVENT_DATE = "Friday, November 27, 2026";
const EVENT_HOURS = "10:30 AM – 5:00 PM";
const VENUE_NAME = "Kingston Marriott";
const VENUE_ADDRESS = "285 King St E, Kingston, ON K7L 3B1";
const VENUE_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Kingston+Marriott+285+King+St+E+Kingston+ON";
const SCHEDULE_PDF = "/event-schedule.pdf";

type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  deadline?: boolean;
};

const schedule: ScheduleItem[] = [
  { time: "10:30 – 11:00 AM", title: "Registration & Check-In", description: "Team check-in (solo, pairs or trios)." },
  { time: "10:45 AM", title: "Speakers Arrive", description: "Speakers arrive and settle in." },
  {
    time: "11:00 – 11:15 AM",
    title: "Opening Remarks",
    description: "Welcome, event overview, and sponsor acknowledgements.",
  },
  {
    time: "11:15 AM – 12:30 PM",
    title: "Founder & AI Panel",
    description: "Founder and expert discussion with live Q&A, in person or online.",
  },
  {
    time: "12:30 – 12:45 PM",
    title: "Prompt & Guidelines",
    description: "Surprise prompt reveal, 100-point judging criteria, and slide rules.",
  },
  { time: "12:45 – 1:30 PM", title: "Lunch & Networking", description: "Catered lunch and initial brainstorming." },
  {
    time: "1:30 – 3:30 PM",
    title: "Startup Sprint",
    description: "Teams build concepts and pitch decks with mentor guidance.",
  },
  { time: "3:30 PM", title: "Slide Cutoff", description: "Hard deadline for pitch deck submission.", deadline: true },
  { time: "3:30 – 4:30 PM", title: "Live Pitches & Judging", description: "Live pitches, judge Q&A, and scoring." },
  {
    time: "4:30 – 5:00 PM",
    title: "Awards & Close",
    description: "Scores tallied, winners announced, and prizes presented.",
  },
];

const EventSchedule = () => {
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
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = `es-animate ${isVisible ? "es-visible" : ""}`;

  return (
    <section
      id="schedule"
      ref={sectionRef}
      aria-labelledby="schedule-heading"
      className="py-16 md:py-24 bg-gradient-to-br from-[#ddc946]/10 via-white to-[#58baba]/15 overflow-hidden"
    >
      <style>{`
        @keyframes es-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .es-animate { opacity: 0; }
        .es-animate.es-visible {
          animation: es-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .es-animate, .es-animate.es-visible { opacity: 1; animation: none; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 ${fade}`}>
          <h2
            id="schedule-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight"
          >
            Event <span className="text-[#58baba]">Schedule</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 rounded-full bg-[#58baba]" />
            <div className="h-1 w-16 rounded-full bg-[#ddc946]" />
            <div className="h-1 w-8 rounded-full bg-[#1a1a1a]" />
          </div>
          <p className="text-xl sm:text-2xl text-gray-700 mb-6">{EVENT_NAME}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-base text-gray-600">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#58baba]" aria-hidden="true" />
              {EVENT_DATE}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#58baba]" aria-hidden="true" />
              {EVENT_HOURS}
            </span>
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#58baba] transition-colors underline-offset-4 hover:underline"
            >
              <MapPin className="h-4 w-4 text-[#58baba]" aria-hidden="true" />
              {VENUE_NAME}, {VENUE_ADDRESS}
            </a>
          </div>
        </div>

        {/* Timeline */}
        <ol className="mx-auto max-w-4xl">
          {schedule.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === schedule.length - 1;
            return (
              <li
                key={`${item.time}-${item.title}`}
                className={`grid grid-cols-[1rem_1fr] md:grid-cols-[11rem_1rem_1fr] gap-x-4 md:gap-x-6 ${fade}`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {/* Time (desktop) */}
                <div className="hidden md:flex items-center justify-end text-sm font-bold text-gray-900 whitespace-nowrap">
                  {item.time}
                </div>

                {/* Rail */}
                <div className="relative flex items-center justify-center" aria-hidden="true">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 border-l-2 border-dotted border-gray-400 ${
                      isFirst ? "top-1/2" : "top-0"
                    } ${isLast ? "bottom-1/2" : "bottom-0"}`}
                  />
                  <div
                    className={`relative h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                      item.deadline ? "bg-[#ddc946]" : "bg-[#58baba]"
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="py-2">
                  <div
                    className={`rounded-xl border px-5 py-4 transition-shadow hover:shadow-md ${
                      item.deadline ? "bg-[#ddc946]/20 border-[#ddc946]" : "bg-white/80 border-gray-200"
                    }`}
                  >
                    <p className="md:hidden text-xs font-bold tracking-wide text-[#4a9999] mb-1">{item.time}</p>
                    {item.deadline ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Download */}
        <div className={`mt-10 text-center ${fade}`} style={{ animationDelay: "0.7s" }}>
          <a
            href={SCHEDULE_PDF}
            download="QSS-Pitchathon-Schedule.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-[#58baba] px-5 py-2.5 font-semibold text-[#4a9999] hover:bg-[#58baba] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-offset-2"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
