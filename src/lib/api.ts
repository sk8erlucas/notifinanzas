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
  pais: string;
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
  pais?: string;
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
  if (params.pais) url.searchParams.set("pais", params.pais);

  console.log("[getNoticias] Fetching:", url.toString());

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      next: { revalidate: 300 }, // cache 5 min
    });
  } catch (err) {
    console.error("[getNoticias] Network error:", err);
    throw err;
  }

  console.log("[getNoticias] Response status:", res.status, res.statusText);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[getNoticias] Error body:", body);
    throw new Error(`Error fetching noticias: ${res.status}`);
  }

  const json = await res.json();
  console.log("[getNoticias] Total noticias recibidas:", json?.meta?.total, "| En esta página:", json?.data?.length);
  return json;
}

export async function getNoticia(id: number): Promise<Noticia> {
  const url = `${API_URL}/api/noticias/${id}`;
  console.log("[getNoticia] Fetching:", url);

  let res: Response;
  try {
    res = await fetch(url, { next: { revalidate: 3600 } });
  } catch (err) {
    console.error("[getNoticia] Network error:", err);
    throw err;
  }

  console.log("[getNoticia] Response status:", res.status, res.statusText);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[getNoticia] Error body:", body);
    throw new Error(`Error fetching noticia ${id}: ${res.status}`);
  }

  return res.json();
}
