
import { supabase, NewsItem } from '../../lib/supabase';
import Card from '../../components/Card';
import Dragger from '../../components/Dragger';
import Unit from '../../components/Unit';
import '../globals.css';

export default async function NewsPage() {
  // News-Daten von Supabase laden
  const { data: newsItems, error } = await supabase
    .from('news')
    .select('*')
    .order('promoted', { ascending: false }) // Promoted items first
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading news:', error);
  }

  return (
    <>
      <h1 className="visually-hidden">News</h1>
      
      {newsItems && newsItems.length > 0 && (
        <Unit second={{ style: { padding: '0' } }}>
          <Dragger second={{ heightFull: true, direction: 'h 1 3', gapX: true, paddingX: true, style: { paddingBottom: 'var(--hgt_header)' } }}>
            {newsItems.map((item: NewsItem) => (
              <Card
                key={item.id}
                href={`/news/${item.id}`}
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.image_url || 'https://via.placeholder.com/275x155/007acc/ffffff?text=' + encodeURIComponent(item.title)}
                imageAlt={item.title}
                aspectRatio={item.aspect_ratio || '16:9'}
                tableName="news"
                recordId={item.id}
                createdAt={item.created_at}
              />
            ))}
          </Dragger>
        </Unit>
      )}
    </>
  );
} 