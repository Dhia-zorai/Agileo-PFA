import { apiClient } from './client';

export const sprintsApi = {
  getByProject: (projectId) => apiClient(`/projects/${projectId}/sprints`),
  
  create: (projectId, data) => apiClient(`/projects/${projectId}/sprints`, {
    method: 'POST',
    body: data
  }),
  
  update: (id, data) => apiClient(`/sprints/${id}`, {
    method: 'PUT',
    body: data
  }),
  
  delete: (id) => apiClient(`/sprints/${id}`, {
    method: 'DELETE'
  }),
  
  start: (id) => apiClient(`/sprints/${id}/start`, {
    method: 'PATCH'
  }),
  
  complete: (id) => apiClient(`/sprints/${id}/complete`, {
    method: 'PATCH'
  })
};
