
import React, { useState, useEffect } from 'react';
import { Scene } from '../types/storyboard';
import { Button } from '@/components/ui/button';

interface SceneEditorProps {
  scene: Scene | null;
  onSave: (updates: Partial<Scene>) => void;
  onClose: () => void;
}

export const SceneEditor: React.FC<SceneEditorProps> = ({ scene, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 5,
    notes: '',
    shotType: 'medium' as const,
    cameraMovement: 'static' as const,
    lighting: 'natural' as const,
    imageUrl: ''
  });

  useEffect(() => {
    if (scene) {
      setFormData({
        title: scene.title,
        description: scene.description,
        duration: scene.duration,
        notes: scene.notes || '',
        shotType: scene.shotType || 'medium',
        cameraMovement: scene.cameraMovement || 'static',
        lighting: scene.lighting || 'natural',
        imageUrl: scene.imageUrl || ''
      });
    }
  }, [scene]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!scene) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-panel p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-4">Edit Scene</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scene Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue
                       resize-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duration (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Shot Type
              </label>
              <select
                value={formData.shotType}
                onChange={(e) => setFormData({ ...formData, shotType: e.target.value as any })}
                className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              >
                <option value="wide">Wide Shot</option>
                <option value="medium">Medium Shot</option>
                <option value="close">Close Shot</option>
                <option value="extreme-close">Extreme Close</option>
                <option value="over-shoulder">Over Shoulder</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Camera Movement
              </label>
              <select
                value={formData.cameraMovement}
                onChange={(e) => setFormData({ ...formData, cameraMovement: e.target.value as any })}
                className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              >
                <option value="static">Static</option>
                <option value="pan">Pan</option>
                <option value="tilt">Tilt</option>
                <option value="zoom">Zoom</option>
                <option value="dolly">Dolly</option>
                <option value="tracking">Tracking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lighting
              </label>
              <select
                value={formData.lighting}
                onChange={(e) => setFormData({ ...formData, lighting: e.target.value as any })}
                className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
              >
                <option value="natural">Natural</option>
                <option value="dramatic">Dramatic</option>
                <option value="soft">Soft</option>
                <option value="harsh">Harsh</option>
                <option value="silhouette">Silhouette</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue
                       resize-none"
              rows={2}
              placeholder="Additional notes or directions..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 cinema-button"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
