import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  clerk_user_id: string;
};

export type Resume = {
  id: string;
  user_id: string;
  title: string;
  template_id: number;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  public_url: string | null;
  last_edited: string;
};

export type ResumeData = {
  id: string;
  resume_id: string;
  section_type: 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'certifications' | 'languages' | 'hobbies';
  section_data: Record<string, unknown>; // JSON data with unknown structure
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: number;
  name: string;
  description: string;
  preview_image_url: string;
};
