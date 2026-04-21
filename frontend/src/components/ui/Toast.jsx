import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`neo-card px-4 py-3 animate-slide-up d-flex align-items-center justify-content-between`}
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderLeft: `4px solid ${
                t.type === 'success' ? 'var(--color-emerald)' : 
                t.type === 'error' ? 'var(--color-red)' : 'var(--color-cyan)'
              }`,
              minWidth: '300px'
            }}
          >
            <span className="font-weight-bold" style={{color: 'var(--color-text-primary)'}}>{t.message}</span>
            <button 
              className="btn btn-sm text-muted ms-3 p-0" 
              onClick={() => removeToast(t.id)}
              style={{fontSize: '1.25rem', lineHeight: 1}}
            >&times;</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
