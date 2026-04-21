import React, { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import { useProjects } from '../hooks/useProjects';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ProjectsPage() {
  const { data: projects, loading, create, update, remove } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreateClick = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleUpdateClick = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSubmit = async (projectData) => {
    if (editingProject) {
      await update(editingProject.id, projectData);
    } else {
      await create(projectData);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <TopBar 
        title="Projects" 
        actionButton={
          <button className="btn btn-neo btn-primary" onClick={handleCreateClick}>
            + NEW PROJECT
          </button>
        }
      />
      
      <div className="container-fluid p-5 flex-grow-1 overflow-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProjectList 
            projects={projects} 
            onUpdate={handleUpdateClick} 
            onDelete={remove} 
            onCreateClick={handleCreateClick}
          />
        )}
      </div>

      <ProjectForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingProject} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
