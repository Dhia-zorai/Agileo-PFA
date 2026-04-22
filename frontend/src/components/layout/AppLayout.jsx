import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, ListTodo, KanbanSquare, Search, Bell, Mail, Settings } from 'lucide-react';
import { apiClient } from '../../api/client';
import { projectsApi } from '../../api/projects';

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [metricsData, projectsData] = await Promise.all([
          apiClient('/metrics/dashboard'),
          projectsApi.getAll(),
        ]);
        if (!mounted) return;
        setMetrics(metricsData);
        setRecentProjects(projectsData.slice(0, 4));
      } catch (err) {
        if (!mounted) return;
        setMetrics(null);
        setRecentProjects([]);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const activeBlockers = useMemo(() => metrics?.active_blockers ?? 0, [metrics]);
  const boardPath = useMemo(() => (recentProjects[0] ? `/projects/${recentProjects[0].id}` : '/projects'), [recentProjects]);

  return (
    <div className="flex h-screen bg-shell p-4 gap-6 overflow-hidden font-sans">
      
      {/* 1. Sidebar (Floating White Strip, 64px) */}
      <aside className="w-[64px] flex-shrink-0 bg-surface shadow-ambient rounded-card-lg flex flex-col items-center py-6 gap-6 z-10">
        {/* Workspace Avatar */}
        <div className="w-10 h-10 rounded-pill bg-primary text-white flex items-center justify-center font-bold text-sm mb-4">
          A
        </div>
        
        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col gap-4 w-full items-center">
          <SidebarIcon to="/" icon={<LayoutGrid size={20} />} />
          <SidebarIcon to="/projects" icon={<ListTodo size={20} />} />
          <SidebarIcon to={boardPath} icon={<KanbanSquare size={20} />} />
        </nav>
        
        <div className="mt-auto">
          <SidebarIcon to="/projects" icon={<Settings size={20} />} />
        </div>
      </aside>

      {/* Center Column: Top Bar + Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Top Bar (Integrated) */}
        <header className="h-16 flex items-center justify-between mb-4 flex-shrink-0">
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <button
              className="text-xl font-bold text-primary tracking-tight-hdr"
              onClick={() => navigate('/')}
            >
              Agileo
            </button>
          </div>

          {/* Center: Pill-shaped filters */}
          <div className="hidden md:flex items-center bg-surface shadow-ambient rounded-pill p-1 border-1.5 border-divider/50">
            <button className="px-4 py-1.5 rounded-pill bg-primary text-white text-sm font-medium" onClick={() => navigate(boardPath)}>This Sprint</button>
            <button className="px-4 py-1.5 rounded-pill text-muted hover:text-primary text-sm font-medium transition-colors" onClick={() => navigate('/projects')}>Projects</button>
            <button className="px-4 py-1.5 rounded-pill text-muted hover:text-primary text-sm font-medium transition-colors" onClick={() => navigate('/')}>Overview</button>
          </div>

          {/* Right: Ghost-circle notification icons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted hover:bg-white hover:shadow-ambient transition-all" onClick={() => navigate('/projects')}>
              <Search size={18} strokeWidth={2.5} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted hover:bg-white hover:shadow-ambient transition-all" onClick={() => navigate(boardPath)}>
              <Bell size={18} strokeWidth={2.5} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted hover:bg-white hover:shadow-ambient transition-all" onClick={() => navigate('/projects')}>
              <Mail size={18} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* 3. Main Area (Children / Bento Grid wrapper) */}
        <main className="flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
          {children}
        </main>
      </div>

      {/* 4. Right Panel (Contextual, 280px) */}
      <aside className="hidden xl:flex w-[280px] flex-shrink-0 flex-col gap-4">
        <div className="bg-surface shadow-ambient rounded-card-lg p-5 flex-1 border-0">
          <h2 className="text-sm font-bold text-primary mb-4">Sprint Events</h2>
          <div className="space-y-2">
            {recentProjects.length === 0 ? (
              <div className="text-sm text-muted">No project activity yet.</div>
            ) : (
              recentProjects.map((project) => (
                <button
                  key={project.id}
                  className="w-full text-left px-3 py-2 rounded-card-sm bg-shell hover:bg-divider/40 text-sm text-primary transition-colors"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  {project.name}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="bg-surface shadow-ambient rounded-card-lg p-5 flex-1 border-0">
          <h2 className="text-sm font-bold text-primary mb-4">Active Blockers</h2>
          <div className="text-3xl font-bold text-primary tracking-tight-hdr">{activeBlockers}</div>
          <p className="text-sm text-muted mt-2">Tasks marked high priority and not done.</p>
        </div>
      </aside>

    </div>
  );
}

// Sidebar Icon Component (Handles the 36px circular dark background state)
function SidebarIcon({ to, icon }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ease-out
        ${isActive 
          ? 'bg-primary text-white shadow-md' 
          : 'text-muted hover:text-primary hover:bg-shell/50'
        }
      `}
    >
      {icon}
    </NavLink>
  );
}
