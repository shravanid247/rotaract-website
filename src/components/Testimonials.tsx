import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ram Sharma',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'The kothaligad trek was challenging but absolutely worth it! The panoramic views from the summit after conquering the 1,100m elevation gain were truly breathtaking.',
    rating: 5,
    trek: 'Kothaligad Trek'
  },
  {
    id: 2,
    name: 'Riya Joshi',
    location: 'Nagpur, Maharashtra',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'I found the historical inscriptions inside the caves fascinating, telling stories of the forts rich past. The sunrise viewpoint was my favorite spot - we camped overnight and the morning view was spectacular',
    rating: 5,
    trek: 'Kothaligad Trek'
  },
  {
    id: 3,
    name: 'Lily Dcosta',
    location: 'Panjim, Goa',
    image: 'https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'As a photography enthusiast, the Kothligad trek offered countless perfect shots with its diverse landscapes. The difficulty was worth it when we reached those ancient cannons and archaeological remains that have withstood centuries.',
    rating: 4,
    trek: 'Kothaligad Trek'
   
  },
  {
    id: 4,
    name: 'Kartik Verma',
    location: 'Pune, Maharashtra',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'I was amazed by the lush greenery and the vibrant flora and fauna along the trail. The trek was a perfect blend of adventure and tranquility.',
    rating: 5,
    trek: 'Kothaligad Trek'
  },
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        if (!isAnimating) {
          nextSlide();
        }
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isVisible, isAnimating]);

  const nextSlide = () => {
    setIsAnimating(true);
    setActiveIndex((activeIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="testimonials" ref={testimonialRef} className="py-20 bg-teal-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent opacity-5"></div>
      <div className="absolute top-20 right-10 text-white opacity-5">
        <Quote size={200} />
      </div>
      <div className="absolute bottom-20 left-10 text-white opacity-5 transform rotate-180">
        <Quote size={150} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center mb-12">
          <MessageSquare className="text-teal-300 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-white"> People's experience </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Controls for larger screens */}
          <div className="hidden md:flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-20 px-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-teal-800/80 hover:bg-teal-700 flex items-center justify-center text-white transition-colors duration-300"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-teal-800/80 hover:bg-teal-700 flex items-center justify-center text-white transition-colors duration-300"
              disabled={isAnimating}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Testimonial Slider */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-4">
                  <div className="bg-white rounded-xl shadow-xl text-gray-800 overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-teal-100 md:flex md:flex-col md:justify-center md:items-center p-6 text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
                        <p className="text-teal-600 text-sm mb-3">{testimonial.location}</p>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="inline-block bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {testimonial.trek}
                        </span>
                      </div>
                      
                      <div className="md:w-2/3 p-6 md:p-8 flex items-center">
                        <div>
                          <Quote className="text-teal-200 w-10 h-10 mb-4" />
                          <p className="text-gray-700 text-lg mb-6 italic">
                            {testimonial.text}
                          </p>
                          <a 
                            href="#register" 
                            className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300"
                          >
                            Join Our Trek <ChevronRight className="ml-1 w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile controls */}
          <div className="md:hidden flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-white scale-110' : 'bg-teal-700 opacity-50'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};