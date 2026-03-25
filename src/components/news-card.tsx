import Link from "next/link";
import { ExternalLink, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Noticia } from "@/lib/api";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  noticia: Noticia;
}

function SentimientoBadge({ sentimiento }: { sentimiento: Noticia["sentimiento"] }) {
  const map = {
    POSITIVO: "bg-sentiment-positive",
    NEGATIVO: "bg-sentiment-negative",
    NEUTRO: "bg-sentiment-neutral",
  };
  const labels = {
    POSITIVO: "📈 Positivo",
    NEGATIVO: "📉 Negativo",
    NEUTRO: "➡️ Neutro",
  };
  return (
    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", map[sentimiento])}>
      {labels[sentimiento]}
    </span>
  );
}

function ImpactoBadge({ impacto }: { impacto: Noticia["impacto"] }) {
  const map = {
    FUERTE: "bg-impact-fuerte",
    MODERADO: "bg-impact-moderado",
    DEBIL: "bg-impact-debil",
  };
  const labels = {
    FUERTE: "⚡ Fuerte",
    MODERADO: "〰 Moderado",
    DEBIL: "· Débil",
  };
  return (
    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", map[impacto])}>
      {labels[impacto]}
    </span>
  );
}

export function NewsCard({ noticia }: NewsCardProps) {
  const date = new Date(noticia.publicadoEn).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col h-full bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
      <CardContent className="flex-1 p-5 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <SentimientoBadge sentimiento={noticia.sentimiento} />
          <ImpactoBadge impacto={noticia.impacto} />
          <Badge variant="outline" className="text-xs text-muted-foreground border-border">
            {noticia.fuente}
          </Badge>
        </div>

        {/* Title */}
        <Link href={`/noticias/${noticia.id}`}>
          <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
            {noticia.titulo}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {noticia.resumen}
        </p>

        {/* Impact reason — subtle */}
        {noticia.razonImpacto && (
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground/70 bg-muted/40 rounded-lg p-2.5">
            <Zap className="size-3 shrink-0 mt-0.5 text-primary/60" />
            <span className="line-clamp-2">{noticia.razonImpacto}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 py-3 border-t border-border flex items-center justify-between">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {date}
        </div>

        {/* External link */}
        <a
          href={noticia.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <span>Fuente</span>
          <ExternalLink className="size-3" />
        </a>
      </CardFooter>
    </Card>
  );
}
