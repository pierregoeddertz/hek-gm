import Unit from '../../components/Unit';
import Text from '../../components/Text';
import Director from '../../components/Director';
import Media from '../../components/Media';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2">
          <Text as="h2" align={2} fontMid>Datenschutz</Text>
        </Director>
      </Unit>
      <Unit second={{ widthMax: 2 }}>
        <Media 
          src="/privacy.jpg" 
          alt="Datenschutz" 
          aspectRatio="16:9"
        />
      </Unit>
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="h3" fontMid>Header</Text>
        <Text align={1} as="p">Hier steht der Text-Inhalt der Datenschutzerklärung.</Text>
      </Unit>
    </>
  );
} 