import Media from '../../components/Media';
import Text from '../../components/Text';
import Director from '../../components/Director';
import Unit from '../../components/Unit';
import HList from '../../components/HList';
import { supabase } from '../../lib/supabase';
import { redirect } from 'next/navigation';

export default async function HeizungPage() {
  // Lade den ersten HEK-Artikel (Heizung)
  const { data, error } = await supabase
    .from('hek')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return (
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Text align={1} as="h2" fontLarge>Eintrag nicht gefunden</Text>
        <Text align={1} as="p">Der angeforderte Beitrag konnte nicht geladen werden.</Text>
      </Unit>
    );
  }

  const item = data[0];

  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2" gapY={true}>
          <Text as="h1" align={2} fontLarge>{item.title}</Text>
          {item.subtitle && <Text as="h2" align={2} fontMid>{item.subtitle}</Text>}
        </Director>
      </Unit>
      {item.image_url && (
        <Unit second={{ widthMax: 2, padding0: true }}>
          <Media src={item.image_url} alt={item.title} aspectRatio={item.aspect_ratio || '16:9'} />
        </Unit>
      )}
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3, gapY: true }}>
        {/* Content kann jetzt in sections[0] stehen, falls sections genutzt werden */}
        {item.sections && item.sections.length > 0 && item.sections[0].content ? (
          <Text align={1} as="p">{item.sections[0].content}</Text>
        ) : null}
      </Unit>
      {item.sections && item.sections.slice(1).map((section: any, index: number) => (
        <Unit key={index} second={{ spacingB: true, widthMax: 3, gapY: true }}>         
          <Text align={1} as="h2" fontMid>{section.heading}</Text>
          <Text align={1} as="p">{section.content}</Text>
        </Unit>
      ))}
    </>
  );
} 