import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="h1">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: April 30, 2026</p>
        <div className="prose mt-8 space-y-4 text-gray-700">
          <p>
            ScheduleLink (operated by Otion LLC) collects only what we need to make scheduling work:
            your email and name from Google or Microsoft when you sign in, calendar tokens you grant
            us so we can read availability and write events, and the bookings made through your link.
          </p>
          <p>
            We never sell your data. We never share attendee email or phone with third parties. Tokens are
            encrypted at rest. We use Stripe for payments, Google and Microsoft for calendar APIs, and
            Zoho Mail to send confirmations.
          </p>
          <p>
            You can export or delete your account at any time from the dashboard or by emailing
            <a className="text-primary-600" href="mailto:support@schedulelink.tech"> support@schedulelink.tech</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
