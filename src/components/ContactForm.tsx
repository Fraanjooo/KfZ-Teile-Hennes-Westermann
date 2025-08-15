/**
 * ContactForm Component
 * 
 * Main contact form for customer inquiries featuring:
 * - Customer information fields (first name, last name, email, phone)
 * - Part description textarea for detailed requests
 * - Form validation and loading states
 * - Contact information display (email and phone)
 * 
 * Backend Integration Required:
 * - Form submission needs to send email to franzjoschmitt@gmail.com
 * - Currently shows placeholder functionality
 * - Requires Supabase integration for email sending capabilities
 * 
 * TODO: Implement actual email sending via Supabase Edge Functions
 * TODO: Add form validation feedback
 * TODO: Consider adding file upload for part images
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredPart: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Using formsubmit.co for email sending - no JavaScript processing needed
    // The form will be submitted directly to formsubmit.co endpoint
    setIsLoading(true);
    
    // Show success message after brief delay (form will redirect)
    setTimeout(() => {
      toast({
        title: "Anfrage gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden mit einem Angebot zurück.",
      });
    }, 500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-corporate-light-gray to-corporate-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Angebot anfordern
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Teilen Sie uns mit, was Sie benötigen und wir erstellen Ihnen ein günstiges Angebot mit Verfügbarkeitsinformationen.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full border-0 bg-corporate-primary text-corporate-white">
              <CardHeader>
                <CardTitle className="text-2xl">Kontakt</CardTitle>
                <CardDescription className="text-corporate-highlight/80">
                  Verschiedene Wege, unser Team zu erreichen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">E-Mail</h4>
                    <p className="text-corporate-highlight/80">info@kfz-westermann.de</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefon</h4>
                    <p className="text-corporate-highlight/80">+49 (0) 123 456789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate-dark-gray">Ihr Wunschteil anfragen</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und wir melden uns mit Preisen und Verfügbarkeit zurück.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  action="https://formsubmit.co/franzjoschmitt@gmail.com" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-Mail-Adresse *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="desiredPart">Beschreibung des gewünschten Teils *</Label>
                    <Textarea
                      id="desiredPart"
                      name="desiredPart"
                      value={formData.desiredPart}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[100px]"
                      placeholder="Bitte beschreiben Sie das benötigte Teil (z.B. Bremsbeläge für Honda Civic 2018, Lichtmaschine für Ford F-150, etc.)"
                    />
                  </div>

                  <Button 
                    type="submit"  
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Wird gesendet..." : "Anfrage senden"}
                  </Button>
                  
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;