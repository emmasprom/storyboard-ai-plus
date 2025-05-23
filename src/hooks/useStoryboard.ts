
import { useState, useCallback } from 'react';
import { Scene, StoryboardProject } from '../types/storyboard';

export const useStoryboard = () => {
  const [project, setProject] = useState<StoryboardProject>({
    id: '1',
    title: 'My Storyboard',
    description: 'A new creative project',
    scenes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    totalDuration: 0
  });

  const [selectedScene, setSelectedScene] = useState<string | null>(null);

  const addScene = useCallback((scene: Omit<Scene, 'id' | 'position'>) => {
    const newScene: Scene = {
      ...scene,
      id: `scene-${Date.now()}-${Math.random()}`,
      position: project.scenes.length
    };

    setProject(prev => ({
      ...prev,
      scenes: [...prev.scenes, newScene],
      totalDuration: prev.totalDuration + scene.duration,
      updatedAt: new Date()
    }));

    return newScene.id;
  }, [project.scenes.length]);

  const updateScene = useCallback((sceneId: string, updates: Partial<Scene>) => {
    setProject(prev => {
      const updatedScenes = prev.scenes.map(scene => 
        scene.id === sceneId ? { ...scene, ...updates } : scene
      );
      
      const totalDuration = updatedScenes.reduce((sum, scene) => sum + scene.duration, 0);
      
      return {
        ...prev,
        scenes: updatedScenes,
        totalDuration,
        updatedAt: new Date()
      };
    });
  }, []);

  const deleteScene = useCallback((sceneId: string) => {
    setProject(prev => {
      const filteredScenes = prev.scenes.filter(scene => scene.id !== sceneId);
      const reorderedScenes = filteredScenes.map((scene, index) => ({
        ...scene,
        position: index
      }));
      
      const totalDuration = reorderedScenes.reduce((sum, scene) => sum + scene.duration, 0);
      
      return {
        ...prev,
        scenes: reorderedScenes,
        totalDuration,
        updatedAt: new Date()
      };
    });

    if (selectedScene === sceneId) {
      setSelectedScene(null);
    }
  }, [selectedScene]);

  const reorderScenes = useCallback((startIndex: number, endIndex: number) => {
    setProject(prev => {
      const result = Array.from(prev.scenes);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      const reorderedScenes = result.map((scene, index) => ({
        ...scene,
        position: index
      }));
      
      return {
        ...prev,
        scenes: reorderedScenes,
        updatedAt: new Date()
      };
    });
  }, []);

  const duplicateScene = useCallback((sceneId: string) => {
    const sceneToClone = project.scenes.find(scene => scene.id === sceneId);
    if (!sceneToClone) return;

    const newScene: Scene = {
      ...sceneToClone,
      id: `scene-${Date.now()}-${Math.random()}`,
      title: `${sceneToClone.title} (Copy)`,
      position: project.scenes.length
    };

    setProject(prev => ({
      ...prev,
      scenes: [...prev.scenes, newScene],
      totalDuration: prev.totalDuration + newScene.duration,
      updatedAt: new Date()
    }));

    return newScene.id;
  }, [project.scenes]);

  return {
    project,
    selectedScene,
    setSelectedScene,
    addScene,
    updateScene,
    deleteScene,
    reorderScenes,
    duplicateScene,
    setProject
  };
};
