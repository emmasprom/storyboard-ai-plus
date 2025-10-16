
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
      case 'free': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      case 'pro': return 'bg-gradient-to-r from-cinema-gold to-amber-500';
      case 'enterprise': return 'bg-gradient-to-r from-cinema-purple to-cinema-violet';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <header className="glass-panel p-6 mb-8 relative overflow-visible">
      {/* Decorative glow orbs */}
      <div className="floating-orb w-64 h-64 bg-primary -top-32 -left-32 animate-float" />
      <div className="floating-orb w-48 h-48 bg-secondary -bottom-24 -right-24 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-primary 
                          rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(155,107,255,0.5)]
                          animate-pulse-glow">
              <Play className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text-static">
                AI Storyboard Studio
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Professional Creation Tool</p>
            </div>
          </div>
          
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-card/60 border border-white/10 rounded-xl px-4 py-2.5 text-white 
                     placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                     font-display font-semibold text-lg min-w-[250px] backdrop-blur-xl
                     transition-all duration-300 hover:border-primary/30 focus:border-primary/50"
            placeholder="My Epic Project"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold text-white tracking-wider
                         shadow-lg ${getTierBadgeColor(tier)} relative overflow-hidden
                         before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%]
                         hover:before:translate-x-[100%] before:transition-transform before:duration-500`}>
            {tier.toUpperCase()} PLAN
          </div>
          
          <button
            onClick={onPreview}
            className="cinema-button flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={onExport}
            className="cinema-button flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
