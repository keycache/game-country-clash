import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { GameHistory } from './components/GameHistory';
import { countries } from './data/countries';
import { GameState, Country } from './types';
import './index.css';

function App() {
  const [gameHistory, setGameHistory] = useState<GameState[]>(() => {
    const saved = localStorage.getItem('gameHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleGameComplete = useCallback((winner: Country, eliminationOrder: string[]) => {
    const newGame: GameState = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      eliminationOrder,
      winner: winner.name,
      isComplete: true
    };

    setGameHistory(prevHistory => {
      // Check if we already have a game with the same elimination order and winner
      const isDuplicate = prevHistory.some(game => 
        game.winner === newGame.winner && 
        JSON.stringify(game.eliminationOrder) === JSON.stringify(newGame.eliminationOrder)
      );

      if (isDuplicate) {
        return prevHistory;
      }

      const updatedHistory = [newGame, ...prevHistory];
      localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    setGameHistory([]);
    localStorage.removeItem('gameHistory');
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-4 items-center">
                <Link to="/" className="font-bold text-xl">
                  Country Cards
                </Link>
                <Link to="/history" className="text-gray-600 hover:text-gray-900">
                  History
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <GameBoard 
                  countries={countries} 
                  onGameComplete={handleGameComplete}
                />
              } 
            />
            <Route 
              path="/history" 
              element={
                <GameHistory 
                  games={gameHistory}
                  onGameSelect={(gameId) => console.log('Selected game:', gameId)}
                  onClearHistory={handleClearHistory}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;