import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface ExampleControlsProps {
  onConfigChange: (config: any) => void;
  onLoadingToggle: (loading: boolean) => void;
  isLoading: boolean;
}

const animations = [
  'wave', 'pulse', 'glimmer', 'scan', 'neon', 
  'breathing', 'fade-in', 'slide-in', 'rumble', 
  'bounce', 'classic', 'shimmer-vertical'
];

export function ExampleControls({ onConfigChange, onLoadingToggle, isLoading }: ExampleControlsProps) {
  const [animation, setAnimation] = useState('wave');
  const [color, setColor] = useState('#27272a');
  const [highlightColor, setHighlightColor] = useState('#52525b');

  const handleAnimationChange = (newAnimation: string) => {
    setAnimation(newAnimation);
    onConfigChange({ animation: newAnimation, color, highlightColor });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onConfigChange({ animation, color: newColor, highlightColor });
  };

  const handleHighlightChange = (newHighlight: string) => {
    setHighlightColor(newHighlight);
    onConfigChange({ animation, color, highlightColor: newHighlight });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Loading Toggle */}
        <div className="flex-shrink-0">
          <button
            onClick={() => onLoadingToggle(!isLoading)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isLoading 
                ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Pause className="w-4 h-4" />
                Stop Loading
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Loading
              </>
            )}
          </button>
        </div>

        {/* Animation Selector */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Animation Preset</label>
          <select
            value={animation}
            onChange={(e) => handleAnimationChange(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {animations.map((anim) => (
              <option key={anim} value={anim}>{anim}</option>
            ))}
          </select>
        </div>

        {/* Color Pickers */}
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Base Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-20 h-10 rounded cursor-pointer bg-zinc-800 border border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Highlight</label>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => handleHighlightChange(e.target.value)}
              className="w-20 h-10 rounded cursor-pointer bg-zinc-800 border border-zinc-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
