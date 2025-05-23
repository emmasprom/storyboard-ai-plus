
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Scene } from '../types/storyboard';

interface SceneEditorProps {
  scene: Scene;
  onSave: (updates: Partial<Scene>) => void;
  onClose: () => void;
}

export const SceneEditor: React.FC<SceneEditorProps> = ({
  scene,
  onSave,
  onClose
}) => {
  const [title, setTitle] = useState(scene.title);
  const [description, setDescription] = useState(scene.description);
  const [duration, setDuration] = useState(scene.duration);
  const [notes, setNotes] = useState(scene.notes || '');
  const [shotType, setShotType] = useState<Scene['shotType']>(scene.shotType);
  const [cameraMovement, setCameraMovement] = useState<Scene['cameraMovement']>(scene.cameraMovement);
  const [lighting, setLighting] = useState<Scene['lighting']>(scene.lighting);

  const handleSave = () => {
    onSave({
      title,
      description,
      duration,
      notes,
      shotType,
      cameraMovement,
      lighting
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Edit Scene</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Scene Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
            />
          </div>
          
          {/* Scene Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              rows={3}
            />
          </div>
          
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={1}
              max={300}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
            />
          </div>
          
          {/* Shot Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Shot Type</label>
            <select
              value={shotType}
              onChange={(e) => setShotType(e.target.value as Scene['shotType'])}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
            >
              <option value="wide">Wide Shot</option>
              <option value="medium">Medium Shot</option>
              <option value="close">Close-up</option>
              <option value="extreme-close">Extreme Close-up</option>
              <option value="over-shoulder">Over-the-Shoulder</option>
            </select>
          </div>
          
          {/* Camera Movement */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Camera Movement</label>
            <select
              value={cameraMovement}
              onChange={(e) => setCameraMovement(e.target.value as Scene['cameraMovement'])}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
            >
              <option value="static">Static</option>
              <option value="pan">Pan</option>
              <option value="tilt">Tilt</option>
              <option value="zoom">Zoom</option>
              <option value="dolly">Dolly</option>
              <option value="tracking">Tracking</option>
            </select>
          </div>
          
          {/* Lighting */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Lighting</label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value as Scene['lighting'])}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
            >
              <option value="natural">Natural</option>
              <option value="dramatic">Dramatic</option>
              <option value="soft">Soft</option>
              <option value="harsh">Harsh</option>
              <option value="silhouette">Silhouette</option>
            </select>
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-cinema-navy border border-cinema-slate rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              rows={3}
              placeholder="Add any additional notes here"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-cinema-slate text-gray-300 rounded-md mr-2 hover:bg-cinema-navy"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cinema-button flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
