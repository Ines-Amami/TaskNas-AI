import axios from 'axios';

// Automatically attach the token to every request
const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ──────────────────────────────────────────────
export const loginAPI    = (data) => api.post('/auth/login', data);
export const registerAPI = (data) => api.post('/auth/register', data);

// ── Tasks ─────────────────────────────────────────────
export const getTasksAPI    = ()         => api.get('/tasks');
export const createTaskAPI  = (data)     => api.post('/tasks', data);
export const updateTaskAPI  = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTaskAPI  = (id)       => api.delete(`/tasks/${id}`);

// ── AI (calls backend → backend calls Gemini) ─────────
export const aiGoalAPI     = (goal)              => api.post('/ai/goal', { goal });
export const aiInsightsAPI = (tasks)             => api.post('/ai/insights', { tasks });
export const aiChatAPI     = (message, tasks, history) => api.post('/ai/chat', { message, tasks, history });
export const aiDescribeAPI = (title)             => api.post('/ai/describe', { title });