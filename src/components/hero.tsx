"use client";

import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/lib/button-variants";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const teamAvatars = [
  {
    initials: "AR",
    src: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=100&h=100&fit=crop",
  },
  {
    initials: "MK",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
  {
    initials: "PL",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    initials: "SN",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop",
  },
  {
    initials: "JV",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

const stats = [
  { emoji: "📰", label: "NOTICIAS ANALIZADAS POR IA", value: "500+" },
  { emoji: "📈", label: "FUENTES FINANCIERAS ACTIVAS", value: "12" },
  { emoji: "🇦🇷", label: "MERCADO CUBIERTO", value: "ARGENTINA" },
  { emoji: "⚡", label: "ACTUALIZACIÓN DIARIA", value: "24/7" },
  { emoji: "🤖", label: "ANÁLISIS CON IA", value: "100%" },
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
          <AvatarImage alt={`Analista ${i + 1}`} src={member.src} />
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
            {member.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <div
        className="size-12 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center text-primary text-xs font-bold"
        style={{ zIndex: 0 }}
      >
        +8
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

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full flex-col items-start justify-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop)",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        {/* Brand overlay for top section */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 w-full">
        <StatsMarquee />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16 lg:pb-32">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
          {/* Left: headline + CTA */}
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
              <span className="text-primary">argentino</span>
            </h1>

            {/* Tagline */}
            <p className="text-white/70 text-lg max-w-md">
              Análisis con IA en tiempo real. Impacto, sentimiento y tendencias
              del mercado financiero argentino.
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/noticias"
                className={cn(
                  buttonVariants(),
                  "rounded-none py-6 pr-0 font-semibold text-background text-lg bg-primary hover:bg-primary/90 border-0"
                )}
              >
                Ver Noticias
                <span className="border-background/30 border-l p-4 ml-2">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <TrendingUp className="size-4 text-primary" />
                <span>Actualizado hoy</span>
              </div>
            </div>
          </div>

          {/* Right: descriptor */}
          <div className="w-full sm:w-2/5">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                En vivo — Mercado AR
              </div>
              <p className="text-base text-white/80 italic sm:text-lg">
                Inteligencia artificial analiza cada noticia para determinar su
                impacto en el mercado: <strong className="text-white">FUERTE</strong>,{" "}
                <strong className="text-white">MODERADO</strong> o{" "}
                <strong className="text-white">DÉBIL</strong>.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="text-center p-2 rounded-lg bg-[oklch(0.65_0.17_155/0.15)] border border-[oklch(0.65_0.17_155/0.3)]">
                  <span className="block text-[oklch(0.72_0.17_155)] text-xs font-bold uppercase">Positivo</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-[oklch(0.65_0.22_27/0.15)] border border-[oklch(0.65_0.22_27/0.3)]">
                  <span className="block text-[oklch(0.72_0.22_27)] text-xs font-bold uppercase">Negativo</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-[oklch(0.78_0.15_75/0.15)] border border-[oklch(0.78_0.15_75/0.3)]">
                  <span className="block text-[oklch(0.80_0.15_75)] text-xs font-bold uppercase">Neutro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
