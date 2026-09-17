"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onIdTokenChanged, signOut, type User } from "firebase/auth";
import { firebaseAuth, firebaseConfigured } from "@/lib/firebase-client";

interface AuthContextValue {
  configured: boolean;
  loading: boolean;
  user: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  configured: false,
  loading: true,
  user: null,
  logout: async () => {},
});

async function syncSession(user: User | null) {
  if (!user) {
    await fetch("/api/auth/session", { method: "DELETE" });
    return;
  }
  const token = await user.getIdToken();
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Could not establish a secure session");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    return onIdTokenChanged(firebaseAuth, async (nextUser) => {
      try {
        await syncSession(nextUser);
        setUser(nextUser);
      } catch {
        await signOut(firebaseAuth);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    configured: firebaseConfigured,
    loading,
    user,
    logout: async () => {
      if (firebaseAuth) await signOut(firebaseAuth);
      await syncSession(null);
      setUser(null);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
