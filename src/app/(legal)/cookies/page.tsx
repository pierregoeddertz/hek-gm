'use client';

import { useEffect } from 'react';
import Unit from '../../../components/Unit';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Button from '../../../components/Button';

export default function CookiePolicyPage() {
  useEffect(() => {
    // Ensure the openCookieSettings function is available
    if (typeof window !== 'undefined' && !(window as unknown as { openCookieSettings?: () => void }).openCookieSettings) {
      console.warn('Cookie settings function not available');
    }
  }, []);

  const handleOpenSettings = () => {
    if (typeof window !== 'undefined' && (window as unknown as { openCookieSettings?: () => void }).openCookieSettings) {
      (window as unknown as { openCookieSettings: () => void }).openCookieSettings();
    }
  };

  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2">
          <Text as="h1" align={2} fontLarge>Cookie-Richtlinie</Text>
        </Director>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>1. Was sind Cookies?</Text>
        <Text align={1} as="p">
          Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen dabei, die Website funktional zu halten und Informationen über die Nutzung zu sammeln. Cookies können verschiedene Zwecke erfüllen, von der technischen Notwendigkeit bis hin zur Analyse des Nutzerverhaltens.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>2. Welche Cookies verwenden wir?</Text>
        <Text align={1} as="h4">Technisch notwendige Cookies</Text>
        <Text align={1} as="p">
          Diese Cookies sind für den ordnungsgemäßen Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie werden normalerweise nur als Reaktion auf von Ihnen durchgeführte Aktionen gesetzt, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>Beispiele:</strong>
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Session-Cookies für die Navigation</li>
          <li>Cookie-Consent-Einstellungen</li>
          <li>Sicherheits-Cookies</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Analyse-Cookies (optional)</Text>
        <Text align={1} as="p">
          Diese Cookies ermöglichen es uns, die Anzahl der Besucher zu zählen und zu verstehen, wie Besucher mit der Website interagieren. Sie helfen uns, die Funktionalität der Website zu verbessern.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>Verwendete Dienste:</strong>
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Next.js Analytics (anonymisiert)</li>
          <li>Vercel Analytics (anonymisiert)</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Funktionale Cookies (optional)</Text>
        <Text align={1} as="p">
          Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung. Sie können von uns oder von Drittanbietern gesetzt werden, deren Dienste wir auf unseren Seiten verwenden.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>Verwendete Dienste:</strong>
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Supabase (Datenbankfunktionen)</li>
          <li>Vercel (Performance-Optimierung)</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>3. Detaillierte Cookie-Liste</Text>
        <Text align={1} as="h4">Technisch notwendige Cookies</Text>
        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--clrA_m)' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Zweck</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Speicherdauer</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Anbieter</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--clrA_l)' }}>
                <td style={{ padding: '0.5rem' }}>cookie-consent</td>
                <td style={{ padding: '0.5rem' }}>Speichert Ihre Cookie-Einstellungen</td>
                <td style={{ padding: '0.5rem' }}>1 Jahr</td>
                <td style={{ padding: '0.5rem' }}>HEK-GM</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--clrA_l)' }}>
                <td style={{ padding: '0.5rem' }}>session-id</td>
                <td style={{ padding: '0.5rem' }}>Technische Session-Verwaltung</td>
                <td style={{ padding: '0.5rem' }}>Session</td>
                <td style={{ padding: '0.5rem' }}>HEK-GM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Analyse-Cookies (optional)</Text>
        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--clrA_m)' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Zweck</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Speicherdauer</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Anbieter</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--clrA_l)' }}>
                <td style={{ padding: '0.5rem' }}>_vercel_analytics</td>
                <td style={{ padding: '0.5rem' }}>Website-Performance-Analyse</td>
                <td style={{ padding: '0.5rem' }}>2 Jahre</td>
                <td style={{ padding: '0.5rem' }}>Vercel</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--clrA_l)' }}>
                <td style={{ padding: '0.5rem' }}>next-analytics</td>
                <td style={{ padding: '0.5rem' }}>Nutzungsanalyse</td>
                <td style={{ padding: '0.5rem' }}>1 Jahr</td>
                <td style={{ padding: '0.5rem' }}>Next.js</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>4. Wie können Sie Cookies verwalten?</Text>
        <Text align={1} as="h4">Browser-Einstellungen</Text>
        <Text align={1} as="p">
          Sie können Cookies in Ihren Browser-Einstellungen verwalten. Die meisten Browser erlauben es Ihnen, Cookies zu blockieren oder zu löschen. Bitte beachten Sie, dass das Deaktivieren von Cookies die Funktionalität unserer Website beeinträchtigen kann.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>Anleitung für gängige Browser:</strong>
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li><strong>Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten</li>
          <li><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten</li>
          <li><strong>Safari:</strong> Einstellungen → Datenschutz → Website-Tracking</li>
          <li><strong>Edge:</strong> Einstellungen → Cookies und Website-Berechtigungen</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h4">Cookie-Einstellungen auf dieser Website</Text>
        <Text align={1} as="p">
          Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner oder die Datenschutzeinstellungen ändern. Technisch notwendige Cookies können nicht deaktiviert werden, da sie für den ordnungsgemäßen Betrieb der Website erforderlich sind.
        </Text>
        <div style={{ marginTop: '1rem' }}>
          <Button 
            text="Cookie-Einstellungen öffnen" 
            onClick={handleOpenSettings}
            style={{ marginRight: '1rem' }}
          />
        </div>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>5. Aktualisierungen dieser Cookie-Richtlinie</Text>
        <Text align={1} as="p">
          Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in unseren Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen zu reflektieren. Die aktuelle Version ist immer auf dieser Seite verfügbar.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>6. Kontakt</Text>
        <Text align={1} as="p">
          Bei Fragen zu unseren Cookie-Praktiken können Sie sich an uns wenden:
        </Text>
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
        <Text align={1} as="p" style={{ fontSize: '0.9em', opacity: 0.8 }}>
          Stand: 19. September 2025
        </Text>
      </Unit>
    </>
  );
} 
