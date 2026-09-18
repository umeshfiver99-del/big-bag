import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function runtimeValue(name: string) {
  return process.env[name]?.trim() || "";
}

/**
 * Firebase's web configuration is public by design, but NEXT_PUBLIC values are
 * normally frozen into a Next.js client bundle during `next build`. Docker hosts
 * such as Render inject service variables only when the container starts, so the
 * browser must receive these values from the running server instead.
 */
export function GET() {
  const config = {
    apiKey: runtimeValue("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: runtimeValue("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: runtimeValue("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: runtimeValue("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: runtimeValue("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: runtimeValue("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId: runtimeValue("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
  };
  const configured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

  return NextResponse.json(
    { ok: true, data: { configured, config: configured ? config : null } },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
