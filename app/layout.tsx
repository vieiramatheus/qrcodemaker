import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Info Maker",
  description: "Store information securely and share it using QR codes."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">{children}</div>
      </body>
    </html>
  );
}
