import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function VelocityChart({ data = [] }) {
  const chartData = data.length ? data : [{ name: 'No Sprints', velocity: 0 }];

  return (
    <div className="bg-surface shadow-ambient rounded-card-lg p-6 flex flex-col h-full border border-divider/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-primary tracking-tight-hdr">Sprint Velocity</h3>
        <button className="text-sm font-medium text-brand hover:text-brand-600 transition-colors">
          View Report
        </button>
      </div>
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', fontWeight: 600, fontSize: '13px' }}
              itemStyle={{ color: '#4F46E5' }}
            />
            <Area 
              type="monotone" 
              dataKey="velocity" 
              stroke="#4F46E5" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVelocity)" 
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
