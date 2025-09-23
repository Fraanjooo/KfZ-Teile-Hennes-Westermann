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
      icon: Building2, // Gebäude-Icon für B2B-Bereich
      title: "B2B-Lösungen",
      description: "Individuelle Betreuung und attraktive Konditionen für Werkstätten, Autohäuser und Reparaturbetriebe – inklusive unkomplizierter Abwicklung von Großbestellungen."
    },
    {
      icon: User, // Benutzer-Icon für Privatkunden
      title: "Privatkunden", 
      description: "Persönliche Beratung und hochwertige Ersatzteile für Privatkunden. Profitieren Sie von unserer Qualitätsgarantie."
    },
    {
      icon: MapPin, // Standort-Icon für Lieferung/Abholung
      title: "Lieferung oder Abholung",
      description: "Flexible Bezugsmöglichkeiten für alle Kunden. Schnelle Lieferung oder bequeme Abholung vor Ort."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-corporate-white to-corporate-light-gray">
      <div className="container mx-auto px-6">
        {/* Überschrift und Beschreibung der Services-Sektion */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Ob Geschäftskunde oder Privatperson - wir haben die Teile und das Know-how, um Sie mobil zu halten.
          </p>
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