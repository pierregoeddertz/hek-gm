import Unit from '../../../components/Unit';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Button from '../../../components/Button';

export default function ImprintPage() {
  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2">
          <Text as="h1" align={2} fontLarge>Impressum</Text>
        </Director>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Angaben gemäß § 5 TMG</Text>
        <Text align={1} as="p">
          <strong>HEK Gebäudemanagement GmbH</strong><br />
          St.-Florian Str. 3<br />
          64521 Groß-Gerau<br />
          Deutschland
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Vertreten durch</Text>
        <Text align={1} as="p">Sascha Maské (Geschäftsführer)</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Registereintrag</Text>
        <Text align={1} as="p">
          Eintragung im Handelsregister<br />
          Registergericht: Amtsgericht Darmstadt<br />
          Registernummer: HRB 51883
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Umsatzsteuer-ID</Text>
        <Text align={1} as="p">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE00723510504
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Kontakt</Text>
        <Text align={1} as="p">
          Telefon: +49-151-64657991<br />
          E-Mail: <Button href="mailto:smartflower@hek-gm.de" text="smartflower@hek-gm.de" underline aria-label="E-Mail an smartflower@hek-gm.de" /><br />
          Website: <Button href="https://hek-gm.de" text="www.hek-gm.de" underline target="_blank" rel="noopener noreferrer" aria-label="HEK-GM Website (öffnet neues Fenster)" />
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Geschäftsfelder</Text>
        <Text align={1} as="p">Die HEK Gebäudemanagement GmbH ist tätig in den Bereichen:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Mess-, Steuerungs-, Regelungs- & Elektrotechnik</li>
          <li>Kälte-, Klima- & Lüftungstechnik</li>
          <li>TGA-Planung & Projektleitung</li>
          <li>Gebäudemanagement</li>
          <li>Smartflower-Systeme und nachhaltige Energieerzeugung</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Berufsrecht</Text>
        <Text align={1} as="p">
          <strong>Berufsbezeichnung:</strong> Gebäudemanagement, Technische Gebäudeausrüstung<br />
          <strong>Zuständige Kammer:</strong> IHK Darmstadt Rhein Main Neckar<br />
          <strong>Verliehen durch:</strong> Deutschland
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>EU-Streitschlichtung</Text>
        <Text align={1} as="p">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <Button href="https://ec.europa.eu/consumers/odr/" text="https://ec.europa.eu/consumers/odr/" underline target="_blank" rel="noopener noreferrer" aria-label="EU Online Dispute Resolution (öffnet neues Fenster)" /><br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</Text>
        <Text align={1} as="p">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Haftung für Inhalte</Text>
        <Text align={1} as="p">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Haftung für Links</Text>
        <Text align={1} as="p">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Urheberrecht</Text>
        <Text align={1} as="p">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Bildnachweise</Text>
        <Text align={1} as="p">
          Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Eigene Fotografien und Projektdokumentationen</li>
          <li>Lizenzfreie Stock-Fotografien</li>
          <li>Partner- und Kundenprojekte (mit Genehmigung)</li>
        </ul>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Sollten Sie auf ein Bild aufmerksam werden, für das Sie die Rechte besitzen und das nicht ordnungsgemäß gekennzeichnet ist, kontaktieren Sie uns bitte umgehend.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Technische Umsetzung</Text>
        <Text align={1} as="p">
          Diese Website wurde entwickelt mit:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Next.js (React Framework)</li>
          <li>TypeScript</li>
          <li>Supabase (Datenbank und Backend)</li>
          <li>Vercel (Hosting und CDN)</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="p" style={{ fontSize: '0.9em', opacity: 0.8 }}>
          Stand: 26. Juli 2025
        </Text>
      </Unit>
    </>
  );
} 
