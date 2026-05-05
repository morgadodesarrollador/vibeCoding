# Plan para pantalla de detalle de propiedad

## Objetivo

- Crear una pantalla de detalle para cada propiedad seleccionada desde el grid.
- Usar el campo `slug` de la tabla `propiedades` para construir URLs amigables.
- Mostrar una experiencia premium, clara y orientada a conversion siguiendo las buenas practicas de `buenas-practicas.md`.
- Inspirar el diseno visual en `antigravity/resources/home_discover_screen/code.html` y `antigravity/resources/property_details_screen/code.html`.

## Ruta propuesta

- Ruta de detalle: `/propiedades/[slug]`.
- Ejemplo: `/propiedades/villa-mirador-de-la-alcazaba-villa-la-alcazaba-almeria`.
- La navegacion desde las tarjetas del listado usara `property.slug`.

## Datos necesarios

- Tabla principal: `public.propiedades`.
- Campos clave:
  - `id`
  - `slug`
  - `titulo`
  - `ubicacion`
  - `precio_formateado`
  - `precio_sufijo`
  - `habitaciones`
  - `banos`
  - `area_m2`
  - `imagen_url`
  - `imagen_alt`
  - `estado`
  - `tipo`
  - `destacada`
  - `descripcion`
  - `latitud`
  - `longitud`
  - `created_at`
- Tabla de galeria: `public.galeria`.
- Campos clave de galeria:
  - `property_id`
  - `image_url`
  - `image_alt`
  - `sort_order`

## Arquitectura

- Mantener `app/propiedades/[slug]/page.tsx` como Server Component.
- Cargar datos de Supabase en servidor mediante funciones de `lib/properties.ts`.
- Separar interactividad en Client Components pequenos:
  - Galeria interactiva.
  - Mapa Leaflet.
- Mantener el resto de la pagina como renderizado server-side para reducir JavaScript cliente.

## Componentes previstos

- `PropertyDetailGallery`: galeria con imagen principal y miniaturas clicables.
- `PropertyMap`: mapa Leaflet cargado solo en cliente.
- `PropertyDetailPage`: pagina server-side que compone datos, SEO, breadcrumb y layout.
- Componentes UI estilo shadcn:
  - `Button`
  - `Card`
  - `Badge`
  - `Breadcrumb`
  - `Separator`

## Experiencia de usuario

- Desde cualquier tarjeta del grid, el usuario podra acceder al detalle con un click.
- La pagina mostrara breadcrumb: `Inicio > Propiedades > Nombre de propiedad`.
- El breadcrumb permitira volver al listado.
- La galeria mostrara una imagen grande y miniaturas debajo.
- Al hacer click en una miniatura, esta se mostrara como imagen principal.
- El panel lateral mostrara precio, ubicacion, estado, agente simulado y llamadas a la accion.
- El mapa mostrara la ubicacion si existen `latitud` y `longitud`.
- Si no hay coordenadas, se mostrara un estado alternativo sin romper la pagina.

## SEO

- Implementar `generateMetadata` en `app/propiedades/[slug]/page.tsx`.
- Usar titulo unico por propiedad.
- Usar descripcion basada en `descripcion`, `tipo`, `estado` y `ubicacion`.
- Incluir Open Graph con imagen principal.
- Mantener URLs estables basadas en `slug`.
- Usar `notFound()` si el slug no existe.

## Rendimiento

- Usar Server Components por defecto.
- Cargar Leaflet con componente cliente para evitar problemas SSR.
- Evitar cargar mapa si no hay coordenadas.
- Usar `next/image` para imagen principal y miniaturas.
- Configurar dominios remotos necesarios para imagenes externas.
- Seleccionar solo columnas necesarias desde Supabase.

## Accesibilidad

- Miniaturas de galeria como botones accesibles.
- Estados visuales y `aria-current` para miniatura activa.
- Breadcrumb semantico con `nav` y `aria-label`.
- Imagenes con `alt` desde `galeria.image_alt` o fallback descriptivo.
- Botones con texto visible o `aria-label` cuando corresponda.

## Dependencias necesarias

- `leaflet`
- `@types/leaflet`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

## Criterios de finalizacion

- Existe detalle navegable por slug.
- Las tarjetas del listado enlazan correctamente al detalle.
- La galeria funciona cambiando la imagen grande al pulsar miniaturas.
- El mapa Leaflet se muestra con coordenadas de Supabase.
- La pagina tiene metadata dinamica.
- La implementacion compila con TypeScript.
- La verificacion de build se ejecuta al finalizar.
