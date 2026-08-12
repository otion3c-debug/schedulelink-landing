"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// Client wrapper so server components can attach CTA tracking to links.
// Usage: <TrackedLink event="get_started" href="/login" className="...">Get started</TrackedLink>
export default function TrackedLink({
  event,
  href,
  className,
  children,
}: {
  event: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={() => trackEvent(event)} className={className}>
      {children}
    </Link>
  );
}
