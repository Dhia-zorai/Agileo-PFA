import React, { useState, useEffect } from 'react';
import SlidePanel from '../ui/SlidePanel';

export default function UserStoryForm({ isOpen, onClose, initialData, sprints, onSubmit }) {
  const [asA, setAsA] = useState('');
  const [iWant, setIWant] = useState('');
  const [soThat, setSoThat] = useState('');
  const [priority, setPriority] = useState('SHOULD');
  const [storyPoints, setStoryPoints] = useState(1);
  const [sprintId, setSprintId] = useState('');

  useEffect(() => {
    if (initialData) {
      setAsA(initialData.as_a || '');
      setIWant(initialData.i_want || '');
      setSoThat(initialData.so_that || '');
      setPriority(initialData.priority || 'SHOULD');
      setStoryPoints(initialData.story_points || 1);
      setSprintId(initialData.sprint_id || '');
    } else {
      setAsA('');
      setIWant('');
      setSoThat('');
      setPriority('SHOULD');
      setStoryPoints(1);
      setSprintId('');
    }
  }, [initialData, isOpen]);

  const fibonacci = [1, 2, 3, 5, 8, 13, 21];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ 
      as_a: asA, 
      i_want: iWant, 
      so_that: soThat, 
      priority, 
      story_points: storyPoints,
      sprint_id: sprintId || null
    });
    onClose();
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} title={initialData ? "Edit User Story" : "New User Story"}>
      <form onSubmit={handleSubmit} className="d-flex flex-column h-100 gap-4">
        
        <div>
          <label className="form-label">As a...</label>
          <input className="form-control" value={asA} onChange={(e) => setAsA(e.target.value)} required placeholder="user type, role, etc." />
        </div>
        
        <div>
          <label className="form-label">I want...</label>
          <textarea className="form-control" value={iWant} onChange={(e) => setIWant(e.target.value)} required rows={2} placeholder="feature, ability, etc." />
        </div>

        <div>
          <label className="form-label">So that...</label>
          <textarea className="form-control" value={soThat} onChange={(e) => setSoThat(e.target.value)} required rows={2} placeholder="reason, benefit, value." />
        </div>
        
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Priority (MoSCoW)</label>
            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="MUST">Must Have</option>
              <option value="SHOULD">Should Have</option>
              <option value="COULD">Could Have</option>
              <option value="WONT">Won't Have</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Assign to Sprint</label>
            <select className="form-select" value={sprintId} onChange={(e) => setSprintId(e.target.value)}>
              <option value="">-- Backlog --</option>
              {sprints?.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Story Points (Fibonacci)</label>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {fibonacci.map(num => (
              <button
                key={num}
                type="button"
                className={`btn btn-sm ${storyPoints === num ? 'btn-primary' : 'btn-ghost'}`}
                style={{ 
                  minWidth: '40px', 
                  borderRadius: '50%',
                  fontWeight: storyPoints === num ? 'bold' : 'normal',
                  border: `1px solid ${storyPoints === num ? 'transparent' : 'var(--color-border)'}`
                }}
                onClick={() => setStoryPoints(num)}
              >
                {num}
              </button>
            ))}
          </div>
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
