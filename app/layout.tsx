import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match Point AI — Gestion de Clubes de Padel",
  description: "Match Point AI — Automatiza reservas, socios y analytics para clubes de padel en Mexico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-3 flex items-center justify-between">
    <a href="/" className="font-bold text-white text-sm">MatchPoint AI</a>
    <div className="flex gap-4 text-xs text-gray-400 flex-wrap">
      <a href="/product" className="hover:text-white transition-colors">Producto</a>
      <a href="/pricing" className="hover:text-white transition-colors">Precios</a>
      <a href="/core" className="hover:text-white transition-colors">Core AI</a>
      <a href="/research" className="hover:text-white transition-colors">Research</a>
      <a href="/marketing" className="hover:text-white transition-colors">Marketing</a>
      <a href="/chat" className="hover:text-white transition-colors">Chat</a>
      <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
      <a href="/demo" className="hover:text-emerald-400 transition-colors font-semibold">Demo</a>
      <a href="/docs" className="hover:text-white transition-colors">Docs</a>
    </div>
  </nav>
  {children}
</body>
    </html>
  );
}
