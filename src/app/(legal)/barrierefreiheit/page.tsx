import Unit from '../../../components/Unit';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Button from '../../../components/Button';

export default function AccessibilityPage() {
  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2">
          <Text as="h1" align={2} fontLarge>Barrierefreiheitserklärung</Text>
        </Director>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>1. Allgemeine Informationen</Text>
        <Text align={1} as="p">
          Diese Barrierefreiheitserklärung gilt für die Website der HEK Gebäudemanagement GmbH unter der Adresse <Button href="https://hek-gm.de" text="www.hek-gm.de" underline target="_blank" rel="noopener noreferrer" aria-label="HEK-GM Website (öffnet neues Fenster)" />.
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Die HEK Gebäudemanagement GmbH ist bestrebt, ihre Website barrierefrei zu gestalten. Diese Erklärung wurde am 26.07.2025 erstellt und basiert auf einer Selbstbewertung der Website.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>2. Konformitätsstatus</Text>
        <Text align={1} as="p">
          <strong>Teilweise konform</strong> mit der Barrierefreien-Informationstechnik-Verordnung (BITV) 2.0 und der EN 301 549 V3.2.1 (2018-08).
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Die Website erfüllt die meisten Anforderungen der BITV 2.0. Es gibt jedoch noch Bereiche, die nicht vollständig barrierefrei sind.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>3. Nicht barrierefreie Inhalte</Text>
        <Text align={1} as="p">
          Folgende Inhalte sind derzeit nicht vollständig barrierefrei:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li><strong>Bilder und Grafiken:</strong> Einige Bilder haben noch keine vollständigen Alt-Texte</li>
          <li><strong>Videos:</strong> Falls Videos eingebunden werden, fehlen möglicherweise Untertitel</li>
          <li><strong>Komplexe Tabellen:</strong> Einige Tabellen benötigen zusätzliche Strukturierung</li>
          <li><strong>Formulare:</strong> Einige Formularfelder könnten bessere Labels benötigen</li>
        </ul>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Wir arbeiten kontinuierlich daran, diese Bereiche zu verbessern und vollständig barrierefrei zu gestalten.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>4. Barrierefreie Funktionen</Text>
        <Text align={1} as="p">
          Unsere Website bietet bereits folgende barrierefreie Funktionen:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li><strong>Semantische Struktur:</strong> Korrekte Verwendung von HTML-Überschriften und -Struktur</li>
          <li><strong>Kontrast:</strong> Ausreichende Farbkontraste für gute Lesbarkeit</li>
          <li><strong>Schriftgröße:</strong> Skalierbare Schriftgrößen</li>
          <li><strong>Tastaturnavigation:</strong> Vollständige Bedienbarkeit über Tastatur</li>
          <li><strong>Fokus-Indikatoren:</strong> Sichtbare Fokus-Markierungen</li>
          <li><strong>Responsive Design:</strong> Anpassung an verschiedene Bildschirmgrößen</li>
          <li><strong>Alt-Texte:</strong> Alternative Texte für die meisten Bilder</li>
        </ul>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>5. Erstellung der Barrierefreiheitserklärung</Text>
        <Text align={1} as="p">
          <strong>Datum der Erstellung:</strong> 26.07.2025<br />
          <strong>Methode:</strong> Selbstbewertung<br />
          <strong>Letzte Überprüfung:</strong> 26.07.2025
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Die Bewertung wurde durch unser Entwicklungsteam durchgeführt und basiert auf den Anforderungen der BITV 2.0 und der EN 301 549 V3.2.1.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>6. Feedback und Kontakt</Text>
        <Text align={1} as="p">
          Wenn Sie auf Barrieren auf unserer Website stoßen oder Verbesserungsvorschläge haben, kontaktieren Sie uns gerne:
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>HEK Gebäudemanagement GmbH</strong><br />
          St. Florian Str. 36<br />
          64521 Groß-Gerau<br />
          Deutschland<br /><br />
          Telefon: +49-151-64657991<br />
          E-Mail: <Button href="mailto:smartflower@hek-gm.de" text="smartflower@hek-gm.de" underline aria-label="E-Mail an smartflower@hek-gm.de" />
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          Wir bemühen uns, Ihr Feedback innerhalb von 5 Werktagen zu beantworten.
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>7. Durchsetzungsverfahren</Text>
        <Text align={1} as="p">
          Wenn Sie mit unserer Antwort auf Ihr Feedback nicht zufrieden sind, können Sie sich an die Schlichtungsstelle wenden:
        </Text>
        <Text align={1} as="p" style={{ marginTop: '1rem' }}>
          <strong>Schlichtungsstelle nach dem Behindertengleichstellungsgesetz</strong><br />
          bei der Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen<br />
          Mauerstraße 53<br />
          10117 Berlin<br /><br />
          Telefon: +49 30 18 527-2805<br />
          E-Mail: <Button href="mailto:info@schlichtungsstelle-bgg.de" text="info@schlichtungsstelle-bgg.de" underline aria-label="E-Mail an Schlichtungsstelle (öffnet neues Fenster)" target="_blank" rel="noopener noreferrer" />
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>8. Technische Informationen</Text>
        <Text align={1} as="p">
          <strong>Technologien:</strong> HTML5, CSS3, JavaScript, React, Next.js<br />
          <strong>Barrierefreiheitsstandards:</strong> WCAG 2.1 Level AA<br />
          <strong>Testwerkzeuge:</strong> Lighthouse Accessibility, axe-core, WAVE
        </Text>
      </Unit>

      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>9. Verbesserungsplan</Text>
        <Text align={1} as="p">
          Wir haben uns folgende Ziele für die Verbesserung der Barrierefreiheit gesetzt:
        </Text>
        <ul style={{ paddingLeft: '1rem', marginTop: '0' }}>
          <li>Vollständige Alt-Texte für alle Bilder bis Ende 2025</li>
          <li>Verbesserung der Formular-Labels bis Q1 2026</li>
          <li>Implementierung von ARIA-Labels für komplexe Komponenten</li>
          <li>Regelmäßige Barrierefreiheits-Audits</li>
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