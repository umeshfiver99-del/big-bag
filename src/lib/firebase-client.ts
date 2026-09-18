"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

interface FirebasePublicConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface FirebaseConfigResponse {
  ok: boolean;
  data?: {
    configured: boolean;
    config: FirebasePublicConfig | null;
  };
}

let authPromise: Promise<Auth | null> | null = null;

export function getFirebaseAuth(): Promise<Auth | null> {
  authPromise ??= (async () => {
    const response = await fetch("/api/auth/config", { cache: "no-store" });
    if (!response.ok) throw new Error("Firebase configuration request failed");

    const payload = await response.json() as FirebaseConfigResponse;
    const config = payload.data?.config;
    if (!payload.ok || !payload.data?.configured || !config) return null;

    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    return getAuth(app);
  })();

  return authPromise;
}
