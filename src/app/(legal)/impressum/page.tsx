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
        <Text align={1} as="p">HEK Gebäudemanagement GmbH <br /> St. Florian Str. 36 <br /> 64521 Groß-Gerau <br /> Vertreten durch: <br /> Sascha Maské</Text>
      </Unit>
      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Kontakt</Text>
        <Text align={1} as="p">Telefon: +49-151-64657991 <br /> E-Mail: <Button href="mailto:smartflower@hek-gm.de" text="smartflower@hek-gm.de" underline aria-label="E-Mail an smartflower@hek-gm.de" /> </Text>
      </Unit>
      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>EU-Streitschlichtung</Text>
        <Text align={1} as="p">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. <br /> Unsere E-Mail-Adresse finden Sie oben im Impressum. </Text>
      </Unit>
      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</Text>
        <Text align={1} as="p">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</Text>
      </Unit>
    </>
  );
} 