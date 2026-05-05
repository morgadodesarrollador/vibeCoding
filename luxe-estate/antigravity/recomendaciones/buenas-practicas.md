# Buenas prácticas para aplicaciones NextJS de venta y alquiler de propiedades

## Objetivo

- Construir una experiencia rápida, confiable y orientada a conversión para usuarios que buscan comprar, vender o alquilar propiedades.
- Priorizar SEO, rendimiento, confianza, accesibilidad y facilidad de contacto.
- Diseñar la aplicación pensando en búsquedas locales, fichas de propiedades, leads comerciales y navegación móvil.

## Experiencia de usuario

- Mostrar buscador principal visible desde el primer pantallazo.
- Permitir búsquedas por ciudad, zona, barrio, tipo de propiedad, precio, habitaciones, baños, superficie y modalidad: venta o alquiler.
- Incluir filtros fáciles de ajustar sin recargar toda la página innecesariamente.
- Mantener filtros aplicados en la URL para poder compartir búsquedas.
- Mostrar resultados en formato lista y mapa cuando sea útil.
- Incluir ordenación por relevancia, precio, fecha de publicación, superficie y propiedades destacadas.
- Evitar interfaces sobrecargadas; el usuario debe poder comparar propiedades rápidamente.
- Usar tarjetas de propiedad claras con imagen principal, precio, ubicación, características clave y llamada a la acción.
- Mostrar estados vacíos útiles cuando no haya resultados, con sugerencias de filtros alternativos.
- Ofrecer favoritos o propiedades guardadas para facilitar el retorno del usuario.
- Incluir comparación de propiedades si el catálogo es amplio.
- Optimizar la experiencia móvil, ya que muchas búsquedas inmobiliarias ocurren desde teléfonos.
- Mantener llamadas a la acción visibles: contactar, agendar visita, llamar, WhatsApp o solicitar información.
- Evitar modales invasivos que bloqueen la exploración del catálogo.

## Fichas de propiedades

- Usar páginas dedicadas por propiedad con URL amigable y estable.
- Incluir título claro con tipo de propiedad, operación y ubicación.
- Mostrar precio, moneda, gastos adicionales, condiciones y disponibilidad.
- Destacar características principales: habitaciones, baños, estacionamiento, superficie, antigüedad, piso, orientación y amenities.
- Usar galerías de imágenes rápidas, optimizadas y navegables en móvil.
- Incluir descripción completa, pero escaneable con secciones y bullets.
- Mostrar ubicación aproximada o exacta según la política del negocio.
- Incluir mapa interactivo sin afectar negativamente el rendimiento inicial.
- Agregar información del barrio: transporte, colegios, comercios, seguridad, zonas verdes y servicios cercanos.
- Mostrar datos del agente o inmobiliaria responsable.
- Incluir formularios de contacto cortos y visibles.
- Permitir contacto directo por teléfono o WhatsApp cuando aplique.
- Añadir propiedades similares para mejorar retención y conversión.
- Mostrar fecha de publicación o actualización para generar confianza.
- Indicar claramente si una propiedad está reservada, vendida, alquilada o no disponible.

## SEO técnico y contenido

- Crear URLs limpias y descriptivas, por ejemplo: `/venta/departamento/madrid/salamanca/propiedad-123`.
- Generar metadatos únicos por propiedad, ciudad, barrio y tipo de operación.
- Usar `generateMetadata` en NextJS para páginas dinámicas cuando corresponda.
- Incluir `title`, `description`, Open Graph y Twitter Cards por ficha.
- Implementar datos estructurados con Schema.org: `RealEstateListing`, `Residence`, `Apartment`, `House`, `Place`, `Offer` o tipos relacionados.
- Crear páginas indexables para búsquedas importantes: ciudad, barrio, tipo de propiedad y operación.
- Evitar indexar combinaciones infinitas de filtros que generen contenido duplicado.
- Definir reglas claras para `canonical`, `robots`, `sitemap.xml` y `robots.txt`.
- Generar sitemaps dinámicos para propiedades activas y páginas de categorías.
- Retirar o marcar correctamente propiedades no disponibles para evitar errores SEO.
- Mantener contenido local útil: guías de barrios, precios promedio, consejos de compra y alquiler.
- Usar texto alternativo descriptivo en imágenes de propiedades.
- Optimizar headings: un solo `h1` claro por página y jerarquía semántica correcta.
- Evitar contenido duplicado entre fichas similares.
- Cuidar Core Web Vitals: LCP, CLS e INP.

