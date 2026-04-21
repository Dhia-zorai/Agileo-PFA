import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import { apiClient } from '../api/client';
import { useToast } from '../components/ui/Toast';
import { useSprints } from '../hooks/useSprints';
import { useStories } from '../hooks/useStories';
import { useTasks } from '../hooks/useTasks';

import BacklogTable from '../components/backlog/BacklogTable';
import UserStoryForm from '../components/backlog/UserStoryForm';
import SprintCard from '../components/sprints/SprintCard';
import SprintForm from '../components/sprints/SprintForm';
import KanbanBoard from '../components/board/KanbanBoard';
import TaskForm from '../components/board/TaskForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('backlog');
  const [loading, setLoading] = useState(true);

  // Hooks
  const { data: sprints, loading: sprintsLoading, create: createSprint, update: updateSprint, remove: removeSprint, startSprint, completeSprint } = useSprints(id);
  const { data: stories, loading: storiesLoading, create: createStory, update: updateStory, remove: removeStory } = useStories(id);
  
  const activeSprint = sprints?.find(s => s.status === 'ACTIVE');
  const { data: tasks, loading: tasksLoading, create: createTask, update: updateTask, remove: removeTask, updateStatus: updateTaskStatus } = useTasks(activeSprint?.id);

  // Forms state
  const [storyFormOpen, setStoryFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  
  const [sprintFormOpen, setSprintFormOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState(null);
  
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiClient(`/projects/${id}`);
        setProject(data);
      } catch (err) {
        addToast("Failed to load project", "error");
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate, addToast]);

  const tabs = [
    { id: 'backlog', label: 'Product Backlog' },
    { id: 'sprints', label: 'Sprints' },
    { id: 'board', label: 'Sprint Board' }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex flex-column h-100">
      <TopBar title={project?.name || 'Loading...'} />
      
      <div className="container-fluid px-5 pt-4 pb-0" style={{borderBottom: '2px solid var(--color-border)'}}>
        <div className="d-flex gap-4">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className="btn btn-ghost px-2 py-3 rounded-0 text-uppercase font-weight-bold"
              style={{
                borderBottom: activeTab === tab.id ? '4px solid var(--color-violet)' : '4px solid transparent',
                color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                letterSpacing: '1px'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-fluid p-5 flex-grow-1 overflow-auto">
        
        {/* BACKLOG TAB */}
        {activeTab === 'backlog' && (
          <div className="animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-display text-white m-0">User Stories</h3>
              <button className="btn btn-neo btn-primary" onClick={() => { setEditingStory(null); setStoryFormOpen(true); }}>
                + NEW STORY
              </button>
            </div>
            {storiesLoading ? <LoadingSpinner /> : (
              <BacklogTable 
                stories={stories} 
                sprints={sprints} 
                onUpdate={(s) => { setEditingStory(s); setStoryFormOpen(true); }} 
                onDelete={removeStory} 
              />
            )}
            <UserStoryForm 
              isOpen={storyFormOpen} 
              onClose={() => setStoryFormOpen(false)} 
              initialData={editingStory} 
              sprints={sprints} 
              onSubmit={editingStory ? (d) => updateStory(editingStory.id, d) : createStory} 
            />
          </div>
        )}

        {/* SPRINTS TAB */}
        {activeTab === 'sprints' && (
          <div className="animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-display text-white m-0">Sprints</h3>
              <button className="btn btn-neo btn-primary" onClick={() => { setEditingSprint(null); setSprintFormOpen(true); }}>
                + NEW SPRINT
              </button>
            </div>
            {sprintsLoading ? <LoadingSpinner /> : sprints.length === 0 ? (
              <EmptyState title="No Sprints" message="Create your first sprint to start planning work." />
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {sprints.map(sprint => (
                  <div className="col" key={sprint.id}>
                    <SprintCard 
                      sprint={sprint} 
                      onUpdate={(s) => { setEditingSprint(s); setSprintFormOpen(true); }} 
                      onDelete={removeSprint} 
                      onStart={startSprint} 
                      onComplete={completeSprint} 
                    />
                  </div>
                ))}
              </div>
            )}
            <SprintForm 
              isOpen={sprintFormOpen} 
              onClose={() => setSprintFormOpen(false)} 
              initialData={editingSprint} 
              onSubmit={editingSprint ? (d) => updateSprint(editingSprint.id, d) : createSprint} 
            />
          </div>
        )}

        {/* BOARD TAB */}
        {activeTab === 'board' && (
          <div className="animate-fade-in h-100 d-flex flex-column">
            {!activeSprint ? (
              <EmptyState title="No Active Sprint" message="Start a sprint from the Sprints tab to view the Kanban board." actionButton={<button className="btn btn-neo btn-primary mt-3" onClick={() => setActiveTab('sprints')}>Go to Sprints</button>} />
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="font-display text-white m-0">{activeSprint.name}</h3>
                    {activeSprint.goal && <p className="text-muted small m-0 mt-1">{activeSprint.goal}</p>}
                  </div>
                  <button className="btn btn-neo btn-primary" onClick={() => { setEditingTask(null); setTaskFormOpen(true); }}>
                    + ADD TASK
                  </button>
                </div>
                {tasksLoading ? <LoadingSpinner /> : (
                  <KanbanBoard 
                    tasks={tasks} 
                    onStatusChange={updateTaskStatus} 
                    onUpdateTask={(t) => { setEditingTask(t); setTaskFormOpen(true); }} 
                    onDeleteTask={removeTask} 
                  />
                )}
                <TaskForm 
                  isOpen={taskFormOpen} 
                  onClose={() => setTaskFormOpen(false)} 
                  initialData={editingTask} 
                  stories={stories?.filter(s => s.sprint_id === activeSprint.id)} 
                  onSubmit={editingTask ? (d) => updateTask(editingTask.id, d) : createTask} 
                />
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
