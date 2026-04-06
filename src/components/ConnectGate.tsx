'use client';

import React, { useEffect } from "react";
import { useAuthStore } from "../state/authStore";

export default function ConnectGate({ children }: { children: React.ReactNode }) {
  const { isAuthed, loading, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (loading) {
    return null;
  }
  if (!isAuthed) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <a
          href="/api/auth/notion/start"
          className="rounded-full bg-black text-white px-6 py-3 shadow"
        >
          Connect Notion
        </a>
      </div>
    );
  }
  return <>{children}</>;
}
