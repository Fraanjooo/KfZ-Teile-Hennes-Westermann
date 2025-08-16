/**
 * Datenschutzerklärung Page Component
 * 
 * Seite mit Datenschutzerklärung für Kfz-Teile Hennes Westermann.
 * Enthält rechtliche Informationen über:
 * - Datenerhebung und -verarbeitung
 * - Verwendung von Cookies
 * - Kontaktformular-Datenverarbeitung
 * - Rechte der betroffenen Personen
 * - Kontaktdaten des Verantwortlichen
 * 
 * Verwendet das Corporate Design System für konsistente Darstellung
 * und responsive Layout für alle Endgeräte.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Datenschutz Functional Component
 * Rendert die Datenschutzerklärung mit Header und Footer
 */
const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hauptinhalt der Datenschutzerklärung */}
      <main className="py-20 bg-corporate-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Seitentitel */}
          <h1 className="text-4xl md:text-5xl font-bold text-corporate-dark-gray mb-8 font-garamond">
            Datenschutzerklärung
          </h1>
          
          {/* Einleitung */}
          <div className="prose prose-lg max-w-none text-corporate-medium-gray space-y-6">
            <p className="text-xl leading-relaxed mb-8">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
            </p>

            {/* Verantwortlicher */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">1. Verantwortlicher</h2>
              <div className="bg-corporate-light-gray/30 p-6 rounded-lg">
                <p className="font-semibold text-corporate-dark-gray">Kfz-Teile Hennes Westermann</p>
                <p>E-Mail: teile@kfz-hennes-westermann.de</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
            </section>

            {/* Datenerhebung */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">2. Datenerhebung auf unserer Website</h2>
              
              <h3 className="text-xl font-semibold text-corporate-dark-gray mb-3">Kontaktformular</h3>
              <p className="mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              
              <h3 className="text-xl font-semibold text-corporate-dark-gray mb-3">Server-Log-Dateien</h3>
              <p className="mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
            </section>

            {/* Zwecke der Datenverarbeitung */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">3. Zwecke der Datenverarbeitung</h2>
              <p className="mb-4">
                Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Bereitstellung der Website und ihrer Funktionalitäten</li>
                <li>Beantwortung von Kontaktanfragen</li>
                <li>Verbesserung unserer Website</li>
                <li>Erfüllung rechtlicher Verpflichtungen</li>
              </ul>
            </section>

            {/* Rechtsgrundlage */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">4. Rechtsgrundlage</h2>
              <p className="mb-4">
                Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage der folgenden Rechtsgrundlagen:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
              </ul>
            </section>

            {/* Ihre Rechte */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">5. Ihre Rechte</h2>
              <p className="mb-4">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              </ul>
            </section>

            {/* Datensicherheit */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">6. Datensicherheit</h2>
              <p className="mb-4">
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
              </p>
            </section>

            {/* Aktualität */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="mb-4">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2025. Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </section>

            {/* Kontakt */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">8. Kontakt</h2>
              <p className="mb-4">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an:
              </p>
              <div className="bg-corporate-light-gray/30 p-6 rounded-lg">
                <p className="font-semibold text-corporate-dark-gray">Kfz-Teile Hennes Westermann</p>
                <p>E-Mail: teile@kfz-hennes-westermann.de</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
            </section>

            {/* Stand der Erklärung */}
            <div className="bg-corporate-primary/10 p-6 rounded-lg mt-12">
              <p className="text-sm text-corporate-medium-gray">
                <strong>Stand dieser Datenschutzerklärung:</strong> August 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;