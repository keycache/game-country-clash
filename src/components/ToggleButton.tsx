import { Eye, EyeOff } from 'lucide-react';

interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const ToggleButton = ({ isEnabled, onToggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      title={isEnabled ? "Show all cards" : "Hide selected cards"}
    >
      {isEnabled ? (
        <>
          <Eye className="w-4 h-4" />
          <span className="text-sm">Show All</span>
        </>
      ) : (
        <>
          <EyeOff className="w-4 h-4" />
          <span className="text-sm">Hide Selected</span>
        </>
      )}
    </button>
  );
};