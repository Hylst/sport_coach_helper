export interface DatabaseTypes {
  clients: ClientType;
  sessions: SessionType;
  payments: PaymentType;
  session_attendance: SessionAttendanceType;
}

export interface ClientType {
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
  created_at: string;
  updated_at: string;
}

export interface SessionType {
  id: string;
  coach_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  capacity: number | null;
  price: number | null;
  location: string | null;
  periodicity: string | null;
  equipment: string[] | null;
  workshop_list: string[] | null;
}

export interface PaymentType {
  id: string;
  client_id: string | null;
  coach_id: string | null;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SessionAttendanceType {
  id: string;
  client_id: string | null;
  session_id: string | null;
  attendance_date: string;
  price: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}