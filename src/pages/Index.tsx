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
        <title>KfZ-Teile Hennes Westermann - Ihr Experte für Fahrzeugteile</title>
        <meta 
          name="description" 
          content="KfZ-Teile Hennes Westermann bietet hochwertige Fahrzeugteile und professionellen Service in Altenberge. Ihr Partner für B2B und B2C Lösungen." 
        />
        <meta property="og:title" content="KfZ-Teile Hennes Westermann" />
        <meta property="og:description" content="Ihr Experte für hochwertige Fahrzeugteile und professionellen Service" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
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
