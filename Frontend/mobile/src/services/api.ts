import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1').replace(/\/$/, '');
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export type AuthUser = {
  id?: string;
  email: string;
  fullName?: string;
  name?: string;
  role: string;
  [key: string]: unknown;
};
type AuthResponse = { accessToken: string; user: AuthUser; refreshToken?: string };
type ApiResult<T> = { data: T };
type ApiErrorBody = { message?: string; error?: { message?: string } };

export async function saveAccessToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearAccessToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, method: 'GET' | 'POST' | 'PUT', body?: unknown, authenticated = true): Promise<ApiResult<T>> {
  const token = authenticated ? await AsyncStorage.getItem(TOKEN_KEY) : null;
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

export async function login(email: string, password: string) {
  const { data } = await request<AuthResponse>('/auth/login', 'POST', { email, password }, false);
  await AsyncStorage.multiSet([
    [TOKEN_KEY, data.accessToken],
    [USER_KEY, JSON.stringify(data.user)],
  ]);
  return data;
}

export async function registerGuest(name: string, email: string, password: string) {
  return request<{ user: AuthUser }>('/auth/register', 'POST', { name, fullName: name, email, password, role: 'GUEST' }, false);
}

const api = {
  get: <T = unknown>(path: string) => request<T>(path, 'GET'),
  post: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'POST', body),
  put: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'PUT', body),
  patch: <T = unknown>(path: string, body?: unknown) => request<T>(path, 'PATCH', body),
};

export default api;
