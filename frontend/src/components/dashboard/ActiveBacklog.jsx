import React from 'react';
import { Clock, Loader } from 'lucide-react';

const mockTasks = [
  { id: 1, title: 'Implement Auth0 SSO Integration', points: 5, status: 'progress', assignee: 'JD' },
  { id: 2, title: 'Migrate PostgreSQL Database to Vercel', points: 8, status: 'pending', assignee: 'AM' },
  { id: 3, title: 'Design System Reskin - Tailwind CSS', points: 3, status: 'progress', assignee: 'JD' },
  { id: 4, title: 'Fix Kanban Drag and Drop jitter', points: 2, status: 'pending', assignee: 'RV' },
  { id: 5, title: 'Update Terms of Service Copy', points: 1, status: 'pending', assignee: 'AM' },
];

export default function ActiveBacklog() {
  return (
    <div className="bg-surface shadow-ambient rounded-card-lg p-6 flex flex-col h-full border border-divider/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-primary tracking-tight-hdr">Active Sprint Backlog</h3>
        <button className="text-sm font-medium text-muted hover:text-primary transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
        {mockTasks.map((task) => {
          const isProgress = task.status === 'progress';
          
          return (
            <div 
              key={task.id} 
              className={`
                group flex items-center justify-between p-3 rounded-card-sm border-1.5 cursor-pointer transition-all duration-150 ease-out
                ${isProgress 
                  ? 'bg-status-progress border-[#BFDBFE] hover:shadow-ambient-sm' 
                  : 'bg-status-pending border-[#FED7AA] hover:shadow-ambient-sm'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                {isProgress 
                  ? <Loader size={18} className="text-brand animate-spin-slow" />
                  : <Clock size={18} className="text-[#F59E0B]" />
                }
                
                {/* Title */}
                <span className="text-[14px] font-semibold text-primary">{task.title}</span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Points Badge */}
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${isProgress ? 'bg-white text-brand' : 'bg-white text-[#EA580C]'}`}>
                  {task.points} pts
                </div>
                
                {/* Assignee Avatar */}
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {task.assignee}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}