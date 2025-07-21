import Link from 'next/link';
import { supabase, SmartflowerItem } from '../../lib/supabase';
import Card from '../../components/Card';
import Dragger from '../../components/Dragger';
import Unit from '../../components/Unit';
import '../globals.css';

export default async function SmartflowerPage() {
  // Smartflower-Daten von Supabase laden
  const { data: smartflowerItems, error } = await supabase
    .from('smartflower')
    .select('*')
    .order('promoted', { ascending: false }) // Promoted items first
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading smartflower:', error);
  }

  return (
    <>
      <h1 className="visually-hidden">Smartflower</h1>

      {smartflowerItems && smartflowerItems.length > 0 && (
        <Unit second={{ style: { padding: '0' }  }}>
          <Dragger second={{ gapX: true, paddingX: true }}>
            {smartflowerItems.map((item: SmartflowerItem) => (
              <Card
                key={item.id}
                href={`/smartflower/${item.id}`}
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.image_url || 'https://via.placeholder.com/275x155/007acc/ffffff?text=' + encodeURIComponent(item.title)}
                imageAlt={item.title}
                aspectRatio={item.aspect_ratio || '16:9'}
                tableName="smartflower"
                recordId={item.id}
              />
            ))}
          </Dragger>
        </Unit>
      )}
    </>
  );
} 