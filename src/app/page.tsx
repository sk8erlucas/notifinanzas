import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, Brain } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { CountrySelector } from "@/components/country-selector";
import { NewsCard } from "@/components/news-card";
import { getNoticias } from "@/lib/api";

export const revalidate = 300;

async function FeaturedNews() {
  try {
    const data = await getNoticias({ limit: 6, page: 1 });
    if (data.data.length === 0) return null;

    return (
      <section className="py-16 px-4 sm:px-8 lg:px-16 border-b border-border">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Argentina 🇦🇷
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Últimas noticias
              </h2>
            </div>
            <Link
              href="/noticias"
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-muted-foreground hidden sm:flex")}
            >
              Ver todas
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.data.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>

          <div className="sm:hidden text-center">
            <Link href="/noticias" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
              Ver todas las noticias
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}

function FeaturesBanner() {
  const features = [
    {
      icon: Brain,
      title: "Análisis con IA",
      desc: "Cada noticia es procesada por IA para extraer impacto y sentimiento del mercado.",
    },
    {
      icon: Zap,
      title: "Impacto en tiempo real",
      desc: "Clasificación automática: FUERTE, MODERADO o DÉBIL según el contexto económico.",
    },
    {
      icon: TrendingUp,
      title: "Sentimiento del mercado",
      desc: "POSITIVO, NEGATIVO o NEUTRO: entendé rápido cómo afecta cada novedad.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-card/30 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{feat.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesBanner />
        <FeaturedNews />
        <CountrySelector />

        {/* Footer CTA */}
        <section className="py-20 px-4 text-center border-t border-border brand-gradient">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Siempre informado,{" "}
              <span className="text-primary">siempre adelante</span>
            </h2>
            <p className="text-muted-foreground">
              El pulso del mercado argentino, procesado con inteligencia artificial, disponible las 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/noticias" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                Explorar noticias
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/proximamente" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Registrarse gratis
              </Link>
            </div>
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
              <span className="hidden sm:inline">— El pulso del mercado argentino</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/noticias" className="hover:text-foreground transition-colors">
                Noticias
              </Link>
              <Link href="/proximamente" className="hover:text-foreground transition-colors">
                Próximamente
              </Link>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}


