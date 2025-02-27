export interface Workshop {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  muscles?: string[];
  duration?: string;
  rest_time?: string;
  precautions?: string;
  equipment?: string[];
  locations?: string[];
  variations?: string[];
  media_urls?: string[];
  coach_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkshopFormValues {
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  muscles?: string[];
  duration?: string;
  rest_time?: string;
  precautions?: string;
  equipment?: string[];
  locations?: string[];
  variations?: string[];
  media_urls?: string[];
}