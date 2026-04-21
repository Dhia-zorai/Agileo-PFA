import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/tasks';
import { useToast } from '../components/ui/Toast';

export function useTasks(sprintId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchBySprint = useCallback(async () => {
    if (!sprintId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await tasksApi.getBySprint(sprintId);
      setData(result);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [sprintId, addToast]);

  useEffect(() => {
    fetchBySprint();
  }, [fetchBySprint]);

  const create = async (taskData) => {
    try {
      const newTask = await tasksApi.create(sprintId, taskData);
      setData(prev => [newTask, ...prev]);
      addToast('Task created', 'success');
      return newTask;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const update = async (id, taskData) => {
    try {
      const updated = await tasksApi.update(id, taskData);
      setData(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await tasksApi.delete(id);
      setData(prev => prev.filter(t => t.id !== id));
      addToast('Task deleted', 'success');
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const updateStatus = async (id, status) => {
    // Optimistic update
    setData(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    try {
      const updated = await tasksApi.updateStatus(id, status);
      setData(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      // Revert on error
      fetchBySprint();
      addToast(err.message, 'error');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refresh: fetchBySprint,
    create,
    update,
    remove,
    updateStatus
  };
}
