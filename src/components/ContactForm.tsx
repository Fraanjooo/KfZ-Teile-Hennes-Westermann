/**
 * ContactForm Component
 * 
 * Hauptkontaktformular für Kundenanfragen mit folgenden Features:
 * - Kundeninformationsfelder (Vorname, Nachname, E-Mail, Telefon)
 * - Textarea für detaillierte Teilebeschreibung
 * - Formularvalidierung und Loading-States
 * - Kontaktinformationsanzeige (E-Mail und Telefon)
 * 
 * Backend-Integration:
 * - Formular sendet über formsubmit.co an franzjoschmitt@gmail.com
 * - Direkter POST-Request ohne JavaScript-Backend erforderlich
 * - Zeigt Success-Toast nach Absendung
 * 
 * Verwendet das Corporate Design System für konsistente Darstellung
 * und responsive Grid-Layout für optimale UX auf allen Geräten.
 */

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";

// Zod validation schema for contact form
const contactFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "Vorname muss mindestens 2 Zeichen lang sein")
    .max(50, "Vorname darf maximal 50 Zeichen lang sein"),
  lastName: z.string()
    .trim()
    .min(2, "Nachname muss mindestens 2 Zeichen lang sein")
    .max(50, "Nachname darf maximal 50 Zeichen lang sein"),
  email: z.string()
    .trim()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .max(255, "E-Mail-Adresse darf maximal 255 Zeichen lang sein"),
  phone: z.string()
    .trim()
    .min(8, "Telefonnummer muss mindestens 8 Zeichen lang sein")
    .max(20, "Telefonnummer darf maximal 20 Zeichen lang sein")
    .optional()
    .or(z.literal("")),
  desiredPart: z.string()
    .trim()
    .min(10, "Beschreibung muss mindestens 10 Zeichen lang sein")
    .max(2000, "Beschreibung darf maximal 2000 Zeichen lang sein")
});

/**
 * ContactForm Functional Component
 * Rendert das Hauptkontaktformular mit Kontaktinformationen
 */
const ContactForm = () => {
  // State für Formulardaten
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredPart: ""
  });
  
  // Loading-State für Submit-Button
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast-Hook für Benachrichtigungen
  const { toast } = useToast();

  // Intersection Observer für Scroll-Animationen
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  /**
   * Handler für Eingabefeld-Änderungen (Input und Textarea)
   * Aktualisiert den entsprechenden Wert im formData State
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Submit-Handler für Formular
   * Validiert Eingaben mit Zod-Schema bevor Formular an formsubmit.co gesendet wird
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data with Zod schema
    const result = contactFormSchema.safeParse(formData);
    
    if (!result.success) {
      const errors = result.error.errors;
      toast({
        variant: "destructive",
        title: "Validierungsfehler",
        description: errors[0].message,
      });
      return;
    }
    
    // formsubmit.co übernimmt E-Mail-Versand - kein JavaScript-Backend nötig
    setIsLoading(true);
    
    // Success-Message nach kurzer Verzögerung (Formular wird weitergeleitet)
    setTimeout(() => {
      toast({
        title: "Anfrage gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden mit einem Angebot zurück.",
      });
      
      // Submit form to formsubmit.co
      (e.target as HTMLFormElement).submit();
    }, 500);
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-gradient-to-b from-corporate-light-gray to-corporate-white">
      <div className="container mx-auto px-6">
        {/* Sektion-Header mit Titel und Beschreibung */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Ersatzteile Angebot anfordern
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Sie suchen günstige Autoteile in Altenberge oder dem Münsterland? Teilen Sie uns mit, welches Ersatzteil Sie benötigen, und wir erstellen Ihnen ein unverbindliches Angebot von verschiedenen Herstellern – schnell, transparent und zu fairen Preisen.
          </p>
        </motion.div>

        {/* Grid-Layout: Kontaktinfo (1/3) + Formular (2/3) */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Linke Spalte: Kontaktinformationen */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-0 bg-corporate-primary text-corporate-white hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Kontakt</CardTitle>
                <CardDescription className="text-white">
                  Verschiedene Wege, unser Team zu erreichen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* E-Mail Kontakt */}
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">E-Mail</h4>
                    <p className="text-white">info@kfz-westermann.de</p>
                  </div>
                </div>
                
                {
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-corporate-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefon</h4>
                    <p className="text-white">+49 (0) 155 66486776</p>
                  </div>
                </div>
                }
                
              </CardContent>
            </Card>
          </motion.div>

          {/* Rechte Spalte: Kontaktformular */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate-dark-gray">Ihr Wunschteil anfragen</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und wir melden uns mit Preisen und Verfügbarkeit zurück.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Formular mit formsubmit.co Integration */}
                <form 
                  action="https://formsubmit.co/info@kfz-westermann.de" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {/* Erste Reihe: Vor- und Nachname */}
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

                  {/* Zweite Reihe: E-Mail und Telefon */}
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

                  {/* Textarea für Teilebeschreibung */}
                  <div>
                    <Label htmlFor="desiredPart">Beschreibung des gewünschten Teils *</Label>
                    <Textarea
                      id="desiredPart"
                      name="desiredPart"
                      value={formData.desiredPart}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[100px]"
                      placeholder="Bitte beschreiben Sie das benötigte Teil und geben Sie bestenfalls ihre Fahrgestellnummer ein (z.B. Bremsbeläge für SL500 (R129), Lichtmaschine für Porsche 964 WP0ZZZ..., Hydraulikpumpe für New Holland T7, etc.)"
                    />
                  </div>

                  {/* Submit Button mit Loading-State */}
                  <Button 
                    type="submit"  
                    disabled={isLoading}
                    variant="automotive"
                    className="w-full hover:scale-105 transition-transform duration-300"
                  >
                    {isLoading ? "Wird gesendet..." : "Anfrage senden"}
                  </Button>
                  
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;