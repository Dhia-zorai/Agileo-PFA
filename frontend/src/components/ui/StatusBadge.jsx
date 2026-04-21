import React from 'react';

const variantColors = {
  ACTIVE: 'var(--color-emerald)',
  COMPLETED: 'var(--color-cyan)',
  PLANNING: 'var(--color-amber)',
  TODO: 'var(--color-text-secondary)',
  IN_PROGRESS: 'var(--color-violet)',
  IN_REVIEW: 'var(--color-amber)',
  DONE: 'var(--color-emerald)',
  MUST: 'var(--color-red)',
  SHOULD: 'var(--color-amber)',
  COULD: 'var(--color-cyan)',
  WONT: 'var(--color-text-muted)'
};

export default function StatusBadge({ status, className = "" }) {
  const color = variantColors[status] || 'var(--color-text-primary)';
  
  return (
    <span 
      className={`neo-badge ${className}`} 
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color,
        border: `1px solid ${color}`
      }}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
