/**
 * Services Component
 * 
 * Zeigt die Hauptleistungen für B2B- und B2C-Kunden an:
 * - B2B-Lösungen: Großbestellungen, Großhandelspreise, Kundenbetreuung
 * - Privatkunden: Einzelteile, Fachberatung, Qualitätsgarantie
 * - Lieferung oder Abholung: Flexible Bezugsmöglichkeiten für alle Kunden
 * 
 * Jede Leistung wird in einer Karte dargestellt mit:
 * - Icon-Darstellung über Lucide React Icons
 * - Titel, Beschreibung und Feature-Liste der Leistung
 * - Professionelles Styling mit Corporate Design Farben
 * 
 * Verwendet das Corporate Design System für konsistente Farbgebung
 * und responsive Grid-Layout für optimale Darstellung auf allen Geräten.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, MapPin } from "lucide-react";

/**
 * Services Functional Component
 * Rendert die drei Hauptleistungsbereiche des Kfz-Teilehändlers
 */
const Services = () => {
  // Service-Definitionen mit Icons, Titeln, Beschreibungen und Features
  const services = [
    {
      icon: Building2,
      title: "B2B-Lösungen & Werkstattbedarf",
      description: "Großhandelspreise und zuverlässige Lieferung für Werkstätten, Autohäuser und Reparaturbetriebe im Münsterland."
    },
    {
      icon: User,
      title: "Autoteile für Privatkunden", 
      description: "Fachberatung und hochwertige Ersatzteile für Ihr Fahrzeug – von Bremsen bis Motorteile. Faire Preise garantiert."
    },
    {
      icon: MapPin,
      title: "Schnelle Lieferung & Abholung",
      description: "Flexible Bezugswege: Lieferung ins Münsterland oder Abholung in Altenberge. Kurze Wege, schnelle Verfügbarkeit."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-corporate-white to-corporate-light-gray">
      <div className="container mx-auto px-6">
        {/* ✅ SEO-Optimized Section Header with H2 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            KFZ-Ersatzteile Altenberge: Für Werkstätten & Privatkunden
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-3xl mx-auto mb-8">
            <strong>Autoteile und KFZ-Ersatzteile</strong> für Werkstätten und Privatkunden – kompetent, schnell, fair.
          </p>
          
          {/* ✅ SEO-optimized introductory text with internal links */}
          <div className="max-w-4xl mx-auto text-left bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-12">
            <p className="text-corporate-dark-gray leading-relaxed mb-4">
              <strong>KFZ-Teile Hennes Westermann</strong> in <strong>Altenberge</strong> – Ihr Partner für <strong>Ersatzteile und Autoteile</strong> im Münsterland. Wir beliefern Werkstätten und Privatkunden mit Bremsen, Filtern, Motor- und Getriebeteilen für alle gängigen Marken.
            </p>
            <p className="text-corporate-dark-gray leading-relaxed">
              Individuelle Beratung, schnelle Verfügbarkeit, faire Preise. Unverbindliche Angebote, flexible Lieferung oder Abholung. <a href="/blog" className="text-corporate-primary hover:underline font-semibold">Ratgeber im Blog</a> · <a href="#contact" className="text-corporate-primary hover:underline font-semibold">Kontaktformular</a>
            </p>
          </div>
          
          {/* ✅ H3 with keyword */}
          <h3 className="text-2xl md:text-3xl font-bold text-corporate-dark-gray mb-8">
            Unsere Leistungen: KFZ-Ersatzteile für jeden Bedarf
          </h3>
        </div>
        
        {/* Grid-Layout für Service-Karten - responsive Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-corporate-white/80 backdrop-blur-sm">
              {/* Card Header mit Icon und Titel */}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-corporate-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-corporate-white" />
                </div>
                <CardTitle className="text-xl text-corporate-dark-gray">{service.title}</CardTitle>
              </CardHeader>
              {/* Card Content mit Beschreibung und Features */}
              <CardContent className="text-center">
                <CardDescription className="text-corporate-medium-gray mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;