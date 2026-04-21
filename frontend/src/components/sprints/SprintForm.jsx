import React, { useState, useEffect } from 'react';
import SlidePanel from '../ui/SlidePanel';

export default function SprintForm({ isOpen, onClose, initialData, onSubmit }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setGoal(initialData.goal || '');
      setStartDate(initialData.start_date || '');
      setEndDate(initialData.end_date || '');
      setCapacity(initialData.capacity || 0);
    } else {
      setName('');
      setGoal('');
      setStartDate('');
      setEndDate('');
      setCapacity(0);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      name,
      goal,
      start_date: startDate || null,
      end_date: endDate || null,
      capacity: parseInt(capacity) || 0
    });
    onClose();
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Sprint" : "New Sprint"}>
      <form onSubmit={handleSubmit} className="d-flex flex-column h-100 gap-4">
        
        <div>
          <label className="form-label">Sprint Name</label>
          <input 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Sprint 1, Phase A..." 
            autoFocus 
          />
        </div>
        
        <div>
          <label className="form-label">Sprint Goal</label>
          <textarea 
            className="form-control" 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)} 
            rows={3} 
            placeholder="What should be achieved in this sprint?" 
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">End Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>

        <div>
          <label className="form-label">Team Capacity (Story Points)</label>
          <input 
            type="number" 
            className="form-control" 
            value={capacity} 
            onChange={(e) => setCapacity(e.target.value)} 
            min="0" 
          />
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
