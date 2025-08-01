import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isMenuOpen) return;

    if (event.key === 'Escape') {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/qss-cube.png" 
              alt="QSS Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" 
              style={{ imageRendering: 'crisp-edges' }}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              <span className="sm:hidden">QSS</span>
              <span className="hidden md:inline">Queen's Startup Summit</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Home</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>About</button>
            <button onClick={() => scrollToSection('get-involved')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Get Involved</button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Gallery</button>
            <button onClick={() => scrollToSection('sponsors')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Sponsors</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded" style={{ '--tw-ring-color': '#58baba' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#58baba'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Contact</button>
          </nav>

          <div className="hidden md:block">
            <button className="text-white px-6 py-2 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#ddc946' }}>
              Register Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#74a84a] focus:outline-none focus:ring-2 focus:ring-[#74a84a] focus:ring-offset-2 rounded-md p-3 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-200"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
          role="navigation" 
          aria-label="Mobile navigation"
          onKeyDown={handleKeyDown}
          ref={mobileMenuRef}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t shadow-lg">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('get-involved')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              Get Involved
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('sponsors')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              Sponsors
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-4 py-3 min-h-[44px] text-gray-700 hover:text-[#58baba] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#58baba] focus:ring-inset rounded-md transition-colors duration-200 font-medium"
              role="menuitem"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-gray-200">
              <button 
                className="w-full text-center px-4 py-3 min-h-[44px] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:opacity-90 transition-opacity duration-200" 
                style={{ backgroundColor: '#ddc946' }}
                role="menuitem"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;