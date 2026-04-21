import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center py-5">
      <div 
        className="spinner-border text-violet" 
        role="status"
        style={{
          width: '3rem', 
          height: '3rem', 
          borderWidth: '0.3rem',
          animation: 'spin 1s linear infinite'
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
