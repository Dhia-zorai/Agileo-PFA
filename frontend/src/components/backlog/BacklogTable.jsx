import React, { useState } from 'react';
import MoSCoWBadge from './MoSCoWBadge';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function BacklogTable({ stories, sprints, onUpdate, onDelete }) {
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    if (deleteId) onDelete(deleteId);
    setDeleteId(null);
  };

  const getSprintName = (sprintId) => {
    if (!sprintId) return 'Backlog';
    const sprint = sprints?.find(s => s.id === sprintId);
    return sprint ? sprint.name : 'Unknown Sprint';
  };

  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p>No user stories found. Add one to start building your backlog.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive animate-fade-in" style={{ borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      <table className="neo-table m-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Story</th>
            <th>Priority</th>
            <th>Points</th>
            <th>Sprint</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map(story => (
            <tr key={story.id}>
              <td className="text-muted fw-bold">#{story.id}</td>
              <td style={{ maxWidth: '400px' }}>
                <div className="text-truncate">
                  <span className="text-muted">As a</span> {story.as_a}, <span className="text-muted">I want</span> {story.i_want} <span className="text-muted">so that</span> {story.so_that}
                </div>
              </td>
              <td><MoSCoWBadge priority={story.priority} /></td>
              <td>
                <span className="badge" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-violet)' }}>
                  {story.story_points}
                </span>
              </td>
              <td>
                <span className="small text-muted text-uppercase fw-bold">
                  {getSprintName(story.sprint_id)}
                </span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-ghost btn-sm p-1" onClick={() => onUpdate(story)}>Edit</button>
                  <button className="btn btn-danger btn-sm p-1" onClick={() => setDeleteId(story.id)}>Del</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Story?"
        message="Are you sure you want to delete this user story? Any tasks associated with it will lose their reference."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
