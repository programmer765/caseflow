import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true, // for testing purposes, set to true by default
      token: null,
      login: (token: string) =>
        set(() => ({ isAuthenticated: true, token })),
      logout: () => set(() => ({ isAuthenticated: false, token: null })),
    }),
    {
      name: 'auth-storage', // unique name
    }
  )
);