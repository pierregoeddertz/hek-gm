import Unit from '../../../components/Unit';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Button from '../../../components/Button';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2">
          <Text as="h2" align={2} fontLarge>Datenschutz­erklärung</Text>
        </Director>
      </Unit>
      
      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>1. Datenschutz auf einen Blick</Text>
        <Text align={1} as="h4">Allgemeine Hinweise</Text>
        <Text align={1} as="p">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website der HEK Gebäudemanagement GmbH besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Datenerfassung auf dieser Website</Text>
        <Text align={1} as="h5">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</Text>
        <Text align={1} as="p">Die Datenverarbeitung auf dieser Website erfolgt durch die HEK Gebäudemanagement GmbH. Dessen Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; in dieser Datenschutzerklärung entnehmen.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h5">Wie erfassen wir Ihre Daten?</Text>
        <Text align={1} as="p">Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder per E-Mail an uns senden. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h5">Wofür nutzen wir Ihre Daten?</Text>
        <Text align={1} as="p">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden, um unsere Website zu optimieren und Ihnen bessere Informationen über unsere Dienstleistungen im Bereich Gebäudemanagement, Mess-, Steuerungs- und Regelungstechnik, Kälte-, Klima- und Lüftungstechnik sowie TGA-Planung zu bieten.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h5">Welche Rechte haben Sie bezüglich Ihrer Daten?</Text>
        <Text align={1} as="p">Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>2. Allgemeine Hinweise und Pflicht­informationen</Text>
        <Text align={1} as="h4">Datenschutz</Text>
        <Text align={1} as="p">Die HEK Gebäudemanagement GmbH nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht. Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Hinweis zur verantwortlichen Stelle</Text>
        <Text align={1} as="p">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>HEK Gebäudemanagement GmbH</strong><br />
          St.-Florian Str. 3<br />
          64521 Groß-Gerau<br />
          Deutschland<br /><br />
          Telefon: +49-151-64657991<br />
          E-Mail: <Button href="mailto:smartflower@hek-gm.de" text="smartflower@hek-gm.de" underline aria-label="E-Mail an smartflower@hek-gm.de" /><br />
          Umsatzsteuer-ID: DE00723510504<br />
          Handelsregisternummer: HRB 51883
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Speicherdauer</Text>
        <Text align={1} as="p">Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</Text>
        <Text align={1} as="p">Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Empfänger von personenbezogenen Daten</Text>
        <Text align={1} as="p">Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Widerruf Ihrer Einwilligung zur Datenverarbeitung</Text>
        <Text align={1} as="p">Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</Text>
        <Text align={1} as="p">Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO). Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Beschwerde­recht bei der zuständigen Aufsichts­behörde</Text>
        <Text align={1} as="p">Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Recht auf Daten­übertrag­barkeit</Text>
        <Text align={1} as="p">Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in ein gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Auskunft, Berichtigung und Löschung</Text>
        <Text align={1} as="p">Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Recht auf Einschränkung der Verarbeitung</Text>
        <Text align={1} as="p">Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>
            Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
          </li>
          <li>
            Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
        </ul>
        <Text align={1} as="p">Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">SSL- bzw. TLS-Verschlüsselung</Text>
        <Text align={1} as="p">Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &ldquo;http://&rdquo; auf &ldquo;https://&rdquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>3. Datenerfassung auf dieser Website</Text>
        <Text align={1} as="h4">Server-Log-Dateien</Text>
        <Text align={1} as="p">Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <Text align={1} as="p">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Dateien erfasst werden.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Anfrage per E-Mail, Telefon oder Telefax</Text>
        <Text align={1} as="p">Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar. Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>4. Externe Dienste und Tools</Text>
        <Text align={1} as="h4">Cookies und Cookie-Banner</Text>
        <Text align={1} as="p">
          Wir verwenden einen Cookie-Banner, der Ihnen die Kontrolle über die auf Ihrem Gerät gespeicherten Cookies gibt. Der Banner erscheint beim ersten Besuch unserer Website und ermöglicht es Ihnen, zwischen verschiedenen Cookie-Kategorien zu wählen:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li><strong>Technisch notwendige Cookies:</strong> Diese sind für den ordnungsgemäßen Betrieb der Website erforderlich und können nicht deaktiviert werden.</li>
          <li><strong>Analyse-Cookies:</strong> Diese helfen uns, die Nutzung der Website zu verstehen und zu verbessern.</li>
          <li><strong>Funktionale Cookies:</strong> Diese ermöglichen erweiterte Funktionalitäten und Personalisierung.</li>
        </ul>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Ihre Cookie-Einstellungen werden in einem Cookie namens &ldquo;cookie-consent&rdquo; gespeichert und sind für 1 Jahr gültig. Sie können Ihre Einstellungen jederzeit über die Cookie-Richtlinie anpassen.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Detaillierte Informationen zu allen verwendeten Cookies finden Sie in unserer <Button href="/cookies" text="Cookie-Richtlinie" underline target="_blank" aria-label="Cookie-Richtlinie (öffnet neues Fenster)" />.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Supabase (Datenbank und Hosting)</Text>
        <Text align={1} as="p">Diese Website nutzt Supabase, einen Dienst der Supabase Inc., 455 Market Street, Suite 1300, San Francisco, CA 94105, USA, für die Bereitstellung von Datenbankdiensten und Hosting. Supabase verarbeitet Daten auf Servern in der Europäischen Union und ist nach dem EU-US Data Privacy Framework (DPF) zertifiziert.</Text>
        <Text align={1} as="p">Bei der Nutzung unserer Website werden folgende Daten an Supabase übertragen:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>IP-Adresse des Nutzers</li>
          <li>Browser-Informationen</li>
          <li>Zugriffszeitpunkte</li>
          <li>Angefragte Seiten und Inhalte</li>
        </ul>
        <Text align={1} as="p">Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung einer funktionalen und sicheren Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen zum Datenschutz bei Supabase finden Sie unter: <Button href="https://supabase.com/privacy" text="https://supabase.com/privacy" underline target="_blank" rel="noopener noreferrer" aria-label="Datenschutzerklärung von Supabase (öffnet neues Fenster)" /></Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Vercel (Hosting und CDN)</Text>
        <Text align={1} as="p">Diese Website wird über Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. Vercel ist nach dem EU-US Data Privacy Framework (DPF) zertifiziert und verarbeitet Daten auf Servern in der Europäischen Union.</Text>
        <Text align={1} as="p">Vercel erfasst automatisch folgende Daten:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>IP-Adresse</li>
          <li>Browser-Informationen</li>
          <li>Zugriffszeitpunkte</li>
          <li>Angefragte URLs</li>
          <li>User-Agent-Informationen</li>
        </ul>
        <Text align={1} as="p">Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung einer schnellen und zuverlässigen Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen zum Datenschutz bei Vercel finden Sie unter: <Button href="https://vercel.com/legal/privacy-policy" text="https://vercel.com/legal/privacy-policy" underline target="_blank" rel="noopener noreferrer" aria-label="Datenschutzerklärung von Vercel (öffnet neues Fenster)" /></Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Next.js Analytics (sofern aktiviert)</Text>
        <Text align={1} as="p">Diese Website nutzt Next.js Analytics zur Analyse der Nutzung unserer Website. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Optimierung unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden anonymisiert erfasst und nicht mit anderen Datenquellen zusammengeführt.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>5. Spezifische Funktionen unserer Website</Text>
        <Text align={1} as="h4">Kontaktformulare und E-Mail-Kommunikation</Text>
        <Text align={1} as="p">Bei der Nutzung unserer Kontaktmöglichkeiten (E-Mail, Telefon) werden die von Ihnen bereitgestellten personenbezogenen Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Eine Weitergabe an Dritte erfolgt nur mit Ihrer ausdrücklichen Zustimmung oder wenn dies zur Erfüllung Ihrer Anfrage erforderlich ist.</Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>6. Ihre Rechte</Text>
        <Text align={1} as="p">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über die von uns verarbeiteten personenbezogenen Daten verlangen.</li>
          <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung falscher oder unvollständiger Daten verlangen.</li>
          <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
          <li><strong>Einschränkungsrecht:</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
          <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten.</li>
          <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
          <li><strong>Widerrufsrecht:</strong> Sie können eine erteilte Einwilligung jederzeit widerrufen.</li>
          <li><strong>Beschwerderecht:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren.</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>7. Kontakt</Text>
        <Text align={1} as="p">Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:</Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>HEK Gebäudemanagement GmbH</strong><br />
          St.-Florian Str. 3<br />
          64521 Groß-Gerau<br />
          Deutschland<br /><br />
          Telefon: +49-151-64657991<br />
          E-Mail: <Button href="mailto:smartflower@hek-gm.de" text="smartflower@hek-gm.de" underline aria-label="E-Mail an smartflower@hek-gm.de" />
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>8. Änderungen dieser Datenschutzerklärung</Text>
        <Text align={1} as="p">Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</Text>
        <Text align={1} as="p" style={{ marginTop: '1rem', fontSize: '0.9em', opacity: 0.8 }}>
          Stand: 26. Juli 2025
        </Text>
      </Unit>
    </>
  );
} 
