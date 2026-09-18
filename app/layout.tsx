import "./globals.css";
import type { Metadata } from "next";
import AnalyticsInit from "@/components/AnalyticsInit";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.schedulelink.tech"),
  title: "ScheduleLink — Scheduling for professionals",
  description:
    "Multi-calendar scheduling with embeddable booking widgets. Connect Google or Microsoft, share your link, get bookings.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ScheduleLink",
    title: "ScheduleLink — Scheduling for professionals",
    description:
      "Multi-calendar scheduling with embeddable booking widgets. Connect Google or Microsoft, share your link, get bookings.",
    url: "https://www.schedulelink.tech/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScheduleLink — scheduling for professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScheduleLink — Scheduling for professionals",
    description:
      "Multi-calendar scheduling with embeddable booking widgets. Connect Google or Microsoft, share your link, get bookings.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
