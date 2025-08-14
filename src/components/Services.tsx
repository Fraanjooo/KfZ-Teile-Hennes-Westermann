import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, Truck, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "B2B Solutions",
      description: "Bulk orders for auto shops, dealerships, and repair facilities. Volume discounts and dedicated account management.",
      features: ["Wholesale pricing", "Custom invoicing", "Priority shipping"]
    },
    {
      icon: User,
      title: "Individual Customers",
      description: "High-quality parts for DIY enthusiasts and car owners. Expert guidance and competitive retail prices.",
      features: ["Expert advice", "Quality guarantee", "Easy returns"]
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick turnaround times with reliable shipping partners. Local and nationwide delivery options.",
      features: ["Same-day local", "2-day nationwide", "Tracking included"]
    },
    {
      icon: Wrench,
      title: "Expert Support",
      description: "Technical support and part identification assistance. Our team helps you find the right parts.",
      features: ["Technical guidance", "Part identification", "Installation tips"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-automotive-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-automotive-dark mb-4">
            Our Services
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Whether you're a business or individual customer, we have the parts and expertise to keep you moving.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-automotive-blue rounded-full w-16 h-16 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-automotive-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-automotive-gray mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-automotive-blue font-medium">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;