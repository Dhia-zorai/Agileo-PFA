import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({ tasks, onStatusChange, onUpdateTask, onDeleteTask }) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedTaskId(id);
  };

  const handleDrop = (status) => {
    if (draggedTaskId) {
      onStatusChange(draggedTaskId, status);
    }
    setDraggedTaskId(null);
  };

  const columns = [
    { id: 'TODO', title: 'To Do', accentColor: 'var(--color-text-secondary)' },
    { id: 'IN_PROGRESS', title: 'In Progress', accentColor: 'var(--color-violet)' },
    { id: 'IN_REVIEW', title: 'In Review', accentColor: 'var(--color-amber)' },
    { id: 'DONE', title: 'Done', accentColor: 'var(--color-emerald)' },
  ];

  return (
    <div className="kanban-board animate-slide-up">
      {columns.map(col => (
        <KanbanColumn
          key={col.id}
          status={col.id}
          title={col.title}
          accentColor={col.accentColor}
          tasks={tasks.filter(t => t.status === col.id)}
          onDrop={() => handleDrop(col.id)}
          onDragStart={handleDragStart}
          draggedTaskId={draggedTaskId}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
