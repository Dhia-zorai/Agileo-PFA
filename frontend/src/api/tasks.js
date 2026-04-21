import { apiClient } from './client';

export const tasksApi = {
  getBySprint: (sprintId) => apiClient(`/sprints/${sprintId}/tasks`),
  
  create: (sprintId, data) => apiClient(`/sprints/${sprintId}/tasks`, {
    method: 'POST',
    body: data
  }),
  
  update: (id, data) => apiClient(`/tasks/${id}`, {
    method: 'PUT',
    body: data
  }),
  
  delete: (id) => apiClient(`/tasks/${id}`, {
    method: 'DELETE'
  }),
  
  updateStatus: (id, status) => apiClient(`/tasks/${id}/status`, {
    method: 'PATCH',
    body: { status }
  })
};
