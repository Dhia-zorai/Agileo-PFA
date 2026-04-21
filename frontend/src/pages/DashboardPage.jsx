import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import { useProjects } from '../hooks/useProjects';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

export default function DashboardPage() {
  const { data: projects, loading } = useProjects();
  const navigate = useNavigate();

  const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  
  // Calculate basic stats from the list of projects
  const totalProjects = projects.length;

  return (
    <div className="d-flex flex-column h-100">
      <TopBar 
        title="Dashboard" 
        actionButton={
          <button className="btn btn-neo btn-primary" onClick={() => navigate('/projects')}>
            VIEW PROJECTS
          </button>
        }
      />
      
      <div className="container-fluid p-5 flex-grow-1 overflow-auto">
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="neo-card p-4 text-center">
              <h2 className="display-4 font-display text-violet mb-1">{totalProjects}</h2>
              <p className="text-muted text-uppercase fw-bold m-0" style={{letterSpacing: '0.1em'}}>Total Projects</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="neo-card p-4 text-center">
              <h2 className="display-4 font-display text-emerald mb-1">{activeProjects}</h2>
              <p className="text-muted text-uppercase fw-bold m-0" style={{letterSpacing: '0.1em'}}>Active Projects</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="neo-card p-4 text-center">
              <h2 className="display-4 font-display text-cyan mb-1">{completedProjects}</h2>
              <p className="text-muted text-uppercase fw-bold m-0" style={{letterSpacing: '0.1em'}}>Completed</p>
            </div>
          </div>
        </div>

        <h3 className="font-display text-white mb-4">Recent Projects</h3>
        
        {loading ? (
          <LoadingSpinner />
        ) : projects.length === 0 ? (
          <EmptyState 
            title="Welcome to Agileo"
            message="Create your first project to start tracking sprints, user stories, and tasks."
            actionButton={
              <button className="btn btn-neo btn-primary mt-3" onClick={() => navigate('/projects')}>
                CREATE PROJECT
              </button>
            }
          />
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 animate-fade-in">
            {projects.slice(0, 3).map(project => (
              <div className="col" key={project.id}>
                <div 
                  className="neo-card p-4 d-flex flex-column h-100" 
                  style={{cursor: 'pointer'}} 
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-display text-white m-0 text-truncate">{project.name}</h4>
                    <span 
                      className="neo-badge" 
                      style={{
                        backgroundColor: project.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.1)',
                        color: project.status === 'ACTIVE' ? 'var(--color-emerald)' : 'var(--color-text-secondary)',
                        border: `1px solid ${project.status === 'ACTIVE' ? 'var(--color-emerald)' : 'var(--color-border)'}`
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted flex-grow-1" style={{fontSize: '0.9rem'}}>
                    {project.description || "No description provided."}
                  </p>
                  <div className="mt-4 pt-3 border-top border-secondary text-end">
                    <span className="text-violet fw-bold small text-uppercase" style={{letterSpacing: '1px'}}>Open Project &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
