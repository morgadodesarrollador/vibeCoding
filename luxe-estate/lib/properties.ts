import { supabase } from './supabase';

export const PROPERTIES_PER_PAGE = 8;

/** Tipo normalizado que consumen los componentes de propiedades. */
export interface Property {
  id: string;
  slug: string;
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

export interface PropertyGalleryImage {
  image_url: string;
  image_alt: string;
  sort_order: number;
}

export interface PropertyDetails extends Property {
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  gallery: PropertyGalleryImage[];
}

interface PropiedadRow {
  id: string;
  slug: string;
  titulo: string;
  ubicacion: string;
  precio_formateado: string;
  precio_sufijo: string | null;
  habitaciones: number | string;
  banos: number | string;
  area_m2: number;
  imagen_url: string;
  imagen_alt: string;
  estado: string;
  tipo: string;
  destacada: boolean;
  created_at: string;
}

interface PropiedadDetailsRow extends PropiedadRow {
  descripcion: string | null;
  latitud: number | string | null;
  longitud: number | string | null;
}

interface GaleriaRow {
  image_url: string;
  image_alt: string;
  sort_order: number;
}

const PROPIEDADES_SELECT = `
  id,
  slug,
  titulo,
  ubicacion,
  precio_formateado,
  precio_sufijo,
  habitaciones,
  banos,
  area_m2,
  imagen_url,
  imagen_alt,
  estado,
  tipo,
  destacada,
  created_at
`;

const PROPIEDAD_DETAIL_SELECT = `
  ${PROPIEDADES_SELECT},
  descripcion,
  latitud,
  longitud
`;

function mapPropiedad(row: PropiedadRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.titulo,
    location: row.ubicacion,
    price: row.precio_formateado,
    price_suffix: row.precio_sufijo,
    beds: Number(row.habitaciones),
    baths: Number(row.banos),
    area: `${row.area_m2} m²`,
    image: row.imagen_url,
    image_alt: row.imagen_alt,
    status: row.estado,
    type: row.tipo,
    featured: row.destacada,
    created_at: row.created_at,
  };
}

function mapGalleryImage(row: GaleriaRow): PropertyGalleryImage {
  return {
    image_url: row.image_url,
    image_alt: row.image_alt,
    sort_order: row.sort_order,
  };
}

function toCoordinate(value: number | string | null) {
  if (value === null) return null;
  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
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
    let q2 = query.eq('destacada', false);
    if (status === 'Comprar') {
      q2 = q2.eq('estado', 'EN VENTA');
    } else if (status === 'Alquilar') {
      q2 = q2.eq('estado', 'EN ALQUILER');
    }
    if (type !== 'Todo') q2 = q2.eq('tipo', type);
    if (q) q2 = q2.or(`titulo.ilike.%${q}%,ubicacion.ilike.%${q}%`);
    return q2;
  };

  // 1. Conteo sin datos (head: true)
  const { count, error: countError } = await applyFilters(
    supabase.from('propiedades').select('*', { count: 'exact', head: true })
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
    supabase
      .from('propiedades')
      .select(PROPIEDADES_SELECT)
      .order('created_at', { ascending: false })
  ).range(from, to);

  if (dataError) throw new Error(dataError.message);

  return {
    data: ((data ?? []) as PropiedadRow[]).map(mapPropiedad),
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
    .from('propiedades')
    .select(PROPIEDADES_SELECT)
    .eq('destacada', true)
    .order('created_at', { ascending: false });

  if (status === 'Comprar') {
    query = query.eq('estado', 'EN VENTA');
  } else if (status === 'Alquilar') {
    query = query.eq('estado', 'EN ALQUILER');
  }

  if (type !== 'Todo') query = query.eq('tipo', type);
  if (q) query = query.or(`titulo.ilike.%${q}%,ubicacion.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return ((data ?? []) as PropiedadRow[]).map(mapPropiedad);
}

export async function getPropertyBySlug(slug: string): Promise<PropertyDetails | null> {
  const { data, error } = await supabase
    .from('propiedades')
    .select(PROPIEDAD_DETAIL_SELECT)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const propertyRow = data as PropiedadDetailsRow;
  const { data: galleryData, error: galleryError } = await supabase
    .from('galeria')
    .select('image_url, image_alt, sort_order')
    .eq('property_id', propertyRow.id)
    .order('sort_order', { ascending: true })
    .limit(5);

  if (galleryError) throw new Error(galleryError.message);

  const gallery = ((galleryData ?? []) as GaleriaRow[]).map(mapGalleryImage);
  const fallbackGallery: PropertyGalleryImage[] = [
    {
      image_url: propertyRow.imagen_url,
      image_alt: propertyRow.imagen_alt,
      sort_order: 1,
    },
  ];

  return {
    ...mapPropiedad(propertyRow),
    description: propertyRow.descripcion,
    latitude: toCoordinate(propertyRow.latitud),
    longitude: toCoordinate(propertyRow.longitud),
    gallery: gallery.length > 0 ? gallery : fallbackGallery,
  };
}
