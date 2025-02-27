export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  age: number | null;
  birth_date: string | null;
  registration_date: string | null;
  program: string | null;
  difficulties: string | null;
  sessions_completed: number | null;
  sessions_paid: number | null;
  course_location: string | null;
  notes: string | null;
  coach_id: string | null;
  price_per_session: number | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientFormData {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  age?: number | null;
  birth_date?: string | null;
  registration_date: string;
  program?: string | null;
  difficulties?: string | null;
  sessions_completed: number;
  sessions_paid: number;
  course_location?: string | null;
  notes?: string | null;
  price_per_session?: number | null;
  photo_url?: string | null;
}