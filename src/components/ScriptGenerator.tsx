
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserTier, GenerateScriptRequest, Scene } from '../types/storyboard';

interface ScriptGeneratorProps {
  tier: UserTier;
  onScenesGenerated: (scenes: Omit<Scene, 'id' | 'position'>[]) => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ tier, onScenesGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const disabled = tier === 'free';

  const generateScript = async () => {
    if (!prompt.trim() || disabled) return;

    setLoading(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockScenes: Omit<Scene, 'id' | 'position'>[] = [
      {
        title: 'Opening Scene',
        description: 'A dramatic wide shot of the mountain landscape at dawn, with mist rolling through the valleys.',
        duration: 5,
        shotType: 'wide',
        cameraMovement: 'static',
        lighting: 'natural',
        notes: 'Golden hour lighting preferred'
      },
      {
        title: 'Character Introduction',
        description: 'Close-up of the protagonist looking determined, with the mountain in the background.',
        duration: 3,
        shotType: 'close',
        cameraMovement: 'static',
        lighting: 'natural',
        notes: 'Focus on facial expressions'
      },
      {
        title: 'Journey Begins',
        description: 'Medium shot of the character walking along the forest path, camera following.',
        duration: 4,
        shotType: 'medium',
        cameraMovement: 'tracking',
        lighting: 'soft',
        notes: 'Steady cam for smooth movement'
      }
    ];

    const generatedScript = `
FADE IN:

EXT. MOUNTAIN LANDSCAPE - DAWN

A breathtaking vista unfolds as the first rays of sunlight pierce through the morning mist. The camera captures the raw beauty of untouched wilderness.

The PROTAGONIST stands at the edge of a cliff, silhouetted against the rising sun. Determination etched in their posture.

PROTAGONIST
(whispered)
This is where it all begins.

The journey into the unknown starts here, with each step carrying the weight of destiny.

CUT TO:

EXT. FOREST PATH - MORNING

The protagonist moves with purpose through the ancient forest. Shafts of golden light filter through the canopy above.

FADE OUT.
    `;

    setResult(generatedScript);
    onScenesGenerated(mockScenes);
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8 shimmer-effect">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-header">AI Script Generator</h2>
        {disabled && (
          <span className="bg-gradient-to-r from-cinema-gold to-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg">
            ⭐ PRO FEATURE
          </span>
        )}
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-display font-semibold text-foreground mb-3">
            Scene Description
          </label>
          <textarea
            className="w-full p-4 bg-card/60 border border-white/10 rounded-2xl 
                     text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                     resize-none transition-all duration-300 hover:border-primary/30 backdrop-blur-xl
                     font-inter disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={disabled ? "Upgrade to Pro to unlock AI script generation..." : "Describe your scene or story concept in vivid detail..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={disabled}
            rows={5}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-semibold text-foreground mb-3">
              Genre
            </label>
            <select
              className="w-full p-3 bg-card/60 border border-white/10 rounded-xl 
                       text-white focus:outline-none focus:ring-2 focus:ring-primary/50
                       transition-all duration-300 hover:border-primary/30 backdrop-blur-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              disabled={disabled}
            >
              <option value="">Select Genre</option>
              <option value="drama">Drama</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="thriller">Thriller</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-display font-semibold text-foreground mb-3">
              Tone
            </label>
            <select
              className="w-full p-3 bg-card/60 border border-white/10 rounded-xl 
                       text-white focus:outline-none focus:ring-2 focus:ring-primary/50
                       transition-all duration-300 hover:border-primary/30 backdrop-blur-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={disabled}
            >
              <option value="">Select Tone</option>
              <option value="serious">Serious</option>
              <option value="lighthearted">Lighthearted</option>
              <option value="mysterious">Mysterious</option>
              <option value="inspirational">Inspirational</option>
              <option value="emotional">Emotional</option>
            </select>
          </div>
        </div>

        <Button
          className={`w-full py-4 font-display font-bold text-base transition-all duration-300 ${
            disabled || loading
              ? 'bg-muted cursor-not-allowed opacity-60'
              : 'cinema-button'
          }`}
          onClick={generateScript}
          disabled={disabled || loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Magic...</span>
            </div>
          ) : (
            '✨ Generate Script & Scenes'
          )}
        </Button>

        {result && (
          <div className="mt-6 p-6 bg-card/80 rounded-2xl border border-white/10 backdrop-blur-xl
                        animate-fade-in shadow-[0_0_30px_rgba(155,107,255,0.2)]">
            <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              Generated Script
            </h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
              {result}
            </pre>
          </div>
        )}

        {disabled && (
          <div className="mt-5 p-5 bg-gradient-to-br from-cinema-gold/10 to-amber-500/10 rounded-2xl border border-cinema-gold/30
                        backdrop-blur-xl animate-pulse-glow">
            <p className="text-cinema-gold text-sm font-display font-semibold flex items-center gap-2">
              <span className="text-xl">⭐</span>
              Upgrade to Pro to unlock AI-powered script generation with advanced scene breakdown and professional formatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
