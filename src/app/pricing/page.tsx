import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";

export default function PricingPage() {
  return (
    <div className="marketing-page"><SiteHeader /><main id="content" className="pricing-page">
      <header className="directory-hero"><p>Simple pricing</p><h1>Start building. Upgrade when the work is real.</h1><span>No maze of plans. Pro is $12 per month. Business is being shaped with early teams now.</span></header>
      <div className="pricing-grid">
        <article><div><h2>Starter</h2><p>Explore the builder and ship a first idea.</p></div><strong>$0 <small>/ month</small></strong><Link href="/login" className="button-paper">Start free</Link><ul><li><Check /> Private workspace</li><li><Check /> Live preview</li><li><Check /> Code export</li><li><Minus /> Usage-based AI credits</li></ul></article>
        <article className="pricing-featured"><div><span>For regular builders</span><h2>Pro</h2><p>Build, refine, and publish ongoing work.</p></div><strong>$12 <small>/ month</small></strong><Link href="/login" className="button-signal">Choose Pro</Link><ul><li><Check /> Everything in Starter</li><li><Check /> Custom domains</li><li><Check /> GitHub sync</li><li><Check /> Priority build queue</li></ul></article>
        <article><div><span>Coming soon</span><h2>Business</h2><p>Controls and support for teams shipping together.</p></div><strong>Custom</strong><a className="button-paper" href="https://formspree.io/f/mojynkzv" target="_blank" rel="noreferrer">Join the waitlist</a><ul><li><Check /> Shared team spaces</li><li><Check /> Central billing</li><li><Check /> Advanced access controls</li><li><Check /> Priority support</li></ul></article>
      </div>
      <p className="pricing-note">AI model and sandbox usage may require separate credits. Exact usage is shown before you publish.</p>
    </main><SiteFooter /></div>
  );
}
