import { createClient } from '@supabase/supabase-js';

// Получаем значения из переменных окружения (опционально)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Инициализируем только если есть оба параметра
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn('Supabase credentials not configured. Using local storage instead.');
      return null;
    }

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${folder}/${timestamp}_${randomStr}_${file.name}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data?.publicUrl || null;
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
};

export const deleteFile = async (bucket: string, fileUrl: string): Promise<boolean> => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return true;
    }

    const fileName = fileUrl.split('/').pop();
    if (!fileName) return false;

    const { error } = await supabase.storage.from(bucket).remove([fileName]);
    return !error;
  } catch (err) {
    console.error('Delete failed:', err);
    return false;
  }
};
