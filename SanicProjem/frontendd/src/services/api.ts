import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token ekleme
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth işlemleri
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Etkinlik işlemleri
export const eventsAPI = {
  getAll: async () => {
    const response = await api.get('/events/getall');
    return response.data.events;
  },
  create: async (data: { 
    title: string; 
    description: string; 
    start_date: string; 
    end_date: string; 
    created_by: number; 
  }) => {
    const response = await api.post('/events/create', data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/events/delete/${id}`);
    return response.data;
  },
};

// Duyuru işlemleri
export const announcementsAPI = {
  getAll: async () => {
    const response = await api.get('/announcements/getall');
    return response.data.announcements;
  },
  create: async (data: { title: string; content: string; created_by: number }) => {
    const response = await api.post('/announcements/create', data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/announcements/delete/${id}`);
    return response.data;
  },
};

// Kullanıcı işlemleri
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users/getall');
    return response.data.users;
  },
  deactivate: async (id: number) => {
    const response = await api.put(`/users/deactivate/${id}`);
    return response.data;
  },
  update: async (id: number, data: { 
    first_name?: string; 
    last_name?: string; 
    email?: string; 
    is_active?: boolean; 
    current_password?: string; 
    new_password?: string; 
  }) => {
    const response = await api.put(`/users/update/${id}`, data);
    return response.data;
  },
  create: async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    is_active: boolean;
  }) => {
    const response = await api.post('/users/register', data);
    return response.data;
  },
};

