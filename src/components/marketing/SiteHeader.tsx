"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, PanelsTopLeft, X } from "lucide-react";
import { useState } from "react";
import { BigBagLogo } from "@/components/BigBagLogo";
import { useAuth } from "@/components/auth/AuthProvider";

const links = [
  ["Sample", "/sample"],
  ["Solutions", "/solutions"],
  ["Connectors", "/connectors"],
  ["Pricing", "/pricing"],
  ["Enterprise", "/enterprise"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="site-header-inner">
        <BigBagLogo size="md" />

        <nav className="site-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          {user ? (
            <>
              <Link className="button-quiet hidden sm:inline-flex" href="/dashboard">
                <PanelsTopLeft className="size-4" /> Workspace
              </Link>
              <button
                className="icon-action hidden sm:grid"
                aria-label="Sign out"
                title="Sign out"
                onClick={async () => { await logout(); router.push("/"); }}
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : (
            <>
              <Link className="button-quiet hidden sm:inline-flex" href="/login">Sign in</Link>
              <Link className="button-ink hidden sm:inline-flex" href="/login">Start building</Link>
            </>
          )}
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>
            {user ? "Open workspace" : "Start building"}
          </Link>
        </div>
      )}
    </header>
  );
}
