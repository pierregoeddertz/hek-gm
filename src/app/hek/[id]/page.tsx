import Media from '../../../components/Media';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Unit from '../../../components/Unit';
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';

interface Section {
  heading: string;
  content: string;
}

interface Props { params: Promise<{ id: string }> }

export default async function HekDetailPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('hek')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return notFound();
  }

  const item = data;

  return (
   <>
      <Unit first={{ as: "header"}} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Director direction="v 1 2" gapY={true}>
          <Director direction="h 2 2" gapX={true}>
            <Text as="time" align={2}>
              {new Date(item.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text as="time" align={2}>
              {new Date(item.created_at).toLocaleDateString('de-DE')}
            </Text>
          </Director>
          <Text as="h1" align={2} fontLarge>{item.title}</Text>
        </Director>
      </Unit>
      {item.image_url && (
        <Unit second={{ widthMax: 2 }}>
          <Media src={item.image_url} alt={item.title} aspectRatio={item.aspect_ratio || '16:9'} />
        </Unit>
      )}
      <Unit second={{ spacingB: true, widthMax: 3, gapY: true }}>
        <Text align={1} as="p">{item.content}</Text>
      </Unit>
      {item.sections && item.sections.map((section: Section, index: number) => (
        <Unit key={index} second={{ spacingB: true, widthMax: 3, gapY: true }}>         
          <Text align={1} as="h2" fontMid>{section.heading}</Text>
          <Text align={1} as="p">{section.content}</Text>
        </Unit>
      ))}
   </>
  );
} 