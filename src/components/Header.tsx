import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, User,  } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Compass className={`w-8 h-8 ${isScrolled ? 'text-teal-700' : 'text-white'} mr-2`} />
          <span className={`font-bold text-2xl ${isScrolled ? 'text-teal-800' : 'text-white'}`}>
            ROTARACT
          </span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {['Home', 'Routes', 'Schedule', 'Gallery', 'Register'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`${
                isScrolled ? 'text-gray-700 hover:text-teal-700' : 'text-white hover:text-teal-100'
              } font-medium transition-colors duration-200`}
            >
              {item}
            </a>
          ))}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition-colors duration-200 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Register Now
          </button>
        </nav>
        
        <button 
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 
            <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} /> : 
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          }
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {['Home', 'Routes', 'Schedule', 'Gallery', 'Register'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-teal-700 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-colors duration-200 flex items-center justify-center">
              <User className="w-4 h-4 mr-2" />
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};