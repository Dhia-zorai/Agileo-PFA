import React from 'react';
import { Clock, Loader } from 'lucide-react';

export default function ActiveBacklog({ tasks = [], storyById = {}, onViewAll }) {
  return (
    <div className="bg-surface shadow-ambient rounded-card-lg p-6 flex flex-col h-full border border-divider/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-primary tracking-tight-hdr">Active Sprint Backlog</h3>
        <button className="text-sm font-medium text-muted hover:text-primary transition-colors" onClick={onViewAll}>
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
        {tasks.length === 0 && <div className="text-sm text-muted">No tasks in active sprint yet.</div>}
        {tasks.map((task) => {
          const isProgress = task.status === 'IN_PROGRESS' || task.status === 'IN_REVIEW';
          const points = storyById[task.story_id]?.story_points || 0;
          
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
                  {points} pts
                </div>
                
                {/* Assignee Avatar */}
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {task.assignee ? task.assignee.slice(0, 2).toUpperCase() : '--'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
