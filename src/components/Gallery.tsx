import React, { useState, useEffect, useRef } from 'react';
import { Image, ChevronLeft, ChevronRight, X, Maximize } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    image: '/image1.png',
    title: 'Panoramic View of Kothaligad Fort',
    location: 'A panoramic shot capturing the majestic Kothaligad Fort amidst the Sahyadri ranges.'
  },
  {
    id: 2,
    image: '/image2.png',
    title: 'Top View from Kothaligad Fort',
    location: 'A breathtaking view from the summit of Kothaligad Fort, showcasing the surrounding landscape.'
  },
  {
    id: 3,
    image: '/image3.png',
    title: 'Kothaligad Fort in Monsoon',
    location: 'The fort enveloped in lush greenery during the monsoon season, offering a serene trekking experience'
  },
  {
    id: 4,
    image: '/image4.png',
    title: 'Cave Entrance at Kothaligad',
    location: 'The intricately carved cave entrance at the base of Kothaligad Fort, reflecting its historical significance.'
  },
  {
    id: 5,
    image: '/image5.png',
    title: 'Waterfalls En Route to Kothaligad',
    location: 'Gushing waterfalls along the trail to Kothaligad, especially prominent during the rainy season.'
  },
  {
    id: 6,
    image: '/image6.png',
    title: '360° View from the Summit',
    location: 'A 360-degree panoramic view from the top of Kothaligad Fort, offering sights of the surrounding Sahyadri ranges.'
  }
];

export const Gallery: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const openLightbox = (index: number) => {
    setActiveSlide(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveSlide(null);
    document.body.style.overflow = 'auto';
  };

  const nextSlide = () => {
    if (activeSlide === null) return;
    setActiveSlide((activeSlide + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    if (activeSlide === null) return;
    setActiveSlide((activeSlide - 1 + galleryItems.length) % galleryItems.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSlide === null) return;
      
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  return (
    <section id="gallery" ref={galleryRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Image className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trek Gallery</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } hover:shadow-xl hover:scale-[1.02]`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-teal-200">{item.location}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-teal-800">
                  <Maximize size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Full-screen lightbox */}
        {activeSlide !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <button 
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10 transition-colors"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:text-white z-10 transition-colors"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white/80 hover:text-white z-10 transition-colors"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
              <div className="relative max-w-6xl max-h-full">
                <img 
                  src={galleryItems[activeSlide].image} 
                  alt={galleryItems[activeSlide].title} 
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                  <h3 className="font-bold text-xl">{galleryItems[activeSlide].title}</h3>
                  <p className="text-teal-200">{galleryItems[activeSlide].location}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};