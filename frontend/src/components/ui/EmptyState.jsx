import React from 'react';

export default function EmptyState({ title, message, actionButton }) {
  return (
    <div className="w-100 text-center py-5 animate-slide-up">
      <div 
        className="d-inline-flex align-items-center justify-content-center mb-4" 
        style={{
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          border: '2px dashed var(--color-border-accent)'
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      </div>
      <h3 className="font-display text-white mb-2">{title}</h3>
      <p className="text-muted mb-4 mx-auto" style={{maxWidth: '400px'}}>{message}</p>
      {actionButton}
    </div>
  );
}
