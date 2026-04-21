import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: 'home' },
    { name: 'Projects', path: '/projects', icon: 'folder' }
  ];

  return (
    <div 
      className="d-flex flex-column p-4 vh-100" 
      style={{
        width: '280px',
        backgroundColor: 'var(--color-bg-surface)',
        borderRight: '2px solid var(--color-border-accent)',
        position: 'sticky',
        top: 0
      }}
    >
      <div className="mb-5 d-flex align-items-center gap-3">
        <div 
          style={{
            width: '40px', 
            height: '40px', 
            backgroundColor: 'var(--color-violet)', 
            borderRadius: '8px',
            boxShadow: 'var(--shadow-glow)'
          }}
        />
        <h2 className="m-0 font-display text-white" style={{letterSpacing: '2px'}}>AGILEO</h2>
      </div>

      <nav className="nav flex-column gap-2">
        {links.map((link) => {
          const isActive = link.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(link.path);
            
          return (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={`nav-link px-4 py-3 rounded d-flex align-items-center text-white`}
              style={{
                transition: 'var(--transition-base)',
                backgroundColor: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                borderLeft: isActive ? '4px solid var(--color-violet)' : '4px solid transparent',
                fontWeight: isActive ? '700' : '500'
              }}
            >
              <span style={{letterSpacing: '1px', textTransform: 'uppercase'}}>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <p className="text-muted small mb-0 font-weight-bold text-uppercase">PFA Prototype &copy; 2026</p>
      </div>
    </div>
  );
}
