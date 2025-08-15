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

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
