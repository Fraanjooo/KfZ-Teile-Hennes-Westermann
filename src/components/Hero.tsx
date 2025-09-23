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
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-background min-h-[600px] flex items-center justify-center text-foreground overflow-hidden">
      
      {/* Automotive Hintergrundbild */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroAutomotiveBg} 
          alt="Automotive drivetrain illustration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80"></div>
      </div>
      
      {/* Hauptinhalt des Hero-Bereichs */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Hauptschlagzeile mit zwei Zeilen für visuelle Hierarchie */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Kfz-Teile
            <span className="block text-corporate-highlight">für jedes Fahrzeug</span>
          </h1>
          
          {/* Untertitel mit Wertversprechen */}
          <p className="text-xl md:text-2xl mb-8 text-corporate-highlight/80 max-w-2xl mx-auto leading-relaxed">
            Hochwertige Fahrzeugteile für Geschäftskunden und Privatpersonen. 
            Schnelle Lieferung, faire Preise, kompetente Beratung.
          </p>
          
          {/* Call-to-Action Button Bereich */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="automotive" 
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6"
            >
              Angebot anfordern
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;