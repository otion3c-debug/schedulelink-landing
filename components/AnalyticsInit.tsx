"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

// Mounted once in the root layout — fires the anonymous "visit" event
// on first page load. Client-side only; never blocks rendering.
export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
