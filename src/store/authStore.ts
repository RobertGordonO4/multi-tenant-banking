import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used -> makes the store persist across page reloads
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
