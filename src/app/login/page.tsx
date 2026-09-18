"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ArrowLeft, Check, LoaderCircle, ShieldCheck } from "lucide-react";
import { BigBagLogo } from "@/components/BigBagLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/components/auth/AuthProvider";
import { getFirebaseAuth } from "@/lib/firebase-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { configured, configurationError, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    const firebaseAuth = await getFirebaseAuth().catch(() => null);
    if (!firebaseAuth) {
      setError("Google sign-in configuration could not be loaded. Refresh the page and try again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      const token = await result.user.getIdToken();
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Secure session setup failed");
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard");
      router.refresh();
    } catch (reason) {
      setError(signInErrorMessage(reason));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page" id="content">
      <section className="login-story" aria-label="Product summary">
        <Link href="/" className="login-back"><ArrowLeft className="size-4" /> Back home</Link>
        <div className="login-story-copy">
          <BigBagLogo size="lg" href="/" />
          <h1>Your builds, previews, and data stay in one private workspace.</h1>
          <ul>
            <li><Check /> Projects are tied to your verified account.</li>
            <li><Check /> Other users cannot list or open your builds.</li>
            <li><Check /> Your provider keys stay on the server.</li>
          </ul>
        </div>
        <div className="login-schematic" aria-hidden="true">
          <span>idea</span><i /><span>build</span><i /><span>publish</span>
        </div>
      </section>

      <section className="login-panel" aria-label="Sign in">
        <ThemeToggle className="login-theme-toggle" />
        <div className="login-card">
          <div className="login-lock"><ShieldCheck /></div>
          <h2>Continue to BigBag</h2>
          <p>Use Google to enter your private builder workspace.</p>
          <p className="login-prompt-note"><Check className="size-4" /> Your landing-page prompt will be waiting in the workspace.</p>
          <button className="google-button" onClick={signIn} disabled={loading || authLoading || !configured}>
            {loading || authLoading ? <LoaderCircle className="size-5 animate-spin" /> : <GoogleMark />}
            {loading ? "Signing you in…" : authLoading ? "Preparing sign-in…" : "Continue with Google"}
          </button>
          {!authLoading && !configured && !configurationError && <p className="login-notice">Add the Firebase public configuration to enable sign-in.</p>}
          {!authLoading && configurationError && <p className="login-error" role="alert">Sign-in configuration could not be loaded. Refresh the page to retry.</p>}
          {error && <p className="login-error" role="alert">{error}</p>}
          <p className="login-terms">By continuing, you agree to keep your generated apps lawful and secure.</p>
        </div>
      </section>
    </main>
  );
}

function signInErrorMessage(reason: unknown) {
  const code = typeof reason === "object" && reason !== null && "code" in reason
    ? String((reason as { code?: unknown }).code)
    : "";

  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
    return "The sign-in window was closed. Try again when you are ready.";
  }
  if (code === "auth/popup-blocked") {
    return "Your browser blocked the Google sign-in window. Allow popups for this site and try again.";
  }
  if (code === "auth/unauthorized-domain") {
    return `This domain is not authorized in Firebase. Add ${window.location.hostname} to Authentication → Settings → Authorized domains.`;
  }
  return "Google sign-in could not be completed. Try again or check the Firebase Authentication setup.";
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9.1L6.5 14Z" />
      <path fill="#EA4335" d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 3.1 7.5l3.4 2.6A5.9 5.9 0 0 1 12 6Z" />
    </svg>
  );
}
