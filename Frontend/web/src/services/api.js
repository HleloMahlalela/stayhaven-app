import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(/\/$/, ''),
  // Added withCredentials to support cookies (if they are using them)
  withCredentials: true,
})

export const resolveAssetUrl = (url = '') => {
  if (!url) return ''
  if (/^(https?:|data:|blob:)/i.test(url)) return url
  const apiOrigin = api.defaults.baseURL.replace(/\/api\/v1\/?$/, '')
  return `${apiOrigin}${url.startsWith('/') ? '' : '/'}${url}`
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.url?.includes('/auth/me')) {
    console.log("SENDING TOKEN TO /auth/me:", config.headers.Authorization);
  }

  return config
})

export default api
