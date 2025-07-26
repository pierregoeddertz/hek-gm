import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typen für News-Tabelle (angepasst an existierende Struktur)
export interface NewsItem {
  id: string; // uuid
  title: string;
  subtitle?: string | null;
  slug?: string;
  image_url?: string | null;
  promoted: boolean;
  created_at: string;
  aspect_ratio?: string | null;
  sections?: Array<{
    heading: string;
    content: string;
  }>;
}

// Typen für Smartflower-Tabelle
export interface SmartflowerItem {
  id: string; // uuid
  title: string;
  subtitle?: string | null;
  slug?: string;
  image_url?: string | null;
  promoted: boolean;
  created_at: string;
  aspect_ratio?: string;
  position?: string;
  dragger_order: number;
  sections?: Array<{
    heading: string;
    content: string;
  }>;
}

// Typen für Hek-Tabelle (Landing Page)
export interface HekItem {
  id: string; // uuid
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  aspect_ratio?: '9:16' | '16:9' | '4:5' | '1:1';
  promoted: boolean;
  created_at: string;
}

// Typen für Referenzen-Tabelle
export interface ReferenzenItem {
  id: number; // bigint
  created_at: string;
  image_url?: string | null;
  name: string;
  category: 'Mess-, Steuerungs-, Regelungs- & Elektrotechnik' | 'Kälte-, Klima- & Lüftungstechnik' | 'TGA-Planung & Projektleitung';
  content?: string | null;
} 