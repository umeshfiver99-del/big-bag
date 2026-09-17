"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUp, Command, Paperclip, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

const suggestions = [
  "A client portal for my design studio",
  "An inventory dashboard for three warehouses",
  "A booking app with Stripe deposits",
];

export function LandingComposer() {
  const router = useRouter();
  const { user } = useAuth();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("Build a calm client portal where customers can review work, leave feedback, and pay invoices.");

  const continueToBuilder = () => {
    if (!prompt.trim()) return;
    try { sessionStorage.setItem("bigbag:landingPrompt", prompt.trim()); } catch { /* storage can be unavailable */ }
    router.push(user ? "/dashboard?from=landing" : "/login?next=%2Fdashboard%3Ffrom%3Dlanding");
  };

  return (
    <div className="hero-composer">
      <label htmlFor="landing-prompt">Describe the product you want</label>
      <textarea
        ref={inputRef}
        id="landing-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") continueToBuilder();
        }}
        rows={4}
      />
      <div className="hero-composer-actions">
        <button type="button" className="composer-tool" title="Attachments become available after sign in" aria-label="Attachments become available after sign in" disabled>
          <Paperclip className="size-4" />
        </button>
        <span className="keyboard-hint"><Command className="size-3" /> Enter</span>
        <button type="button" className="composer-submit" onClick={continueToBuilder} disabled={!prompt.trim()}>
          Build this app <ArrowUp className="size-4" />
        </button>
      </div>
      <div className="prompt-suggestions" role="group" aria-label="Prompt suggestions">
        <span><Sparkles className="size-3.5" /> Try</span>
        {suggestions.map((suggestion) => <button key={suggestion} onClick={() => { setPrompt(suggestion); inputRef.current?.focus(); }}>{suggestion}</button>)}
      </div>
    </div>
  );
}
