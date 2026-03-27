import React from 'react';
import { Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/QUStartupSummit/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/qssummit/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/queens-startup-summit/', label: 'LinkedIn' }
  ];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand Section */}
          <div className="max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/qss-cube-white.svg" 
                alt="QSS Logo" 
                className="h-8 w-8" 
                style={{ imageRendering: 'crisp-edges' }}
              />
              <h3 className="text-2xl font-bold">Queen's Startup Summit</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
            Students supporting students getting into the startup world across Canada. Any school, any year, any program.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 p-2 rounded-lg transition-colors hover:bg-[#58baba] focus:bg-[#58baba]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-[#58baba]" />
                <span>partnerships@qssummit.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-[#58baba]" />
                <span>delegates@qssummit.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-[#58baba]" />
                <span>tech@qssummit.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-[#58baba]" />
                <span>Queen's University, Kingston, ON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Queen's Startup Summit. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
