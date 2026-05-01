import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCards from "@/components/PricingCards";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <h1 className="h1">Scheduling that just works.</h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Connect Google or Microsoft Calendar, share your booking link, embed it on your site.
            30-second setup. No more back-and-forth emails.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/login" className="btn-primary px-6 py-3 text-base">Get started — free</Link>
            <Link href="/pricing" className="btn-secondary px-6 py-3 text-base">See pricing</Link>
          </div>
          <p className="mt-3 text-sm text-gray-500">5 free bookings per month. No credit card required.</p>
        </section>

        <section id="features" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="h2 text-center">Everything you need to take bookings</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Multi-calendar support",
                body: "Connect Google Calendar and Microsoft Outlook. We check your real availability and write events back automatically.",
              },
              {
                title: "Embeddable widget",
                body: "Drop a single <script> tag on your site and your booking widget appears. Customize colors, header, footer.",
              },
              {
                title: "30-second setup",
                body: "Sign in with Google, set your hours, share your link. That's it. No configuration sprawl.",
              },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <h3 className="font-semibold text-lg text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="h2 text-center">Simple pricing.</h2>
          <p className="mt-2 text-center text-gray-600">Start free. Upgrade when you outgrow it.</p>
          <div className="mt-10">
            <PricingCards />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
