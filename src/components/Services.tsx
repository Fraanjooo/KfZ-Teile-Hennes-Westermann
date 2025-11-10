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
      title: "B2B-Lösungen & Werkstattbedarf",
      description: "Individuelle Betreuung und attraktive Konditionen für Werkstätten, Autohäuser und Reparaturbetriebe in Altenberge und dem Münsterland. Profitieren Sie von Großhandelspreisen, unkomplizierter Abwicklung von Großbestellungen und zuverlässiger Lieferung direkt zu Ihrem Betrieb."
    },
    {
      icon: User, // Benutzer-Icon für Privatkunden
      title: "Autoteile für Privatkunden", 
      description: "Persönliche Fachberatung und hochwertige Ersatzteile für Ihr Fahrzeug. Ob Bremsen, Filter, Beleuchtung oder Motor- und Getriebeteile – wir finden das passende Teil für Sie. Profitieren Sie von unserer Qualitätsgarantie und fairen Preisen beim Autoteile kaufen in Altenberge."
    },
    {
      icon: MapPin, // Standort-Icon für Lieferung/Abholung
      title: "Schnelle Lieferung & Abholung",
      description: "Maximale Flexibilität für alle Kunden: Wählen Sie zwischen schneller Lieferung direkt zu Ihnen nach Hause oder in Ihre Werkstatt im Münsterland, oder holen Sie Ihre Ersatzteile bequem bei uns in Altenberge ab. Kurze Wege, schnelle Verfügbarkeit."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        {/* ✅ SEO-Optimized Section Header with H2 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            KFZ-Ersatzteile Altenberge: Für Werkstätten & Privatkunden
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Ob B2B-Großhandel oder Einzelteilbestellung – wir haben die passenden <strong>Autoteile</strong> und das Fachwissen, 
            um Sie und Ihre Werkstatt mobil zu halten. Profitieren Sie von unserem umfassenden Sortiment an <strong>KFZ-Teilen</strong> in Altenberge.
          </p>
          
          {/* ✅ SEO-optimized introductory text with internal links */}
          <div className="max-w-4xl mx-auto text-left bg-card p-10 rounded-xl shadow-lg mb-16">
            <p className="text-foreground leading-relaxed mb-6">
              <strong>KFZ-Teile Hennes Westermann</strong> ist Ihr zuverlässiger Partner für hochwertige <strong>Ersatzteile und Autoteile kaufen</strong> in <strong>Altenberge</strong> und der gesamten Region Münsterland. Seit 2025 beliefern wir Werkstätten, Autohäuser, Reparaturbetriebe und Privatkunden mit einem umfassenden Sortiment an Fahrzeugteilen – von <strong>Bremsen und Filtern</strong> über <strong>Motor- und Getriebeteile</strong> bis hin zu <strong>Karosserieteilen und Verschleißartikeln</strong>. Unser Angebot umfasst sowohl Originalteile als auch kompatible Ersatzteile für alle gängigen Fahrzeugmodelle von Audi, BMW, Mercedes, VW, Ford und viele weitere Marken.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              Unsere Stärke liegt in der individuellen Beratung und schnellen Verfügbarkeit. Egal ob Sie <strong>günstige Autoteile online bestellen</strong> möchten oder <strong>Werkstattbedarf in Altenberge</strong> benötigen – wir erstellen Ihnen unverbindliche Angebote von verschiedenen Herstellern und sorgen für eine zügige Lieferung oder bequeme Abholung vor Ort. Dabei legen wir Wert auf Qualität, Transparenz und faire Preise. Besuchen Sie auch unseren <a href="/blog" className="text-accent hover:underline font-semibold transition-colors">KFZ-Blog</a> für hilfreiche Ratgeber zu Wartung, Reparatur und Autopflege.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              Vertrauen Sie auf unsere Fachkompetenz und profitieren Sie von unserem breiten Netzwerk an renommierten Lieferanten wie Bosch, Brembo, Mann-Filter, Sachs und vielen weiteren Top-Marken. <strong>KFZ-Ersatzteile kaufen war noch nie so einfach</strong> – kontaktieren Sie uns noch heute per E-Mail oder nutzen Sie unser <a href="#contact" className="text-accent hover:underline font-semibold transition-colors">Kontaktformular</a> und überzeugen Sie sich selbst von unserem Service!
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>Unser Service-Gebiet:</strong> Wir beliefern nicht nur Altenberge, sondern die gesamte Region Münsterland inkl. Münster, Greven, Steinfurt, Emsdetten, Nordwalde und Umgebung. <strong>KFZ-Teile Westermann</strong> steht für Qualität, Zuverlässigkeit und Kundenzufriedenheit seit 2025.
            </p>
          </div>
          
          {/* ✅ H3 with keyword */}
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-12">
            Unsere Leistungen: KFZ-Ersatzteile für jeden Bedarf
          </h3>
        </div>
        
        {/* Grid-Layout für Service-Karten - responsive Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-orange transition-all duration-300 border-0 bg-card">
              {/* Card Header mit Icon und Titel */}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent rounded-2xl w-20 h-20 flex items-center justify-center shadow-md">
                  <service.icon className="w-10 h-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              {/* Card Content mit Beschreibung und Features */}
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
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