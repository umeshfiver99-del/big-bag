"use client";

import { useState } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";

export function ContactForm({ kind = "Contact" }: { kind?: string }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const response = await fetch("https://formspree.io/f/mojynkzv", {
      method: "POST",
      body: new FormData(event.currentTarget),
      headers: { Accept: "application/json" },
    });
    setSending(false);
    if (response.ok) setSent(true);
    else setError("Your message was not sent. Try again or email us directly.");
  }

  if (sent) return <div className="form-success"><Check /> Message sent. We’ll get back to you shortly.</div>;

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="topic" value={kind} />
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
      <label className="form-wide">What are you building?<textarea name="message" rows={5} required /></label>
      <button className="button-ink form-wide" disabled={sending}>{sending ? <LoaderCircle className="animate-spin" /> : <Send />} {sending ? "Sending…" : "Send message"}</button>
      {error && <p className="form-error form-wide" role="alert">{error}</p>}
    </form>
  );
}
