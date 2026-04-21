import { apiClient } from './client';

export const storiesApi = {
  getByProject: (projectId) => apiClient(`/projects/${projectId}/stories`),
  
  create: (projectId, data) => apiClient(`/projects/${projectId}/stories`, {
    method: 'POST',
    body: data
  }),
  
  update: (id, data) => apiClient(`/stories/${id}`, {
    method: 'PUT',
    body: data
  }),
  
  delete: (id) => apiClient(`/stories/${id}`, {
    method: 'DELETE'
  }),
  
  assign: (id, sprintId) => apiClient(`/stories/${id}/assign`, {
    method: 'PATCH',
    body: { sprint_id: sprintId }
  })
};
