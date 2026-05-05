import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import PropertyDetailGallery from "@/app/components/PropertyDetailGallery";
import PropertyMap from "@/app/components/PropertyMap";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPropertyBySlug } from "@/lib/properties";
import { cn } from "@/lib/utils";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const AGENT_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w";

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Propiedad no encontrada | Luxe Estate",
    };
  }

  const description =
    property.description ??
    `${property.type} ${property.status.toLowerCase()} en ${property.location}. ${property.beds} habitaciones, ${property.baths} banos y ${property.area}.`;
  const image = property.gallery[0]?.image_url ?? property.image;

  return {
    title: `${property.title} | ${property.location} | Luxe Estate`,
    description,
    openGraph: {
      title: `${property.title} | Luxe Estate`,
      description,
      images: [
        {
          url: image,
          alt: property.gallery[0]?.image_alt ?? property.image_alt,
        },
      ],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const features = [
    {
      icon: "square_foot",
      value: property.area,
      label: "Superficie",
    },
    {
      icon: "king_bed",
      value: property.beds,
      label: "Habitaciones",
    },
    {
      icon: "bathtub",
      value: property.baths,
      label: "Banos",
    },
    {
      icon: "villa",
      value: property.type,
      label: "Tipo",
    },
  ];
  const hasCoordinates = property.latitude !== null && property.longitude !== null;
  const description =
    property.description ??
    "Propiedad seleccionada por LuxeEstate por su ubicacion, potencial y equilibrio entre comodidad, estilo y valor inmobiliario.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description,
    url: `/propiedades/${property.slug}`,
    image: property.gallery.map((image) => image.image_url),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      availability: property.status,
    },
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link className="transition-colors hover:text-mosque" href="/">
                Inicio
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link className="transition-colors hover:text-mosque" href="/#listado">
                Propiedades
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{property.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge>{property.status}</Badge>
              <Badge variant="outline">{property.type}</Badge>
            </div>
            <h1 className="text-4xl font-light leading-tight text-nordic-dark dark:text-white md:text-5xl">
              {property.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-nordic-muted">
              <span className="material-icons text-base text-mosque" aria-hidden="true">
                location_on
              </span>
              {property.location}
            </p>
          </div>
          <Link
            href="/#listado"
            className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          >
            <span className="material-icons text-base" aria-hidden="true">
              arrow_back
            </span>
            Volver al listado
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <PropertyDetailGallery
              title={property.title}
              status={property.status}
              featured={property.featured}
              images={property.gallery}
            />

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-nordic-dark dark:text-white">
                  Caracteristicas principales
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex flex-col items-center justify-center rounded-lg border border-mosque/10 bg-mosque/5 p-4 text-center"
                    >
                      <span className="material-icons mb-2 text-2xl text-mosque" aria-hidden="true">
                        {feature.icon}
                      </span>
                      <span className="text-xl font-bold text-nordic-dark dark:text-white">
                        {feature.value}
                      </span>
                      <span className="mt-1 text-xs uppercase tracking-wider text-nordic-muted">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-nordic-dark dark:text-white">
                  Sobre esta propiedad
                </h2>
              </CardHeader>
              <CardContent>
                <p className="leading-8 text-nordic-muted">{description}</p>
                <div className="mt-6 grid gap-3 text-sm text-nordic-muted sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-mosque" aria-hidden="true">
                      verified
                    </span>
                    Informacion actualizada y revisada.
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-mosque" aria-hidden="true">
                      event_available
                    </span>
                    Visitas bajo solicitud.
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-mosque" aria-hidden="true">
                      map
                    </span>
                    Ubicacion contextual disponible.
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-mosque" aria-hidden="true">
                      support_agent
                    </span>
                    Asesor especializado asignado.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <Card>
                <CardHeader>
                  <div>
                    <div className="text-5xl font-light text-nordic-dark dark:text-white md:text-6xl">
                      {property.price}
                      {property.price_suffix && (
                        <span className="text-base font-normal text-nordic-muted">
                          {property.price_suffix}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-lg font-medium text-nordic-muted">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 flex-none fill-mosque"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                      </svg>
                      {property.location}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full border-2 border-white bg-mosque/10 shadow-sm">
                      <Image
                        src={AGENT_IMAGE_URL}
                        alt="Sarah Jenkins, agente inmobiliaria de LuxeEstate"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold text-nordic-dark dark:text-white">
                        Sarah Jenkins
                      </h2>
                      <p className="flex items-center gap-1 text-sm font-medium text-mosque">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                        >
                          <path d="m12 17.27 5.18 3.13-1.64-5.89L20.1 10.5l-6.04-.26L12 4.6l-2.06 5.64-6.04.26 4.56 4.01-1.64 5.89L12 17.27Z" />
                        </svg>
                        Top Rated Agent
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button
                        type="button"
                        aria-label="Enviar mensaje a Sarah Jenkins"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-mosque/10 text-mosque transition-colors hover:bg-mosque hover:text-white"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8.83L4 21v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v9h2v1.7L8.17 15H20V6H4Zm3 2h10v2H7V8Zm0 4h7v2H7v-2Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Llamar a Sarah Jenkins"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-mosque/10 text-mosque transition-colors hover:bg-mosque hover:text-white"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01l-2.21 2.22Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2L2.01 6A2 2 0 0 1 4 4h3V2Zm13 8H4v10h16V10ZM4 8h16V6H4v2Z" />
                      </svg>
                      Agendar visita
                    </button>
                    <button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 5-8-5V6l8 5 8-5v2.24ZM4 18V10.6l8 5 8-5V18H4Z" />
                      </svg>
                      Contactar agente
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-2">
                {hasCoordinates ? (
                  <PropertyMap
                    latitude={property.latitude!}
                    longitude={property.longitude!}
                    title={property.title}
                  />
                ) : (
                  <div className="flex min-h-72 flex-col items-center justify-center rounded-lg bg-mosque/5 p-6 text-center text-nordic-muted">
                    <span className="material-icons mb-2 text-4xl text-mosque" aria-hidden="true">
                      location_off
                    </span>
                    Ubicacion exacta disponible bajo solicitud.
                  </div>
                )}
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
