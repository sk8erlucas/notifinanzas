const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not set");
}

export interface Noticia {
  id: number;
  titulo: string;
  link: string;
  resumen: string;
  impacto: "FUERTE" | "MODERADO" | "DEBIL";
  sentimiento: "POSITIVO" | "NEGATIVO" | "NEUTRO";
  razonImpacto: string;
  razonSentimiento: string;
  fuente: string;
  publicadoEn: string;
  procesadoEn: string;
  createdAt: string;
  contenido?: string;
}

export interface NoticiasMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NoticiasResponse {
  data: Noticia[];
  meta: NoticiasMeta;
}

export interface NoticiasParams {
  page?: number;
  limit?: number;
  sentimiento?: string;
  impacto?: string;
  fuente?: string;
}

export async function getNoticias(
  params: NoticiasParams = {}
): Promise<NoticiasResponse> {
  const url = new URL(`${API_URL}/api/noticias`);
  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.sentimiento) url.searchParams.set("sentimiento", params.sentimiento);
  if (params.impacto) url.searchParams.set("impacto", params.impacto);
  if (params.fuente) url.searchParams.set("fuente", params.fuente);

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) {
    throw new Error(`Error fetching noticias: ${res.status}`);
  }

  return res.json();
}

export async function getNoticia(id: number): Promise<Noticia> {
  const res = await fetch(`${API_URL}/api/noticias/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching noticia ${id}: ${res.status}`);
  }

  return res.json();
}
