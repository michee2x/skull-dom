import { useState } from 'react';
import { type SkeletonConfig } from 'skull-dom';
import { Play, Pause, Settings, X } from 'lucide-react';

interface CompactControlsProps {
  onConfigChange: (config: SkeletonConfig) => void;
  onLoadingToggle: (loading: boolean) => void;
  isLoading: boolean;
}

const animations = [
  'wave', 'pulse', 'glimmer', 'scan', 'neon', 
  'breathing', 'fade-in', 'slide-in', 'rumble', 
  'bounce', 'classic', 'shimmer-vertical'
];

export function CompactControls({ onConfigChange, onLoadingToggle, isLoading }: CompactControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState<SkeletonConfig['animation']>('wave');
  const [color, setColor] = useState<SkeletonConfig['color'] >('#27272a');
  const [highlightColor, setHighlightColor] = useState<SkeletonConfig['highlightColor'] >('#52525b');

  const handleAnimationChange = (newAnimation: SkeletonConfig['animation']) => {
    setAnimation(newAnimation);
    onConfigChange({ animation: newAnimation, color, highlightColor });
  };

  const handleColorChange = (newColor: SkeletonConfig['color']) => {
    setColor(newColor);
    onConfigChange({ animation, color: newColor, highlightColor });
  };

  const handleHighlightChange = (newHighlight: SkeletonConfig['highlightColor']) => {
    setHighlightColor(newHighlight);
    onConfigChange({ animation, color, highlightColor: newHighlight });
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
      {/* Loading Toggle */}
      <button
        onClick={() => onLoadingToggle(!isLoading)}
        className={`p-2 rounded-lg font-semibold transition-all ${
          isLoading 
            ? 'bg-rose-600 hover:bg-rose-700 text-white' 
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
        }`}
        title={isLoading ? 'Stop Loading' : 'Start Loading'}
      >
        {isLoading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Settings Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700"
        title="Configure Animation"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-xl min-w-[280px]">
          <div className="space-y-4">
            {/* Animation Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Animation</label>
              <select
                value={animation}
                onChange={(e) => handleAnimationChange(e.target.value as SkeletonConfig['animation'])}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {animations.map((anim) => (
                  <option key={anim} value={anim}>{anim}</option>
                ))}
              </select>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Base</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer bg-zinc-800 border border-zinc-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Highlight</label>
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => handleHighlightChange(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer bg-zinc-800 border border-zinc-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
