import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import VelocityChart from '../components/dashboard/VelocityChart';
import SprintHealthDonut from '../components/dashboard/SprintHealthDonut';
import ActiveBacklog from '../components/dashboard/ActiveBacklog';
import PriorityBars from '../components/dashboard/PriorityBars';
import { useProjects } from '../hooks/useProjects';
import { useSprints } from '../hooks/useSprints';
import { useStories } from '../hooks/useStories';
import { useTasks } from '../hooks/useTasks';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: projects } = useProjects();
  const topProject = projects?.[0] || null;

  const { data: sprints } = useSprints(topProject?.id);
  const activeSprint = useMemo(() => sprints?.find((s) => s.status === 'ACTIVE') || sprints?.[0] || null, [sprints]);
  const { data: stories } = useStories(topProject?.id);
  const { data: tasks } = useTasks(activeSprint?.id);

  const storyById = useMemo(() => {
    const map = {};
    (stories || []).forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, [stories]);

  const velocityData = useMemo(() => {
    if (!sprints?.length) return [];
    return sprints.map((sprint, idx) => {
      const sprintStoryIds = (stories || [])
        .filter((story) => story.sprint_id === sprint.id)
        .map((story) => story.id);
      const sprintVelocity = (tasks || [])
        .filter((task) => task.status === 'DONE' && (!task.story_id || sprintStoryIds.includes(task.story_id)))
        .reduce((sum, task) => sum + (storyById[task.story_id]?.story_points || 1), 0);

      return {
        name: sprint.name || `Sprint ${idx + 1}`,
        velocity: sprintVelocity,
      };
    });
  }, [sprints, stories, tasks, storyById]);

  return (
    <div className="flex flex-col h-full gap-6 animate-fade-in">
      {/* Header section (replaces TopBar) */}
      <div className="flex items-end justify-between px-2 pt-2">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight-hdr mb-1">Overview</h2>
          <p className="text-muted font-medium text-sm">Live metrics from your JSON data.</p>
        </div>
        <button className="bg-primary text-white hover:bg-primary/90 px-5 py-2 rounded-pill font-bold text-sm shadow-md transition-all duration-150 ease-out active:scale-95" onClick={() => navigate('/projects')}>
          New Project
        </button>
      </div>

      {/* The S&P 500 Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6 pr-2 flex-1">
        
        {/* Top Row: Velocity Chart (8 cols) & Sprint Health (4 cols) */}
        <div className="xl:col-span-8 h-[360px]">
          <VelocityChart data={velocityData} />
        </div>
        <div className="xl:col-span-4 h-[360px]">
          <SprintHealthDonut tasks={tasks || []} activeSprintName={activeSprint?.name || 'No Active Sprint'} />
        </div>

        {/* Bottom Row: Active Backlog (7 cols) & Priority Bars (5 cols) */}
        <div className="xl:col-span-7 h-[360px]">
          <ActiveBacklog tasks={tasks || []} storyById={storyById} onViewAll={() => topProject && navigate(`/projects/${topProject.id}`)} />
        </div>
        <div className="xl:col-span-5 h-[360px]">
          <PriorityBars stories={stories || []} />
        </div>

      </div>
    </div>
  );
}
