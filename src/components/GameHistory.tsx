import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, Clock, Trash2 } from 'lucide-react';
import { GameState } from '../types';

interface GameHistoryProps {
  games: GameState[];
  onGameSelect: (gameId: string) => void;
  onClearHistory: () => void;
}

export const GameHistory = ({ games, onGameSelect, onClearHistory }: GameHistoryProps) => {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleGame = (gameId: string) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
    onGameSelect(gameId);
  };

  const handleClearClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmClear = () => {
    onClearHistory();
    setShowConfirmation(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Game History</h2>
        {games.length > 0 && (
          <button
            onClick={handleClearClick}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Clear History</span>
          </button>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold mb-2">Clear History?</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to clear all game history? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {games.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No games played yet. Start a new game to see your history!
          </div>
        ) : (
          games.map(game => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Game Header */}
              <button
                onClick={() => toggleGame(game.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {game.winner ? (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-500" />
                  )}
                  <div className="text-left">
                    <div className="font-semibold">
                      {formatDate(game.startTime)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {game.isComplete ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {game.winner && (
                    <span className="text-green-600 font-medium hidden sm:block">
                      Winner: {game.winner}
                    </span>
                  )}
                  {expandedGameId === game.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Game Details */}
              <AnimatePresence>
                {expandedGameId === game.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-4 py-3 bg-gray-50">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">
                        Card Selection Order:
                      </h3>
                      <div className="space-y-2">
                        {game.eliminationOrder.map((countryName, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-white rounded p-2 shadow-sm"
                          >
                            <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="flex-1">{countryName}</span>
                            {index === game.eliminationOrder.length - 1 && (
                              <Trophy className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
};