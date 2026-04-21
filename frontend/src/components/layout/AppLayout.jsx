import React from 'react';
import { LayoutDashboard, ListTodo, Search, Bell, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-surface-muted font-sans text-gray-900 antialiased selection:bg-brand/20">
      
      {/* Sidebar - Sleek & Minimal */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-surface flex flex-col transition-all duration-fast ease-micro-spring">
        <div className="h-14 flex items-center px-5 border-b border-border">
          {/* Logo / Workspace Name */}
          <div className="font-semibold tracking-tight text-[15px] flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-brand text-white flex items-center justify-center text-[10px] font-bold">A</div>
            Agileo Workspace
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Views</div>
          <NavItem to="/" icon={<LayoutDashboard size={16} strokeWidth={2.5} />} label="Dashboard" />
          <NavItem to="/projects" icon={<ListTodo size={16} strokeWidth={2.5} />} label="Projects" />
          {/* Add more later */}
        </nav>
        
        <div className="p-3 border-t border-border">
          <button className="w-full flex items-center space-x-3 px-2 py-1.5 rounded-md text-[13px] font-medium transition-all duration-fast ease-micro-spring text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <Settings size={16} strokeWidth={2.5} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Global Search & Context */}
        <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 z-10 shadow-ambient-sm">
          <div className="flex items-center w-full max-w-md group bg-surface-muted border border-transparent focus-within:border-brand/30 focus-within:bg-surface rounded-md px-3 py-1.5 transition-all duration-fast">
            <Search className="text-gray-400 mr-2" size={16} />
            <input 
              type="text" 
              placeholder="Search issues, epics, or jump to... (Ctrl+K)" 
              className="w-full bg-transparent border-none focus:outline-none text-[13px] placeholder-gray-400 text-gray-900"
            />
          </div>
          
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="hover:text-gray-700 transition-colors duration-fast">
              <Bell size={18} />
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-indigo-300 ring-2 ring-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"></div>
          </div>
        </header>

        {/* Content Area - Where the Dashboard/Board will live */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ to, icon, label }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `w-full flex items-center space-x-3 px-2 py-1.5 rounded-md text-[13px] font-medium transition-all duration-fast ease-micro-spring ${
        isActive 
          ? 'bg-brand/10 text-brand' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}