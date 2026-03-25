import Link from "next/link";
import { TrendingUp, Clock, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Próximamente",
};

export default function ProximamentePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.70 0.18 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.70 0.18 195) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="size-6 text-background" />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            <span className="text-foreground">Noti</span>
            <span className="text-primary">finanzas</span>
          </span>
        </Link>

        {/* Main message */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            <Clock className="size-4 animate-pulse" />
            Muy pronto disponible
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
            Próximamente
          </h1>

          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Estamos trabajando para traerte esta funcionalidad. Registrate para
            ser de los primeros en acceder.
          </p>
        </div>

        {/* Features coming */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            {
              emoji: "🌎",
              title: "Más mercados",
              desc: "Brasil, Chile, México y más países de Latinoamérica",
            },
            {
              emoji: "❤️",
              title: "Favoritos",
              desc: "Guardá las noticias que te interesan para leer después",
            },
            {
              emoji: "🔔",
              title: "Alertas",
              desc: "Notificaciones personalizadas por impacto o sentimiento",
            },
          ].map((feat) => (
            <div
              key={feat.title}
              className="glass-card rounded-xl p-4 space-y-2"
            >
              <span className="text-2xl">{feat.emoji}</span>
              <h3 className="font-semibold text-foreground text-sm">{feat.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/proximamente" className={buttonVariants()}>
            Notificarme del lanzamiento
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-muted-foreground")}
          >
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
