import React from 'react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="glass-overlay d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 text-center animate-slide-up" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-3 text-white">{title}</h3>
        <p className="text-muted mb-4">{message}</p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-ghost w-50" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-danger w-50" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
