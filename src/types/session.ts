
export type Periodicity = "once" | "daily" | "weekly" | "monthly";

export interface Session {
  id: string;
  coach_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  capacity: number | null;
  price: number | null;
  location: string | null;
  periodicity: Periodicity | null;
  equipment: string[] | null;
  workshop_list: string[] | null;
  illustration_url: string | null;
  // Nouveaux champs pour la récurrence
  recurrence_end_date: string | null;
  recurrence_days: number[] | null;
  excluded_dates: string[] | null;
  // Nouveaux champs pour les niveaux et la liste d'attente
  min_level: string | null;
  max_level: string | null;
  waitlist_capacity: number | null;
}

export interface SessionException {
  id: string;
  session_id: string;
  exception_date: string;
  is_cancelled: boolean;
  modified_start_time: string | null;
  modified_end_time: string | null;
  modified_capacity: number | null;
  modified_price: number | null;
  notes: string | null;
}

export interface SessionPricingRule {
  id: string;
  session_id: string;
  name: string;
  price: number;
  start_date: string | null;
  end_date: string | null;
  max_spots: number | null;
  conditions: Record<string, any> | null;
}

export interface SessionPackage {
  id: string;
  coach_id: string;
  name: string;
  description: string | null;
  number_of_sessions: number;
  validity_days: number;
  price: number;
  type: 'individual' | 'group';
}

export interface ClientPackage {
  id: string;
  client_id: string;
  package_id: string;
  sessions_remaining: number;
  purchase_date: string;
  expiry_date: string;
}

export interface SessionGroup {
  id: string;
  coach_id: string;
  name: string;
  description: string | null;
}

export interface SessionGroupMember {
  id: string;
  group_id: string;
  client_id: string;
}

export interface SessionWaitlistEntry {
  id: string;
  session_id: string;
  client_id: string;
  position: number;
  status: string;
}
