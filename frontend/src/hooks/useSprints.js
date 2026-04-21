import { useState, useEffect, useCallback } from 'react';
import { sprintsApi } from '../api/sprints';
import { useToast } from '../components/ui/Toast';

export function useSprints(projectId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchByProject = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await sprintsApi.getByProject(projectId);
      setData(result);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [projectId, addToast]);

  useEffect(() => {
    fetchByProject();
  }, [fetchByProject]);

  const create = async (sprintData) => {
    try {
      const newSprint = await sprintsApi.create(projectId, sprintData);
      setData(prev => [newSprint, ...prev]);
      addToast('Sprint created successfully', 'success');
      return newSprint;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const update = async (id, sprintData) => {
    try {
      const updated = await sprintsApi.update(id, sprintData);
      setData(prev => prev.map(s => s.id === id ? updated : s));
      addToast('Sprint updated', 'success');
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await sprintsApi.delete(id);
      setData(prev => prev.filter(s => s.id !== id));
      addToast('Sprint deleted', 'success');
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const startSprint = async (id) => {
    try {
      const updated = await sprintsApi.start(id);
      setData(prev => prev.map(s => s.id === id ? updated : s));
      addToast('Sprint started!', 'success');
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const completeSprint = async (id) => {
    try {
      const updated = await sprintsApi.complete(id);
      setData(prev => prev.map(s => s.id === id ? updated : s));
      addToast('Sprint completed! Great job.', 'success');
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refresh: fetchByProject,
    create,
    update,
    remove,
    startSprint,
    completeSprint
  };
}
