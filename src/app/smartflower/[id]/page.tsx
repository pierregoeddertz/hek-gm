import Media from '../../../components/Media';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Unit from '../../../components/Unit';
import HList from '../../../components/HList';
import { supabase, SmartflowerItem } from '../../../lib/supabase';
import { notFound } from 'next/navigation';

interface Props { 
  params: Promise<{ id: string }> 
}

export default async function SmartflowerDetailPage({ params }: Props) {
  const { id } = await params;

  // Prüfe, ob id ein UUID ist (8-4-4-4-12 hex)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isUUID = uuidRegex.test(id);

  const { data, error } = await supabase
    .from('smartflower')
    .select('*')
    .eq(isUUID ? 'id' : 'slug', id)
    .single();

  if (error || !data) {
    return (
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Text align={1} as="h2" fontLarge>Eintrag nicht gefunden</Text>
        <Text align={1} as="p">Der angeforderte Beitrag konnte nicht geladen werden.</Text>
      </Unit>
    );
  }

  const item = data as SmartflowerItem;

  return (
    <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2" gapY={true}>
          <HList direction='h 2 1'
            items={[
              <Text key="time" as="time" dateTime={item.created_at}>
                {new Date(item.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
              </Text>,
              <Text key="date" as="time" dateTime={item.created_at}>
                {new Date(item.created_at).toLocaleDateString('de-DE')}
              </Text>
            ]} 
          />
          <Text as="h1" align={2} fontLarge>{item.title}</Text>
          {item.subtitle && <Text as="h2" align={2} fontMid>{item.subtitle}</Text>}
        </Director>
      </Unit>
      {item.image_url && (
        <Unit second={{ widthMax: 2, padding0: true }}>
          <Media src={item.image_url} alt={item.title} aspectRatio={'16:9'} />
        </Unit>
      )}
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3, gapY: true }}>
        {/* Content kann jetzt in sections[0] stehen, falls sections genutzt werden */}
        {item.sections && item.sections.length > 0 && item.sections[0].content ? (
          <Text align={1} as="p">{item.sections[0].content}</Text>
        ) : null}
      </Unit>
      {item.sections && item.sections.slice(1).map((section, index) => (
        <Unit key={index} second={{ spacingB: true, widthMax: 3, gapY: true }}>         
          <Text align={1} as="h2" fontMid>{section.heading}</Text>
          <Text align={1} as="p">{section.content}</Text>
        </Unit>
      ))}
    </>
  );
} 