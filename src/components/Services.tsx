/**
 * Services Component
 * 
 * Displays the main service offerings for both B2B and B2C customers:
 * - B2B Solutions: Bulk ordering, wholesale pricing, account management
 * - Individual Customers: Retail parts, expert advice, quality guarantee
 * - Fast Delivery: Quick shipping options and tracking
 * - Expert Support: Technical guidance and part identification
 * 
 * Each service is displayed in a card with:
 * - Icon representation using Lucide React icons
 * - Service title, description, and feature list
 * - Professional styling using corporate colors
 * 
 * TODO: Consider adding service-specific contact forms or pricing info
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, Truck, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "B2B-Lösungen",
      description: "Großbestellungen für Werkstätten, Autohäuser und Reparaturbetriebe. Mengenrabatte und persönliche Kundenbetreuung.",
      features: ["Großhandelspreise", "Individuelle Rechnungsstellung", "Prioritätsversand"]
    },
    {
      icon: User,
      title: "Privatkunden",
      description: "Hochwertige Teile für Hobby-Schrauber und Autobesitzer. Fachberatung und faire Preise.",
      features: ["Fachberatung", "Qualitätsgarantie", "Einfache Rückgabe"]
    },
    {
      icon: Truck,
      title: "Schnelle Lieferung",
      description: "Kurze Lieferzeiten durch zuverlässige Versandpartner. Lokale und deutschlandweite Lieferoptionen.",
      features: ["Taggleich lokal", "2 Tage deutschlandweit", "Sendungsverfolgung"]
    },
    {
      icon: Wrench,
      title: "Fachkundige Beratung",
      description: "Technischer Support und Hilfe bei der Teilefindung. Unser Team hilft Ihnen, die richtigen Teile zu finden.",
      features: ["Technische Beratung", "Teilefindung", "Einbautipps"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-corporate-white to-corporate-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Ob Geschäftskunde oder Privatperson - wir haben die Teile und das Know-how, um Sie mobil zu halten.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-corporate-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-corporate-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-corporate-white" />
                </div>
                <CardTitle className="text-xl text-corporate-dark-gray">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-corporate-medium-gray mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-corporate-accent font-medium">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;