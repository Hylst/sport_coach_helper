export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  photo_url: string | null;
  specialties: string[] | null;
  certifications: string[] | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  services_description: string | null;
  website: string | null;
  social_media: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  } | null;
  created_at?: string;
  updated_at?: string;
}

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;