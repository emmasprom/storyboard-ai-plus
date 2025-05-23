
export interface Scene {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  duration: number;
  position: number;
  notes?: string;
  shotType?: 'wide' | 'medium' | 'close' | 'extreme-close' | 'over-shoulder';
  cameraMovement?: 'static' | 'pan' | 'tilt' | 'zoom' | 'dolly' | 'tracking';
  lighting?: 'natural' | 'dramatic' | 'soft' | 'harsh' | 'silhouette';
}

export interface StoryboardProject {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  createdAt: Date;
  updatedAt: Date;
  totalDuration: number;
}

export interface Asset {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video' | 'audio';
  tags: string[];
  author?: string;
  source?: string;
}

export interface GenerateScriptRequest {
  prompt: string;
  genre?: string;
  tone?: string;
  duration?: number;
}

export interface GenerateScriptResponse {
  script: string;
  scenes: Omit<Scene, 'id' | 'position'>[];
  estimatedDuration: number;
}

export type UserTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  avatar?: string;
}
