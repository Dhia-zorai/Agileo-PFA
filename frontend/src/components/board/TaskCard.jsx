import React, { useState } from 'react';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function TaskCard({ task, accentColor, onDragStart, isDragging, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleting(false);
  };

  return (
    <div 
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="task-priority-indicator" style={{ backgroundColor: accentColor }}></div>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h6 className="m-0 text-white" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>{task.title}</h6>
      </div>
      
      {task.description && (
        <p className="text-muted small mb-3 text-truncate" style={{fontSize: '0.8rem'}}>
          {task.description}
        </p>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
        <div className="d-flex align-items-center gap-2">
          {task.assignee ? (
            <div 
              className="neo-badge d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: '24px', 
                height: '24px', 
                backgroundColor: 'var(--color-violet)', 
                color: 'white', 
                fontSize: '0.6rem'
              }}
              title={task.assignee}
            >
              {task.assignee.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <div 
              className="neo-badge d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: '24px', 
                height: '24px', 
                backgroundColor: 'var(--color-bg-base)', 
                border: '1px dashed var(--color-border)',
                color: 'var(--color-text-muted)', 
                fontSize: '0.6rem'
              }}
              title="Unassigned"
            >
              ?
            </div>
          )}
          
          {task.story_id && (
            <span className="badge rounded-pill" style={{backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)'}}>
              #{task.story_id}
            </span>
          )}
        </div>

        <div className="d-flex gap-1">
          <button className="btn btn-ghost btn-sm p-1 rounded d-flex align-items-center justify-content-center" onClick={(e) => { e.stopPropagation(); onUpdate(task); }} title="Edit Task" style={{width: '24px', height: '24px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button className="btn btn-ghost btn-sm p-1 rounded d-flex align-items-center justify-content-center" onClick={(e) => { e.stopPropagation(); setIsDeleting(true); }} title="Delete Task" style={{width: '24px', height: '24px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        title="Delete Task?"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
}
