import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => window.localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    window.localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      alert("Token saved: " + (localStorage.getItem('token') ? "YES" : "NO"));
      console.log('LOGIN RESPONSE:', response);
      console.log("TOKEN SAVED SUCCESSFULLY:", localStorage.getItem('token'));
      const token = response.data.accessToken;
      console.log('EXTRACTED TOKEN:', token);
      if (!token) {
        throw new Error('The login response did not include an authentication token.')
      }

      setToken(token)
      setUser(response.data.user ?? null)
      return response.data.user
    } catch (error) {
      console.error("LOGIN FAILED:", error);
      throw error
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadUser() {
      const storedToken = localStorage.getItem('token')
      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await api.get('/auth/me')
        if (active) setUser(response.data.user ?? response.data)
      } catch (error) {
        if (active) console.error("AUTH/ME FAILED:", error.response?.data || error.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUser()
    return () => { active = false }
  }, [logout, token])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
