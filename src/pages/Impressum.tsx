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

import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Impressum Functional Component
 * Rendert die rechtlichen Pflichtangaben nach § 5 TMG
 */
const Impressum = () => {
  return (
    <>
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
                Angaben gemäß § 5 TMG (Telemediengesetz)
              </p>
            </header>

            {/* Anbieter-Identifikation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Anbieter
              </h2>
              <div className="bg-corporate-light-gray p-4 rounded-lg">
                <p className="font-semibold text-corporate-dark-blue text-lg">
                  Kfz-Teile Hennes Westermann
                </p>
                <p className="text-corporate-medium-gray mt-2">
                  Einzelunternehmen
                </p>
              </div>
            </section>

            {/* Verantwortlicher und Kontaktdaten */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Verantwortlich für den Inhalt
              </h2>
              <div className="space-y-2 text-corporate-medium-gray">
                <p><strong>Inhaber:</strong> Hennes Westermann</p>
                <p><strong>Anschrift:</strong> Hohenhorst 61</p>
                <p className="ml-16">48341 Altenberge</p>
                <p className="ml-16">Deutschland</p>
                <p><strong>E-Mail:</strong> 
                  <a href="mailto:info@kfz-westermann.de" 
                     className="text-corporate-orange hover:underline ml-2">
                    info@kfz-westermann.de
                  </a>
                </p>
              </div>
            </section>

            {/* Umsatzsteuer-Identifikation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p className="text-corporate-medium-gray">
                Gemäß § 27a Umsatzsteuergesetz: <strong>DE454161175</strong>
              </p>
            </section>

            {/* Rechtsform und Registereintragung */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Rechtsform
              </h2>
              <p className="text-corporate-medium-gray">
                Einzelunternehmen - Ein Eintrag im Handelsregister ist nicht erforderlich.
              </p>
            </section>

            {/* Verantwortlich für journalistisch-redaktionelle Inhalte */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Verantwortlich für journalistisch-redaktionelle Inhalte
              </h2>
              <p className="text-corporate-medium-gray">
                Gemäß § 55 Abs. 2 RStV:<br />
                Hennes Westermann<br />
                Hohenhorst 61<br />
                48341 Altenberge
              </p>
            </section>

            {/* Haftungsausschluss */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Haftungsausschluss
              </h2>
              
              <div className="space-y-4 text-corporate-medium-gray">
                <div>
                  <h3 className="font-semibold text-corporate-dark-blue mb-2">
                    Haftung für Inhalte
                  </h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-corporate-dark-blue mb-2">
                    Haftung für Links
                  </h3>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-corporate-dark-blue mb-2">
                    Urheberrecht
                  </h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>

            {/* Online-Streitbeilegung */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-corporate-dark-blue mb-4">
                Online-Streitbeilegung
              </h2>
              <p className="text-corporate-medium-gray">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-corporate-orange hover:underline ml-2">
                  https://ec.europa.eu/consumers/odr/
                </a><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

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