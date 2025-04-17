import { supabase } from '@/lib/supabase';
import type { Alert, GaitData } from '@/lib/supabase';

export async function fetchGaitData(limit = 50): Promise<GaitData[]> {
  const { data, error } = await supabase
    .from('gait_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data?.map(data => ({
    ...data,
    metrics: JSON.parse(data.metrics),
  })) || [];
}

export async function fetchAlerts(limit = 5): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data || [];
}

export async function updateAlertStatus(alertId: number, acknowledged: boolean): Promise<void> {
  const { error } = await supabase
    .from('alerts')
    .update({ acknowledged })
    .eq('id', alertId);

  if (error) throw error;
} 