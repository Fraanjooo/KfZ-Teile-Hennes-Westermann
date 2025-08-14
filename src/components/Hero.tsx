import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-corporate-primary to-corporate-accent min-h-[600px] flex items-center justify-center text-corporate-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Car Parts
            <span className="block text-corporate-highlight">For Every Vehicle</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-corporate-highlight/80 max-w-2xl mx-auto leading-relaxed">
            Quality automotive parts for both businesses and individual customers. 
            Fast delivery, competitive prices, expert support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;