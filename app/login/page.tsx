"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function googleSignIn() {
    setLoading(true);
    setErr(null);
    try {
      const data = await api<{ authorization_url: string }>("/auth/google/url");
      window.location.href = data.authorization_url;
    } catch (e: any) {
      setErr(e.message || "Could not start Google sign-in.");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-20">
        <h1 className="h2 text-center">Sign in to ScheduleLink</h1>
        <p className="muted text-center mt-2">
          Use your Google account. We&apos;ll create your booking page automatically.
        </p>
        <div className="card p-6 mt-8 space-y-3">
          <button
            onClick={googleSignIn}
            disabled={loading}
            className="btn-secondary w-full justify-center gap-3 py-3 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.79 2.74v2.27h2.9c1.7-1.57 2.69-3.88 2.69-6.65z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.27c-.81.54-1.84.86-3.06.86-2.36 0-4.36-1.59-5.07-3.74H.96v2.34A8.99 8.99 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.93 10.67A5.41 5.41 0 0 1 3.64 9c0-.58.1-1.14.29-1.67V4.99H.96A8.99 8.99 0 0 0 0 9c0 1.45.35 2.82.96 4.01l2.97-2.34z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A8.99 8.99 0 0 0 .96 4.99l2.97 2.34C4.64 5.17 6.64 3.58 9 3.58z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
          {err && <div className="text-sm text-red-600">{err}</div>}
        </div>
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in you agree to our <a className="underline" href="/terms">Terms</a> and{" "}
          <a className="underline" href="/privacy">Privacy Policy</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
