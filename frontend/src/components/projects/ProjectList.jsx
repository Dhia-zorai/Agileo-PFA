import React from 'react';
import ProjectCard from './ProjectCard';
import EmptyState from '../ui/EmptyState';

export default function ProjectList({ projects, onUpdate, onDelete, onCreateClick }) {
  if (!projects || projects.length === 0) {
    return (
      <EmptyState 
        title="No Projects Found"
        message="Get started by creating your first agile project to organize your sprints and user stories."
        actionButton={
          <button className="btn btn-neo btn-primary mt-3" onClick={onCreateClick}>
            CREATE PROJECT
          </button>
        }
      />
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 animate-fade-in">
      {projects.map((project) => (
        <div className="col" key={project.id}>
          <ProjectCard 
            project={project}
            onUpdate={() => onUpdate(project)}
            onDelete={() => onDelete(project.id)}
          />
        </div>
      ))}
    </div>
  );
}
