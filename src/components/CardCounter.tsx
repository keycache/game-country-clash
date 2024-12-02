import { motion } from 'framer-motion';

interface CardCounterProps {
  remaining: number;
  total: number;
}

export const CardCounter = ({ remaining, total }: CardCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-[4.5rem] z-10 mb-4"
    >
      <div className="backdrop-blur-sm bg-white/80 mx-auto max-w-fit px-4 py-2 rounded-lg shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-600">
          Cards Remaining: <span className="text-blue-600 font-bold">{remaining}</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500">{total}</span>
        </p>
      </div>
    </motion.div>
  );
};