export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client_packages: {
        Row: {
          client_id: string | null
          created_at: string
          expiry_date: string
          id: string
          package_id: string | null
          purchase_date: string
          sessions_remaining: number
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          expiry_date: string
          id?: string
          package_id?: string | null
          purchase_date?: string
          sessions_remaining: number
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          expiry_date?: string
          id?: string
          package_id?: string | null
          purchase_date?: string
          sessions_remaining?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_packages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_packages_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "session_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          age: number | null
          billing_type: string | null
          birth_date: string | null
          coach_id: string | null
          course_location: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          difficulties: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          monthly_price: number | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          price_per_session: number | null
          program: string | null
          registration_date: string | null
          sessions_completed: number | null
          sessions_paid: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          billing_type?: string | null
          birth_date?: string | null
          coach_id?: string | null
          course_location?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          difficulties?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          monthly_price?: number | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          price_per_session?: number | null
          program?: string | null
          registration_date?: string | null
          sessions_completed?: number | null
          sessions_paid?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          age?: number | null
          billing_type?: string | null
          birth_date?: string | null
          coach_id?: string | null
          course_location?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          difficulties?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          monthly_price?: number | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          price_per_session?: number | null
          program?: string | null
          registration_date?: string | null
          sessions_completed?: number | null
          sessions_paid?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      package_sessions: {
        Row: {
          created_at: string | null
          id: string
          package_id: string | null
          session_type_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          package_id?: string | null
          session_type_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          package_id?: string | null
          session_type_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_sessions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "session_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_sessions_session_type_id_fkey"
            columns: ["session_type_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          billing_period_end: string | null
          billing_period_start: string | null
          client_id: string | null
          coach_id: string | null
          created_at: string
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          billing_period_end?: string | null
          billing_period_start?: string | null
          client_id?: string | null
          coach_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          billing_period_end?: string | null
          billing_period_start?: string | null
          client_id?: string | null
          coach_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          certifications: string[] | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          photo_url: string | null
          services_description: string | null
          social_media: Json | null
          specialties: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          services_description?: string | null
          social_media?: Json | null
          specialties?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          services_description?: string | null
          social_media?: Json | null
          specialties?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      session_attendance: {
        Row: {
          attendance_date: string | null
          client_id: string | null
          created_at: string | null
          id: string
          payment_status:
            | Database["public"]["Enums"]["payment_status_type"]
            | null
          price: number
          session_id: string | null
          updated_at: string | null
        }
        Insert: {
          attendance_date?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          payment_status?:
            | Database["public"]["Enums"]["payment_status_type"]
            | null
          price: number
          session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attendance_date?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          payment_status?:
            | Database["public"]["Enums"]["payment_status_type"]
            | null
          price?: number
          session_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_attendance_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_bookings: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          session_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          session_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          session_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_bookings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_exceptions: {
        Row: {
          created_at: string
          exception_date: string
          id: string
          is_cancelled: boolean | null
          modified_capacity: number | null
          modified_end_time: string | null
          modified_price: number | null
          modified_start_time: string | null
          notes: string | null
          session_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          exception_date: string
          id?: string
          is_cancelled?: boolean | null
          modified_capacity?: number | null
          modified_end_time?: string | null
          modified_price?: number | null
          modified_start_time?: string | null
          notes?: string | null
          session_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          exception_date?: string
          id?: string
          is_cancelled?: boolean | null
          modified_capacity?: number | null
          modified_end_time?: string | null
          modified_price?: number | null
          modified_start_time?: string | null
          notes?: string | null
          session_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_exceptions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_group_members: {
        Row: {
          client_id: string | null
          created_at: string
          group_id: string | null
          id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_group_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "session_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      session_groups: {
        Row: {
          coach_id: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          coach_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          coach_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_groups_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_packages: {
        Row: {
          coach_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          number_of_sessions: number
          price: number
          type: string | null
          updated_at: string
          validity_days: number
        }
        Insert: {
          coach_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          number_of_sessions: number
          price: number
          type?: string | null
          updated_at?: string
          validity_days: number
        }
        Update: {
          coach_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          number_of_sessions?: number
          price?: number
          type?: string | null
          updated_at?: string
          validity_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_packages_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_pricing_rules: {
        Row: {
          conditions: Json | null
          created_at: string
          end_date: string | null
          id: string
          max_spots: number | null
          name: string
          price: number
          session_id: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          end_date?: string | null
          id?: string
          max_spots?: number | null
          name: string
          price: number
          session_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          end_date?: string | null
          id?: string
          max_spots?: number | null
          name?: string
          price?: number
          session_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_pricing_rules_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_waitlist: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          position: number
          session_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          position: number
          session_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          position?: number
          session_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_waitlist_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_waitlist_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_workshops: {
        Row: {
          created_at: string | null
          id: string
          order_index: number
          session_id: string | null
          updated_at: string | null
          workshop_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_index: number
          session_id?: string | null
          updated_at?: string | null
          workshop_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_index?: number
          session_id?: string | null
          updated_at?: string | null
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_workshops_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_workshops_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          capacity: number | null
          coach_id: string | null
          created_at: string
          description: string | null
          duration: unknown | null
          end_time: string
          equipment: string[] | null
          excluded_dates: string[] | null
          id: string
          illustration_url: string | null
          location: string | null
          max_level: string | null
          min_level: string | null
          periodicity: Database["public"]["Enums"]["session_periodicity"] | null
          price: number | null
          recurrence_days: number[] | null
          recurrence_end_date: string | null
          start_time: string
          title: string
          updated_at: string
          waitlist_capacity: number | null
          workshop_list: string[] | null
        }
        Insert: {
          capacity?: number | null
          coach_id?: string | null
          created_at?: string
          description?: string | null
          duration?: unknown | null
          end_time: string
          equipment?: string[] | null
          excluded_dates?: string[] | null
          id?: string
          illustration_url?: string | null
          location?: string | null
          max_level?: string | null
          min_level?: string | null
          periodicity?:
            | Database["public"]["Enums"]["session_periodicity"]
            | null
          price?: number | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          start_time: string
          title: string
          updated_at?: string
          waitlist_capacity?: number | null
          workshop_list?: string[] | null
        }
        Update: {
          capacity?: number | null
          coach_id?: string | null
          created_at?: string
          description?: string | null
          duration?: unknown | null
          end_time?: string
          equipment?: string[] | null
          excluded_dates?: string[] | null
          id?: string
          illustration_url?: string | null
          location?: string | null
          max_level?: string | null
          min_level?: string | null
          periodicity?:
            | Database["public"]["Enums"]["session_periodicity"]
            | null
          price?: number | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          start_time?: string
          title?: string
          updated_at?: string
          waitlist_capacity?: number | null
          workshop_list?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          category: string
          coach_id: string | null
          created_at: string
          description: string | null
          difficulty: string
          duration: unknown | null
          equipment: string[] | null
          id: string
          locations: string[] | null
          media_urls: string[] | null
          muscles: string[] | null
          precautions: string | null
          rest_time: unknown | null
          title: string
          updated_at: string
          variations: string[] | null
        }
        Insert: {
          category: string
          coach_id?: string | null
          created_at?: string
          description?: string | null
          difficulty: string
          duration?: unknown | null
          equipment?: string[] | null
          id?: string
          locations?: string[] | null
          media_urls?: string[] | null
          muscles?: string[] | null
          precautions?: string | null
          rest_time?: unknown | null
          title: string
          updated_at?: string
          variations?: string[] | null
        }
        Update: {
          category?: string
          coach_id?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: unknown | null
          equipment?: string[] | null
          id?: string
          locations?: string[] | null
          media_urls?: string[] | null
          muscles?: string[] | null
          precautions?: string | null
          rest_time?: unknown | null
          title?: string
          updated_at?: string
          variations?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "workshops_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_status_type: "pending" | "paid" | "cancelled"
      session_periodicity: "once" | "daily" | "weekly" | "monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
