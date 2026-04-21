import React, { useState, useEffect } from 'react';
import SlidePanel from '../ui/SlidePanel';

export default function ProjectForm({ isOpen, onClose, initialData, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'ACTIVE');
    } else {
      setName('');
      setDescription('');
      setStatus('ACTIVE');
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, description, status });
    onClose();
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Project" : "New Project"}>
      <form onSubmit={handleSubmit} className="d-flex flex-column h-100 gap-4">
        <div>
          <label className="form-label">Project Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
        
        <div>
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        
        {initialData && (
          <div>
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="PLANNING">Planning</option>
            </select>
          </div>
        )}

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
