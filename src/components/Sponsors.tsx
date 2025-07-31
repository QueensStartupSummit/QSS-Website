

import React from 'react';

const Sponsors = () => {
  const majorSponsors = [
    {
      name: 'TD Invent',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfauaXxYHkp4_mM2lpVzm-APkdZcBp6xUfHg&s',
      website: 'https://tdinvent.td.com/'
    },
    {
      name: 'Microsoft Reactor',
      logo: 'https://learn.microsoft.com/en-us/shows/learn-live/azure-ai-helping-hand/media/reactors.png',
      website: 'https://developer.microsoft.com/en-us/reactor/'
    }
  ];

  const sponsors = [
    {
      name: 'CIBC Capital Markets',
      logo: 'https://researchcentral.cibccm.com/assets/images/CIBC_LOB_H2L_CM_rgb.png',
      website: 'https://www.cibc.com/en/commercial-banking/capital-markets'
    },
    {
      name: 'DMZ',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/DMZ_logoBlack-01.png',
      website: 'https://dmz.torontomu.ca/'
    },
    {
      name: 'futurpreneur',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjRDrn4LmtXVfumKFiE5aRRqG60gltYSubw&s',
      website: 'https://www.futurpreneur.ca/'
    },
    {
      name: 'CVCA',
      logo: 'https://entrevestor.com/images/uploads/_entry/CVCA_logo_-_2019.jpg',
      website: 'https://www.cvca.ca/'
    },
    {
      name: 'Secure Digital Markets',
      logo: 'https://cdn.prod.website-files.com/6542c558790cbcc1ce789de0/6542c558790cbcc1ce789fcf_logo%20vertical%20-%20color%20black.svg',
      website: 'https://www.securedigitalmarkets.com/'
    },
    {
      name: 'Neo Financial',
      logo: 'https://mms.businesswire.com/media/20241009155090/en/2266539/4/Neo-Financial-Logo_Black-Bordered_RGB.jpg',
      website: 'https://www.neofinancial.com/'
    },
    {
      name: 'Ace Beverage Group',
      logo: 'https://images.squarespace-cdn.com/content/v1/6153b2a0425ae037d899d513/1637011437524-1VTCSKYRW4L2ZRDIQTXC/ace.png',
      website: 'https://www.acebeveragegroup.com/'
    },
    {
      name: 'Red Bull',
      logo: 'https://www.svgrepo.com/download/303227/redbull-logo.svg',
      website: 'https://www.redbull.com/'
    }
  ];

  return (
    <section id="sponsors" className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Our
            <span className="block" style={{ color: '#58baba' }}>Sponsors</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#ddc946' }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with industry leaders who share our vision of fostering
            entrepreneurship and innovation among students.
          </p>
        </div>

        {/* Major Sponsors */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Major Sponsors</h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {majorSponsors.map((sponsor, index) => (
              <div key={index} className="group">
                <a
                  href={sponsor.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 border border-gray-100 hover:border-[#74a84a]/30">
                    <div className="h-40 flex items-center justify-center">
                      {(sponsor.name === 'Microsoft Reactor' || sponsor.name === 'TD Invent') ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <div className="text-5xl mb-3">🏢</div>
                            <p className="text-gray-500 font-medium text-lg">{sponsor.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Sponsors */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Supporting Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="group">
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-3 border border-gray-100 hover:border-[#74a84a]/30 aspect-square">
                    <div className="h-full flex items-center justify-center p-3">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-48 w-48 object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) {
                            placeholder.classList.remove('hidden');
                          }
                        }}
                      />
                      <div className="hidden w-full h-full bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <div className="text-2xl mb-1">🏢</div>
                          <p className="text-gray-500 text-xs font-medium">{sponsor.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(to right, rgba(88, 186, 186, 0.05), rgba(221, 201, 70, 0.05))', borderColor: 'rgba(88, 186, 186, 0.2)', borderWidth: '1px' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Sponsoring?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of forward-thinking organizations supporting the next generation of entrepreneurs.
            </p>
            <button className="text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#ddc946' }}>
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;