import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Profile = {
  id: string;
  full_name: string;
  role: 'elder' | 'family' | 'physician';
  elder_id?: string;
};

export type GaitData = {
  id: number;
  user_id: string;
  created_at: string;
  metrics: {
    cadence: number;
    step_time_variability: number;
    estimated_stride_length: number;
    gait_speed: number;
    steps_in_window: number;
  };
};

export type AlertDetails = {
  detection_time: string;
  impact_magnitude?: number;  // For fall alerts
};

export type Alert = {
  id: number;
  user_id: string;
  created_at: string;
  type: string;
  message: string;
  severity: 'critical' | 'warning';
  details: AlertDetails;
  acknowledged: boolean;
}; 