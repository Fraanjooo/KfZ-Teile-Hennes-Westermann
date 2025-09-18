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
  return (
    <footer className="bg-corporate-dark-gray text-corporate-white py-12">
      <div className="container mx-auto px-6">
        {/* Dreispaltiges Grid-Layout für Footer-Inhalte */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Erste Spalte: Firmenbranding und Beschreibung */}
          <div>
            <h3 className="text-xl mb-4 font-garamond">Kfz-Teile Hennes Westermann</h3>
            <p className="text-corporate-medium-gray leading-relaxed">
              Ihr vertrauensvoller Partner für hochwertige Kfz-Teile. Wir beliefern Geschäftskunden und Privatpersonen.
            </p>
          </div>
          
          {/* Zweite Spalte: Schnellzugriff-Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-corporate-medium-gray">
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
          </div>
          
          {/* Dritte Spalte: Kontaktdaten */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontaktdaten</h4>
            <div className="space-y-2 text-corporate-medium-gray">
              <p>📧 info@kfz-westermann.de</p>
              <p></p>
            </div>
          </div>
        </div>
        
        {/* Copyright-Bereich mit Trennlinie */}
        <div className="border-t border-corporate-medium-gray/30 mt-8 pt-8 text-center text-corporate-medium-gray">
          <p>&copy; {new Date().getFullYear()} Kfz-Teile Hennes Westermann. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};



export default Footer;