## Rendimiento en NextJS

- Usar Server Components por defecto cuando no se requiera interactividad en cliente.
- Limitar el uso de Client Components a filtros interactivos, mapas, galerías, favoritos y formularios.
- Usar `next/image` para imágenes de propiedades siempre que sea posible.
- Definir tamaños reales de imagen con `sizes` para evitar descargas excesivas en móvil.
- Priorizar solo la imagen principal crítica de la página, no toda la galería.
- Implementar lazy loading para galerías, mapas, módulos de recomendaciones y contenido secundario.
- Evitar cargar librerías de mapas en el render inicial si el mapa está fuera del primer pantallazo.
- Usar streaming, loading states y Suspense para mejorar la percepción de velocidad.
- Cachear datos que cambian poco, como ubicaciones, tipos de propiedad y amenities.
- Definir estrategias claras de revalidación para propiedades activas, destacadas y listados.
- Evitar respuestas enormes desde APIs; paginar resultados y enviar solo los campos necesarios.
- Medir rendimiento con Lighthouse, Web Vitals y analítica real de usuarios.
- Optimizar fuentes con `next/font` y evitar demasiadas variantes tipográficas.
- Reducir JavaScript enviado al cliente.
- Evitar dependencias pesadas para carruseles, mapas, calendarios o formularios si hay alternativas más simples.

## Arquitectura y datos

- Separar claramente entidades principales: propiedades, ubicaciones, usuarios, agentes, leads, favoritos y medios.
- Modelar estados de propiedad: borrador, publicada, reservada, vendida, alquilada, pausada y archivada.
- Mantener slugs estables para evitar romper enlaces indexados.
- Usar IDs internos para operaciones críticas y slugs para URLs públicas.
- Diseñar filtros de búsqueda pensando en índices de base de datos.
- Normalizar ubicaciones: país, región, ciudad, barrio, calle y coordenadas.
- Guardar imágenes con metadatos: orden, alt text, tipo de ambiente y dimensiones.
- Registrar cambios relevantes en propiedades: precio, estado, descripción y disponibilidad.
- Evitar acoplar la UI directamente al modelo completo de base de datos.
- Crear DTOs o vistas específicas para listados y fichas cuando el proyecto lo requiera.
- Mantener validaciones compartidas entre formularios, APIs y panel administrativo.
- Diseñar APIs internas con paginación, filtros explícitos y límites seguros.
- Preparar el sistema para múltiples monedas, unidades de superficie y formatos regionales.

## Seguridad y privacidad

- Validar todos los datos recibidos desde formularios y parámetros de URL.
- Proteger formularios contra spam con rate limiting, honeypots, captcha o verificación progresiva.
- No exponer datos sensibles de propietarios, agentes o clientes en respuestas públicas.
- Sanitizar contenido editable por usuarios o agentes para evitar XSS.
- Aplicar autorización estricta en paneles administrativos.
- Registrar acciones importantes: creación, edición, publicación y eliminación de propiedades.
- Usar variables de entorno para claves de servicios externos.
- No exponer claves privadas de mapas, CRM, email, pagos o almacenamiento.
- Cumplir normativa de privacidad aplicable para leads y datos de contacto.
- Pedir solo los datos necesarios en formularios: nombre, contacto y mensaje.
- Informar claramente cómo se usará la información del usuario.

## Formularios y generación de leads

- Mantener formularios cortos para maximizar conversión.
- Permitir elegir motivo de contacto: visita, precio, disponibilidad, financiación o más información.
- Confirmar visualmente que la solicitud fue enviada.
- Enviar notificaciones al agente o CRM en tiempo real cuando sea posible.
- Guardar origen del lead: propiedad, página, campaña, búsqueda o anuncio.
- Medir eventos de conversión: clic en teléfono, clic en WhatsApp, envío de formulario y agenda de visita.
- Evitar pedir registro antes de contactar por una propiedad.
- Ofrecer mensajes prellenados útiles para WhatsApp o email.
- Implementar protección contra envíos repetidos.
- Mostrar horarios de atención o tiempos estimados de respuesta.

## Accesibilidad

