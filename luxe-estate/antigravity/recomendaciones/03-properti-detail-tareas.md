# Tareas para implementar detalle de propiedad

## 1. Dependencias

- Instalar `leaflet` para mapas.
- Instalar `@types/leaflet` para soporte TypeScript.
- Instalar `class-variance-authority`, `clsx` y `tailwind-merge` para componentes estilo shadcn.
- Verificar que `package.json` y `package-lock.json` queden actualizados.

## 2. Utilidades UI

- Crear `lib/utils.ts` con helper `cn()`.
- Crear componentes base en `components/ui/`.
- Mantener componentes simples y compatibles con el diseno actual.
- Evitar introducir un sistema de diseno excesivo para esta pantalla.

## 3. Capa de datos

- Ampliar `Property` para incluir `slug`.
- Crear tipo interno para filas completas de `propiedades`.
- Crear tipo para imagenes de `galeria`.
- Crear funcion `getPropertyBySlug(slug)`.
- Crear funcion para obtener galeria por `property_id`.
- Ordenar imagenes por `sort_order`.
- Usar fallback a `imagen_url` si la galeria esta vacia.

## 4. Listado a detalle

- Actualizar `PropertyCard` para envolver la tarjeta con `Link`.
- Actualizar `FeaturedCard` para navegar al detalle por slug.
- Evitar que el boton de favoritos dispare navegacion usando `stopPropagation` y una estructura accesible.
- Mantener el estilo actual de las tarjetas.

## 5. Ruta dinamica

- Crear carpeta `app/propiedades/[slug]/`.
- Crear `page.tsx` dentro de la ruta.
- Leer `params` como `Promise<{ slug: string }>` siguiendo NextJS actual.
- Usar `notFound()` si no existe la propiedad.
- Renderizar Navbar y contenido principal.

## 6. Metadata dinamica

- Implementar `generateMetadata`.
- Consultar propiedad por slug.
- Construir `title` con `titulo`, `tipo` y `ubicacion`.
- Construir `description` con descripcion o fallback comercial.
- Definir `openGraph.images` con imagen principal.

## 7. Galeria interactiva

- Crear componente cliente para la galeria.
- Mostrar imagen principal en formato grande.
- Mostrar de 3 a 5 miniaturas desde `galeria`.
- Al pulsar una miniatura, actualizar imagen principal.
- Indicar visualmente la miniatura activa.
- Mantener navegacion con teclado.

## 8. Layout detalle

- Usar layout de dos columnas en desktop.
- Usar una columna en mobile.
- Colocar galeria y contenido principal a la izquierda.
- Colocar panel sticky de precio/contacto a la derecha.
- Seguir estetica premium: fondo clear-day, tarjetas blancas, bordes suaves y color mosque.

## 9. Breadcrumb

- Crear breadcrumb semantico.
- Enlazar `Inicio` a `/`.
- Enlazar `Propiedades` a `/#listado` o `/` segun estructura actual.
- Mostrar titulo de propiedad como ultimo item.

## 10. Mapa Leaflet

- Crear `PropertyMap` como Client Component.
- Importar CSS de Leaflet donde corresponda.
- Renderizar mapa solo si existen coordenadas validas.
- Centrar mapa en `latitud` y `longitud`.
- Mostrar marcador en la propiedad.
- Evitar ejecutar Leaflet en servidor.

## 11. Configuracion de imagenes

- Actualizar `next.config.ts` para permitir imagenes remotas.
- Mantener `images.unsplash.com`.
- Anadir `upload.wikimedia.org`.
- Revisar si hay otros dominios presentes en Supabase.

## 12. Verificacion

- Ejecutar `npx tsc --noEmit`.
- Ejecutar `npm run build`.
- Ejecutar `npm run lint`.
- Documentar errores preexistentes si aparecen y no pertenecen a este cambio.
