import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { AuthUser, login as apiLogin, TOKEN_KEY, USER_KEY } from '../services/api';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [storedToken] = await AsyncStorage.multiGet([TOKEN_KEY, USER_KEY]).then((items) => items.map(([, value]) => value));
        if (!storedToken) return;
        const { data } = await api.get<AuthUser | { user: AuthUser }>('/auth/me');
        const profile = (data as { user?: AuthUser }).user ?? data as AuthUser;
        if (!active) return;
        setToken(storedToken);
        setUser(profile);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(profile));
      } catch {
        if (active) await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await apiLogin(email, password);
    setToken(result.accessToken);
    setUser(result.user);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, token, loading, signIn, signOut }), [user, token, loading, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
