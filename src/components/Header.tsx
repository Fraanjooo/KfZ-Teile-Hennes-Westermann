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

/**
 * Header Functional Component
 * Rendert die obere Navigationsleiste mit Logo und Angebot-Button
 */
const Header = () => {
  const location = useLocation();

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
    <header className="bg-corporate-white/95 backdrop-blur-sm border-b border-corporate-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Anklickbares Firmenlogo mit EB Garamond Schriftart */}
          <div className="flex items-center">
            <a href="/" className="text-2xl text-corporate-dark-gray font-garamond hover:text-corporate-primary transition-colors">
              Kfz-Teile Hennes Westermann
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/blog" 
              className="text-corporate-dark-gray hover:text-corporate-primary transition-colors"
            >
              Blog
            </Link>
            <Button variant="automotive" onClick={handleRequestQuote}>
              Angebot anfordern
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <Link 
              to="/blog" 
              className="text-sm text-corporate-dark-gray hover:text-corporate-primary transition-colors"
            >
              Blog
            </Link>
            <Button variant="automotive" size="sm" onClick={handleRequestQuote}>
              Angebot
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;