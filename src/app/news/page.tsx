'use client';

import { Unit, Explorer } from '@/components/Layout/Unit';
import Card from '@/components/Foundations/Card';
// import Header from '@/components/Foundations/Header'; // Entfernt
import { useEffect, useState } from 'react';
import { NewsService } from '@/lib/services/news';

type NewsItem = {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  aspect_ratio?: '9:16' | '16:9' | '4:5' | '1:1';
  // ggf. weitere Felder
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    NewsService.getAll()
      .then(setNews)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <Unit identity="vertical 2 c heightMin widthMax paddingHeader">
        {error && <div>Fehler: {error}</div>}
        {loading && <div>Lädt…</div>}
        {!loading && !error && (
          <Explorer>
            {[...news, ...news, ...news].map((item, idx) => {
              const dateObj = item.created_at ? new Date(item.created_at) : null;
              const date = dateObj ? dateObj.toLocaleDateString('de-DE') : '';
              const time = dateObj ? dateObj.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <Card
                  key={item.id + '-' + idx}
                  title={item.title || 'Ohne Titel'}
                  date={date}
                  time={time}
                  image={item.image_url || '/placeholder.png'}
                  aspectRatio={item.aspect_ratio}
                />
              );
            })}
          </Explorer>
        )}
      </Unit>
    </main>
  );
}
