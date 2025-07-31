import { ArrowRight, Clock, Users, Award } from 'lucide-react';

const CallToAction = () => {
  const highlights = [
    { icon: Clock, text: '48 Hours of Innovation' },
    { icon: Users, text: 'Network with 500+ Entrepreneurs' },
    { icon: Award, text: '$50K in Prizes & Funding' }
  ];

  return (
    <section className="py-20 relative overflow-hidden section-transition">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: 'url(/Call-to-action.jpg.jpeg)' }}
        role="img"
        aria-label="Call to action background showing Queen's Startup Summit event"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c541d]/90 to-[#74a84a]/90"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <header>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Build the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#74a84a] to-[#2c541d]">
              Future?
            </span>
          </h2>
        </header>

        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of ambitious entrepreneurs, developers, and innovators at Queen's most exciting startup event.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10" role="list">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center text-white" role="listitem">
              <highlight.icon className="h-6 w-6 mr-3 text-[#74a84a]" aria-hidden="true" />
              <span className="font-medium">{highlight.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="bg-gradient-to-r from-[#2c541d] to-[#74a84a] hover:from-[#74a84a] hover:to-[#2c541d] text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-2xl will-change-transform"
            aria-label="Register for Queen's Startup Summit 2025"
          >
            Register for QSS 2025
            <ArrowRight className="ml-3 h-6 w-6" aria-hidden="true" />
          </button>
          <button 
            className="border-2 border-white text-white hover:bg-white hover:text-[#2c541d] px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 will-change-transform"
            aria-label="Download Queen's Startup Summit 2025 brochure"
          >
            Download Brochure
          </button>
        </div>

        <p className="text-gray-300 mt-6 text-sm">
          Early bird registration ends February 15th • Limited spots available
        </p>
      </div>
    </section>
  );
};

export default CallToAction;