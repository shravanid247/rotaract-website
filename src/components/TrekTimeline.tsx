import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Sunrise, Bus, Coffee, Flag, ArrowDown, Utensils, MapPin, Home, Compass } from 'lucide-react';

const timelineData = [
  { 
    time: '5:30 AM', 
    title: 'Reporting at College', 
    description: 'Meet at FR.CRCE campus', 
    icon: Sunrise 
  },
  { 
    time: '6:00 AM', 
    title: 'Departure', 
    description: 'Leave from college', 
    icon: Bus 
  },
  { 
    time: '9:00 AM', 
    title: 'Base Village', 
    description: 'Arrive at trek starting point', 
    icon: MapPin 
  },
  { 
    time: '9:15 AM', 
    title: 'Start Ascend', 
    description: 'Begin trek to Kothaligad peak', 
    icon: Flag 
  },
  { 
    time: '11:15 AM', 
    title: 'Summit', 
    description: 'Reach Kothaligad peak', 
    icon: Flag 
  },
  { 
    time: '12:00 PM', 
    title: 'Start Descend', 
    description: 'Begin return journey', 
    icon: ArrowDown 
  },
  { 
    time: '2:00 PM', 
    title: 'Base Village', 
    description: 'Complete the trek', 
    icon: MapPin 
  },
  { 
    time: '2:45 PM', 
    title: 'Departure', 
    description: 'Leave Kothaligad', 
    icon: Bus 
  },
  { 
    time: '4:00 PM', 
    title: 'Lunch Break', 
    description: 'Stop at restaurant', 
    icon: Utensils 
  },
  { 
    time: '5:30 PM', 
    title: 'Return Journey', 
    description: 'Head to Bandra station', 
    icon: Bus 
  },
  { 
    time: '8:30 PM', 
    title: 'Reach Bandra', 
    description: 'Trek completion', 
    icon: Home 
  }
];

export const TrekTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="schedule" ref={timelineRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Calendar className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trek Timeline</h2>
        </div>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-4 md:left-1/2 top-0 w-1 md:transform md:-translate-x-1/2 h-full bg-teal-200 z-0" />
          
          {/* Timeline items */}
          <div className="relative z-10">
            {timelineData.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-start md:even:flex-row-reverse mb-12 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="md:w-1/2 md:pr-8 md:pl-0 md:even:pr-0 md:even:pl-8 pb-8 md:pb-0">
                  <div className={`bg-white border-2 rounded-lg shadow-lg p-6 ${
                    activeIndex === index 
                      ? 'border-teal-500 scale-105 shadow-xl' 
                      : 'border-gray-200'
                  } transition-all duration-300`}>
                    <div className="flex items-center mb-3">
                      <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeIndex === index 
                      ? 'bg-teal-500 text-white scale-125' 
                      : 'bg-white text-teal-700 border-2 border-teal-500'
                  } transition-all duration-300 shadow-md`}>
                    {React.createElement(item.icon, { size: 18 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#register"
            className="inline-flex items-center bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Compass className="mr-2 h-5 w-5" />
            Register for Trek
          </a>
        </div>
      </div>
    </section>
  );
};