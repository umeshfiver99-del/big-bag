import Link from "next/link";
import { ArrowUpRight, Blocks, Braces, Check, Database, GitBranch, Globe2, LockKeyhole, MessageSquareCode, MousePointer2, Rocket, ShieldCheck, WandSparkles } from "lucide-react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { LandingComposer } from "@/components/marketing/LandingComposer";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { ConnectorExplorer } from "@/components/marketing/ConnectorExplorer";

export default function LandingPage() {
  return (
    <div className="marketing-page">
      <SiteHeader />
      <main id="content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-note"><span /> AI product builder for people with real work to ship</p>
            <h1>Build the app<br />you can describe.</h1>
            <p className="hero-lede">BigBag turns one clear brief into a working full-stack product—then keeps the code, data, preview, and deployment in one focused workspace.</p>
            <LandingComposer />
            <p className="hero-fineprint"><ShieldCheck /> Private projects by default. No credit card to start.</p>
          </div>
          <div className="hero-stage">
            <div className="stage-caption"><span>Generated product</span><b>Live preview</b></div>
            <ProductPreview />
            <div className="stage-status"><i /><span><b>Build complete</b><small>Database, auth, and responsive UI included</small></span></div>
          </div>
        </section>

        <section className="proof-bar" aria-label="Product capabilities">
          <span><Braces /> You own the code</span>
          <span><Database /> Real database</span>
          <span><GitBranch /> GitHub sync</span>
          <span><Globe2 /> Publish on your domain</span>
        </section>

        <section className="workflow-section">
          <div className="section-heading split-heading">
            <div><p>One workspace, end to end</p><h2>Stay with the idea while BigBag handles the scaffolding.</h2></div>
            <p>You do not need to translate the product into tickets, wireframes, database tables, and deployment files first. Start in plain language and refine the working result.</p>
          </div>
          <div className="workflow-grid">
            <article className="workflow-feature workflow-feature-large">
              <span className="feature-icon"><MessageSquareCode /></span>
              <div><h3>Describe what people need to do.</h3><p>Use ordinary language, attach references, or bring a Figma file. The agent plans and builds against your actual goal.</p></div>
              <div className="mini-conversation"><p>“Make invoice status visible from the client list.”</p><span><WandSparkles /> Updating data model and interface…</span></div>
            </article>
            <article className="workflow-feature">
              <span className="feature-icon"><MousePointer2 /></span>
              <div><h3>Edit the result, not a mockup.</h3><p>Click into a live preview, change code, or continue the conversation.</p></div>
            </article>
            <article className="workflow-feature workflow-feature-dark">
              <span className="feature-icon"><Rocket /></span>
              <div><h3>Publish when it feels right.</h3><p>Connect GitHub, use your domain, and keep iterating after launch.</p></div>
              <span className="publish-pill"><i /> bigbag.app/demo · Live</span>
            </article>
          </div>
        </section>

        <section className="sample-callout">
          <div><p>See the quality bar</p><h2>A sample product, not a marketing mockup.</h2><span>Explore the interaction patterns, responsive layout, forms, tables, and calm information hierarchy we ask every generated project to meet.</span></div>
          <Link href="/sample" className="button-paper">Open the sample UI <ArrowUpRight /></Link>
        </section>

        <section className="connectors-section">
          <div className="section-heading split-heading">
            <div><p>Connect the tools you already use</p><h2>Your product should fit the business, not sit beside it.</h2></div>
            <div className="connector-heading-side"><span><Blocks /> 99 supported services</span><Link href="/connectors">Browse every connector <ArrowUpRight /></Link></div>
          </div>
          <ConnectorExplorer compact />
        </section>

        <section className="security-band">
          <LockKeyhole />
          <div><p>Security is part of the architecture</p><h2>Every workspace only sees the projects it owns.</h2></div>
          <ul><li><Check /> Google-verified identity</li><li><Check /> Server-side ownership checks</li><li><Check /> Provider keys never reach the browser</li></ul>
          <Link href="/security">Read the security model</Link>
        </section>

        <section className="final-cta">
          <div className="final-cta-mark" aria-hidden="true">{`</>`}</div>
          <p>There is a working product on the other side of a clear sentence.</p>
          <h2>What should yours do?</h2>
          <Link href="/login" className="button-signal">Start building free <ArrowUpRight /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
