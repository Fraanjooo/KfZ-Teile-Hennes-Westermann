/**
 * Impressum Component
 * 
 * Impressum-Seite für Kfz-Teile Hennes Westermann nach § 5 TMG.
 * Enthält alle rechtlich erforderlichen Angaben für deutsche Websites
 * einschließlich Anbieterkennzeichnung, Kontaktdaten und rechtlichen Hinweisen.
 * 
 * Verwendet das Corporate Design System für konsistente Darstellung
 * mit Header- und Footer-Navigation.
 */

import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Impressum Functional Component
 * Rendert die rechtlichen Pflichtangaben nach § 5 TMG
 */
const Impressum = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - KfZ-Teile Hennes Westermann</title>
        <meta 
          name="description" 
          content="Impressum und rechtliche Angaben von KfZ-Teile Hennes Westermann gemäß § 5 TMG." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${window.location.origin}/impressum`} />
      </Helmet>

      <Header />
      <main className="bg-corporate-light-gray min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Seitentitel */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-corporate-dark-blue mb-4">
                Impressum
              </h1>
              <p className="text-corporate-medium-gray">
                Angaben gemäß § 5 TMG
              </p>
            </header>

            {/* Hauptinhalt des Impressums */}
            <div className="space-y-8 text-corporate-medium-gray">
              
              {/* Anbieter */}
              <section>
                <div className="bg-corporate-light-gray p-6 rounded-lg">
                  <p className="font-semibold text-corporate-dark-blue text-lg mb-2">
                    Kfz-Teile Hennes Westermann
                  </p>
                  <p>Hohenhorst 61</p>
                  <p>48341 Altenberge</p>
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                  Kontakt:
                </h2>
                <div className="space-y-2">
                  <p><strong>Telefon:</strong> +49 (0) 155 66486776</p>
                  <p><strong>E-Mail:</strong> 
                    <a href="mailto:info@kfz-westermann.de" 
                       className="text-corporate-orange hover:underline ml-2">
                      info@kfz-westermann.de
                    </a>
                  </p>
                </div>
              </section>

              {/* Rechtsform */}
              <section>
                <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                  Rechtsform:
                </h2>
                <p>Einzelunternehmen</p>
              </section>

              {/* Umsatzsteuer-Identifikationsnummer */}
              <section>
                <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                  Umsatzsteuer-Identifikationsnummer.:
                </h2>
                <p><strong>DE454161175</strong></p>
              </section>

              {/* Verantwortlich für den Inhalt */}
              <section>
                <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                  Verantwortlich für den Inhalt i.S.d. § 18 Abs. 2 MStV:
                </h2>
                <div className="space-y-1">
                  <p>Hennes Westermann</p>
                  <p>Hohenhorst 61</p>
                  <p>48341 Altenberge</p>
                </div>
              </section>

              {/* Streitbeilegung */}
              <section>
                <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                  Streitbeilegung:
                </h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>

            {/* Zeitstempel */}
            <footer className="border-t border-corporate-light-gray pt-4 mt-8">
              <p className="text-sm text-corporate-medium-gray">
                Stand: {new Date().toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </footer>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Impressum;