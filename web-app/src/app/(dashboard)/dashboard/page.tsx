'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabase';
import type { Alert, GaitData } from '@lib/supabase';
import { GaitChart } from '@/components/features/gait';
import { AlertList } from '@/components/features/alerts';
import { StatCard } from '@/components/ui/dashboard/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

// TODO: Remove this interface once all gait data features are implemented
// interface GaitData {
//   id: number;
//   gait_speed: number;
//   cadence: number;
//   created_at: string;
// }

export default function DashboardPage() {
  const [gaitData, setGaitData] = useState<GaitData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Implement data transformation for gait metrics
        // - Transform raw metrics from JSON into structured data
        // - Add data validation and error handling
        // - Implement data filtering based on timeframe
        const { data: gaitData, error: gaitError } = await supabase
          .from('gait_data')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (gaitError) throw gaitError;

        // Fetch recent alerts
        const { data: alertData, error: alertError } = await supabase
          .from('alerts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (alertError) throw alertError;

        // TODO: Transform gait data to match GaitData type
        const transformedGaitData = gaitData?.map(data => ({
          ...data,
          metrics: JSON.parse(data.metrics),
        })) || [];

        setGaitData(transformedGaitData);
        setAlerts(alertData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]); // Refetch when timeframe changes

  const handleAlertAcknowledge = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={`skeleton-card-${i}`} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-[400px]" />
          <Card className="h-[400px]" />
        </div>
        <Card className="h-[300px]" />
      </div>
    );
  }

  // TODO: Implement proper statistics calculation using metrics object
  const averageGaitSpeed = gaitData.reduce((acc, curr) => acc + curr.metrics.gait_speed, 0) / gaitData.length;
  const averageCadence = gaitData.reduce((acc, curr) => acc + curr.metrics.cadence, 0) / gaitData.length;
  const activeAlerts = alerts.filter(alert => !alert.acknowledged).length;
  const lastMeasurement = new Date(gaitData[0]?.created_at || Date.now()).toLocaleTimeString();

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Gait Speed"
          value={`${averageGaitSpeed.toFixed(2)} m/s`}
          icon={<Activity className="h-4 w-4" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Average Cadence"
          value={`${averageCadence.toFixed(0)} steps/min`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Active Alerts"
          value={activeAlerts}
          icon={<AlertTriangle className="h-4 w-4" />}
          description="Requires attention"
        />
        <StatCard
          title="Last Measurement"
          value={lastMeasurement}
          icon={<Clock className="h-4 w-4" />}
          description="Real-time monitoring"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue={timeframe} className="space-y-4" onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="day">24h</TabsTrigger>
          <TabsTrigger value="week">7d</TabsTrigger>
          <TabsTrigger value="month">30d</TabsTrigger>
        </TabsList>
        <TabsContent value={timeframe} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gait Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <GaitChart
                  data={gaitData}
                  metric="gait_speed"
                  title="Gait Speed"
                  color="#3B82F6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Steps per Minute</CardTitle>
              </CardHeader>
              <CardContent>
                <GaitChart
                  data={gaitData}
                  metric="cadence"
                  title="Steps per Minute"
                  color="#10B981"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertList
            alerts={alerts}
            onAcknowledge={handleAlertAcknowledge}
          />
        </CardContent>
      </Card>
    </div>
  );
} 