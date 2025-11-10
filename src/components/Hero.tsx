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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Hero Functional Component
 * Rendert den Hauptbereich mit Headline und Call-to-Action
 */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  /**
   * Scroll-Funktion für sanfte Navigation zum Kontaktformular
   * Verwendet native scrollIntoView API für smooth scrolling
   */
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative bg-background min-h-[600px] flex items-start justify-center text-foreground overflow-hidden pt-20">
      
      {/* Automotive Hintergrundbild mit Parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 opacity-20"
      >
        <img 
          src={heroAutomotiveBg} 
          alt="KFZ-Ersatzteile und Autoteile – Mechaniker prüft Antriebsstrang in Altenberger Werkstatt – KFZ-Teile Hennes Westermann" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80"></div>
      </motion.div>
      
      {/* Hauptinhalt des Hero-Bereichs */}
      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Hauptschlagzeile mit zwei Zeilen für visuelle Hierarchie */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
          >
            <span className="block md:inline">KFZ-Teile Altenberge</span>
            <span className="block text-corporate-highlight text-2xl sm:text-3xl md:text-5xl lg:text-7xl mt-2">Ersatzteile für jedes Fahrzeug</span>
          </motion.h1>
          
          {/* Untertitel mit Wertversprechen */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-corporate-highlight/80 max-w-2xl mx-auto leading-relaxed"
          >
            <span className="hidden sm:inline">Hochwertige Ersatzteile & Autoteile für Privatkunden und Werkstätten im Münsterland. Schnelle Lieferung, faire Preise, kompetente Beratung aus Altenberge.</span>
            <span className="sm:hidden">Ersatzteile & Autoteile für Werkstätten und Privatkunden. Schnelle Lieferung aus Altenberge.</span>
          </motion.p>
          
          {/* Call-to-Action Button Bereich */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="automotive" 
              size="lg"
              onClick={scrollToContact}
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover:scale-105 transition-transform duration-300"
            >
              Angebot anfordern
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
