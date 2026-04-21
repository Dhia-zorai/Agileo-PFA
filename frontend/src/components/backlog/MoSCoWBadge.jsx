import React from 'react';

const moscowColors = {
  MUST: 'var(--color-red)',
  SHOULD: 'var(--color-amber)',
  COULD: 'var(--color-cyan)',
  WONT: 'var(--color-text-muted)'
};

export default function MoSCoWBadge({ priority, className = "" }) {
  const color = moscowColors[priority] || 'var(--color-text-primary)';
  
  return (
    <span 
      className={`neo-badge ${className}`} 
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color,
        border: `1px solid ${color}`
      }}
    >
      {priority}
    </span>
  );
}
