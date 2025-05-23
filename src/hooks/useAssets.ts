
import { useState, useCallback } from 'react';
import { Asset } from '../types/storyboard';

// Mock assets for demonstration
const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    title: 'Mountain Landscape',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
    type: 'image',
    tags: ['landscape', 'mountain', 'nature'],
    author: 'John Doe',
    source: 'Unsplash'
  },
  {
    id: '2',
    title: 'Urban Cityscape',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300',
    type: 'image',
    tags: ['city', 'urban', 'skyline'],
    author: 'Jane Smith',
    source: 'Unsplash'
  },
  {
    id: '3',
    title: 'Forest Path',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
    type: 'image',
    tags: ['forest', 'path', 'nature'],
    author: 'Bob Johnson',
    source: 'Unsplash'
  },
  {
    id: '4',
    title: 'Ocean Waves',
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300',
    type: 'image',
    tags: ['ocean', 'waves', 'water'],
    author: 'Alice Brown',
    source: 'Unsplash'
  },
  {
    id: '5',
    title: 'Desert Dunes',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300',
    type: 'image',
    tags: ['desert', 'dunes', 'sand'],
    author: 'Mike Wilson',
    source: 'Unsplash'
  },
  {
    id: '6',
    title: 'Night Sky',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300',
    type: 'image',
    tags: ['night', 'stars', 'sky'],
    author: 'Sarah Davis',
    source: 'Unsplash'
  }
];

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchAssets = useCallback(async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!query.trim()) {
      setAssets(MOCK_ASSETS);
    } else {
      const filtered = MOCK_ASSETS.filter(asset =>
        asset.title.toLowerCase().includes(query.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setAssets(filtered);
    }
    
    setLoading(false);
  }, []);

  const getAssetById = useCallback((id: string) => {
    return assets.find(asset => asset.id === id);
  }, [assets]);

  const getAssetsByTag = useCallback((tag: string) => {
    return assets.filter(asset => asset.tags.includes(tag));
  }, [assets]);

  return {
    assets,
    loading,
    searchQuery,
    searchAssets,
    getAssetById,
    getAssetsByTag
  };
};
