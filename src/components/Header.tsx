/**
 * Header Component
 * 
 * This component renders the main navigation header for the car parts website.
 * Features:
 * - Company logo with "AP" initials
 * - Navigation with smooth scroll to contact section
 * - Professional corporate styling using the design system
 * - Responsive design with mobile-friendly button
 * 
 * TODO: Add mobile menu for full navigation if needed
 */

import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-corporate-white/95 backdrop-blur-sm border-b border-corporate-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-corporate-dark-gray">Kfz-Teile Hennes Westermann</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="automotive" onClick={scrollToContact}>
              Angebot anfordern
            </Button>
          </nav>
          
          <Button variant="automotive" className="md:hidden" onClick={scrollToContact}>
            Angebot
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;