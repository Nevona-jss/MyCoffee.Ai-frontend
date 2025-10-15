import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AxiosRequestConfig } from 'axios';

// Types
interface ApiResponse<T> {
  message?: string;
  success: boolean;
  data: T;
  meta: {
    timestamp: string
  }
}

interface UseGetOptions {
  enabled?: boolean;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  retry?: number;
}

interface UsePostOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}

// Custom hook for GET requests
export function useGet<T = any>(
  queryKey: any[],
  url: string,
  config?: AxiosRequestConfig,
  options?: UseGetOptions
) {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<T> => {
      const response = await api.get<T>(url, config);
      return response.data;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    retry: options?.retry ?? 1,
  });
}

// Custom hook for POST requests
export function usePost<T = any, D = any>(
  url: string,
  options?: UsePostOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: D): Promise<ApiResponse<T>> => {
      const response = await api.post<ApiResponse<T>>(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      // Invalidate and refetch queries that might be affected
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    onSettled: (data, error) => {
      options?.onSettled?.(data, error);
    },
  });
}

// Custom hook for PUT requests
export function usePut<T = any, D = any>(
  url: string,
  options?: UsePostOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: D): Promise<T> => {
      const response = await api.put<T>(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    onSettled: (data, error) => {
      options?.onSettled?.(data, error);
    },
  });
}

// Custom hook for PATCH requests
export function usePatch<T = any, D = any>(
  url: string,
  options?: UsePostOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: D): Promise<T> => {
      const response = await api.patch<T>(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    onSettled: (data, error) => {
      options?.onSettled?.(data, error);
    },
  });
}

// Custom hook for DELETE requests
export function useDelete<T = any>(
  url: string,
  options?: UsePostOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<T> => {
      const response = await api.delete<T>(url);
      return response.data;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    onSettled: (data, error) => {
      options?.onSettled?.(data, error);
    },
  });
}

// Utility hook for invalidating queries
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByKey: (queryKey: string[]) => queryClient.invalidateQueries({ queryKey }),
    refetchQueries: (queryKey: string[]) => queryClient.refetchQueries({ queryKey }),
  };
}
