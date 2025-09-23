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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

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
   * Da formsubmit.co verwendet wird, erfolgt der eigentliche Versand über POST
   * JavaScript zeigt nur Success-Toast an
   */
  const handleSubmit = (e: React.FormEvent) => {
    // formsubmit.co übernimmt E-Mail-Versand - kein JavaScript-Backend nötig
    setIsLoading(true);
    
    // Success-Message nach kurzer Verzögerung (Formular wird weitergeleitet)
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
        {/* Sektion-Header mit Titel und Beschreibung */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-4">
            Angebot anfordern
          </h2>
          <p className="text-xl text-corporate-medium-gray max-w-2xl mx-auto">
            Teilen Sie uns mit, was Sie benötigen und wir erstellen Ihnen ein günstiges Angebot mit Verfügbarkeitsinformationen.
          </p>
        </div>

        {/* Grid-Layout: Kontaktinfo (1/3) + Formular (2/3) */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Linke Spalte: Kontaktinformationen */}
          <div className="lg:col-span-1">
            <Card className="h-full border-0 bg-corporate-primary text-corporate-white">
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
          </div>

          {/* Rechte Spalte: Kontaktformular */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
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