import axios from 'axios'

const api = axios.create({
  // Updated to /api/v1 to match the backend team's new API
  baseURL: 'http://localhost:4000/api/v1',
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