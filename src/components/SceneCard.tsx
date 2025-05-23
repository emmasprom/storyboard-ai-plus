
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
      className={`scene-card relative ${
        isSelected ? 'border-cinema-gold shadow-2xl shadow-cinema-gold/20' : ''
      }`}
      onClick={onSelect}
    >
      {/* Scene Image */}
      <div className="relative h-32 bg-cinema-navy/30 rounded-lg overflow-hidden mb-3">
        {scene.imageUrl ? (
          <img
            src={scene.imageUrl}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {getShotTypeIcon(scene.shotType || '')}
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {scene.duration}s
        </div>

        {/* Camera Movement Badge */}
        {scene.cameraMovement && (
          <div className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded ${getCameraMovementBadge(scene.cameraMovement)}`}>
            {scene.cameraMovement}
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 
                        transition-opacity duration-300 bg-black/50">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Scene Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-white text-sm truncate">{scene.title}</h3>
        <p className="text-gray-300 text-xs line-clamp-2">{scene.description}</p>
        
        {/* Technical Details */}
        <div className="flex items-center space-x-2 text-xs">
          {scene.shotType && (
            <span className="bg-cinema-blue/20 text-cinema-blue px-2 py-1 rounded">
              {scene.shotType}
            </span>
          )}
          {scene.lighting && (
            <span className="bg-cinema-purple/20 text-cinema-purple px-2 py-1 rounded">
              {scene.lighting}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-6 h-6 bg-cinema-blue rounded-full flex items-center justify-center hover:bg-cinema-blue/80"
          >
            <Edit className="w-3 h-3 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="w-6 h-6 bg-cinema-emerald rounded-full flex items-center justify-center hover:bg-cinema-emerald/80"
          >
            <Copy className="w-3 h-3 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <Trash className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Scene Number */}
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-cinema-gold rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-cinema-dark">{scene.position + 1}</span>
      </div>
    </div>
  );
};
