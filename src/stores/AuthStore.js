import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (userData) => set({ user: userData }), // Example of setting user state
      setAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }), // Example of setting authentication status
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export { useAuthStore };
