"use client";

import Link from "next/link";
import { Property } from "../../lib/properties";
import { useFavorites } from "../context/FavoritesContext";

interface FeaturedCardProps {
  property: Property;
}

export default function FeaturedCard({ property }: FeaturedCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <article className="group relative rounded-2xl overflow-hidden h-[420px] shadow-xl cursor-pointer">
      <Link
        href={`/propiedades/${property.slug}`}
        className="block h-full"
        aria-label={`Ver detalle de ${property.title}`}
      >
        {/* Imagen de fondo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={property.image_alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={property.image}
        />

        {/* Gradiente superpuesto para garantizar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

        {/* Etiquetas superiores */}
        <div className="absolute top-5 inset-x-5 flex justify-between items-start z-10">
          {property.status && (
            <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
              {property.status}
            </div>
          )}
        </div>

        {/* Contenido inferior (Glassmorphism) */}
        <div className="absolute bottom-5 inset-x-5 z-10 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-white/80 text-sm flex items-center gap-1.5 mb-1.5 font-medium tracking-wide">
                  <span className="material-icons text-[16px]">place</span>
                  {property.location}
                </p>
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {property.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="block text-white/80 text-xs uppercase tracking-wider mb-1">Precio</span>
                <span className="text-xl font-bold text-white">
                  {property.price}
                </span>
              </div>
            </div>

            {/* Detalles */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/20 text-white">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="material-icons text-white/80">king_bed</span>
                {property.beds} Hab
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="material-icons text-white/80">bathtub</span>
                {property.baths} Baños
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="material-icons text-white/80">square_foot</span>
                {property.area}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(property.id);
        }}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-mosque transition-all shadow-sm"
      >
        <span className="material-icons text-xl">
          {favorite ? "favorite" : "favorite_border"}
        </span>
      </button>
    </article>
  );
}
