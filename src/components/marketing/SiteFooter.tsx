import Link from "next/link";
import { BigBagLogo } from "@/components/BigBagLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <BigBagLogo size="sm" />
          <p>From a sentence to software people can use.</p>
        </div>
        <div className="footer-links">
          <Link href="/solutions">Solutions</Link>
          <Link href="/connectors">Connectors</Link>
          <Link href="/security">Security</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/community">Community</Link>
          <Link href="/enterprise">Enterprise</Link>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} BigBag</span>
          <Link href="/report-bug">Report a bug</Link>
        </div>
      </div>
    </footer>
  );
}
