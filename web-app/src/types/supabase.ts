export interface Alert {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  details: {
    detection_time: string;
    impact_magnitude?: number;
  };
  created_at: string;
  acknowledged: boolean;
}

export interface GaitData {
  id: number;
  user_id: string;
  metrics: {
    cadence: number;
    step_time_variability: number;
    estimated_stride_length: number;
    gait_speed: number;
    steps_in_window: number;
  };
  created_at: string;
} 