
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SceneCard } from './SceneCard';
import { Scene } from '../types/storyboard';

interface SortableSceneCardProps {
  scene: Scene;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const SortableSceneCard: React.FC<SortableSceneCardProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: props.scene.id,
    data: {
      scene: props.scene
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 50 : 'auto',
    scale: isDragging ? 1.05 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`touch-none ${isDragging ? 'cursor-grabbing shadow-[0_0_50px_rgba(155,107,255,0.6)]' : 'cursor-grab'}`}
      {...attributes}
      {...listeners}
    >
      <SceneCard {...props} />
    </div>
  );
};
