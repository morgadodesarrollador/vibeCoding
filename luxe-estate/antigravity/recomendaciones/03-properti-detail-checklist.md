# Checklist de detalle de propiedad

## Datos

- [ ] La pagina obtiene la propiedad desde `public.propiedades` usando `slug`.
- [ ] La pagina no usa la tabla antigua `properties`.
- [ ] La propiedad incluye `descripcion`, `latitud`, `longitud` y `created_at`.
- [ ] La galeria se obtiene desde `public.galeria` usando `property_id`.
- [ ] Las imagenes se ordenan por `sort_order`.
- [ ] Existe fallback a imagen principal si no hay galeria.

## Navegacion

- [ ] Cada `PropertyCard` navega a `/propiedades/[slug]`.
- [ ] Cada `FeaturedCard` navega a `/propiedades/[slug]`.
- [ ] El boton de favoritos sigue funcionando sin romper la navegacion.
- [ ] El breadcrumb muestra `Inicio > Propiedades > Propiedad`.
- [ ] El breadcrumb permite volver al listado.

## Galeria

- [ ] La imagen principal se muestra encima de las miniaturas.
- [ ] Las miniaturas aparecen debajo en scroll horizontal si hace falta.
- [ ] Al pulsar una miniatura cambia la imagen principal.
- [ ] La miniatura activa tiene estado visual claro.
- [ ] Las imagenes tienen `alt` descriptivo.
- [ ] La galeria funciona en desktop y mobile.

## Mapa

- [ ] Leaflet se carga solo en cliente.
- [ ] El mapa usa `latitud` y `longitud` de Supabase.
- [ ] El marcador aparece sobre la ubicacion de la propiedad.
- [ ] Si faltan coordenadas, se muestra un estado alternativo.
- [ ] El mapa no bloquea el render inicial de la pagina.

## UI y diseno

- [ ] La pantalla sigue el estilo premium de los recursos de Antigravity.
- [ ] Se usan componentes estilo shadcn para botones, tarjetas, badges y breadcrumb.
- [ ] El layout es responsive.
- [ ] El panel de contacto queda visible en desktop.
- [ ] Las llamadas a la accion son claras: agendar visita y contactar.
- [ ] Precio, ubicacion, estado y caracteristicas son faciles de escanear.

## SEO

- [ ] La ruta usa URL amigable por `slug`.
- [ ] `generateMetadata` genera `title` unico.
- [ ] `generateMetadata` genera `description` especifica.
- [ ] Open Graph incluye imagen principal.
- [ ] Los slugs inexistentes devuelven `notFound()`.

## Accesibilidad

- [ ] El breadcrumb usa `nav` con `aria-label`.
- [ ] Las miniaturas son botones navegables con teclado.
- [ ] La miniatura activa usa `aria-current` o estado equivalente.
- [ ] Los botones tienen texto claro.
- [ ] El contraste visual respeta el diseno actual.

## Verificacion

- [ ] `npx tsc --noEmit` pasa correctamente.
- [ ] `npm run build` pasa correctamente.
- [ ] `npm run lint` se ejecuta y se documentan errores no relacionados si existen.
- [ ] La navegacion desde listado a detalle se prueba manualmente.
- [ ] La galeria se prueba haciendo click en varias miniaturas.
