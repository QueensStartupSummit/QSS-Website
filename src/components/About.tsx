import React from 'react';
import { Users, Trophy, Lightbulb, School } from 'lucide-react';

const About = () => {
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
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-first: Single column layout, converts to two-column on lg screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              About Queen's
              <span className="block" style={{ color: '#58baba' }}>Startup Summit</span>
            </h2>
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed md:leading-relaxed">
                Queen's Startup Summit (QSS) is a student-run club founded by a group of undergraduate students,
                in partnership with the Queen's Innovation Connector, in 2013. At QSS, we support the advancement
                of student entrepreneurship by providing an opportunity for students to collaborate, compete, and
                realize their potential through our events, including our annual Summit.
              </p>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed md:leading-relaxed">
                The Summit is a fast-paced competition in which delegates compete in teams to develop ideas into
                real ventures, incorporating aspects of design, technology, and business. Through engaging speakers,
                activities, and mentorship provided by industry professionals, we give delegates the knowledge and
                access to expertise to bring those ideas to life.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed md:leading-relaxed">
                The summit allows delegates to expand their professional network and find inspiration in the speakers, 
                mentors, and judges who attend. <span className="font-semibold" style={{ color: '#58baba' }}>It's the perfect opportunity for YOU!</span>
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <button 
                className="text-white px-6 py-4 sm:px-8 sm:py-4 rounded-lg font-semibold transition-colors min-h-[44px] min-w-[44px] text-base sm:text-lg"
                style={{ backgroundColor: '#ddc946' }}
                onClick={() => scrollToSection('get-involved')}
              >
                Get Involved Now
              </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 w-full">
            <img
              src="team.jpg"
              alt="QSS Event"
              className="rounded-2xl shadow-2xl w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[465px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Mobile-optimized statistics grid: 2x2 on mobile, 1x4 on md+ screens */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col justify-between min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto mb-2 sm:mb-3 md:mb-4" style={{ color: '#58baba' }} />
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