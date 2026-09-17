"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ArrowLeft, Check, LoaderCircle, ShieldCheck } from "lucide-react";
import { BigBagLogo } from "@/components/BigBagLogo";
import { firebaseAuth, firebaseConfigured } from "@/lib/firebase-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    if (!firebaseAuth) {
      setError("Google sign-in is not configured for this deployment yet.");
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
      const message = reason instanceof Error && reason.message.includes("popup-closed")
        ? "The sign-in window was closed. Try again when you are ready."
        : "Google sign-in could not be completed. Check your Firebase authorized domains.";
      setError(message);
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
        <div className="login-card">
          <div className="login-lock"><ShieldCheck /></div>
          <h2>Continue to BigBag</h2>
          <p>Use Google to enter your private builder workspace.</p>
          <button className="google-button" onClick={signIn} disabled={loading || !firebaseConfigured}>
            {loading ? <LoaderCircle className="size-5 animate-spin" /> : <GoogleMark />}
            {loading ? "Signing you in…" : "Continue with Google"}
          </button>
          {!firebaseConfigured && <p className="login-notice">Add the Firebase public configuration to enable sign-in.</p>}
          {error && <p className="login-error" role="alert">{error}</p>}
          <p className="login-terms">By continuing, you agree to keep your generated apps lawful and secure.</p>
        </div>
      </section>
    </main>
  );
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
