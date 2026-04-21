import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function SprintHealthDonut() {
  // S&P 500 minimalist colors
  const data = [
    { name: 'Completed', value: 65, color: '#10B981' }, // Success Emerald
    { name: 'In Progress', value: 25, color: '#4F46E5' }, // Brand Indigo
    { name: 'To Do', value: 10, color: '#E5E7EB' }, // Divider gray
  ];

  return (
    <div className="bg-surface shadow-ambient rounded-card-lg p-6 flex flex-col h-full border border-divider/40">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-bold text-primary tracking-tight-hdr">Sprint Health</h3>
        <span className="text-xs font-bold px-2.5 py-1 rounded-pill bg-status-progress text-brand-700">Sprint 6</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center relative min-h-[220px]">
        {/* Inner Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-extrabold text-primary tracking-tight-hdr">65%</span>
          <span className="text-xs font-medium text-muted uppercase tracking-widest mt-1">Completed</span>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={103}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-4 border-t border-divider pt-4">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-primary">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}