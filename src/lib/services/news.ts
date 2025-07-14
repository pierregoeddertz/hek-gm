import { supabase } from '../supabaseClient';

export const NewsService = {
  // Holt den neuesten Artikel
  async getLatest() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  },

  // Holt alle promoted Artikel
  async getPromoted() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('promoted', true)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  },

  // Holt alle für die Slideshow (neuester + promoted)
  async getSlideshowContent() {
    // Neuesten Artikel holen
    const { data: latest, error: err1 } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (err1) throw new Error(err1.message || JSON.stringify(err1));

    let promoted = [];
    if (latest && latest.id) {
      // Nur wenn es einen neuesten Artikel gibt, diesen ausschließen
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('promoted', true)
        .order('created_at', { ascending: false })
        .neq('id', latest.id);
      if (error) throw new Error(error.message || JSON.stringify(error));
      promoted = data || [];
    } else {
      // Sonst einfach alle promoted holen
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('promoted', true)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message || JSON.stringify(error));
      promoted = data || [];
    }

    // Neuesten Artikel immer zuerst, dann promoted
    return latest ? [latest, ...promoted] : promoted;
  },

  // Holt alle News-Einträge
  async getAll() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  }
}; 