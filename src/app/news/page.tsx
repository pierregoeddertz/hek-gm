
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

  // Duplicate first item 20x to fill list (demo purpose)
  const displayItems: NewsItem[] | null = newsItems && newsItems.length > 0
    ? Array.from({ length: 20 }, () => newsItems[0])
    : newsItems;

  return (
    <>
      <h1 className="visually-hidden">News</h1>
      
      {displayItems && displayItems.length > 0 && (
        <Unit second={{ paddingX: false }}>
          <Dragger second={{ heightFull: true, direction: 'h 1 3', gapX: true, paddingX: true, style: { paddingBottom: 'var(--hgt_header)' } }}>
            {displayItems.map((item: NewsItem, idx) => (
              <Card
                key={idx}
                href={`/news/${item.id}`}
                title={item.title}
                imageSrc={item.image_url || 'https://via.placeholder.com/275x155/007acc/ffffff?text=' + encodeURIComponent(item.title)}
                imageAlt={item.title}
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