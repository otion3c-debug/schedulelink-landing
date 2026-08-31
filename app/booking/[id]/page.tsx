import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

interface BookingInfo {
  id: string;
  attendee_name: string;
  attendee_email: string;
  attendee_phone: string | null;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  timezone: string | null;
  status: string;
  notes: string | null;
  created_at: string | null;
  start_time_utc: string | null;
  end_time_utc: string | null;
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

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let booking: BookingInfo | null = null;
  let error: string | null = null;

  try {
    booking = await api<BookingInfo>(`/public/bookings/${id}`);
  } catch (e: any) {
    error = e?.status === 404 ? "We couldn't find that booking." : "Something went wrong loading this booking.";
  }

  if (error || !booking) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Booking not found</h1>
          <p className="mt-3 text-gray-600">{error ?? "This booking may have been removed."}</p>
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

  const cancelled = booking.status === "cancelled";

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="card p-8">
          <div className="text-3xl">{cancelled ? "🚫" : "✅"}</div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            {cancelled ? "This booking was cancelled" : `Hi ${booking.attendee_name}, your booking is confirmed`}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {cancelled
              ? "This appointment is no longer active."
              : `A confirmation was sent to ${booking.attendee_email}.`}
          </p>

          <div className="mt-8 grid gap-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">When</span>
              <span className="font-medium text-gray-900">{formatWhen(booking.start_time_utc ?? booking.start_time, booking.timezone)}</span>
            </div>
            {booking.duration_minutes ? (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-900">{booking.duration_minutes} minutes</span>
              </div>
            ) : null}
            {booking.attendee_phone ? (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-900">{booking.attendee_phone}</span>
              </div>
            ) : null}
            {booking.notes ? (
              <div className="py-2 border-b border-gray-100">
                <span className="text-gray-500">Notes</span>
                <p className="font-medium text-gray-900 mt-1 whitespace-pre-wrap">{booking.notes}</p>
              </div>
            ) : null}
          </div>

          {!cancelled && (
            <p className="mt-8 text-sm text-gray-600">
              To cancel or reschedule, use the link in your confirmation email.
            </p>
          )}

          <div className="mt-8">
            <a
              href="https://www.schedulelink.tech"
              className="inline-block px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            >
              Back to ScheduleLink
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
