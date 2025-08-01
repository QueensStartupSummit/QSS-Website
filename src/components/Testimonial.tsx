
import React from 'react';

const Testimonial = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#58baba]/10 to-[#58baba]/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#58baba]/5 to-[#58baba]/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#58baba] p-4 rounded-full shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>

            <blockquote className="relative z-10 text-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 italic leading-relaxed mb-6 md:mb-8 font-light">
                "While case competitions & hackathons tackle each of these aspects independently, 
                the marrying of the two at QSS closely mirrors startup development in the real world."
              </p>
              
              <footer className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg overflow-hidden border-3 border-[#58baba]">
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
                  <cite className="text-[#58baba] font-bold text-lg sm:text-xl not-italic block">Jacob Andreou</cite>
                  <p className="text-gray-600 text-sm sm:text-base">Chief Vice President Microsoft AI</p>
                  <p className="text-gray-600 text-sm sm:text-base">& Former Senior Vice President Snapchat</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;