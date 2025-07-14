'use client';

import Unit from "@/components/Layout/Unit";
import Explorer from "@/components/Entities/Explorer";
import Card from '@/components/Foundations/Card';
import { useEffect, useState } from 'react';
import { NewsService } from '@/lib/services/news';

type NewsItem = {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
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
      <Unit layout="vertical 1 a">
        {error && <div>Fehler: {error}</div>}
        {loading && <div>Lädt…</div>}
        {!loading && !error && (
          <Explorer>
            {news.map((item) => {
              const dateObj = item.created_at ? new Date(item.created_at) : null;
              const date = dateObj ? dateObj.toLocaleDateString('de-DE') : '';
              const time = dateObj ? dateObj.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <Card
                  key={item.id}
                  title={item.title || 'Ohne Titel'}
                  date={date}
                  time={time}
                  image={item.image_url || '/placeholder.png'}
                />
              );
            })}
          </Explorer>
        )}
      </Unit>
    </main>
  );
}