- Asegurar navegación completa con teclado.
- Usar etiquetas correctas en formularios, filtros y controles de galería.
- Mantener contraste suficiente en precios, botones y chips de filtros.
- No depender solo del color para indicar estado de una propiedad.
- Agregar textos alternativos descriptivos en imágenes relevantes.
- Usar componentes accesibles para modales, menús, carruseles y mapas.
- Evitar animaciones excesivas o permitir reducir movimiento.
- Mostrar errores de formulario de forma clara y asociada al campo correspondiente.
- Usar landmarks semánticos: `header`, `main`, `nav`, `section`, `aside` y `footer`.

## Diseño visual y confianza

- Priorizar fotografías grandes, limpias y de buena calidad.
- Mostrar información crítica sin obligar al usuario a abrir cada ficha.
- Usar badges claros: destacado, nuevo, rebajado, reservado, vendido o alquilado.
- Evitar exagerar urgencia o escasez si no está respaldada por datos reales.
- Incluir señales de confianza: agencia verificada, matrícula, reseñas, experiencia o certificaciones.
- Mostrar políticas claras sobre contacto, visitas, comisiones y disponibilidad.
- Cuidar consistencia visual entre listados, fichas y formularios.
- Diseñar para lectura rápida: precio, ubicación y atributos deben ser fáciles de encontrar.
- Usar mapas y contexto local como apoyo, no como sustituto de buena información.

## Panel administrativo

- Permitir crear y editar propiedades con formularios claros y validaciones fuertes.
- Incluir vista previa antes de publicar.
- Permitir ordenar imágenes y definir imagen principal.
- Mostrar calidad de publicación: fotos mínimas, descripción, ubicación, precio y atributos completos.
- Gestionar estados de publicación sin eliminar datos históricos.
- Permitir asignar agentes responsables.
- Registrar leads asociados a cada propiedad.
- Facilitar carga masiva o importación si el catálogo es grande.
- Evitar que propiedades incompletas se publiquen accidentalmente.
- Incluir historial de cambios de precio y estado.

## Analítica y negocio

- Medir búsquedas realizadas, filtros más usados y búsquedas sin resultados.
- Medir propiedades vistas, guardadas, compartidas y contactadas.
- Identificar páginas con alta visita pero baja conversión.
- Analizar barrios o tipos de propiedad con mayor demanda.
- Registrar tiempo hasta el primer contacto.
- Medir rendimiento por canal: orgánico, pago, redes sociales, email y referidos.
- Usar eventos claros y consistentes para analítica.
- Respetar consentimiento de cookies y privacidad.
- Crear dashboards para leads, propiedades activas, conversión y rendimiento comercial.

## Integraciones recomendadas

- CRM inmobiliario para seguimiento de leads.
- Proveedor de mapas para ubicación y servicios cercanos.
- Servicio de email transaccional para confirmaciones y avisos.
- Almacenamiento optimizado para imágenes.
- Herramienta de analítica y eventos.
- Sistema de notificaciones para agentes.
- Integraciones con portales inmobiliarios si el negocio lo requiere.
- Pasarela de pagos solo si existen reservas, publicaciones premium o servicios pagos.

## Ideas de producto

- Alertas de nuevas propiedades según búsqueda guardada.
- Recomendaciones personalizadas por comportamiento del usuario.
- Comparador de propiedades.
- Calculadora de hipoteca, rentabilidad o gastos de compra.
- Estimador de precio por zona.
- Tour virtual o video destacado.
- Agenda online para visitas.
- Chat con agente o asistente virtual.
- Busqueda por mapa con dibujo de zona.
- Reporte de mercado por barrio.
- Historial de cambios de precio.
- Propiedades similares por presupuesto, ubicación y características.
- Landing pages para barrios o desarrollos inmobiliarios.
- Modo inversor con métricas de rentabilidad, ocupación y gastos estimados.
- Checklist para compradores, inquilinos, vendedores y propietarios.

## Checklist rápido

- La página principal comunica claramente qué se puede buscar y dónde.
- Las URLs son limpias, compartibles e indexables.
- Las fichas de propiedad tienen metadata, datos estructurados y contenido único.
- Las imágenes están optimizadas y no bloquean la carga inicial.
- Los filtros funcionan bien en móvil.
- Los formularios son cortos, seguros y medibles.
- Las propiedades no disponibles se gestionan sin romper SEO.
- El mapa no empeora el rendimiento inicial.
- Hay analítica de búsquedas, vistas y contactos.
- El panel administrativo evita publicaciones incompletas.
- La aplicación cumple criterios básicos de accesibilidad.
- Los datos sensibles no se exponen en el cliente.
