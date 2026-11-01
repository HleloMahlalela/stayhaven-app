import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(/\/$/, ''),
  // Added withCredentials to support cookies (if they are using them)
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
