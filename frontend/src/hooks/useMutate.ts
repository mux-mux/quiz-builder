import { useState } from 'react';

type UseMutateProps<T, U = unknown> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', body?: U, options?: RequestInit) => Promise<void>;
};

export function useMutate<T, U = unknown>(url: string): UseMutateProps<T, U> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', body?: U, options?: RequestInit) => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      };

      if (body && method !== 'DELETE') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error status ${response.status}`);
      }

      const json = response.status !== 204 ? ((await response.json()) as T) : null;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate } as const;
}