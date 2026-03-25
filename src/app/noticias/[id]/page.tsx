import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getNoticia } from "@/lib/api";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Zap,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const noticia = await getNoticia(parseInt(id, 10));
    return {
      title: noticia.titulo,
      description: noticia.resumen,
    };
  } catch {
    return { title: "Noticia" };
  }
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const idNum = parseInt(id, 10);

  if (isNaN(idNum)) notFound();

  let noticia;
  try {
    noticia = await getNoticia(idNum);
  } catch {
    notFound();
  }

  const date = new Date(noticia.publicadoEn).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const sentimientoConfig = {
    POSITIVO: {
      icon: TrendingUp,
      cls: "bg-sentiment-positive",
      label: "Positivo",
    },
    NEGATIVO: {
      icon: TrendingDown,
      cls: "bg-sentiment-negative",
      label: "Negativo",
    },
    NEUTRO: {
      icon: Minus,
      cls: "bg-sentiment-neutral",
      label: "Neutro",
    },
  };

  const impactoConfig = {
    FUERTE: { cls: "bg-impact-fuerte", label: "Impacto Fuerte" },
    MODERADO: { cls: "bg-impact-moderado", label: "Impacto Moderado" },
    DEBIL: { cls: "bg-impact-debil", label: "Impacto Débil" },
  };

  const sent = sentimientoConfig[noticia.sentimiento];
  const imp = impactoConfig[noticia.impacto];
  const SentIcon = sent.icon;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
          {/* Back */}
          <Link
            href="/noticias"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 text-muted-foreground gap-2")}
          >
            <ArrowLeft className="size-4" />
            Volver a noticias
          </Link>

          {/* Header */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className={cn("text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5", sent.cls)}>
                <SentIcon className="size-3" />
                {sent.label}
              </span>
              <span className={cn("text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5", imp.cls)}>
                <Zap className="size-3" />
                {imp.label}
              </span>
              <Badge variant="outline" className="text-xs">
                {noticia.fuente}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {noticia.titulo}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {date}
              </span>
              <a
                href={noticia.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                Ver nota original
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <Brain className="size-4" />
              Resumen generado por IA
            </div>
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
              {noticia.resumen}
            </p>
          </div>

          {/* AI Analysis cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Zap className="size-4 text-primary" />
                Razón del impacto
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {noticia.razonImpacto}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <SentIcon className="size-4 text-primary" />
                Razón del sentimiento
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {noticia.razonSentimiento}
              </p>
            </div>
          </div>

          {/* Full content if available */}
          {noticia.contenido && (
            <div className="space-y-3">
              <div className="h-px bg-border" />
              <h2 className="font-semibold text-foreground text-lg">Contenido completo</h2>
              <div className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed">
                {noticia.contenido.split("\n").map((p, i) =>
                  p.trim() ? (
                    <p key={i} className="mb-3">
                      {p}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Footer action */}
          <div className="pt-4 flex items-center justify-between border-t border-border">
            <Link
              href="/noticias"
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-muted-foreground")}
            >
              <ArrowLeft className="size-4" />
              Más noticias
            </Link>
            <a
              href={noticia.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "gap-2")}
            >
              Leer en fuente original
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
