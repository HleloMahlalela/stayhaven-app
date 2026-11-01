import { Platform } from 'react-native';

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1').replace(/\/$/, '');
const TOKEN_KEY = 'token';

type ApiResult<T> = { data: T };
type ApiErrorBody = { message?: string; error?: { message?: string } };

async function readToken() {
  if (Platform.OS === 'web') {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_KEY);
  }
  const SecureStore = await import('expo-secure-store');
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function saveAccessToken(token: string) {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.localStorage.setItem(TOKEN_KEY, token);
    return;
  }
  const SecureStore = await import('expo-secure-store');
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearAccessToken() {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.localStorage.removeItem(TOKEN_KEY);
    return;
  }
  const SecureStore = await import('expo-secure-store');
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function request<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH', body?: unknown): Promise<ApiResult<T>> {
  const token = await readToken();
  const response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const errorBody = data as ApiErrorBody | null;
    const error = new Error(errorBody?.error?.message || errorBody?.message || `Request failed (${response.status})`);
    Object.assign(error, { status: response.status, response: { data } });
    throw error;
  }
  return { data: data as T };
}

const api = {
  get: <T = unknown>(path: string) => request<T>(path, 'GET'),
  post: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'POST', body),
  put: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'PUT', body),
  patch: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'PATCH', body),
};

export default api;
