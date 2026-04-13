export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API call failed: ${response.status}`);
  }

  return response.json();
}

export function getApiBaseUrl(serviceName: string): string {
  const envVar = `NEXT_PUBLIC_${serviceName.toUpperCase()}_API_URL`;
  return process.env[envVar] || `http://localhost:3000/api/${serviceName}`;
}