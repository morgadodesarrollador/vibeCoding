import { supabase } from './supabase';

export const PROPERTIES_PER_PAGE = 8;

/** Tipo que refleja exactamente las columnas de la tabla `properties` en Supabase */
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  price_suffix: string | null;
  beds: number;
  baths: number;
  area: string;
  image: string;
  image_alt: string;
  status: string;
  type: string;
  featured: boolean;
  created_at: string;
}

interface GetPropertiesOptions {
  page?: number;
  status?: string;   // 'Todo' | 'Comprar' | 'Alquilar'
  type?: string;     // 'Todo' | 'Villa' | 'Ático' | 'Casa' | 'Apartamento'
  q?: string;
}

/**
 * Obtiene propiedades NO destacadas con paginación y filtros opcionales.
 * Primero obtiene el total (head: true) para clampear la página a un rango
 * válido antes del range(), evitando el error PGRST103.
 */
export async function getMarketProperties({
  page = 1,
  status = 'Todo',
  type = 'Todo',
  q = '',
}: GetPropertiesOptions = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyFilters = (query: any) => {
    let q2 = query.eq('featured', false);
    if (status === 'Comprar') {
      q2 = q2.in('status', ['EN VENTA', 'Exclusivo', 'Novedad']);
    } else if (status === 'Alquilar') {
      q2 = q2.eq('status', 'EN ALQUILER');
    }
    if (type !== 'Todo') q2 = q2.eq('type', type);
    if (q) q2 = q2.or(`title.ilike.%${q}%,location.ilike.%${q}%`);
    return q2;
  };

  // 1. Conteo sin datos (head: true)
  const { count, error: countError } = await applyFilters(
    supabase.from('properties').select('*', { count: 'exact', head: true })
  );
  if (countError) throw new Error(countError.message);

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PROPERTIES_PER_PAGE));

  // Clampear página para que nunca supere el total → imposible PGRST103
  const validPage = Math.min(Math.max(1, page), totalPages);
  const from = (validPage - 1) * PROPERTIES_PER_PAGE;
  const to = from + PROPERTIES_PER_PAGE - 1;

  // 2. Datos con rango ya seguro
  const { data, error: dataError } = await applyFilters(
    supabase.from('properties').select('*').order('created_at', { ascending: false })
  ).range(from, to);

  if (dataError) throw new Error(dataError.message);

  return {
    data: (data ?? []) as Property[],
    count: totalCount,
    totalPages,
  };
}

/**
 * Obtiene propiedades destacadas (featured = true) con filtros opcionales.
 * Sin paginación — siempre se muestran todas.
 */
export async function getFeaturedProperties({
  status = 'Todo',
  type = 'Todo',
  q = '',
}: Omit<GetPropertiesOptions, 'page'> = {}) {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (status === 'Comprar') {
    query = query.in('status', ['EN VENTA', 'Exclusivo', 'Novedad']);
  } else if (status === 'Alquilar') {
    query = query.eq('status', 'EN ALQUILER');
  }

  if (type !== 'Todo') query = query.eq('type', type);
  if (q) query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data ?? []) as Property[];
}
