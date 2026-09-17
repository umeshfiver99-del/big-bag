import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface InfoPageProps {
  label: string;
  title: string;
  description: string;
  items: Array<{ icon: LucideIcon; title: string; body: string }>;
  children?: React.ReactNode;
}

export function InfoPage({ label, title, description, items, children }: InfoPageProps) {
  return (
    <div className="marketing-page"><SiteHeader /><main id="content" className="info-page">
      <header className="directory-hero"><p>{label}</p><h1>{title}</h1><span>{description}</span></header>
      <section className="info-grid">
        {items.map(({ icon: Icon, title: itemTitle, body }) => <article key={itemTitle}><Icon /><h2>{itemTitle}</h2><p>{body}</p></article>)}
      </section>
      {children}
      <section className="info-cta"><p>Move from planning to a working product.</p><Link href="/login">Start building <ArrowUpRight /></Link></section>
    </main><SiteFooter /></div>
  );
}
