import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mountain } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateParallax = (multiplier: number) => {
    return scrollY * multiplier;
  };
  
  return (
    <div 
      ref={heroRef}
      id="home"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Mountains - Far */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${calculateParallax(0.1)}px)`,
        }}
      />
      
      {/* Rotaract Logo */}
      <div className="absolute top-4 left-4 z-50">
        <img 
          src="/rotaract.png" 
          alt="Rotaract Logo"
          className="h-16 md:h-20"
        />
      </div>

      {/* FR.CRCE Logo */}
      <div className="absolute top-4 right-4 z-50">
        <img 
          src="/FRCRCE.png" 
          alt="FR.CRCE Logo"
          className="h-16 md:h-20"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-40 text-center px-4 transform -translate-y-8">
        <div className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full mb-6 animate-pulse">
          <p className="font-bold flex items-center">
            <Mountain className="mr-2 h-5 w-5" /> August 10, 2024
          </p>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          FOOTSLOG
          <span className="block text-teal-300">KOTHALIGAD TREK </span>
        </h1>
        <p className="text-xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md">
          Join Rotaract Club FRCRCE for an exciting trek to the historic Kothaligad fort, featuring stunning views and ancient architecture.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#register" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Register Now
          </a>
          <a 
            href="#routes" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 w-full sm:w-auto"
          >
            View Details
          </a>
        </div>
      </div>
      
      {/* Sponsor Logos */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center space-x-8">
        <div className="bg-white/90 p-2 rounded-lg">
          <img 
            src="/balaji.png" 
            alt="Balaji Wafers Logo"
            className="h-12"
          />
          <p className="text-xs text-gray-600 mt-1">Snacking Partner</p>
        </div>
        <div className="bg-white/90 p-2 rounded-lg">
          <img 
            src="/swaras.png" 
            alt="Swaras Logo"
            className="h-12"
          />
          <p className="text-xs text-gray-600 mt-1">Beverage Partner</p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center animate-bounce">
        <a href="#routes" className="text-white">
          <ChevronDown className="h-10 w-10" />
        </a>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-30" />
    </div>
  );
};