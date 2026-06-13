import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  title: "LearningOS — Student Dashboard",
  description: "A premium student learning dashboard built with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
          <Sidebar />
          <MobileNav />
          <main className="flex-1 overflow-auto relative md:pt-0 pt-16">
            <div
              className="absolute inset-0 pointer-events-none -z-10 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at top right, hsl(262 83% 58% / 0.1), transparent 60%)",
              }}
            />
            <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen pb-24">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
