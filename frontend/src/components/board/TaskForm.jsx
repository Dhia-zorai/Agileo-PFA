import React, { useState, useEffect } from 'react';
import SlidePanel from '../ui/SlidePanel';

export default function TaskForm({ isOpen, onClose, initialData, stories, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyId, setStoryId] = useState('');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStoryId(initialData.story_id || '');
      setAssignee(initialData.assignee || '');
    } else {
      setTitle('');
      setDescription('');
      setStoryId('');
      setAssignee('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      story_id: storyId ? parseInt(storyId) : null,
      assignee: assignee || null
    });
    onClose();
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Task" : "New Task"}>
      <form onSubmit={handleSubmit} className="d-flex flex-column h-100 gap-4">
        
        <div>
          <label className="form-label">Task Title</label>
          <input 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            autoFocus 
            placeholder="Implement feature X..."
          />
        </div>
        
        <div>
          <label className="form-label">Description (Optional)</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={3} 
            placeholder="Technical details, acceptance criteria..."
          />
        </div>

        <div>
          <label className="form-label">Assignee (Optional)</label>
          <input 
            type="text"
            className="form-control" 
            value={assignee} 
            onChange={(e) => setAssignee(e.target.value)} 
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="form-label">Link to User Story (Optional)</label>
          <select 
            className="form-select" 
            value={storyId} 
            onChange={(e) => setStoryId(e.target.value)}
          >
            <option value="">-- No User Story --</option>
            {stories?.map(s => (
              <option key={s.id} value={s.id}>
                #{s.id} - As a {s.as_a} I want {s.i_want}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-auto d-flex gap-3 justify-content-end pt-4 border-top border-secondary">
          <button type="button" className="btn btn-ghost px-4 py-2 text-uppercase font-weight-bold" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-neo btn-primary">
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </SlidePanel>
  );
}
