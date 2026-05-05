"use client";

import { useEffect, useRef } from "react";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

export default function PropertyMap({ latitude, longitude, title }: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    async function loadMap() {
      const L = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([latitude, longitude], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: '<div class="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-mosque text-white shadow-lg"><span class="material-icons text-lg">home</span></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      L.marker([latitude, longitude], { icon }).addTo(map).bindPopup(title);
    }

    loadMap();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [latitude, longitude, title]);

  return (
    <div
      ref={containerRef}
      aria-label={`Mapa de ubicacion de ${title}`}
      className="h-full min-h-72 w-full rounded-lg bg-mosque/5"
    />
  );
}
