"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = "luxe-estate-favorites";
const FAVORITES_EVENT = "luxe-estate-favorites-change";
const EMPTY_FAVORITES: string[] = [];
let cachedRaw: string | null = null;
let cachedFavorites: string[] = [];

function getFavoritesSnapshot() {
  if (typeof window === "undefined") return EMPTY_FAVORITES;

  const raw = localStorage.getItem(FAVORITES_KEY);
  if (raw === cachedRaw) return cachedFavorites;

  cachedRaw = raw;
  if (!raw) {
    cachedFavorites = [];
    return cachedFavorites;
  }

  try {
    const parsed = JSON.parse(raw);
    cachedFavorites = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse favorites", error);
    cachedFavorites = [];
  }

  return cachedFavorites;
}

function subscribeFavorites(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(FAVORITES_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVORITES_EVENT, callback);
  };
}

function emitFavoritesChange() {
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    () => EMPTY_FAVORITES
  );

  const toggleFavorite = (id: string) => {
    const isFav = favorites.includes(id);
    const newFavs = isFav ? favorites.filter((fav) => fav !== id) : [...favorites, id];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    cachedRaw = JSON.stringify(newFavs);
    cachedFavorites = newFavs;
    emitFavoritesChange();
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
