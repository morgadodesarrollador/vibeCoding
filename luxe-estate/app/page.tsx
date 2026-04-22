import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCard from "./components/FeaturedCard";
import PropertyCard from "./components/PropertyCard";
import { featuredProperties, marketProperties } from "./data/mockProperties";
import Link from "next/link";

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const q = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : '';
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'Todo';
  const status = typeof searchParams.status === 'string' ? searchParams.status : 'Todo';
  
  const filterProperty = (p: any) => {
    if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) {
      return false;
    }
    if (category !== 'Todo' && p.type !== category) {
      return false;
    }
    if (status === 'Comprar' && p.status !== 'EN VENTA' && p.status !== 'Exclusivo' && p.status !== 'Novedad') {
      return false;
    }
    if (status === 'Alquilar' && p.status !== 'EN ALQUILER') {
      return false;
    }
    return true;
  };

  const filteredFeatured = featuredProperties.filter(filterProperty);
  const filteredMarket = marketProperties.filter(filterProperty);

  const buildStatusUrl = (newStatus: string) => {
    const urlParams = new URLSearchParams();
    if (q) urlParams.set('q', q);
    if (category !== 'Todo') urlParams.set('category', category);
    if (newStatus !== 'Todo') urlParams.set('status', newStatus);
    return `/?${urlParams.toString()}`;
  };

  return (
    <>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />
        
        {filteredFeatured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark dark:text-white">Colecciones Destacadas</h2>
                <p className="text-nordic-muted mt-1 text-sm">Propiedades seleccionadas para el ojo exigente.</p>
              </div>
              <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
                Ver todo <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredFeatured.map(property => (
                <FeaturedCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}
        
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark dark:text-white">Nuevo en el Mercado</h2>
              <p className="text-nordic-muted mt-1 text-sm">Nuevas oportunidades añadidas esta semana.</p>
            </div>
            <div className="hidden md:flex bg-white dark:bg-white/5 p-1 rounded-lg">
              <Link href={buildStatusUrl('Todo')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${status === 'Todo' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-muted hover:text-nordic-dark dark:hover:text-white'}`}>Todo</Link>
              <Link href={buildStatusUrl('Comprar')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${status === 'Comprar' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-muted hover:text-nordic-dark dark:hover:text-white'}`}>Comprar</Link>
              <Link href={buildStatusUrl('Alquilar')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${status === 'Alquilar' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-muted hover:text-nordic-dark dark:hover:text-white'}`}>Alquilar</Link>
            </div>
          </div>
          
          {filteredMarket.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMarket.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <span className="material-icons text-4xl text-nordic-muted/50 mb-2">search_off</span>
              <p className="text-nordic-dark dark:text-white font-medium">No se encontraron propiedades.</p>
              <p className="text-nordic-muted text-sm mt-1">Prueba a ajustar tus filtros de búsqueda.</p>
            </div>
          )}
          
          {filteredMarket.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 hover:border-mosque hover:text-mosque text-nordic-dark dark:text-white font-medium rounded-lg transition-all hover:shadow-md">
                Cargar más propiedades
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
