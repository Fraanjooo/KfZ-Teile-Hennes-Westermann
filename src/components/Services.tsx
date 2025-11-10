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
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Services Functional Component
 * Rendert die drei Hauptleistungsbereiche des Kfz-Teilehändlers
 */
const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
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
    <section ref={ref} id="services" className="py-20 bg-gradient-to-b from-corporate-white to-corporate-light-gray">
      <div className="container mx-auto px-6">
        {/* Überschrift und Beschreibung der Services-Sektion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            KFZ-Ersatzteile für Altenberge und das Münsterland
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-3xl mx-auto mb-8">
            Ob Geschäftskunde oder Privatperson – wir haben die passenden Autoteile und das Know-how, um Sie mobil zu halten.
          </p>
          
          {/* SEO-optimierter Einleitungstext */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-left bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-12"
          >
            <p className="text-corporate-dark-gray leading-relaxed mb-4">
              <strong>KFZ-Teile Hennes Westermann</strong> ist Ihr zuverlässiger Partner für hochwertige <strong>Ersatzteile und Autoteile</strong> in <strong>Altenberge</strong> und der gesamten Region Münsterland. Seit 2025 beliefern wir Werkstätten, Autohäuser, Reparaturbetriebe und Privatkunden mit einem umfassenden Sortiment an Fahrzeugteilen – von <strong>Bremsen und Filtern</strong> über <strong>Motor- und Getriebeteile</strong> bis hin zu <strong>Karosserieteilen und Verschleißartikeln</strong>.
            </p>
            <p className="text-corporate-dark-gray leading-relaxed mb-4">
              Unsere Stärke liegt in der individuellen Beratung und schnellen Verfügbarkeit. Egal ob Sie <strong>günstige Autoteile bestellen</strong> möchten oder <strong>Werkstattbedarf in Altenberge</strong> benötigen – wir erstellen Ihnen unverbindliche Angebote von verschiedenen Herstellern und sorgen für eine zügige Lieferung oder bequeme Abholung vor Ort. Dabei legen wir Wert auf Qualität, Transparenz und faire Preise.
            </p>
            <p className="text-corporate-dark-gray leading-relaxed">
              Vertrauen Sie auf unsere Fachkompetenz und profitieren Sie von unserem breiten Netzwerk an renommierten Lieferanten. <strong>KFZ-Teile kaufen war noch nie so einfach</strong> – kontaktieren Sie uns noch heute und überzeugen Sie sich selbst von unserem Service!
            </p>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-corporate-dark-gray mb-8"
          >
            Unsere Leistungen im Überblick
          </motion.h3>
        </motion.div>
        
        {/* Grid-Layout für Service-Karten - responsive Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 bg-corporate-white/80 backdrop-blur-sm h-full">
                {/* Card Header mit Icon und Titel */}
                <CardHeader className="text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mx-auto mb-4 p-3 bg-corporate-primary rounded-full w-16 h-16 flex items-center justify-center"
                  >
                    <service.icon className="w-8 h-8 text-corporate-white" />
                  </motion.div>
                  <CardTitle className="text-xl text-corporate-dark-gray">{service.title}</CardTitle>
                </CardHeader>
                {/* Card Content mit Beschreibung und Features */}
                <CardContent className="text-center">
                  <CardDescription className="text-corporate-medium-gray mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;