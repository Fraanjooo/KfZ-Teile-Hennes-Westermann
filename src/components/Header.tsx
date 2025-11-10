/**
 * Header Component
 * 
 * Rendert die Hauptnavigation für die Kfz-Teile Website.
 * Features:
 * - Firmenlogo mit EB Garamond Schriftart für elegante Darstellung
 * - Navigation mit sanftem Scroll zur Kontakt-Sektion
 * - Professionelles Corporate Design mit Backdrop-Blur Effekt
 * - Responsive Design mit mobilfreundlichem Button
 * - Sticky Header für bessere Benutzerführung
 * 
 * Verwendet das Corporate Design System für konsistente Farbgebung
 * und die Google Font EB Garamond für das Firmenlogo.
 */

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Header Functional Component
 * Rendert die obere Navigationsleiste mit Logo und Angebot-Button
 */
const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Navigations-Funktion für "Angebot anfordern" Button
   * Scrollt zur Kontakt-Sektion auf der Startseite oder navigiert zur Startseite
   */
  const handleRequestQuote = () => {
    if (location.pathname === '/') {
      // Auf der Startseite: Scroll zur Kontakt-Sektion
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Auf anderen Seiten: Navigiere zur Startseite mit Kontakt-Anker
      window.location.href = '/#contact';
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-corporate-white shadow-lg border-corporate-light-gray' 
          : 'bg-corporate-white/95 border-corporate-light-gray'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Anklickbares Firmenlogo mit EB Garamond Schriftart */}
          <div className="flex items-center">
            <a href="/" className="text-lg sm:text-xl md:text-2xl text-corporate-dark-gray font-garamond hover:text-corporate-primary transition-colors">
              Kfz-Teile Hennes Westermann
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/blog" 
              className="text-corporate-dark-gray hover:text-corporate-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-corporate-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Blog
            </Link>
            <Button 
              variant="automotive" 
              onClick={handleRequestQuote}
              className="hover:scale-105 transition-transform duration-300"
            >
              Angebot anfordern
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <Link 
              to="/blog" 
              className="text-xs sm:text-sm text-corporate-dark-gray hover:text-corporate-primary transition-colors"
            >
              Blog
            </Link>
            <Button 
              variant="automotive" 
              size="sm" 
              onClick={handleRequestQuote}
              className="hover:scale-105 transition-transform duration-300 text-xs sm:text-sm px-3 py-2"
            >
              Angebot
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;