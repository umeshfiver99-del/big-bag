"use client";

import Link from "next/link";

interface BigBagLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  hideText?: boolean;
}

export function BigBagLogo({
  className = "",
  size = "md",
  href = "/",
  hideText = false,
}: BigBagLogoProps) {
  const iconSizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }[size];

  const textSizeClasses = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-[22px]",
  }[size];

  const svgSize = {
    sm: 28,
    md: 32,
    lg: 40,
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      <div className={`relative ${iconSizeClasses} flex items-center justify-center text-foreground`}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 24 24"
          fill="none"
          className="overflow-visible"
        >
          <path d="M7.2 8.2V6.8A4.8 4.8 0 0 1 12 2a4.8 4.8 0 0 1 4.8 4.8v1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4.5 8.3h15l1.3 12.2a1.4 1.4 0 0 1-1.4 1.5H4.6a1.4 1.4 0 0 1-1.4-1.5L4.5 8.3Z" fill="currentColor" />
          <path d="m9.3 12.2-2 2 2 2M14.7 12.2l2 2-2 2M13.1 11.2l-2.2 6" stroke="var(--background)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Brand text */}
      {!hideText && (
        <div className="flex items-center tracking-[-0.045em]">
          <span className={`font-bold text-foreground transition-colors ${textSizeClasses}`}>BigBag</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
