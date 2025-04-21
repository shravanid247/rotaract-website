import React from 'react';
import { Compass, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-white relative overflow-hidden">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M20 20 C40 20, 40 80, 80 80' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M30 30 C50 30, 50 70, 70 70' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M40 40 C55 40, 55 60, 60 60' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Compass className="w-8 h-8 text-teal-300 mr-2" />
              <span className="font-bold text-2xl text-white">FOOTSLOG</span>
            </div>
            <p className="text-teal-100 mb-6">
              Experience nature like never before with our guided trekking adventures in the most beautiful mountain ranges.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-teal-800 hover:bg-teal-700 p-2 rounded-full transition-colors duration-200">
                <Facebook className="w-5 h-5 text-teal-200" />
              </a>
              <a href="#" className="bg-teal-800 hover:bg-teal-700 p-2 rounded-full transition-colors duration-200">
                <Instagram className="w-5 h-5 text-teal-200" />
              </a>
              <a href="#" className="bg-teal-800 hover:bg-teal-700 p-2 rounded-full transition-colors duration-200">
                <Twitter className="w-5 h-5 text-teal-200" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Treks', 'Gallery', 'Testimonials', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-teal-100 hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-teal-300">Upcoming Treks</h3>
            <ul className="space-y-4">
              {[
                { name: 'Kothaligad Trek', date: 'August 10, 2024' },
              ].map((trek) => (
                <li key={trek.name} className="border-b border-teal-800 pb-2">
                  <a href="#" className="block hover:text-teal-300 transition-colors duration-200">
                    <span className="font-medium block">{trek.name}</span>
                    <span className="text-sm text-teal-400">{trek.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-teal-300">Contact Us</h3>
            <ul className="space-y-4">
            <li className="flex flex-col">
  Public Relations Director
  <Phone className="w-5 h-5 text-teal-400 mr-3" />
  <a href="tel:+917021378191" className="hover:text-teal-300 transition-colors duration-200">
    +91 7021378191
  </a>
</li>

<li className="flex flex-col">
  Club Service Director
  <Phone className="w-5 h-5 text-teal-400 mr-3" />
  <a href="tel:+919769617643" className="hover:text-teal-300 transition-colors duration-200">
    +91 9769617643
  </a>
</li>

<li className="flex flex-col">
  Public Relations Head
  <Phone className="w-5 h-5 text-teal-400 mr-3" />
  <a href="tel:+918080637665" className="hover:text-teal-300 transition-colors duration-200">
    +91 8080637665
  </a>
</li>

            </ul>
          </div>
        </div>
        
        <div className="border-t border-teal-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-200 text-sm mb-4 md:mb-0">
            © 2025 Footslog. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-teal-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-teal-300 hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-teal-300 hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};