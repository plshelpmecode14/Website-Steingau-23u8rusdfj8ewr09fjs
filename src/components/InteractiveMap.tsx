import React, { useState } from 'react';
import { Building, Language } from '../types';

interface InteractiveMapProps {
  language: Language;
}

const buildings: Building[] = [
  {
    id: 'b1',
    name: { 
      de: 'Wohngebäude A',
      en: 'Residential Building A'
    },
    description: {
      de: 'Modernes Wohngebäude mit 24 Wohneinheiten',
      en: 'Modern residential building with 24 units'
    },
    status: {
      de: 'Wohnungen verfügbar',
      en: 'Apartments available'
    },
    keyFacts: {
      de: ['2-4 Zimmer Wohnungen', 'Aufzug', 'Tiefgarage'],
      en: ['2-4 room apartments', 'Elevator', 'Underground parking']
    },
    coordinates: { x: 30, y: 40 }
  },
  // Add more buildings as needed
];

export default function InteractiveMap({ language }: InteractiveMapProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<Building | null>(null);

  return (
    <section className="py-16 px-4" id="overview">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {language === 'de' ? 'Quartiersübersicht' : 'Quarter Overview'}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Container */}
          <div className="relative bg-gray-100 rounded-lg aspect-square">
            {/* Map placeholder - Replace with actual SVG/interactive map */}
            <div className="absolute inset-0 p-4">
              {buildings.map((building) => (
                <button
                  key={building.id}
                  className="absolute w-8 h-8 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                  style={{ left: `${building.coordinates.x}%`, top: `${building.coordinates.y}%` }}
                  onMouseEnter={() => setHoveredBuilding(building)}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  onClick={() => setSelectedBuilding(building)}
                />
              ))}

              {/* Hover tooltip */}
              {hoveredBuilding && (
                <div 
                  className="absolute bg-white p-3 rounded shadow-lg z-10"
                  style={{ 
                    left: `${hoveredBuilding.coordinates.x}%`, 
                    top: `${hoveredBuilding.coordinates.y - 15}%` 
                  }}
                >
                  <p className="font-medium">{hoveredBuilding.name[language]}</p>
                  <p className="text-sm text-gray-600">{hoveredBuilding.status[language]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Building Info */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            {selectedBuilding ? (
              <div>
                <h3 className="text-2xl font-bold mb-4">{selectedBuilding.name[language]}</h3>
                <p className="text-gray-600 mb-4">{selectedBuilding.description[language]}</p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">
                    {language === 'de' ? 'Wichtige Details' : 'Key Facts'}
                  </h4>
                  <ul className="list-disc list-inside">
                    {selectedBuilding.keyFacts[language].map((fact, index) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-blue-600 font-medium">{selectedBuilding.status[language]}</p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                  {language === 'de' ? 'Mehr erfahren' : 'Learn More'}
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                {language === 'de' 
                  ? 'Wählen Sie ein Gebäude aus der Karte aus'
                  : 'Select a building from the map'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}