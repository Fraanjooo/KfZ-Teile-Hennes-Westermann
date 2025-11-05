/**
 * Index Page Component
 * 
 * Main landing page that orchestrates all website sections:
 * - Header: Navigation and branding
 * - Hero: Main call-to-action and value propositions  
 * - Services: B2B and B2C service offerings
 * - ContactForm: Customer inquiry form (requires Supabase for email)
 * - Footer: Company information and copyright
 * 
 * This page uses a single-page application layout with smooth scrolling
 * between sections for optimal user experience.
 */

import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KFZ-Teile Altenberge | Ersatzteile & Autoteile | Hennes Westermann</title>
        <meta 
          name="description" 
          content="KFZ-Teile Hennes Westermann in Altenberge: Günstige Ersatzteile & Autoteile für Privatkunden & Werkstätten im Münsterland. Schnelle Lieferung ✓ Fachberatung ✓" 
        />
        <meta name="keywords" content="KFZ Teile Altenberge, Ersatzteile kaufen, Autoteile kaufen, günstige Autoteile Münsterland, Autoersatzteile bestellen, Werkstattbedarf Altenberge, Bremsen, Filter, Motor, Getriebe" />
        <meta property="og:title" content="KFZ-Teile Altenberge | Ersatzteile & Autoteile kaufen | Hennes Westermann" />
        <meta property="og:description" content="Ihr KFZ-Teile Experte in Altenberge: Ersatzteile & Autoteile für alle Fahrzeuge. Für Werkstätten & Privatkunden im Münsterland." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:locale" content="de_DE" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
};

export default Index;
