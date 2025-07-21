# Supabase Setup für HEK-GM

## 1. Supabase-Projekt erstellen
1. Gehe zu [supabase.com](https://supabase.com)
2. Erstelle ein neues Projekt
3. Notiere dir die Project URL und anon key

## 2. Environment Variables
Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. News-Tabelle (bereits vorhanden)
Die News-Tabelle existiert bereits mit folgender Struktur:

```sql
create table public.news (
  id uuid not null default gen_random_uuid (),
  title text not null,
  subtitle text null,
  content text null,
  image_url text null,
  promoted boolean not null default false,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  aspect_ratio text null default '16:9'::text,
  constraint news_pkey primary key (id),
  constraint news_aspect_ratio_check check (
    (
      aspect_ratio = any (
        array[
          '9:16'::text,
          '16:9'::text,
          '4:5'::text,
          '1:1'::text
        ]
      )
    )
  )
);
```

## 4. Beispieldaten einfügen
```sql
INSERT INTO news (title, subtitle, content, image_url, aspect_ratio, promoted) VALUES
('Revolutionäre Sidepanel-Animation', 'Neue Technologie für perfekte Synchronisation', 'Wir haben eine bahnbrechende neue Technologie für Sidepanel-Animationen entwickelt. Diese ermöglicht perfekt synchronisierte Bewegungen zwischen Container und Panel.', 'https://via.placeholder.com/275x155/007acc/ffffff?text=Animation', '16:9', true),
('Smartflower Launch', 'Intelligente Solaranlage vorgestellt', 'Die neue Smartflower-Generation bietet noch mehr Effizienz und eine noch elegantere Optik. Erfahren Sie mehr über die technischen Innovationen.', 'https://via.placeholder.com/275x275/4caf50/ffffff?text=Smartflower', '1:1', false),
('Mobile Optimierung', 'Responsive Design für alle Geräte', 'Unsere Website wurde vollständig für mobile Geräte optimiert. Alle Animationen funktionieren jetzt perfekt auf Smartphones und Tablets.', 'https://via.placeholder.com/275x344/ff9800/ffffff?text=Mobile', '4:5', false);
```

## 5. Dependencies installieren
```bash
npm install @supabase/supabase-js
```

## 6. Verwendung
Die Card-Komponente kann jetzt mit Supabase verbunden werden:

```tsx
<Card
  href="/news/uuid-here"
  title="Beispiel"
  imageSrc="/image.jpg"
  imageAlt="Beispiel"
  aspectRatio="16:9"
  tableName="news"
  recordId="uuid-here"
/>
```

## 7. Features
- **Automatisches Laden**: News werden automatisch von Supabase geladen
- **Promoted News**: Wichtige News können als "promoted" markiert werden
- **Dynamische Detail-Seiten**: Jede News hat eine eigene Detail-Seite unter `/news/[id]`
- **Click-Tracking**: Jeder Klick wird in der Konsole geloggt
- **Aspect Ratios**: Verschiedene Bildformate unterstützt (9:16, 16:9, 1:1, 4:5)
- **Sortierung**: Neueste News zuerst
- **Error Handling**: Graceful Fallback bei Fehlern 