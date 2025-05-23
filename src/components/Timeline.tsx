
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
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Timeline</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">
            Total: {formatTime(totalDuration)}
          </span>
          <button
            onClick={onAddScene}
            className="cinema-button flex items-center space-x-2 text-sm px-3 py-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Scene</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Track */}
        <div className="flex h-16 bg-cinema-navy/30 rounded-lg overflow-hidden">
          {scenes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              No scenes yet. Add your first scene to get started!
            </div>
          ) : (
            scenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`relative h-full cursor-pointer transition-all duration-300 border-r border-cinema-slate/50 ${
                  selectedScene === scene.id
                    ? 'bg-cinema-gold shadow-lg shadow-cinema-gold/30'
                    : 'bg-cinema-blue/30 hover:bg-cinema-blue/50'
                }`}
                style={{ width: `${getSceneWidth(scene.duration)}%` }}
                onClick={() => onSceneSelect(scene.id)}
              >
                {/* Scene Content */}
                <div className="h-full flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-300">
                      {formatTime(scene.duration)}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex items-center">
                    <span className="text-xs text-white truncate font-medium">
                      {scene.title}
                    </span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedScene === scene.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-cinema-gold"></div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Time Markers */}
        {totalDuration > 0 && (
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>0:00</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
