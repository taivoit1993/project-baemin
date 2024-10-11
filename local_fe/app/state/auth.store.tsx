import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage", // unique name for the storage
      getStorage: () => localStorage, // specify the storage type
    }
  )
);

export default useAuthStore;
