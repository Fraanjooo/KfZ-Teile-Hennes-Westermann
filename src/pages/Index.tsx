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
      {/* ✅ Optimized Title & Meta Description for SEO */}
      <Helmet>
        <title>KFZ-Teile Altenberge | Ersatzteile & Autoteile günstig</title>
        <meta 
          name="description" 
          content="KFZ-Teile Hennes Westermann: Ersatzteile & Autoteile für Altenberge & Münsterland. B2B-Großhandel & Privatkunden. Schnelle Lieferung, Fachberatung, faire Preise ✓" 
        />
        <meta name="keywords" content="KFZ Teile Altenberge, Ersatzteile kaufen, Autoteile kaufen, günstige Autoteile Münsterland, Autoersatzteile bestellen, Werkstattbedarf Altenberge, Bremsen, Filter, Motor, Getriebe, KFZ Teile Westermann, Autozubehör online" />
        <meta property="og:title" content="KFZ-Teile Altenberge | Ersatzteile & Autoteile kaufen | Hennes Westermann" />
        <meta property="og:description" content="Ihr KFZ-Teile Experte in Altenberge: Ersatzteile & Autoteile für alle Fahrzeuge. Für Werkstätten & Privatkunden im Münsterland." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:locale" content="de_DE" />
        <link rel="canonical" href={window.location.origin} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* ✅ JSON-LD Structured Data for LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoPartsStore",
            "name": "KFZ-Teile Hennes Westermann",
            "description": "Ersatzteile und Autoteile für Privatkunden und Werkstätten in Altenberge und dem Münsterland",
            "url": window.location.origin,
            "telephone": "+49-155-66486776",
            "email": "info@kfz-westermann.de",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Hohenhorst 61",
              "addressLocality": "Altenberge",
              "postalCode": "48341",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "52.049722",
              "longitude": "7.470833"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "52.049722",
                "longitude": "7.470833"
              },
              "geoRadius": "50000"
            },
            "priceRange": "€€",
            "openingHours": "Mo-Fr 08:00-18:00",
            "paymentAccepted": ["Cash", "Credit Card", "Invoice"],
            "currenciesAccepted": "EUR"
          })}
        </script>
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
