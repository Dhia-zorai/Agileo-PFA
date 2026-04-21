import React from 'react';

const priorities = [
  { label: 'Must Have', points: 34, total: 40, color: 'bg-status-must', bg: 'bg-[#FCA5A5]' },
  { label: 'Should Have', points: 15, total: 25, color: 'bg-status-should', bg: 'bg-[#C4B5FD]' },
  { label: 'Could Have', points: 5, total: 10, color: 'bg-[#3B82F6]', bg: 'bg-[#93C5FD]' },
  { label: 'Won\'t Have', points: 0, total: 5, color: 'bg-muted', bg: 'bg-divider' },
];

export default function PriorityBars() {
  return (
    <div className="bg-surface shadow-ambient rounded-card-lg p-6 flex flex-col h-full border border-divider/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-primary tracking-tight-hdr">MoSCoW Prioritization</h3>
        <button className="text-sm font-medium text-brand hover:text-brand-600 transition-colors">
          Manage Rules
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5">
        {priorities.map((item) => {
          const percentage = Math.round((item.points / item.total) * 100) || 0;
          
          return (
            <div key={item.label} className="w-full">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[13px] font-bold text-primary">{item.label}</span>
                <span className="text-[12px] font-bold text-muted">{item.points} / {item.total} pts</span>
              </div>
              
              {/* Progress Bar Track */}
              <div className={`w-full h-[10px] rounded-pill ${item.bg} overflow-hidden shadow-inner`}>
                {/* Progress Fill */}
                <div 
                  className={`h-full rounded-pill transition-all duration-1000 ease-out ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}