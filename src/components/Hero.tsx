/**
 * Hero Component
 * 
 * Hauptbereich der Website mit folgenden Features:
 * - Überzeugende Schlagzeile für B2B- und B2C-Kunden
 * - Call-to-Action Button der zur Kontaktform scrollt
 * - Professioneller Gradient-Hintergrund im Automotive-Stil
 * - Responsive Typografie und Layout
 * - Elegantes Hintergrundmuster mit Radial-Gradient
 * 
 * Verwendet semantische Design-Tokens für konsistentes Branding
 * und das Corporate Design System für professionelle Darstellung.
 */

import { Button } from "@/components/ui/button";
import heroAutomotiveBg from "@/assets/hero-automotive-bg.jpg";

/**
 * Hero Functional Component
 * Rendert den Hauptbereich mit Headline und Call-to-Action
 */
const Hero = () => {
  /**
   * Scroll-Funktion für sanfte Navigation zum Kontaktformular
   * Verwendet native scrollIntoView API für smooth scrolling
   */
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative bg-background min-h-[600px] flex items-start justify-center text-foreground overflow-hidden pt-20">
      
      {/* Automotive Hintergrundbild */}
      <div className="absolute inset-0 opacity-10">
        <img src={heroAutomotiveBg} alt="KFZ-Ersatzteile und Autoteile – Mechaniker prüft Antriebsstrang in Altenberger Werkstatt – KFZ-Teile Hennes Westermann" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background"></div>
      </div>
      
      {/* Hauptinhalt des Hero-Bereichs */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* ✅ SEO-Optimized H1 with main keyword at start */}
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-foreground">
            KFZ-Teile Hennes Westermann
            <span className="block text-accent mt-3 text-4xl md:text-5xl">Ihr Partner für alle Fahrzeugteile</span>
          </h1>
          
          {/* ✅ Enhanced value proposition with keywords */}
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hochwertige <strong>KFZ-Ersatzteile und Autoteile</strong> für Privatkunden und Werkstätten im Münsterland. 
            Von Bremsen über Filter bis zu Motor- und Getriebeteilen. Vertrauen Sie auf unsere Erfahrung seit 2025 in <strong>Altenberge</strong>.
          </p>
          
          {/* Call-to-Action Button Bereich */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="automotive" size="lg" onClick={scrollToContact} className="text-base font-semibold uppercase tracking-wide">
              Angebot anfordern
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;