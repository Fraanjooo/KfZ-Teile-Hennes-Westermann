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

/**
 * Header Functional Component
 * Rendert die obere Navigationsleiste mit Logo und Angebot-Button
 */
const Header = () => {
  /**
   * Scroll-Funktion für sanftes Navigieren zur Kontakt-Sektion
   * Verwendet die native scrollIntoView API für smooth scrolling
   */
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-corporate-white/95 backdrop-blur-sm border-b border-corporate-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Firmenlogo mit EB Garamond Schriftart */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-corporate-dark-gray font-garamond">
              Kfz-Teile Hennes Westermann
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="automotive" onClick={scrollToContact}>
              Angebot anfordern
            </Button>
          </nav>
          
          {/* Mobile Navigation Button */}
          <Button variant="automotive" className="md:hidden" onClick={scrollToContact}>
            Angebot
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;