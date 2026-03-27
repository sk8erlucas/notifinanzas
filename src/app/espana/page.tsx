import { Suspense } from "react";
import type { Metadata } from "next";
import { TrendingUp, Newspaper } from "lucide-react";
import Link from "next/link";
import { getNoticias } from "@/lib/api";
import { NewsCard } from "@/components/news-card";
import { FilterBar, FilterBarSkeleton } from "@/components/filters";
import { Pagination } from "@/components/pagination";
import Navbar from "@/components/navbar";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "España — NotiFinanzas",
  description: "Noticias financieras españolas analizadas con inteligencia artificial. Impacto, sentimiento y tendencias del mercado español.",
};

export const revalidate = 300;

const stats = [
  { emoji: "📰", label: "NOTICIAS ANALIZADAS POR IA", value: "500+" },
  { emoji: "📈", label: "FUENTES FINANCIERAS ACTIVAS", value: "12" },
  { emoji: "🇪🇸", label: "MERCADO CUBIERTO", value: "ESPAÑA" },
  { emoji: "⚡", label: "ACTUALIZACIÓN DIARIA", value: "24/7" },
  { emoji: "🤖", label: "ANÁLISIS CON IA", value: "100%" },
];

const teamAvatars = [
  {
    initials: "ML",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
  },
  {
    initials: "CR",
    src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop",
  },
  {
    initials: "JM",
    src: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
  },
  {
    initials: "IS",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
];

function AvatarStack() {
  return (
    <div className="flex -space-x-3">
      {teamAvatars.map((member, i) => (
        <Avatar
          className="size-12 border-2 border-primary/40 bg-muted"
          key={member.initials}
          style={{ zIndex: teamAvatars.length - i }}
        >
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
            {member.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <div
        className="size-12 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center text-primary text-xs font-bold"
        style={{ zIndex: 0 }}
      >
        +6
      </div>
    </div>
  );
}

function StatsMarquee() {
  return (
    <Marquee
      className="border-white/10 border-y bg-black/30 py-2 backdrop-blur-sm [--duration:30s] [--gap:2rem]"
      pauseOnHover
      repeat={4}
    >
      {stats.map((stat) => (
        <div
          className="flex items-center gap-3 whitespace-nowrap"
          key={stat.label}
        >
          <span className="font-bold font-mono text-primary text-sm tracking-wide">
            {stat.value}
          </span>
          <span className="font-medium font-mono text-sm text-white/70 uppercase tracking-[0.15em]">
            {stat.label}
          </span>
          <span className="text-base">{stat.emoji}</span>
          <span className="text-white/20 mx-2">◆</span>
        </div>
      ))}
    </Marquee>
  );
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sentimiento?: string;
    impacto?: string;
    fuente?: string;
  }>;
}

export default async function EspanaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const sentimiento = params.sentimiento;
  const impacto = params.impacto;
  const fuente = params.fuente;

  let data;
  try {
    const raw = await getNoticias({ page, limit: 12, sentimiento, impacto, fuente, pais: "ES" });
    const filtered = raw.data.filter((n) => n.resumen && n.resumen.trim().length > 0);
    data = { ...raw, data: filtered };
  } catch {
    data = null;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex h-screen w-full flex-col items-start justify-end">
          {/* Background — Sagrada Família / Madrid skyline */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
          </div>

          {/* Marquee */}
          <div className="relative z-10 w-full">
            <StatsMarquee />
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16 lg:pb-32">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
              {/* Left */}
              <div className="w-full space-y-6 sm:w-3/5">
                {/* Brand badge */}
                <div className="flex items-center gap-2">
                  <AvatarStack />
                  <span className="text-white/60 text-sm ml-2">
                    Analistas e inversores confían en Notifinanzas
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-bold text-4xl text-white leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Noticias que{" "}
                  <span className="text-primary">mueven</span>
                  <br />
                  el mercado{" "}
                  <span className="text-primary">español</span>
                </h1>

                {/* Tagline */}
                <p className="text-white/70 text-lg max-w-md">
                  Análisis con IA en tiempo real. Impacto, sentimiento y tendencias
                  del mercado financiero español.
                </p>

                {/* CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="#noticias"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "gap-2"
                    )}
                  >
                    Ver noticias
                    <ArrowRight className="size-4" />
                  </Link>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <TrendingUp className="size-4 text-primary" />
                    <span>Actualizado hoy</span>
                  </div>
                </div>
              </div>

              {/* Right: live badge */}
              <div className="sm:w-2/5 flex sm:justify-end">
                <div className="inline-flex flex-col gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    EN VIVO — ESPAÑA
                  </div>
                  <p className="text-white/80 text-sm">
                    Noticias del mercado ibérico analizadas con IA
                  </p>
                  <div className="flex items-center gap-2 text-white/50 text-xs mt-1">
                    <span>🏛️ Ibex 35</span>
                    <span>·</span>
                    <span>🏦 Banco de España</span>
                    <span>·</span>
                    <span>📊 BME</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News section */}
        <section id="noticias" className="py-12 px-4 sm:px-8 lg:px-16 border-b border-border">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Newspaper className="size-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  España 🇪🇸
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  Noticias financieras
                </h2>
              </div>
            </div>

            {data ? (
              <>
                <Suspense fallback={<FilterBarSkeleton />}>
                  <FilterBar
                    currentSentimiento={sentimiento}
                    currentImpacto={impacto}
                    currentFuente={fuente}
                    total={data.meta.total}
                  />
                </Suspense>

                {data.data.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Newspaper className="size-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No hay noticias de España todavía</p>
                    <p className="text-sm mt-1">Pronto se agregarán fuentes españolas</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.data.map((noticia) => (
                      <NewsCard key={noticia.id} noticia={noticia} />
                    ))}
                  </div>
                )}

                <div className="pt-4">
                  <Suspense>
                    <Pagination
                      currentPage={data.meta.page}
                      totalPages={data.meta.totalPages}
                    />
                  </Suspense>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <Newspaper className="size-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No se pudieron cargar las noticias</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <TrendingUp className="size-3.5 text-background" />
              </div>
              <span className="font-semibold">
                <span className="text-foreground">Noti</span>
                <span className="text-primary">finanzas</span>
              </span>
              <span className="hidden sm:inline">— El pulso del mercado español</span>
            </div>
            <span>© 2026 NotiFinanzas</span>
          </div>
        </footer>
      </main>
    </>
  );
}
