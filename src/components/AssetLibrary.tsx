
import React, { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Asset, UserTier } from '../types/storyboard';
import { useAssets } from '../hooks/useAssets';

interface AssetLibraryProps {
  tier: UserTier;
  onAssetSelect: (asset: Asset) => void;
}

export const AssetLibrary: React.FC<AssetLibraryProps> = ({ tier, onAssetSelect }) => {
  const { assets, loading, searchAssets } = useAssets();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    searchAssets('');
  }, [searchAssets]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchAssets(query);
  };

  const canUseAsset = tier !== 'free';

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Asset Library</h2>
        {!canUseAsset && (
          <span className="text-cinema-gold text-sm font-medium">Pro Feature</span>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={canUseAsset ? "Search assets..." : "Upgrade to Pro to search assets"}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={!canUseAsset}
          className="w-full pl-10 pr-4 py-2 bg-cinema-navy/50 border border-cinema-slate rounded-lg 
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-blue
                   transition-all duration-200"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-cinema-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : assets.length > 0 ? (
          <div className="asset-grid">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className={`relative group overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                  canUseAsset 
                    ? 'hover:scale-105 hover:shadow-xl' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => canUseAsset && onAssetSelect(asset)}
              >
                <img
                  src={asset.thumbnail}
                  alt={asset.title}
                  className="w-full h-24 object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">{asset.title}</p>
                    <p className="text-gray-300 text-xs truncate">by {asset.author}</p>
                  </div>
                </div>

                {canUseAsset && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 bg-cinema-blue rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                {!canUseAsset && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-white text-xs font-medium bg-cinema-gold px-2 py-1 rounded">
                      Pro Only
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <Search className="w-8 h-8 mb-2" />
            <p className="text-sm">No assets found</p>
          </div>
        )}
      </div>

      {!canUseAsset && (
        <div className="mt-4 p-4 bg-cinema-gold/10 rounded-lg border border-cinema-gold/30">
          <p className="text-cinema-gold text-sm">
            🎬 Upgrade to Pro to access thousands of professional assets including images, videos, and audio clips.
          </p>
        </div>
      )}
    </div>
  );
};
