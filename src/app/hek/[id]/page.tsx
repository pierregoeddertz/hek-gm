import Media from '../../../components/Media';
import Text from '../../../components/Text';
import Director from '../../../components/Director';
import Unit from '../../../components/Unit';
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';

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

  return (
    <>
      <Unit first={{ as: 'header' }} second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Text as="h1" fontLarge>{data.title}</Text>
      </Unit>
      {data.image_url && (
        <Unit second={{ widthMax: 2 }}>
          <Media src={data.image_url} alt={data.title} aspectRatio={data.aspect_ratio || '16:9'} />
        </Unit>
      )}
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 3 }}>
        <Text as="p">{data.content}</Text>
      </Unit>
    </>
  );
} 