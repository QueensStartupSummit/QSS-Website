
import React from 'react';
import { BookOpen, Users, Lightbulb, GraduationCap } from 'lucide-react';

const GetInvolved = () => {
  const opportunities = [
    {
      icon: BookOpen,
      title: 'LEARN',
      description: 'Develop technical and business skills through expert-led workshops run by our event partners, gaining hands-on experience with industry-relevant expertise.'
    },
    {
      icon: Users,
      title: 'NETWORK',
      description: 'Forge lasting professional connections with company representatives from Canada\'s most successful businesses and expand your professional circle.'
    },
    {
      icon: Lightbulb,
      title: 'GET INSPIRED',
      description: 'Hear from visionary leaders and innovative organizations across Canada\'s startup ecosystem to ignite your next breakthrough idea.'
    }
  ];

  return (
    <section id="get-involved" className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Get Involved
            <span className="block" style={{ color: '#58baba' }}>with QSS</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#ddc946' }}></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* BE A DELEGATE Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-xl mr-3" style={{ backgroundColor: '#58baba' }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#58baba' }}>BE A DELEGATE</h3>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                No matter your level of experience or background, we believe that everyone has the potential
                to be entrepreneurial and innovative. Queen's Startup Summit welcomes delegates from all years
                of academic study, faculties, and universities across Canada.
              </p>
            </div>

            {/* Opportunities Grid */}
            <div className="grid gap-3 sm:gap-4">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 border border-gray-100" style={{ borderColor: 'rgba(88, 186, 186, 0.3)' }}>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl flex-shrink-0 shadow-md" style={{ backgroundColor: '#58baba' }}>
                      <opportunity.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-2" style={{ color: '#58baba' }}>{opportunity.title}</h4>
                      <p className="text-gray-600 text-base leading-relaxed">{opportunity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>



            {/* Call to Action */}
            <div className="mt-6 text-center">
              <button className="text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#ddc946' }}>
                Register Now as a Delegate
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl sticky top-8">
              <img
                src="summit.jpg"
                alt="Get Involved with QSS"
                className="w-full h-[500px] lg:h-[740px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent" style={{ background: 'linear-gradient(to top, rgba(88, 186, 186, 0.6), transparent, transparent)' }}></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4" style={{ borderColor: 'rgba(88, 186, 186, 0.3)', borderWidth: '1px' }}>
                  <p className="font-bold text-lg" style={{ color: '#58baba' }}>Join Delegates from Across Canada</p>
                  <p className="text-gray-600 text-sm">From a wide range of different faculties and universities.</p>
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