import React, { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function SprintCard({ sprint, onUpdate, onDelete, onStart, onComplete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    onDelete(sprint.id);
    setIsDeleting(false);
  };

  const isPlanning = sprint.status === 'PLANNING';
  const isActive = sprint.status === 'ACTIVE';

  return (
    <div className="neo-card p-4 d-flex flex-column h-100 position-relative animate-fade-in">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h4 className="font-display text-white m-0 text-truncate" style={{maxWidth: '75%'}}>{sprint.name}</h4>
        <StatusBadge status={sprint.status} />
      </div>
      
      {sprint.goal && (
        <p className="text-muted small fst-italic mb-3 pb-2 border-bottom border-secondary">
          Goal: {sprint.goal}
        </p>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small font-weight-bold text-uppercase">Dates</span>
        <span className="text-white small">
          {sprint.start_date || 'TBD'} &rarr; {sprint.end_date || 'TBD'}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-muted small font-weight-bold text-uppercase">Capacity</span>
          <span className="text-violet small fw-bold">{sprint.capacity} pts</span>
        </div>
      </div>

      <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
        <div className="d-flex gap-2">
          {isPlanning && (
            <button className="btn btn-sm btn-primary neo-badge" onClick={() => onStart(sprint.id)}>
              Start Sprint
            </button>
          )}
          {isActive && (
            <button className="btn btn-sm neo-badge" style={{backgroundColor: 'var(--color-cyan)', color: 'black'}} onClick={() => onComplete(sprint.id)}>
              Complete
            </button>
          )}
        </div>
        
        <div className="d-flex gap-2">
          <button className="btn btn-ghost btn-sm p-1 rounded" onClick={() => onUpdate(sprint)} title="Edit Sprint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button className="btn btn-ghost btn-sm p-1 rounded" onClick={() => setIsDeleting(true)} title="Delete Sprint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        title="Delete Sprint?"
        message={`Are you sure you want to delete "${sprint.name}"? Tasks associated with this sprint will also be permanently deleted.`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
}
