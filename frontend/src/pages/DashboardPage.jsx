import React from 'react';
import VelocityChart from '../components/dashboard/VelocityChart';
import SprintHealthDonut from '../components/dashboard/SprintHealthDonut';
import ActiveBacklog from '../components/dashboard/ActiveBacklog';
import PriorityBars from '../components/dashboard/PriorityBars';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full gap-6 animate-fade-in">
      {/* Header section (replaces TopBar) */}
      <div className="flex items-end justify-between px-2 pt-2">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight-hdr mb-1">Overview</h2>
          <p className="text-muted font-medium text-sm">Sprint 6 metrics and active backlog.</p>
        </div>
        <button className="bg-primary text-white hover:bg-primary/90 px-5 py-2 rounded-pill font-bold text-sm shadow-md transition-all duration-150 ease-out active:scale-95">
          New Project
        </button>
      </div>

      {/* The S&P 500 Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6 pr-2 flex-1">
        
        {/* Top Row: Velocity Chart (8 cols) & Sprint Health (4 cols) */}
        <div className="xl:col-span-8 h-[360px]">
          <VelocityChart />
        </div>
        <div className="xl:col-span-4 h-[360px]">
          <SprintHealthDonut />
        </div>

        {/* Bottom Row: Active Backlog (7 cols) & Priority Bars (5 cols) */}
        <div className="xl:col-span-7 h-[360px]">
          <ActiveBacklog />
        </div>
        <div className="xl:col-span-5 h-[360px]">
          <PriorityBars />
        </div>

      </div>
    </div>
  );
}