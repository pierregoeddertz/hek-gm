import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typen für News-Tabelle (angepasst an existierende Struktur)
export interface NewsItem {
  id: string; // uuid
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  aspect_ratio?: '9:16' | '16:9' | '4:5' | '1:1';
  promoted: boolean;
  created_at: string;
} 

// Typen für Smartflower-Tabelle
export interface SmartflowerItem {
  id: string; // uuid
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  aspect_ratio?: '9:16' | '16:9' | '4:5' | '1:1';
  promoted: boolean;
  created_at: string;
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