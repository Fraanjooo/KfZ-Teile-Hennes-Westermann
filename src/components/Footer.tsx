const Footer = () => {
  return (
    <footer className="bg-corporate-dark-gray text-corporate-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-corporate-primary rounded-lg flex items-center justify-center">
                <span className="text-corporate-white font-bold text-lg">AP</span>
              </div>
              <h3 className="text-xl font-bold">AutoParts Pro</h3>
            </div>
            <p className="text-corporate-medium-gray leading-relaxed">
              Your trusted partner for quality automotive parts. Serving both businesses and individual customers with excellence since 2010.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-corporate-medium-gray">
              <li>
                <a href="#services" className="hover:text-corporate-highlight transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-corporate-highlight transition-colors">
                  Get Quote
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-corporate-highlight transition-colors">
                  About Us
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
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-corporate-medium-gray">
              <p>📧 parts@yourcompany.com</p>
              <p>📞 (555) 123-4567</p>
              <p>📍 123 Auto Parts Blvd<br />Your City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-corporate-medium-gray/30 mt-8 pt-8 text-center text-corporate-medium-gray">
          <p>&copy; 2024 AutoParts Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;