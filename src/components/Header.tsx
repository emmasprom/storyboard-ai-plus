
import React from 'react';
import { Play, Search, Upload } from 'lucide-react';
import { UserTier } from '../types/storyboard';

interface HeaderProps {
  tier: UserTier;
  projectTitle: string;
  onTitleChange: (title: string) => void;
  onPreview: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tier,
  projectTitle,
  onTitleChange,
  onPreview,
  onExport
}) => {
  const getTierBadgeColor = (tier: UserTier) => {
    switch (tier) {
      case 'free': return 'bg-gray-500';
      case 'pro': return 'bg-cinema-gold';
      case 'enterprise': return 'bg-cinema-purple';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header className="glass-panel p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cinema-blue to-cinema-purple rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AI Storyboard</h1>
          </div>
          
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-cinema-navy/50 border border-cinema-slate rounded-lg px-3 py-1 text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue
                     font-medium text-lg min-w-[200px]"
            placeholder="Project Title"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTierBadgeColor(tier)}`}>
            {tier.toUpperCase()}
          </div>
          
          <button
            onClick={onPreview}
            className="cinema-button flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={onExport}
            className="cinema-button flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
