import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '../api/projects';
import { useToast } from '../components/ui/Toast';

export function useProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await projectsApi.getAll();
      setData(result);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = async (projectData) => {
    try {
      const newProject = await projectsApi.create(projectData);
      setData(prev => [newProject, ...prev]);
      addToast('Project created successfully', 'success');
      return newProject;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const update = async (id, projectData) => {
    try {
      const updated = await projectsApi.update(id, projectData);
      setData(prev => prev.map(p => p.id === id ? updated : p));
      addToast('Project updated', 'success');
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await projectsApi.delete(id);
      setData(prev => prev.filter(p => p.id !== id));
      addToast('Project deleted', 'success');
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refresh: fetchAll,
    create,
    update,
    remove
  };
}
