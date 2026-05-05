"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyGalleryImage } from "@/lib/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyDetailGalleryProps {
  title: string;
  status: string;
  featured: boolean;
  images: PropertyGalleryImage[];
}

export default function PropertyDetailGallery({
  title,
  status,
  featured,
  images,
}: PropertyDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <section aria-label={`Galeria de imagenes de ${title}`} className="space-y-4">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-white shadow-card">
        <Image
          src={activeImage.image_url}
          alt={activeImage.image_alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge>{status}</Badge>
          {featured && <Badge variant="secondary">Destacada</Badge>}
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur"
        >
          <span className="material-icons text-sm" aria-hidden="true">
            grid_view
          </span>
          {images.length} fotos
        </Button>
      </div>

      <div className="hide-scroll flex gap-4 overflow-x-auto pb-2 snap-x">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${image.image_url}-${image.sort_order}`}
              type="button"
              aria-label={`Mostrar imagen ${index + 1} de ${title}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-28 w-40 flex-none overflow-hidden rounded-lg bg-white transition-all snap-start sm:h-32 sm:w-48",
                isActive
                  ? "ring-2 ring-mosque ring-offset-2 ring-offset-background-light"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image.image_url}
                alt={image.image_alt}
                fill
                sizes="192px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
