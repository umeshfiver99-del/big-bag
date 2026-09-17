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

  const content = (
    <span className={`bigbag-brand inline-flex items-center gap-2.5 select-none ${className}`}>
      <span
        aria-hidden="true"
        className={`bigbag-code-mark ${iconSizeClasses}`}
      >
        {`</>`}
      </span>
      {!hideText && (
        <span className={`bigbag-wordmark font-bold text-foreground ${textSizeClasses}`}>BigBag</span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={hideText ? "BigBag home" : undefined} className="inline-flex rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
