"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

interface BookingInfo {
  id: string;
  attendee_name: string;
  attendee_email: string;
  start_time: string;
  duration_minutes: number;
  timezone: string | null;
  status: string;
  start_time_utc: string | null;
}

function formatWhen(iso: string, tz: string | null): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz || undefined,
    });
  } catch {
    return iso;
  }
}

export default function BookingCancelPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const p = await params;
        if (cancelled) return;
        setId(p.id);
        const b = await api<BookingInfo>(`/public/bookings/${p.id}`);
        if (cancelled) return;
        setBooking(b);
      } catch (e: any) {
        if (!cancelled) setError(e?.status === 404 ? "We couldn't find that booking." : "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);

  async function handleCancel() {
    if (!id) return;
    setCancelling(true);
    try {
      await api(`/public/bookings/${id}/cancel`, {
        method: "POST",
        body: JSON.stringify({ cancellation_reason: "Cancelled via confirmation email link." }),
      });
      setDone(true);
    } catch (e: any) {
      setError(e?.body?.detail || "We couldn't cancel this booking. It may already be cancelled.");
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-xl mx-auto px-6 py-24 text-center text-gray-500">Loading…</main>
        <Footer />
      </>
    );
  }

  if (done) {
    return (
      <>
        <Header />
        <main className="max-w-xl mx-auto px-6 py-12">
          <div className="card p-8 text-center">
            <div className="text-3xl">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">Booking cancelled</h1>
            <p className="text-sm text-gray-600 mt-2">Your appointment has been cancelled.</p>
            <p className="mt-6">
              <a href="https://www.schedulelink.tech" className="text-blue-600 underline">
                Back to ScheduleLink
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="max-w-xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Booking not found</h1>
          <p className="mt-3 text-gray-600">{error}</p>
          <p className="mt-6">
            <a href="https://www.schedulelink.tech" className="text-blue-600 underline">
              Back to ScheduleLink
            </a>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const alreadyCancelled = booking?.status !== "confirmed";

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="card p-8">
          <div className="text-3xl">🛑</div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            Cancel this booking?
          </h1>
          {booking && (
            <p className="text-sm text-gray-600 mt-2">
              {formatWhen(booking.start_time_utc ?? booking.start_time, booking.timezone)} · {booking.duration_minutes} minutes
            </p>
          )}

          {alreadyCancelled ? (
            <p className="mt-6 text-sm text-gray-600">This booking is no longer active.</p>
          ) : (
            <>
              <p className="mt-6 text-sm text-gray-600">
                This will remove the appointment from the calendar. This can&apos;t be undone.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelling ? "Cancelling…" : "Cancel my booking"}
                </button>
                <a
                  href="https://www.schedulelink.tech"
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Keep it
                </a>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
