
import React from 'react';
import { Plus } from 'lucide-react';
import { Scene } from '../types/storyboard';

interface TimelineProps {
  scenes: Scene[];
  totalDuration: number;
  selectedScene: string | null;
  onSceneSelect: (sceneId: string) => void;
  onAddScene: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  scenes,
  totalDuration,
  selectedScene,
  onSceneSelect,
  onAddScene
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSceneWidth = (duration: number) => {
    if (totalDuration === 0) return 100;
    return Math.max((duration / totalDuration) * 100, 10); // Minimum 10% width
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-header text-lg">Timeline</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-display font-semibold text-muted-foreground bg-card/60 px-4 py-2 rounded-xl border border-white/10">
            Total: {formatTime(totalDuration)}
          </span>
          <button
            onClick={onAddScene}
            className="cinema-button flex items-center gap-2 text-sm px-5 py-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Scene</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Track */}
        <div className="flex h-20 bg-card/40 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
          {scenes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-display">
              🎬 No scenes yet. Add your first scene to begin!
            </div>
          ) : (
            scenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`relative h-full cursor-pointer transition-all duration-500 border-r border-white/5 group ${
                  selectedScene === scene.id
                    ? 'bg-gradient-to-br from-primary to-secondary shadow-[0_0_20px_rgba(155,107,255,0.4)]'
                    : 'bg-gradient-to-br from-card/60 to-card/40 hover:from-primary/30 hover:to-secondary/30'
                }`}
                style={{ width: `${getSceneWidth(scene.duration)}%` }}
                onClick={() => onSceneSelect(scene.id)}
              >
                {/* Scene Content */}
                <div className="h-full flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                      {formatTime(scene.duration)}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex items-center mt-2">
                    <span className="text-xs font-display font-semibold text-white truncate drop-shadow-lg">
                      {scene.title}
                    </span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedScene === scene.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cinema-gold via-amber-400 to-cinema-gold animate-pulse"></div>
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                              bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
            ))
          )}
        </div>

        {/* Time Markers */}
        {totalDuration > 0 && (
          <div className="mt-3 flex justify-between text-xs font-display font-semibold text-muted-foreground">
            <span className="bg-card/60 px-3 py-1 rounded-lg border border-white/10">0:00</span>
            <span className="bg-card/60 px-3 py-1 rounded-lg border border-white/10">{formatTime(totalDuration)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
