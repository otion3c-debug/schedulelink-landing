import "./globals.css";
import type { Metadata } from "next";
import AnalyticsInit from "@/components/AnalyticsInit";

export const metadata: Metadata = {
  title: "ScheduleLink — Scheduling for professionals",
  description:
    "Multi-calendar scheduling with embeddable booking widgets. Connect Google or Microsoft, share your link, get bookings.",
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
