
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

  // Use all news items from database (doubled for debugging)
  const displayItems: NewsItem[] | null = newsItems && newsItems.length > 0
    ? [...newsItems, ...newsItems]
    : newsItems;

  return (
    <>
      <h1 className="visually-hidden">News</h1>
      
      {displayItems && displayItems.length > 0 && (
        <Unit first={{ direction: 'v 3 1', style: { minHeight: '100vh' } }} second={{ spacingT: true, paddingX: false }}>
          <Dragger 
            second={{ direction: 'h 1 3', gapX: true, paddingX: true, style: { paddingBottom: 'var(--hgt_header)' } }}
          >
            {displayItems.map((item: NewsItem, idx) => (
              <Card
                key={idx}
                href={item.slug ? `/news/${item.slug}` : `/news/${item.id}`}
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.image_url || 'https://via.placeholder.com/275x155/007acc/ffffff?text=' + encodeURIComponent(item.title)}
                imageAlt={item.title}
                aspectRatio={['9:16','16:9','4:5','1:1'].includes(item.aspect_ratio || '') ? item.aspect_ratio as '9:16' | '16:9' | '4:5' | '1:1' : undefined}
                createdAt={item.created_at}
              />
            ))}
          </Dragger>
        </Unit>
      )}
    </>
  );
} 