// Base URL for API requests
const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';

/**
 * Standardized fetch wrapper that handles JSON formatting and errors
 */
export async function apiClient(endpoint, { method = 'GET', body, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...customConfig.headers,
  };

  const config = {
    method,
    headers,
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (response.ok) {
    return data;
  }

  // Handle standardized error from FastAPI
  const errorMsg = data && data.detail ? data.detail : response.statusText;
  return Promise.reject(new Error(errorMsg || 'API Error'));
}
