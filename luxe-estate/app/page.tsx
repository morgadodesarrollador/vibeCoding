import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCard from "./components/FeaturedCard";
import PropertyCard from "./components/PropertyCard";
import Pagination from "./components/Pagination";
import {
  getMarketProperties,
  getFeaturedProperties,
  PROPERTIES_PER_PAGE,
} from "../lib/properties";

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const q =
    typeof searchParams.q === "string" ? searchParams.q : "";
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "Todo";
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "Todo";
  const page =
    typeof searchParams.page === "string"
      ? Math.max(1, parseInt(searchParams.page, 10) || 1)
      : 1;

  // Params base para construir URLs de paginación (sin 'page')
  const baseParams: Record<string, string> = {};
  if (q) baseParams.q = q;
  if (category !== "Todo") baseParams.category = category;
  if (status !== "Todo") baseParams.status = status;

  // Fetch en paralelo desde Supabase
  const [featured, market] = await Promise.all([
    getFeaturedProperties({ status, type: category, q }),
    getMarketProperties({ page, status, type: category, q }),
  ]);

  const buildStatusUrl = (newStatus: string) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category !== "Todo") p.set("category", category);
    if (newStatus !== "Todo") p.set("status", newStatus);
    const str = p.toString();
    return str ? `/?${str}` : "/";
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />

        {/* Colecciones Destacadas */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark dark:text-white">
                  Colecciones Destacadas
                </h2>
                <p className="text-nordic-muted mt-1 text-sm">
                  Propiedades seleccionadas para el ojo exigente.
                </p>
              </div>
              <a
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
                href="#"
              >
                Ver todo{" "}
                <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((property) => (
                <FeaturedCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}

        {/* Nuevo en el Mercado */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark dark:text-white">
                Nuevo en el Mercado
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                Nuevas oportunidades añadidas esta semana.
              </p>
            </div>
            <div className="hidden md:flex bg-white dark:bg-white/5 p-1 rounded-lg">
              <Link
                href={buildStatusUrl("Todo")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  status === "Todo"
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark dark:hover:text-white"
                }`}
              >
                Todo
              </Link>
              <Link
                href={buildStatusUrl("Comprar")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  status === "Comprar"
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark dark:hover:text-white"
                }`}
              >
                Comprar
              </Link>
              <Link
                href={buildStatusUrl("Alquilar")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  status === "Alquilar"
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark dark:hover:text-white"
                }`}
              >
                Alquilar
              </Link>
            </div>
          </div>

          {market.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {market.data.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <span className="material-icons text-4xl text-nordic-muted/50 mb-2">
                search_off
              </span>
              <p className="text-nordic-dark dark:text-white font-medium">
                No se encontraron propiedades.
              </p>
              <p className="text-nordic-muted text-sm mt-1">
                Prueba a ajustar tus filtros de búsqueda.
              </p>
            </div>
          )}

          {/* Paginación server-side */}
          <Pagination
            currentPage={page}
            totalPages={market.totalPages}
            totalCount={market.count}
            perPage={PROPERTIES_PER_PAGE}
            baseParams={baseParams}
          />
        </section>
      </main>
    </>
  );
}
