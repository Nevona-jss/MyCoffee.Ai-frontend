import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';
import { useUserStore } from '@/stores/user-store';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    let token = useUserStore.getState().user.data.token;
    
    // If token is not in store, try to get it from cookies
    if (!token && typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.split('=')[1]?.trim();
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic if it's the refresh endpoint itself
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const response = await apiClient.post('/auth/refresh');

        if (response.status === 200 && response.data?.data?.token) {
          const currentUser = useUserStore.getState().user;

          useUserStore.getState().setUser({
            ...currentUser,
            data: {
              ...currentUser.data,
              ...response.data.data
            }
          });

          console.log("refresh success", response.data);
          

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        useUserStore.getState().resetUser();
        sessionStorage.setItem('auth_redirect', 'true');
        // window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // If it's a 401 on the refresh endpoint itself, redirect to login
    if (
      error.response?.status === 401 && 
      originalRequest.url?.includes('/auth/refresh')
    ) {
      useUserStore.getState().resetUser();
      sessionStorage.setItem('auth_redirect', 'true');
      // window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

export default apiClient;