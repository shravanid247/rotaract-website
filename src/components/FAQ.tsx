import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Calendar, Compass, Clock, Thermometer,  DollarSign, Users, Heart, Backpack, Tent, Sun } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ElementType;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How difficult are the treks? Can beginners join?',
    answer: 'We offer treks with varying difficulty levels, from easy trails suitable for beginners and families to challenging routes for experienced hikers. Each trek is clearly labeled with its difficulty level. Beginners are welcome on our easy and some moderate treks, where our guides provide extra support and assistance.',
    icon: Compass,
    category: 'general'
  },
  {
    id: 2,
    question: 'What should I pack for a trek?',
    answer: 'Essential items include proper hiking boots, weather-appropriate clothing, a backpack, water bottle, sunscreen, and a hat. For overnight treks, you\'ll need a sleeping bag and personal hygiene items. We provide a detailed packing list specific to your chosen trek after registration. Visit our Packing Checklist section for a comprehensive guide.',
    icon: Backpack,
    category: 'preparation'
  },
  {
    id: 3,
    question: 'How many people are in a typical group?',
    answer: 'Our trek groups typically range from 6 to 12 participants, ensuring a balanced experience with personal attention from guides while fostering a social atmosphere. Private groups can be arranged for families or friends who prefer to trek together.',
    icon: Users,
    category: 'general'
  },
  {
    id: 4,
    question: 'What\'s your cancellation policy?',
    answer: 'Cancellations made 30+ days before the trek receive a full refund minus a small administrative fee. Cancellations 15-29 days before receive a 50% refund. Cancellations less than 15 days before the trek are non-refundable. We strongly recommend purchasing travel insurance that covers trek cancellations.',
    icon: Calendar,
    category: 'booking'
  },
  {
    id: 5,
    question: 'Is food provided during the trek?',
    answer: 'For day treks, participants should bring their own lunch and snacks. For multi-day treks, we provide all meals, including hot breakfasts, packed lunches, and hearty dinners at camp. We accommodate dietary restrictions with advance notice during registration.',
    icon: Heart,
    category: 'preparation'
  },
  {
    id: 6,
    question: 'What happens in case of bad weather?',
    answer: 'Safety is our priority. In case of severe weather, we may modify the route, delay departure, or reschedule the trek. The lead guide makes final decisions based on current conditions and forecasts. If we cancel due to weather, we offer rescheduling or credit for a future trek.',
    icon: Thermometer,
    category: 'safety'
  },
  {
    id: 7,
    question: 'Do I need travel insurance?',
    answer: 'Yes, we strongly recommend comprehensive travel insurance that includes coverage for adventure activities, medical emergencies, and trip cancellation. Proof of insurance is required for all multi-day treks and international expeditions.',
    icon: Heart,
    category: 'booking'
  },
  
  {
    id: 8,
    question: 'What are the sleeping arrangements for overnight treks?',
    answer: 'For overnight treks, we provide quality 3-season tents (2-person occupancy). Solo travelers may request a private tent for an additional fee. Some routes offer mountain huts or lodges as alternatives to camping. Sleeping arrangements are detailed in the specific trek information.',
    icon: Tent,
    category: 'preparation'
  },
  {
    id: 9,
    question: 'How much do treks cost?',
    answer: 'Trek prices vary based on duration, location, and included amenities. Day hikes typically range from $75-150 per person, while multi-day treks range from $200-500 per day, including guides, meals, and equipment. International expeditions are priced separately. Discounts are available for groups and early bookings.',
    icon: DollarSign,
    category: 'booking'
  },
  {
    id: 10,
    question: 'Do I need to be physically fit?',
    answer: 'A basic level of fitness is required for all our treks. For easy trails, being able to walk 5-7 km on flat terrain is sufficient. Moderate treks require the ability to hike 8-12 km with some elevation. Difficult treks demand good aerobic fitness and strength. We recommend a training regimen before challenging treks.',
    icon: Clock,
    category: 'preparation'
  },
  {
    id: 11,
    question: 'What about sun protection at high altitudes?',
    answer: 'Sun protection is crucial at high altitudes where UV exposure is intensified. We recommend SPF 50+ sunscreen, sunglasses with UV protection, and a wide-brimmed hat. Apply sunscreen frequently, even on cloudy days, and consider UPF-rated clothing for additional protection.',
    icon: Sun,
    category: 'safety'
  },
];

export const FAQ: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };
  
  const categories = ['all', ...Array.from(new Set(faqs.map(item => item.category)))];
  
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <HelpCircle className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium capitalize whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const IconComponent = faq.icon;
              const isOpen = openItemId === faq.id;
              
              return (
                <div 
                  key={faq.id}
                  className={`bg-white rounded-lg shadow-sm border transition-all duration-300 ${
                    isOpen ? 'border-teal-300 shadow-md' : 'border-gray-200'
                  }`}
                >
                  <button
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <div className="flex items-center">
                      <IconComponent className={`mr-3 w-5 h-5 ${isOpen ? 'text-teal-600' : 'text-gray-500'}`} />
                      <span className={`font-semibold ${isOpen ? 'text-teal-800' : 'text-gray-800'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`${isOpen ? 'text-teal-600' : 'text-gray-400'}`}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  <div 
                    className={`px-6 pb-4 overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 bg-teal-50 rounded-lg p-6 border border-teal-100">
            <div className="flex">
              <MessageSquare className="text-teal-600 w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-teal-800 mb-2">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Can't find the answer you're looking for? We're here to help with any questions about our treks or services.
                </p>
                <a 
                  href="#footer" 
                  className="inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-teal-700"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};