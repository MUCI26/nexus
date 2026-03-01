import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus - Dein Produktivitätszentrum",
  description: "Notizen, Aufgaben und Gedanken an einem Ort",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#F8FAFC] flex">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main className="flex-1 p-4 lg:p-8 overflow-auto pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
