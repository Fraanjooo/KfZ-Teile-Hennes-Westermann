/**
 * Footer Component
 * 
 * Footer-Bereich mit Firmeninformationen einschließlich:
 * - Firmenbranding (Logo und Beschreibung)
 * - Schnellnavigation zu Hauptbereichen der Website
 * - Kontaktinformationen (E-Mail, Telefon)
 * - Links zu rechtlichen Seiten (Datenschutzerklärung)
 * - Copyright-Hinweis mit aktuellem Jahr
 * 
 * Verwendet ein dreispaltiges responsives Grid-Layout
 * mit Corporate Design Farben für professionelle Darstellung.
 */

import { List } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/**
   * Navigations-Funktion für "Angebot anfordern" Button
   * Scrollt zur Kontakt-Sektion auf der Startseite oder navigiert zur Startseite
   */
   const handleRequestQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // verhindert hartes Anchor-Springen

  const isHomePage = window.location.pathname === '/';
  
  if (isHomePage) {
    // Auf der Startseite: Smooth Scroll zu den entsprechenden Sektionen
    if (e.currentTarget.textContent === "Angebot anfordern") {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.currentTarget.textContent === "Unsere Leistungen") {
      const servicesSection = document.getElementById('services');
      servicesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Auf anderen Seiten: Navigiere zur Startseite mit entsprechendem Anker
    if (e.currentTarget.textContent === "Angebot anfordern") {
      window.location.href = '/?scroll=contact';
    } else if (e.currentTarget.textContent === "Unsere Leistungen") {
      window.location.href = '/?scroll=services';
    }
  }
};

/**
 * Footer Functional Component
 * Rendert den Fußbereich der Website mit Firmeninfos und Navigation
 */
const Footer = () => {
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

  return (
    <footer ref={ref} className="bg-corporate-dark-gray text-corporate-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Dreispaltiges Grid-Layout für Footer-Inhalte */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Erste Spalte: Firmenbranding und Beschreibung */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl mb-3 md:mb-4 font-garamond">KFZ-Teile Hennes Westermann</h3>
            <p className="text-corporate-medium-gray leading-relaxed text-sm sm:text-base">
              <span className="hidden sm:inline">Ihr zuverlässiger Partner für hochwertige Ersatzteile und Autoteile in Altenberge und dem Münsterland. Seit 2025 beliefern wir Werkstätten, Autohäuser und Privatkunden mit Qualität, Fachkompetenz und fairen Preisen.</span>
              <span className="sm:hidden">Ersatzteile und Autoteile in Altenberge – für Werkstätten und Privatkunden seit 2025.</span>
            </p>
          </motion.div>
          
          {/* Zweite Spalte: Schnellzugriff-Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-corporate-medium-gray text-sm sm:text-base">
              <li>
                <a href="/#services" className="hover:text-corporate-highlight transition-colors" onClick={handleRequestQuote}>
                  Unsere Leistungen
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-corporate-highlight transition-colors" onClick={handleRequestQuote}>
                  Angebot anfordern
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="hover:text-corporate-highlight transition-colors">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a href="/impressum" className="hover:text-corporate-highlight transition-colors">
                  Impressum
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Dritte Spalte: Kontaktdaten */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Kontaktdaten</h4>
            <div className="space-y-2 text-corporate-medium-gray text-sm sm:text-base">
              <p>📧 info@kfz-westermann.de</p>
              <p></p>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright-Bereich mit Trennlinie */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-corporate-medium-gray/30 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-corporate-medium-gray text-xs sm:text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Kfz-Teile Hennes Westermann. Alle Rechte vorbehalten.</p>
        </motion.div>
      </div>
    </footer>
  );
};



export default Footer;