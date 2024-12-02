import { motion } from 'framer-motion';
import { Country } from '../types';
import { MapPin, Mountain, Globe2, Map, Building2 } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  isFlipped: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const CountryCard = ({ country, isFlipped, isSelected, onClick }: CountryCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative w-full h-[480px] cursor-pointer perspective-1000"
      onClick={!isSelected ? onClick : undefined}
    >
      <div 
        className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center gap-3 border-2 border-gray-100 hover:border-gray-200 transition-colors">
            <div className="text-lg font-medium text-gray-400">Click to reveal</div>
            <div className="text-sm text-gray-400">Country Card</div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-xl shadow-lg p-4 flex flex-col border-2 border-gray-200">
            <div className="text-6xl mb-2 text-center">{country.flag}</div>
            <h3 className="text-xl font-bold text-center mb-4">{country.name}</h3>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <Building2 className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-semibold">Capital</div>
                  <div>{country.capital}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <Globe2 className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-semibold">Continent</div>
                  <div>{country.continent}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <Map className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-semibold">Total Area</div>
                  <div>{country.totalArea.toLocaleString()} km²</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <MapPin className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-semibold">Bordering Countries</div>
                  <div>{country.borderingCountries}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <Mountain className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-semibold">Elevation</div>
                  <div>{country.highestPoint}m ↑ {country.lowestPoint}m ↓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};