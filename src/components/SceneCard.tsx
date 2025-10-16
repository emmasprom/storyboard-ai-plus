
import React from 'react';
import { Play, Edit, Trash, Copy } from 'lucide-react';
import { Scene } from '../types/storyboard';

interface SceneCardProps {
  scene: Scene;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const getShotTypeIcon = (shotType: string) => {
    const icons = {
      'wide': '📷',
      'medium': '🎥',
      'close': '👤',
      'extreme-close': '👁',
      'over-shoulder': '👥'
    };
    return icons[shotType as keyof typeof icons] || '🎬';
  };

  const getCameraMovementBadge = (movement: string) => {
    const colors = {
      'static': 'bg-gray-500',
      'pan': 'bg-blue-500',
      'tilt': 'bg-green-500',
      'zoom': 'bg-purple-500',
      'dolly': 'bg-orange-500',
      'tracking': 'bg-red-500'
    };
    return colors[movement as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div
      className={`scene-card group ${
        isSelected ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(155,107,255,0.4)]' : ''
      }`}
      onClick={onSelect}
    >
      {/* Scene Image */}
      <div className="relative h-40 bg-card/40 rounded-2xl overflow-hidden mb-4 image-glow">
        {scene.imageUrl ? (
          <img
            src={scene.imageUrl}
            alt={scene.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-primary/10 to-secondary/10">
            {getShotTypeIcon(scene.shotType || '')}
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10">
          {scene.duration}s
        </div>

        {/* Camera Movement Badge */}
        {scene.cameraMovement && (
          <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-xl ${getCameraMovementBadge(scene.cameraMovement)} 
                         backdrop-blur-sm border border-white/10`}>
            {scene.cameraMovement}
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                        transition-all duration-500 bg-gradient-to-br from-primary/40 to-secondary/40 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300
                         border border-white/30 shadow-2xl">
            <Play className="w-10 h-10 text-white drop-shadow-lg" fill="white" />
          </div>
        </div>
      </div>

      {/* Scene Info */}
      <div className="space-y-3 relative z-10">
        <h3 className="font-display font-bold text-white text-base truncate text-glow-subtle">
          {scene.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {scene.description}
        </p>
        
        {/* Technical Details */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {scene.shotType && (
            <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-xl font-semibold border border-primary/30 backdrop-blur-sm">
              {scene.shotType}
            </span>
          )}
          {scene.lighting && (
            <span className="bg-secondary/20 text-secondary px-3 py-1.5 rounded-xl font-semibold border border-secondary/30 backdrop-blur-sm">
              {scene.lighting}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <div className="flex gap-2 bg-black/80 backdrop-blur-md rounded-2xl p-1.5 border border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/80 
                     transition-all duration-300 hover:scale-110 shadow-lg"
            title="Edit"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="w-8 h-8 bg-cinema-emerald rounded-xl flex items-center justify-center hover:bg-cinema-emerald/80 
                     transition-all duration-300 hover:scale-110 shadow-lg"
            title="Duplicate"
          >
            <Copy className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center hover:bg-red-600 
                     transition-all duration-300 hover:scale-110 shadow-lg"
            title="Delete"
          >
            <Trash className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scene Number */}
      <div className="absolute bottom-3 left-3 w-10 h-10 bg-gradient-to-br from-cinema-gold to-amber-500 
                    rounded-2xl flex items-center justify-center z-20 shadow-lg border border-white/20
                    font-display font-extrabold text-white text-base">
        {scene.position + 1}
      </div>
    </div>
  );
};
