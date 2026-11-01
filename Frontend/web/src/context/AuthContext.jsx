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
    const response = await api.post('/auth/login', { email, password })
    const nextToken = response.data.token ?? response.data.accessToken

    if (!nextToken) {
      throw new Error('The login response did not include an authentication token.')
    }

    window.localStorage.setItem('token', nextToken)
    setToken(nextToken)
    setUser(response.data.user ?? null)
    return response.data.user
  }, [])

  useEffect(() => {
    let active = true

    async function loadUser() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await api.get('/auth/me')
        if (active) setUser(response.data.user ?? response.data)
      } catch {
        if (active) logout()
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
