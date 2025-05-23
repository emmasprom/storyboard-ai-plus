
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
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">AI Script Generator</h2>
        {disabled && (
          <span className="text-cinema-gold text-sm font-medium">Pro Feature</span>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scene Description
          </label>
          <textarea
            className="w-full p-3 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue
                     resize-none transition-all duration-200"
            placeholder={disabled ? "Upgrade to Pro to unlock AI script generation..." : "Describe your scene or story concept..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={disabled}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genre
            </label>
            <select
              className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone
            </label>
            <select
              className="w-full p-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-cinema-blue"
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
          className={`w-full py-3 font-semibold transition-all duration-200 ${
            disabled || loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'cinema-button'
          }`}
          onClick={generateScript}
          disabled={disabled || loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Script...</span>
            </div>
          ) : (
            'Generate Script & Scenes'
          )}
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-cinema-dark/50 rounded-lg border border-cinema-slate">
            <h3 className="font-medium text-cinema-gold mb-3">Generated Script:</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
              {result}
            </pre>
          </div>
        )}

        {disabled && (
          <div className="mt-4 p-4 bg-cinema-gold/10 rounded-lg border border-cinema-gold/30">
            <p className="text-cinema-gold text-sm">
              🌟 Upgrade to Pro to unlock AI-powered script generation with advanced scene breakdown and professional formatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
