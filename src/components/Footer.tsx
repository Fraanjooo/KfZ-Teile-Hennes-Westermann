/**
 * Footer Component
 * 
 * Footer section with company information including:
 * - Company branding (logo and description)
 * - Quick navigation links to main sections
 * - Contact information (email, phone, address)
 * - Copyright notice with current year
 * 
 * Uses a three-column responsive grid layout
 */

const Footer = () => {
  return (
    <footer className="bg-corporate-dark-gray text-corporate-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Kfz-Teile Hennes Westermann</h3>
            <p className="text-corporate-medium-gray leading-relaxed">
              Ihr vertrauensvoller Partner für hochwertige Kfz-Teile. Wir beliefern Geschäftskunden und Privatpersonen seit 2010 mit Exzellenz.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-corporate-medium-gray">
              <li>
                <a href="#services" className="hover:text-corporate-highlight transition-colors">
                  Unsere Leistungen
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-corporate-highlight transition-colors">
                  Angebot anfordern
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-corporate-highlight transition-colors">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-corporate-highlight transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontaktdaten</h4>
            <div className="space-y-2 text-corporate-medium-gray">
              <p>📧 teile@kfz-hennes-westermann.de</p>
              <p>📞 +49 (0) 123 456789</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-corporate-medium-gray/30 mt-8 pt-8 text-center text-corporate-medium-gray">
          <p>&copy; {new Date().getFullYear()} Kfz-Teile Hennes Westermann. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;