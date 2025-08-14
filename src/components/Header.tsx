import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-automotive-light sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-automotive-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AP</span>
            </div>
            <h1 className="text-2xl font-bold text-automotive-dark">AutoParts Pro</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-automotive-gray hover:text-automotive-blue transition-colors">
              Services
            </a>
            <a href="#contact" className="text-automotive-gray hover:text-automotive-blue transition-colors">
              Contact
            </a>
            <Button variant="automotive" onClick={scrollToContact}>
              Get Quote
            </Button>
          </nav>
          
          <Button variant="automotive" className="md:hidden" onClick={scrollToContact}>
            Quote
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;