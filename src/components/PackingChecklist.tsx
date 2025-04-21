import React, { useState, useEffect, useRef } from 'react';
import { CheckSquare, Package, Coffee, Tent, Shirt, Bot as Boot, Droplets, Battery, MapPin, Camera, Sun, Thermometer, Ban as Bandage, Apple, Utensils } from 'lucide-react';

interface ChecklistItem {
  id: number;
  icon: React.ElementType;
  category: string;
  name: string;
  essential: boolean;
  checked: boolean;
}

export const PackingChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, icon: Tent, category: 'Shelter', name: 'Tent', essential: true, checked: false },
    { id: 2, icon: Shirt, category: 'Clothing', name: 'Hiking clothes', essential: true, checked: false },
    { id: 3, icon: Boot, category: 'Clothing', name: 'Hiking boots', essential: true, checked: false },
    { id: 4, icon: Thermometer, category: 'Clothing', name: 'Rain jacket', essential: true, checked: false },
    { id: 5, icon: Droplets, category: 'Hydration', name: 'Water bottle/reservoir', essential: true, checked: false },
    { id: 6, icon: Apple, category: 'Food', name: 'Trail snacks', essential: true, checked: false },
    { id: 7, icon: Utensils, category: 'Food', name: 'Meals', essential: true, checked: false },
    { id: 8, icon: MapPin, category: 'Navigation', name: 'Map & compass', essential: true, checked: false },
    { id: 9, icon: Sun, category: 'Protection', name: 'Sunscreen', essential: true, checked: false },
    { id: 10, icon: Battery, category: 'Equipment', name: 'Headlamp/flashlight', essential: true, checked: false },
    { id: 11, icon: Bandage, category: 'Safety', name: 'First aid kit', essential: true, checked: false },
    { id: 12, icon: Camera, category: 'Optional', name: 'Camera', essential: false, checked: false },
    { id: 13, icon: Coffee, category: 'Optional', name: 'Portable stove', essential: false, checked: false },
  ]);
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  useEffect(() => {
    // Calculate progress
    const essentialItems = items.filter(item => item.essential);
    const checkedEssentials = essentialItems.filter(item => item.checked).length;
    const newProgress = Math.round((checkedEssentials / essentialItems.length) * 100);
    setProgress(newProgress);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      id="packing" 
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Package className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Packing Checklist</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Essential Items</span>
              <span className="text-sm font-medium text-teal-600">{progress}% Complete</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium capitalize whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeCategory === category
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Checklist Items */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className={`bg-white border rounded-lg p-4 shadow-sm transition-all duration-300 ${
                  item.checked 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${(item.id % 10) * 50}ms` }}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-md mr-4 ${item.checked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {React.createElement(item.icon, { size: 20 })}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${item.checked ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${item.checked ? 'text-green-600' : 'text-gray-500'}`}>
                      {item.category} {item.essential && '• Essential'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 flex-shrink-0 ${item.checked ? 'text-green-500' : 'text-gray-300'}`}>
                    <CheckSquare size={24} className={`transition-all duration-300 ${item.checked ? 'fill-current' : ''}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Download Button */}
          <div className="mt-10 text-center">
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center shadow-lg">
              <CheckSquare className="mr-2 h-5 w-5" />
              Download Complete Checklist
            </button>
            <p className="text-gray-500 mt-2 text-sm">Print or save for your upcoming trek</p>
          </div>
        </div>
      </div>
    </section>
  );
};