import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import type { GaitData } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GaitChartProps {
  data: GaitData[];
  metric: keyof GaitData['metrics'];
  title: string;
  color?: string;
}

export default function GaitChart({ data, metric, title, color = 'rgb(var(--primary-blue))' }: GaitChartProps) {
  // Process data for the chart
  const chartData = useMemo<ChartData<'line'>>(() => {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return {
      labels: sortedData.map(d => format(new Date(d.created_at), 'HH:mm')),
      datasets: [
        {
          label: title,
          data: sortedData.map(d => d.metrics[metric]),
          borderColor: color,
          backgroundColor: `${color}20`,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [data, metric, title, color]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          family: "'Acumin Variable Concept', sans-serif",
          size: 16,
          weight: 'bold' as const,
        },
        color: 'rgb(var(--foreground))',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgb(var(--border))',
        },
        ticks: {
          color: 'rgb(var(--muted-foreground))',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(var(--muted-foreground))',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
} 