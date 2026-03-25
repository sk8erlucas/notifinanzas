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
  title: {
    default: "Notifinanzas — El pulso del mercado argentino",
    template: "%s · Notifinanzas",
  },
  description:
    "Plataforma de noticias financieras del mercado argentino con análisis de impacto y sentimiento mediante inteligencia artificial.",
  keywords: ["finanzas", "Argentina", "mercado", "noticias", "economía", "inversiones"],
  authors: [{ name: "Notifinanzas" }],
  openGraph: {
    title: "Notifinanzas — El pulso del mercado argentino",
    description: "Noticias financieras argentinas con análisis de IA",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

