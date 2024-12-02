import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface WinnerOverlayProps {
  countryName: string;
  onClose: () => void;
}

export const WinnerOverlay = ({ countryName, onClose }: WinnerOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-lg text-gray-700">
          The winner is: <span className="font-bold text-xl">{countryName}</span>
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};