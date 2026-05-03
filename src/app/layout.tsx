import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WebVitals } from "@/components/WebVitals";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ElectraAI - Election Process Assistant",
  description: "An AI-powered assistant to understand the election process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <WebVitals />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>

    </html>
  );
}
