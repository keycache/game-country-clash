import { useState, useEffect } from 'react';
import { Country } from '../types';
import { CountryCard } from './CountryCard';
import { WinnerOverlay } from './WinnerOverlay';
import { ToggleButton } from './ToggleButton';
import { CardCounter } from './CardCounter';
import { shuffle } from '../utils/shuffle';
import confetti from 'canvas-confetti';

interface GameBoardProps {
  countries: Country[];
  onGameComplete: (winner: Country, eliminationOrder: string[]) => void;
}

export const GameBoard = ({ countries, onGameComplete }: GameBoardProps) => {
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [temporarilyVisible, setTemporarilyVisible] = useState<Set<string>>(new Set());
  const [winner, setWinner] = useState<Country | null>(null);
  const [hideSelected, setHideSelected] = useState(false);
  const [eliminationOrder, setEliminationOrder] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  useEffect(() => {
    setShuffledCountries(shuffle(countries));
  }, [countries]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 }
    });
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    temporarilyVisible.forEach(cardId => {
      const timeout = setTimeout(() => {
        setTemporarilyVisible(prev => {
          const newSet = new Set(prev);
          newSet.delete(cardId);
          return newSet;
        });
      }, 2000);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [temporarilyVisible]);

  const completeGame = (selectedCountry: Country) => {
    if (gameCompleted) return;
    
    triggerConfetti();
    setWinner(selectedCountry);
    setGameCompleted(true);
    
    const finalEliminationOrder = [...eliminationOrder];
    if (!finalEliminationOrder.includes(selectedCountry.name)) {
      finalEliminationOrder.push(selectedCountry.name);
    }
    
    onGameComplete(selectedCountry, finalEliminationOrder);
  };

  const handleCardClick = (countryId: string) => {
    if (gameCompleted) return;

    setFlippedCards(prev => {
      const newFlippedCards = new Set(prev);
      
      if (newFlippedCards.has(countryId)) {
        return prev;
      }
      
      newFlippedCards.add(countryId);
      
      const selectedCountry = shuffledCountries.find(c => c.id === countryId);
      if (selectedCountry) {
        setEliminationOrder(prev => {
          if (!prev.includes(selectedCountry.name)) {
            return [...prev, selectedCountry.name];
          }
          return prev;
        });

        if (hideSelected) {
          setTemporarilyVisible(prev => new Set([...prev, countryId]));
        }
      }
      
      if (newFlippedCards.size === shuffledCountries.length && !gameCompleted && selectedCountry) {
        completeGame(selectedCountry);
      }
      
      return newFlippedCards;
    });
  };

  const handleCloseOverlay = () => {
    setWinner(null);
  };

  const toggleHideSelected = () => {
    setHideSelected(prev => !prev);
    setTemporarilyVisible(new Set());
  };

  const shouldShowCard = (countryId: string) => {
    if (!hideSelected) return true;
    if (!flippedCards.has(countryId)) return true;
    return temporarilyVisible.has(countryId);
  };

  const remainingCards = shuffledCountries.length - flippedCards.size;

  return (
    <div className="p-4">
      <div className="fixed top-[4.5rem] right-4 z-10">
        <div className="backdrop-blur-sm bg-white/80 p-2 rounded-lg shadow-lg">
          <ToggleButton 
            isEnabled={hideSelected}
            onToggle={toggleHideSelected}
          />
        </div>
      </div>

      <CardCounter 
        remaining={remainingCards}
        total={shuffledCountries.length}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {shuffledCountries.map(country => (
          shouldShowCard(country.id) && (
            <div
              key={country.id}
              className="transition-all duration-300 ease-in-out"
            >
              <CountryCard
                country={country}
                isFlipped={flippedCards.has(country.id)}
                isSelected={flippedCards.has(country.id)}
                onClick={() => handleCardClick(country.id)}
              />
            </div>
          )
        ))}
      </div>
      {winner && (
        <WinnerOverlay
          countryName={winner.name}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};