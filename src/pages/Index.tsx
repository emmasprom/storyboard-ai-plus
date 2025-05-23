
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ScriptGenerator } from '../components/ScriptGenerator';
import { AssetLibrary } from '../components/AssetLibrary';
import { SceneCard } from '../components/SceneCard';
import { SortableSceneCard } from '../components/SortableSceneCard';
import { Timeline } from '../components/Timeline';
import { SceneEditor } from '../components/SceneEditor';
import { useStoryboard } from '../hooks/useStoryboard';
import { UserTier, Scene, Asset } from '../types/storyboard';
import { toast } from 'sonner';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Index = () => {
  const {
    project,
    selectedScene,
    setSelectedScene,
    addScene,
    updateScene,
    deleteScene,
    duplicateScene,
    reorderScenes,
    setProject
  } = useStoryboard();

  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [userTier] = useState<UserTier>('pro'); // For demo purposes

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Only activate after moving 5px to avoid accidental drags
      },
    })
  );

  const handleTitleChange = (title: string) => {
    setProject(prev => ({ ...prev, title, updatedAt: new Date() }));
  };

  const handleScenesGenerated = (scenes: Omit<Scene, 'id' | 'position'>[]) => {
    scenes.forEach(scene => {
      addScene(scene);
    });
    toast.success(`Generated ${scenes.length} scenes successfully!`);
  };

  const handleAssetSelect = (asset: Asset) => {
    if (selectedScene) {
      updateScene(selectedScene, { imageUrl: asset.url });
      toast.success(`Added "${asset.title}" to scene`);
    } else {
      toast.error('Please select a scene first');
    }
  };

  const handleAddScene = () => {
    const newSceneId = addScene({
      title: `Scene ${project.scenes.length + 1}`,
      description: 'New scene description',
      duration: 5,
      shotType: 'medium',
      cameraMovement: 'static',
      lighting: 'natural'
    });
    setSelectedScene(newSceneId);
    toast.success('New scene added');
  };

  const handleSceneEdit = (scene: Scene) => {
    setEditingScene(scene);
  };

  const handleSceneUpdate = (sceneId: string, updates: Partial<Scene>) => {
    updateScene(sceneId, updates);
    toast.success('Scene updated');
  };

  const handleSceneDelete = (sceneId: string) => {
    deleteScene(sceneId);
    toast.success('Scene deleted');
  };

  const handleSceneDuplicate = (sceneId: string) => {
    const newSceneId = duplicateScene(sceneId);
    if (newSceneId) {
      setSelectedScene(newSceneId);
      toast.success('Scene duplicated');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = project.scenes.findIndex(scene => scene.id === active.id);
      const newIndex = project.scenes.findIndex(scene => scene.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderScenes(oldIndex, newIndex);
        toast.success('Scene order updated');
      }
    }
  };

  const handlePreview = () => {
    if (project.scenes.length === 0) {
      toast.error('Add some scenes to preview your storyboard');
      return;
    }
    toast.success('Preview functionality would open here');
  };

  const handleExport = () => {
    if (project.scenes.length === 0) {
      toast.error('Add some scenes to export your storyboard');
      return;
    }
    toast.success('Export functionality would start here');
  };

  return (
    <div className="min-h-screen bg-gradient-cinema text-white">
      <div className="container mx-auto px-4 py-6">
        <Header
          tier={userTier}
          projectTitle={project.title}
          onTitleChange={handleTitleChange}
          onPreview={handlePreview}
          onExport={handleExport}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Script Generator */}
          <div className="lg:col-span-1">
            <ScriptGenerator
              tier={userTier}
              onScenesGenerated={handleScenesGenerated}
            />
          </div>

          {/* Center Panel - Storyboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scene Grid */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Storyboard</h2>
                <span className="text-sm text-gray-400">
                  {project.scenes.length} scenes
                </span>
              </div>

              {project.scenes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    Start Your Creative Journey
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Generate a script with AI or add your first scene manually
                  </p>
                  <button
                    onClick={handleAddScene}
                    className="cinema-button"
                  >
                    Create First Scene
                  </button>
                </div>
              ) : (
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={project.scenes.map(scene => scene.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.scenes.map((scene) => (
                        <SortableSceneCard
                          key={scene.id}
                          scene={scene}
                          isSelected={selectedScene === scene.id}
                          onSelect={() => setSelectedScene(scene.id)}
                          onEdit={() => handleSceneEdit(scene)}
                          onDelete={() => handleSceneDelete(scene.id)}
                          onDuplicate={() => handleSceneDuplicate(scene.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>

            {/* Timeline */}
            <Timeline
              scenes={project.scenes}
              totalDuration={project.totalDuration}
              selectedScene={selectedScene}
              onSceneSelect={setSelectedScene}
              onAddScene={handleAddScene}
            />
          </div>

          {/* Right Panel - Asset Library */}
          <div className="lg:col-span-1">
            <AssetLibrary
              tier={userTier}
              onAssetSelect={handleAssetSelect}
            />
          </div>
        </div>

        {/* Scene Editor Modal */}
        {editingScene && (
          <SceneEditor
            scene={editingScene}
            onSave={(updates) => {
              handleSceneUpdate(editingScene.id, updates);
              setEditingScene(null);
            }}
            onClose={() => setEditingScene(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
