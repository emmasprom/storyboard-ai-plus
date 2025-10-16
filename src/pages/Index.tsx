
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
    <div className="min-h-screen aurora-effect text-white relative">
      <div className="container mx-auto px-6 py-8 relative z-10">
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
            <div className="glass-panel p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-header">Storyboard</h2>
                <span className="text-sm font-medium text-muted-foreground bg-card/60 px-4 py-2 rounded-xl border border-white/10">
                  {project.scenes.length} scenes • {Math.floor(project.totalDuration / 60)}:{String(project.totalDuration % 60).padStart(2, '0')} min
                </span>
              </div>

              {project.scenes.length === 0 ? (
                <div className="text-center py-20 relative">
                  <div className="floating-orb w-40 h-40 bg-primary/30 top-0 left-1/2 -translate-x-1/2 animate-float" />
                  <div className="relative z-10">
                    <div className="text-8xl mb-6 animate-float">🎬</div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3 text-glow-subtle">
                      Start Your Creative Journey
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                      Generate a cinematic script with AI or create your first scene manually
                    </p>
                    <button
                      onClick={handleAddScene}
                      className="cinema-button"
                    >
                      Create First Scene
                    </button>
                  </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.scenes.map((scene, index) => (
                        <div 
                          key={scene.id}
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <SortableSceneCard
                            scene={scene}
                            isSelected={selectedScene === scene.id}
                            onSelect={() => setSelectedScene(scene.id)}
                            onEdit={() => handleSceneEdit(scene)}
                            onDelete={() => handleSceneDelete(scene.id)}
                            onDuplicate={() => handleSceneDuplicate(scene.id)}
                          />
                        </div>
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
