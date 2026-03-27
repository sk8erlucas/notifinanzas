# 📰 NotiFinanzas

> Proyecto desarrollado para la **Hackathon de [midudev](https://midu.dev)** 🚀

NotiFinanzas es una plataforma de noticias financieras para Argentina que utiliza **Inteligencia Artificial** para analizar cada noticia, clasificar su impacto en el mercado y determinar el sentimiento económico — todo en tiempo real.

🌐 **Demo en producción:** [https://notifinanzas.sitemaster.com.ar/](https://notifinanzas.sitemaster.com.ar/)

---

## ✨ Características

- 🤖 **Análisis con IA** — Cada noticia es procesada automáticamente para extraer impacto y sentimiento del mercado.
- ⚡ **Impacto en tiempo real** — Clasificación automática en tres niveles: `FUERTE`, `MODERADO` o `DÉBIL`.
- 📈 **Sentimiento del mercado** — Indicador claro: `POSITIVO`, `NEGATIVO` o `NEUTRO`.
- 🔍 **Filtros avanzados** — Filtrá por sentimiento, nivel de impacto y fuente informativa.
- � **Multi-mercado** — Cobertura de Argentina y España, con más países en camino.
- 🔄 **Actualización continua** — Cache de 5 minutos con revalidación automática (ISR).
- 📱 **Diseño responsive** — Experiencia óptima en móvil, tablet y escritorio.

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.1 | Framework full-stack con App Router |
| [React](https://react.dev) | 19.2.4 | UI Library |
| [TypeScript](https://typescriptlang.org) | ^5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Estilos utilitarios |
| [shadcn/ui](https://ui.shadcn.com) | ^4 | Componentes de UI accesibles |
| [Lucide React](https://lucide.dev) | ^1.7 | Iconografía |
| [Base UI](https://base-ui.com) | ^1.3 | Componentes primitivos sin estilos |

---

## 🔗 Repositorios

| Repo | Descripción |
|---|---|
| [sk8erlucas/notifinanzas](https://github.com/sk8erlucas/notifinanzas) | Frontend — Next.js |
| [sk8erlucas/api-noticias](https://github.com/sk8erlucas/api-noticias) | Backend — API de noticias con análisis IA |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # Home — todas las noticias con filtros y paginación
│   ├── layout.tsx            # Layout global
│   ├── globals.css           # Estilos globales
│   ├── noticias/
│   │   ├── page.tsx          # Listado completo de noticias con filtros
│   │   └── [id]/
│   │       └── page.tsx      # Detalle de una noticia
│   └── proximamente/
│       └── page.tsx          # Página de funciones próximas
├── components/
│   ├── hero.tsx              # Hero section con marquee y estadísticas
│   ├── navbar.tsx            # Barra de navegación + selector de país
│   ├── news-card.tsx         # Tarjeta de noticia con badges de IA
│   ├── filters.tsx           # Filtros por sentimiento, impacto y fuente
│   ├── country-selector.tsx  # Datos de países/mercados
│   ├── pagination.tsx        # Paginación
│   └── ui/                   # Componentes base reutilizables
└── lib/
    ├── api.ts                # Cliente HTTP para el backend de noticias
    ├── button-variants.ts    # Variantes de botones con CVA
    └── utils.ts              # Utilidades (cn, etc.)
```

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Node.js >= 18
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sk8erlucas/notifinanzas.git
cd notifinanzas

# Instalar dependencias
npm install
```

### Variables de entorno

Creá un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
API_URL=https://tu-backend-api.com
```

> Esta variable apunta al backend ([api-noticias](https://github.com/sk8erlucas/api-noticias)) que provee y procesa las noticias financieras con IA.

### Ejecutar en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm run start
```

---

## 🗺️ Rutas de la aplicación

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Dynamic (ISR 5min) | Home con todas las noticias, filtros y paginación |
| `/noticias` | Dynamic (SSR) | Listado completo con filtros y paginación — Argentina |
| `/noticias/[id]` | Dynamic (SSR) | Detalle completo de una noticia |
| `/espana` | Dynamic (SSR) | Listado completo con filtros y paginación — España |
| `/proximamente` | Static | Página de mercados próximos |

---

## 🤖 IA aplicada a las noticias

Cada noticia cuenta con dos análisis generados por inteligencia artificial:

### Impacto en el mercado
| Nivel | Descripción |
|---|---|
| `FUERTE` | La noticia tiene alto potencial de mover el mercado |
| `MODERADO` | Impacto relevante pero acotado |
| `DÉBIL` | Información de contexto, bajo impacto directo |

### Sentimiento económico
| Sentimiento | Descripción |
|---|---|
| `POSITIVO` | Señal favorable para inversores y el mercado |
| `NEGATIVO` | Alerta de condiciones adversas |
| `NEUTRO` | Informativo, sin sesgo claro |

---

## 📸 Capturas

### Hero — Argentina
![Header NotiFinanzas Argentina](https://notifinanzas.sitemaster.com.ar/screenshots/header_arg.png)

### Listado de noticias — Argentina
![Noticias financieras Argentina](https://notifinanzas.sitemaster.com.ar/screenshots/noticias_arg.png)

---

## 🌍 Mercados disponibles

| País | Estado | Ruta |
|---|---|---|
| 🇦🇷 Argentina | ✅ Activo | `/noticias` |
| 🇪🇸 España | ✅ Activo | `/espana` |
| 🇧🇷 Brasil | 🔜 Próximamente | — |
| 🇨🇱 Chile | 🔜 Próximamente | — |
| 🇲🇽 México | 🔜 Próximamente | — |
| 🇨🇴 Colombia | 🔜 Próximamente | — |
| 🇺🇸 Estados Unidos | 🔜 Próximamente | — |
| 🇵🇪 Perú | 🔜 Próximamente | — |
| 🇺🇾 Uruguay | 🔜 Próximamente | — |

---

## ☁️ Despliegue

El proyecto fue desplegado en producción utilizando **[CubePath](https://cubepath.com/)** como proveedor de infraestructura cloud, con **[Dokploy](https://dokploy.com/)** como plataforma de despliegue continuo.

- 🌐 **Frontend:** [https://notifinanzas.sitemaster.com.ar/](https://notifinanzas.sitemaster.com.ar/)
- 🔧 **Backend API:** [https://github.com/sk8erlucas/api-noticias](https://github.com/sk8erlucas/api-noticias)

---

## 🏆 Hackathon de midudev

Este proyecto fue creado para participar en la **Hackathon de [midudev](https://midu.dev)**, con el objetivo de construir una herramienta útil e innovadora para el ecosistema hispanohablante usando tecnologías modernas de desarrollo web.

---

## 👤 Autor

**Lucas** — [@sk8erlucas](https://github.com/sk8erlucas)

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia [MIT](LICENSE).
