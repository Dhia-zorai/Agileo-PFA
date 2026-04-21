import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ status, title, accentColor, tasks, onDrop, onDragStart, draggedTaskId, onUpdateTask, onDeleteTask }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop();
  };

  const isWIPLimitExceeded = status === 'IN_PROGRESS' && tasks.length > 3;

  return (
    <div className="kanban-column">
      <div 
        className="kanban-column-header text-white"
        style={{ borderTop: `4px solid ${accentColor}`, borderTopLeftRadius: 'var(--radius-card)', borderTopRightRadius: 'var(--radius-card)' }}
      >
        <div className="d-flex align-items-center gap-2">
          <span>{title}</span>
          <span 
            className="badge rounded-pill" 
            style={{ 
              backgroundColor: isWIPLimitExceeded ? 'var(--color-red)' : 'var(--color-bg-elevated)',
              color: isWIPLimitExceeded ? 'white' : 'var(--color-text-secondary)',
              border: isWIPLimitExceeded ? 'none' : '1px solid var(--color-border)'
            }}
          >
            {tasks.length}
          </span>
        </div>
        {isWIPLimitExceeded && (
          <span className="small text-danger font-weight-bold" style={{fontSize: '0.7rem'}}>WIP LIMIT</span>
        )}
      </div>
      
      <div 
        className={`kanban-dropzone ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            accentColor={accentColor}
            onDragStart={() => onDragStart(task.id)}
            isDragging={draggedTaskId === task.id}
            onUpdate={() => onUpdateTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-muted small mt-4 p-3 rounded" style={{border: '1px dashed var(--color-border)'}}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
