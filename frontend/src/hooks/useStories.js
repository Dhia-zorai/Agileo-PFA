import { useState, useEffect, useCallback } from 'react';
import { storiesApi } from '../api/stories';
import { useToast } from '../components/ui/Toast';

export function useStories(projectId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchByProject = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await storiesApi.getByProject(projectId);
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

  const create = async (storyData) => {
    try {
      const newStory = await storiesApi.create(projectId, storyData);
      setData(prev => [newStory, ...prev]);
      addToast('Story created successfully', 'success');
      return newStory;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const update = async (id, storyData) => {
    try {
      const updated = await storiesApi.update(id, storyData);
      setData(prev => prev.map(s => s.id === id ? updated : s));
      addToast('Story updated', 'success');
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await storiesApi.delete(id);
      setData(prev => prev.filter(s => s.id !== id));
      addToast('Story deleted', 'success');
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const assignToSprint = async (id, sprintId) => {
    try {
      const updated = await storiesApi.assign(id, sprintId);
      setData(prev => prev.map(s => s.id === id ? updated : s));
      addToast(sprintId ? 'Assigned to sprint' : 'Removed from sprint', 'info');
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
    assignToSprint
  };
}
