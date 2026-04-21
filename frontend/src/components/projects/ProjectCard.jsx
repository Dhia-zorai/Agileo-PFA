import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function ProjectCard({ project, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    onDelete(project.id);
    setIsDeleting(false);
  };

  return (
    <div className="neo-card p-4 d-flex flex-column h-100 position-relative">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h3 className="font-display text-white m-0 text-truncate" style={{maxWidth: '75%'}}>
          <Link to={`/projects/${project.id}`} className="text-decoration-none text-white">
            {project.name}
          </Link>
        </h3>
        <StatusBadge status={project.status} />
      </div>
      
      <p className="text-muted flex-grow-1" style={{fontSize: '0.9rem', lineHeight: '1.6'}}>
        {project.description || "No description provided."}
      </p>

      <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary opacity-50">
        <span className="small text-muted font-weight-bold">
          Created: {new Date(project.created_at).toLocaleDateString()}
        </span>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-ghost btn-sm p-1 rounded" 
            onClick={() => onUpdate(project)}
            title="Edit Project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button 
            className="btn btn-ghost btn-sm p-1 rounded" 
            onClick={(e) => { e.preventDefault(); setIsDeleting(true); }}
            title="Delete Project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={isDeleting}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${project.name}" and all its sprints, stories, and tasks?`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
}
