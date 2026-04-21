import { apiClient } from './client';

export const projectsApi = {
  getAll: () => apiClient('/projects'),
  
  getById: (id) => apiClient(`/projects/${id}`),
  
  create: (data) => apiClient('/projects', { 
    method: 'POST', 
    body: data 
  }),
  
  update: (id, data) => apiClient(`/projects/${id}`, { 
    method: 'PUT', 
    body: data 
  }),
  
  delete: (id) => apiClient(`/projects/${id}`, { 
    method: 'DELETE' 
  }),
};
