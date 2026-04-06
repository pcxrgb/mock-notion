import { create } from "zustand";

type AuthState = {
  isAuthed: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthed: false,
  loading: false,
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/status", { cache: "no-store" });
      const data = (await res.json()) as any;
      const isAuthed = !!data?.authed;
      set({ isAuthed, loading: false });
    } catch {
      set({ isAuthed: false, loading: false });
    }
  },
}))
