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
          
          {/* Hauptinhalt der Datenschutzerklärung */}
          <div className="prose prose-lg max-w-none text-corporate-medium-gray space-y-8">
            
            {/* §1 Information über die Erhebung personenbezogener Daten */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§1 Information über die Erhebung personenbezogener Daten</h2>
              
              <p className="mb-4">
                Als Betreiber dieser Seiten nehmen wir den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              
              <p className="mb-4">
                (1) Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Webseite. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Bestandsdaten (Name, Adresse, etc.), Kontaktdaten (E-Mail-Adressen, Telefon- und Faxnummer etc.), Inhaltsdaten (Bilder, Videos, Text etc.), Nutzungsdaten (Besuchte Webseite, Zugriffszeiten, etc.) und Kommunikationsdaten (IP-Adresse, Geräte- und Browserinformationen, etc.).
              </p>
              
              <p className="mb-4">
                (2) Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DSGVO) ist Hennes Westermann, Hohenhorst 61 in 48341 Altenberge, info@kfz-westermann.de
              </p>
              
              <p className="mb-4">
                Weitere Kontaktmöglichkeiten finden Sie in unserem Impressum. Unseren Datenschutzbeauftragten erreichen Sie unter info@kfz-westermann.de oder unserer Postadresse mit dem Zusatz „der Datenschutzbeauftragte".
              </p>
              
              <p className="mb-4">
                (3) Bei Ihrer Kontaktaufnahme mit uns per E-Mail oder über ein Kontaktformular werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer) von uns gespeichert, um Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
              </p>
              
              <p className="mb-4">
                (4) Falls wir für einzelne Funktionen unseres Angebots auf beauftragte Dienstleister zurückgreifen oder Ihre Daten für werbliche Zwecke nutzen möchten, werden wir Sie untenstehend im Detail über die jeweiligen Vorgänge informieren. Dabei nennen wir auch die festgelegten Kriterien der Speicherdauer.
              </p>
            </section>

            {/* §2 Erhebung personenbezogener Daten bei Besuch unserer Website */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§2 Erhebung personenbezogener Daten bei Besuch unserer Website</h2>
              
              <p className="mb-4">
                (1) Bei der rein informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server unseres dogado GmbH (dogado.de) übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DSGVO).:
              </p>
              
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
                <li>Inhalt der Anforderung (konkrete Seite)</li>
                <li>Zugriffsstatus/HTTP-Statuscode</li>
                <li>jeweils übertragene Datenmenge</li>
                <li>Website, von der die Anforderung kommt</li>
                <li>Browser</li>
                <li>Betriebssystem und dessen Oberfläche</li>
                <li>Sprache und Version der Browsersoftware.</li>
              </ul>
              
              <p className="mb-4">
                Die gespeicherten Daten werden ausschließlich zu statistischen Zwecken ausgewertet, eine Weitergabe an Dritte findet weder zu kommerziellen noch zu nichtkommerziellen Zwecken statt.
              </p>
              
              <p className="mb-4">
                Diese Daten können ferner nicht bestimmten Personen zugeordnet werden. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.
              </p>
              
              <p className="mb-4">
                Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten (E-Mail-Adressen, Namen, Anschriften) besteht, so erfolgt die Preisgabe dieser Daten seitens des Nutzers auf ausdrücklich freiwilliger Basis. Auch hier werden Ihre Daten vertraulich behandelt und nicht an Dritte weitergegeben.
              </p>
              
              <p className="mb-4">
                Die Speicherung der Daten findet ausschließlich in Deutschland und innerhalb der Europäischen Union statt.
              </p>
            </section>

            {/* §3 Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§3 Cookies</h2>
              
              <p className="mb-4">
                (1) Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung unserer Website Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt (hier durch uns), bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.
              </p>
              
              <p className="mb-4">
                (2) Einsatz von Cookies:<br />
                Diese Website nutzt folgende Arten von Cookies, deren Umfang und Funktionsweise im Folgenden erläutert werden:<br />
                - Transiente Cookies (dazu b)<br />
                - Persistente Cookies (dazu c).
              </p>
              
              <p className="mb-4">
                Transiente Cookies werden automatisiert gelöscht, wenn Sie den Browser schließen. Dazu zählen insbesondere die Session-Cookies. Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere Website zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder den Browser schließen.
              </p>
              
              <p className="mb-4">
                Persistente Cookies werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen.
              </p>
              
              <p className="mb-4">
                Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie eventuell nicht alle Funktionen dieser Website nutzen können.
              </p>
              
              <p className="mb-4">
                Bitte lesen Sie zur Einrichtung von Cookies sozialer Medien (Facebook, Twitter, etc.) unsere Hinweise zu den einzelnen Drittanbietern.
              </p>
            </section>

            {/* §4 Weitere Funktionen und Angebote unserer Webseite */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§4 Weitere Funktionen und Angebote unserer Webseite</h2>
              
              <p className="mb-4">
                Kfz-Teile Hennes Westermann bietet Möglichkeiten zur Kommunikation über das Internet an.
              </p>
              
              <p className="mb-4">
                (1) Neben der rein informatorischen Nutzung unserer Webseite bieten wir verschiedene Leistungen an, die Sie bei Interesse nutzen können. Dazu müssen Sie in der Regel personenbezogene Daten angeben, die wir zur Erbringung der jeweiligen Leistung nutzen und für die die zuvor genannten Grundsätze zur Datenverarbeitung gelten.
              </p>
              
              <p className="mb-4">
                Für die Kommunikation bitten wir das Kontaktformular zu verwenden. Darüber hinaus finden Sie in unserem Internetangebot u.U. weitere E-Mail-Adressen einzelner Stellen oder Personen. Auch an diese Adressen können Sie E-Mails senden. Möchten Sie E-Mails mit Dateianhängen senden, so beachten Sie bitte, dass wir nicht alle auf dem Markt verfügbaren Dateiformate und Anwendungen unterstützen können. In Einzelfällen kann es möglich sein, dass die E-Mail nicht verarbeitet werden kann.
              </p>
              
              <p className="mb-4">
                Diese Hinweise gelten nur für die Kommunikation mit der Simone Wendland und gelten nicht für Verweise auf Angebote Dritter.
              </p>
              
              <p className="mb-4">
                Wir weisen darauf hin, dass bei der elektronischen Kommunikation eine unbefugte Kenntnisnahme oder Verfälschung auf dem Übertragungsweg nicht ausgeschlossen werden kann.
              </p>
              
              <p className="mb-4">
                (2) Teilweise bedienen wir uns zur Verarbeitung Ihrer Daten externer Dienstleister. Diese wurden von uns sorgfältig ausgewählt und beauftragt, sind an unsere Weisungen gebunden und werden regelmäßig kontrolliert.
              </p>
              
              <p className="mb-4">
                (3) Soweit unsere Dienstleister oder Partner ihren Hauptsitz in einem Staat außerhalb des Europäischen Wirtschaftsraumes (EWR) haben, informieren wir Sie über die Folgen dieses Umstands in der Beschreibung des Angebotes.
              </p>
            </section>

            {/* §5 Urheberrecht */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§5 Urheberrecht</h2>
              
              <p className="mb-4">
                Texte, Bilder und Grafiken einschließlich deren Anordnung auf der Internetseite von Kfz-Teile Hennes Westermann unterliegen dem Schutz des Urheberrechts. Die Simone Wendland gestattet die Übernahme von Texten in Datenbestände, die ausschließlich für den privaten Gebrauch eines Nutzers bestimmt sind. Die Übernahme und Nutzung der Texte, Bilder und Grafiken zu anderen Zwecken bedürfen der schriftlichen Zustimmung. Bitte wenden Sie sich über unser Kontaktformular an uns. Soweit Inhalte zulässigerweise gespeichert, vervielfältigt oder verbreitet werden, muss auf das Urheberrecht des Hennes Westermann bzw. der jeweiligen Copyright-Inhaber hingewiesen werden.
              </p>
              
              <p className="mb-4">
                Wer das Urheber-/Marken- oder Namensrecht verletzt, muss mit der Geltendmachung von Unterlassungs- und Schadensersatzansprüchen durch den Rechteinhaber, bei Verletzungen des Urheber- und Markenrechts auch mit Strafverfolgung rechnen.
              </p>
            </section>

            {/* §6 Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§6 Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten</h2>
              
              <p className="mb-4">
                (1) Falls Sie eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, können Sie diese jederzeit gem. Art. 7 Abs. 3 DSGVO widerrufen. Ein solcher Widerruf beeinflusst die Zulässigkeit der Verarbeitung Ihrer personenbezogenen Daten, nachdem Sie ihn gegenüber uns ausgesprochen haben.
              </p>
              
              <p className="mb-4">
                (2) Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung stützen, können Sie Widerspruch gem. Art. 21 DSGVO gegen die Verarbeitung einlegen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.
              </p>
              
              <p className="mb-4">
                (3) Selbstverständlich können Sie der Verarbeitung Ihrer personenbezogenen Daten für Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Über Ihren Werbewiderspruch können Sie uns unter folgenden Kontaktdaten informieren:
              </p>
              
              <div className="bg-corporate-light-gray/30 p-6 rounded-lg mb-4">
                <p className="font-semibold text-corporate-dark-gray">Kfz-Teile Hennes Westermann</p>
                <p>Hohenhorst 61</p>
                <p>48341 Altenberge</p>
                <p>Telefon: +49 (0) 155 66486776</p>
                <p>E-Mail: info@kfz-westermann.de</p>
              </div>
            </section>

            {/* §7 Geltung von Nutzungsbedingungen / Haftung */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§7 Geltung von Nutzungsbedingungen / Haftung</h2>
              
              <p className="mb-4">
                (1) Der Haftungsausschluss und die Nutzungsbedingungen sind als Teil des Internetangebotes von Kfz-Teile Hennes Westermann zu betrachten. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
              </p>
              
              <p className="mb-4">
                (2) Kfz-Teile Hennes Westermann stellt alle Informationen und Bestandteile der Internetseite nach bestem Wissen und Gewissen zusammen. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann nicht übernommen werden. Ebenso wenig haftet Kfz-Teile Hennes Westermann für etwaige Schäden, die beim Abrufen oder Herunterladen von Daten aus dieser Internetseite durch Computerviren verursacht werden.
              </p>
            </section>

            {/* §8 Links zu anderen Websites */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§8 Links zu anderen Websites</h2>
              
              <p className="mb-4">
                Unser Online-Angebot enthält Links zu anderen Websites. Wir haben keinen Einfluss darauf, dass deren Betreiber die Datenschutzbestimmungen einhalten.
              </p>
              
              <p className="mb-4">
                Wir sind als Anbieter für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Von diesen eigenen Inhalten sind unter Umständen Links auf die von anderen Anbietern bereitgehaltenen Inhalte zu unterscheiden. Für fremde Inhalte, die über Links zur Nutzung bereitgestellt werden und besonders gekennzeichnet sind, übernehmen wir keine Verantwortung und machen uns deren Inhalt nicht zu Eigen. Für illegale, fehlerhafte oder unvollständige Inhalte sowie für Schäden, die durch die Nutzung oder Nichtnutzung der Informationen entstehen, haftet allein der Anbieter der Website, auf die verwiesen wurde. Für fremde Hinweise ist die Redaktion nur dann verantwortlich, wenn sie von ihnen, das heißt auch von einem eventuellen rechtswidrigen bzw. strafbaren Inhalt, positive Kenntnis hat, und es technisch in einem überschaubaren Zeitraum möglich und zumutbar ist, deren Nutzung zu verhindern.
              </p>
              
              <p className="mb-4">
                Ihre Fragen und Anregungen zum Thema Datenschutz sind uns sehr willkommen und wichtig. Sie können uns unter folgender Adresse erreichen: info@kfz-westermann.de
              </p>
            </section>

            {/* §9 Kontaktformular */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§9 Kontaktformular</h2>
              
              <p className="mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen per E-Mail an uns übertragen und gespeichert. Eine serverseitige Speicherung Ihrer Kontaktaufnahme findet nicht statt. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            {/* §10 Rechte der betroffenen Personen */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§10 Rechte der betroffenen Personen</h2>
              
              <p className="mb-4">
                Wir informieren Sie nach Artikel 13 der EU Datenschutz-Grundverordnung (DSGVO) gerne und ausführlich über die Verarbeitung Ihrer personenbezogenen Daten (nachfolgend nur noch „Daten" genannt).
              </p>
              
              <p className="mb-4">
                Nachfolgend erläutern wir, welche Daten wir von Ihnen zu welchen Zwecken verarbeiten und welche Rechte Sie diesbezüglich haben.
              </p>
              
              <p className="mb-4">
                Die Verarbeitung Ihrer Daten erfolgt auf der Basis der von Ihnen erteilten Einwilligung zur Aufnahme in den Newsletter, der Kontaktaufnahme mit uns und weiterer Angebote auf unserer Webseite.
              </p>
              
              <h3 className="text-xl font-semibold text-corporate-dark-gray mb-3">Dauer der Verarbeitung</h3>
              <p className="mb-4">
                Wir verarbeiten Ihre Daten nur so lange, wie es zur Erfüllung der oben genannten Zwecke oder geltender Rechtsvorschriften sowie der Pflege unserer Beziehung zu Ihnen erforderlich ist.
              </p>
              
              <p className="mb-4">
                Solange Sie nicht widersprechen, werden wir Ihre Daten zum Versand des Newsletters nutzen. Sollten Sie die Löschung Ihrer Daten wünschen, werden wir Ihre Daten unverzüglich löschen, soweit der Löschung nicht rechtliche Aufbewahrungsfristen entgegenstehen.
              </p>
              
              <p className="mb-4">
                (1) Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Auskunft über die Verarbeitung Ihrer Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung (Art. 16 DSGVO) oder Löschung (Art. 17 DSGVO) Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerruf Ihrer gegebenen Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              
              <p className="mb-4">
                (2) Sie haben zudem gem. Art. 77 DSGVO das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </p>
              
              <p className="mb-4">
                Die für uns zuständige Aufsichtsbehörde ist:
              </p>
              
              <div className="bg-corporate-light-gray/30 p-6 rounded-lg mb-4">
                <p className="font-semibold text-corporate-dark-gray">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                <p>Helga Block</p>
                <p>Postfach 20 04 44</p>
                <p>40102 Düsseldorf</p>
                <p>Kavalleriestraße 2-4</p>
                <p>40213 Düsseldorf</p>
                <p>Telefon: 02 11/384 24-0</p>
                <p>Telefax: 02 11/384 24-10</p>
                <p>E-Mail: poststelle@ldi.nrw.de</p>
                <p>Homepage: http://www.ldi.nrw.de</p>
              </div>
              
              <p className="mb-4">
                Wir hoffen, Ihnen mit diesen Informationen bei der Wahrnehmung Ihrer Rechte weiter geholfen zu haben. Falls Sie weitere Informationen zu den Datenschutzbestimmungen wünschen, lesen Sie bitte aufmerksam unsere Datenschutzerklärung oder fragen Sie bei Ihrer Aufsichtsbehörde nach.
              </p>
            </section>

            {/* §11 SSL-Verschlüsselung */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§11 SSL-Verschlüsselung</h2>
              
              <p className="mb-4">
                Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>

            {/* §12 Kommentarfunktion auf dieser Website */}
            <section>
              <h2 className="text-2xl font-bold text-corporate-dark-gray mb-4">§12 Kommentarfunktion auf dieser Website</h2>
              
              <p className="mb-4">
                Für die Kommentarfunktion auf dieser Seite werden neben Ihrem Kommentar auch Angaben zum Zeitpunkt der Erstellung des Kommentars, Ihre E-Mail-Adresse und der von Ihnen gewählte Name gespeichert.
              </p>
              
              <h3 className="text-xl font-semibold text-corporate-dark-gray mb-3">Speicherung der IP Adresse</h3>
              <p className="mb-4">
                Unsere Kommentarfunktion speichert die IP-Adressen der Nutzer, die Kommentare verfassen. Ihre Kommentare auf unserer Seite werden vor der Freischaltung geprüft. Wir benötigen diese Daten, um im Falle von Rechtsverletzungen wie Beleidigungen oder strafrechtlich relevante Sachverhalten gegen den Verfasser vorgehen zu können.
              </p>
            </section>

            {/* Stand der Erklärung */}
            <div className="bg-corporate-primary/10 p-6 rounded-lg mt-12">
              <p className="text-sm text-corporate-medium-gray">
                <strong>Stand dieser Datenschutzerklärung:</strong> {new Date().toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
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