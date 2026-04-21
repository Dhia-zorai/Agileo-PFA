import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function TopBar({ title, actionButton }) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  return (
    <div 
      className="w-100 d-flex justify-content-between align-items-center py-4 px-5" 
      style={{
        backgroundColor: 'var(--color-bg-base)', 
        borderBottom: '2px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-1 align-items-center" style={{fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none" style={{color: 'var(--color-violet)'}}>Home</Link>
            </li>
            {paths.map((path, idx) => {
              const to = `/${paths.slice(0, idx + 1).join('/')}`;
              const isLast = idx === paths.length - 1;
              const formattedPath = path.length > 15 ? `${path.substring(0,8)}...` : path;

              return isLast ? (
                <li className="breadcrumb-item active text-muted" aria-current="page" key={to}>
                  {formattedPath}
                </li>
              ) : (
                <li className="breadcrumb-item" key={to}>
                  <Link to={to} className="text-decoration-none" style={{color: 'var(--color-violet)'}}>{formattedPath}</Link>
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="m-0 font-display text-white">{title}</h1>
      </div>
      
      <div>
        {actionButton}
      </div>
    </div>
  );
}
