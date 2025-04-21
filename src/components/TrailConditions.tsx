import React, { useState } from 'react';
import { Map, Mountain, Castle, Wind, ThermometerSun, Eye, ArrowRight } from 'lucide-react';

interface ExperienceZone {
  id: number;
  name: string;
  difficulty: string;
  description: string;
  highlights: string[];
  image: string;
  icon: React.ElementType;
}

const experienceZones: ExperienceZone[] = [
  {
    id: 1,
    name: 'Historic Fort Ruins',
    difficulty: 'moderate',
    description: 'Explore the ancient fortifications of Kothaligad, including well-preserved bastions and historic cannons that once defended this strategic outpost.',
    highlights: [
      'Ancient stone fortifications',
      'Historic cannons',
      'Defensive walls',
      'Archaeological remains'
    ],
    image: '/fort.png',
    icon: Castle
  },
  {
    id: 2,
    name: 'Cave Exploration',
    difficulty: 'moderate',
    description: 'Venture into the mysterious cave chambers carved into the heart of Kothaligad, featuring ancient water cisterns and intricate rock-cut architecture.',
    highlights: [
      'Rock-cut chambers',
      'Ancient water storage',
      'Natural ventilation',
      'Historical inscriptions'
    ],
    image: '/cave.png',
    icon: Mountain
  },
  {
    id: 3,
    name: 'Summit Viewpoint',
    difficulty: 'difficult',
    description: 'Reach the pinnacle of Kothaligad for breathtaking 360-degree views of the surrounding Sahyadri range and neighboring forts.',
    highlights: [
      'Panoramic mountain views',
      'Neighboring fort sightings',
      'Photography spots',
      'Sunrise viewpoint'
    ],
    image: '/summit.png',
    icon: Eye
  }
];

const trekHighlights = [
  {
    title: 'Secret Spot',
    description: 'A hidden viewpoint known only to locals, offering unique views of the valley below.',
    image: 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg'
  },
  {
    title: 'Photo Opportunity',
    description: 'Perfect spots for capturing the majestic fort structure and surrounding landscapes.',
    image: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg'
  },
  {
    title: 'Historical Significance',
    description: 'Built in the 13th century, Kothaligad served as a crucial watchtower in the Maratha empire.',
    image: 'https://images.pexels.com/photos/2387872/pexels-photo-2387872.jpeg'
  }
];

export const TrailConditions: React.FC = () => {
  const [activeZone, setActiveZone] = useState(experienceZones[0]);
  const [currentConditions] = useState({
    weather: { status: 'moderate', description: 'Partly cloudy, moderate winds' },
    temperature: { value: '24°C', status: 'good' },
    visibility: { status: 'good', description: 'Clear views expected' }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'moderate': return 'bg-yellow-500 text-white';
      case 'difficult': return 'bg-orange-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'difficult': 
      case 'caution': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="routes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Map className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Kothaligad Experience</h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Trek Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Kothaligad Summit Challenge</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Distance</p>
                <p className="text-2xl font-bold text-gray-800">12.4 km</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Elevation Gain</p>
                <p className="text-2xl font-bold text-gray-800">1,100 m</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-2xl font-bold text-gray-800">7-8 hrs</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Difficulty</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-600 text-white mt-1">
                  Difficult
                </span>
              </div>
            </div>
          </div>

          {/* Current Conditions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`flex items-center px-4 py-3 rounded-lg border ${getStatusColor(currentConditions.weather.status)}`}>
                <Wind className="w-5 h-5 mr-2" />
                <div>
                  <span className="font-medium">Weather:</span> {currentConditions.weather.description}
                </div>
              </div>
              <div className={`flex items-center px-4 py-3 rounded-lg border ${getStatusColor(currentConditions.temperature.status)}`}>
                <ThermometerSun className="w-5 h-5 mr-2" />
                <div>
                  <span className="font-medium">Temperature:</span> {currentConditions.temperature.value}
                </div>
              </div>
              <div className={`flex items-center px-4 py-3 rounded-lg border ${getStatusColor(currentConditions.visibility.status)}`}>
                <Eye className="w-5 h-5 mr-2" />
                <div>
                  <span className="font-medium">Visibility:</span> {currentConditions.visibility.description}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Zones */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experienceZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`text-left transition-all duration-300 ${
                    activeZone.id === zone.id
                      ? 'transform scale-105'
                      : 'hover:transform hover:scale-102'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-bold text-xl mb-1">{zone.name}</h4>
                        <span className={`${getDifficultyColor(zone.difficulty)} px-2 py-1 rounded-full text-xs`}>
                          {zone.difficulty.charAt(0).toUpperCase() + zone.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Zone Details */}
          {activeZone && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={activeZone.image}
                    alt={activeZone.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{activeZone.name}</h4>
                  <p className="text-gray-600 mb-6">{activeZone.description}</p>
                  <h5 className="font-semibold text-gray-800 mb-3">Zone Highlights:</h5>
                  <ul className="space-y-2">
                    {activeZone.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <ArrowRight className="w-4 h-4 mr-2 text-teal-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Trek Highlights */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Trek Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trekHighlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-xl">{highlight.title}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};