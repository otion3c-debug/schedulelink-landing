// Lightweight private analytics beacon for ScheduleLink.
// Fires anonymous events to the backend — no PII, no cookies, no third parties.
// Events: visit | get_started | pricing | signin_google | signin_microsoft | signup
import { API_URL } from "./api";

let visitorId: string | null = null;

function getVisitorId(): string {
  if (visitorId) return visitorId;
  try {
    const KEY = "sl_visitor";
    let v = window.localStorage.getItem(KEY);
    if (!v) {
      v = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(KEY, v);
    }
    visitorId = v;
    return v;
  } catch {
    visitorId = `anon-${Date.now().toString(36)}`;
    return visitorId;
  }
}

export function trackEvent(event: string) {
  if (typeof window === "undefined") return; // SSR guard
  try {
    const payload = {
      event,
      path: window.location.pathname,
      referrer: document.referrer || "",
      visitor_id: getVisitorId(),
    };
    // Fire-and-forget; never block the page or surface errors to users.
    fetch(`${API_URL}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never break the site */
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  // Track page views without double-firing on client-side nav.
  try {
    if (!(window as any).__sl_analytics_inited) {
      (window as any).__sl_analytics_inited = true;
      trackEvent("visit");
    }
  } catch {
    /* noop */
  }
}
