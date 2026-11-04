import axios from 'axios'

export const API_ORIGIN = 'http://localhost:4000'

const api = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  // Added withCredentials to support cookies (if they are using them)
  withCredentials: true,
})

export const resolveAssetUrl = (url = '') => {
  if (!url) return ''
  if (/^(data:|blob:)/i.test(url)) return url
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url)
      if (['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname)) {
        return `${API_ORIGIN}${parsed.pathname}${parsed.search}${parsed.hash}`
      }
      return url
    } catch {
      return url
    }
  }
  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
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
