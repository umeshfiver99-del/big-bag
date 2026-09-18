"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onIdTokenChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase-client";

interface AuthContextValue {
  configured: boolean;
  configurationError: boolean;
  loading: boolean;
  user: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  configured: false,
  configurationError: false,
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
  const [configured, setConfigured] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    void getFirebaseAuth()
      .then((firebaseAuth) => {
        if (cancelled) return;
        setConfigured(Boolean(firebaseAuth));
        if (!firebaseAuth) {
          setLoading(false);
          return;
        }

        unsubscribe = onIdTokenChanged(firebaseAuth, async (nextUser) => {
          try {
            await syncSession(nextUser);
            if (!cancelled) setUser(nextUser);
          } catch {
            await signOut(firebaseAuth);
            if (!cancelled) setUser(null);
          } finally {
            if (!cancelled) setLoading(false);
          }
        });
      })
      .catch(() => {
        if (cancelled) return;
        setConfigurationError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    configured,
    configurationError,
    loading,
    user,
    logout: async () => {
      const firebaseAuth = await getFirebaseAuth().catch(() => null);
      if (firebaseAuth) await signOut(firebaseAuth);
      await syncSession(null);
      setUser(null);
    },
  }), [configured, configurationError, loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
