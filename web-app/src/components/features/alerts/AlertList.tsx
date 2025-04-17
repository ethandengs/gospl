import { useState } from 'react';
import { format } from 'date-fns';
import type { Alert } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AlertListProps {
  alerts: Alert[];
  onAcknowledge: (alertId: number) => void;
}

export default function AlertList({ alerts, onAcknowledge }: AlertListProps) {
  const [expandedAlertId, setExpandedAlertId] = useState<number | null>(null);

  const handleAcknowledge = async (alertId: number) => {
    onAcknowledge(alertId);
  };

  const getSeverityStyle = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-[rgb(var(--warning))] text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No alerts to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={alert.acknowledged ? 'bg-muted' : undefined}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={getSeverityStyle(alert.severity)}>
                  {alert.severity}
                </Badge>
                <span className="text-sm font-medium">
                  {alert.message}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(alert.created_at), 'MMM d, h:mm a')}
                </span>
                {!alert.acknowledged && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedAlertId(
                    expandedAlertId === alert.id ? null : alert.id
                  )}
                  aria-label={expandedAlertId === alert.id ? "Collapse details" : "Expand details"}
                >
                  {expandedAlertId === alert.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {expandedAlertId === alert.id && (
              <div className="mt-4 rounded-md bg-muted p-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>Detection Time: {alert.details.detection_time}</div>
                  {alert.details.impact_magnitude && (
                    <div>Impact Magnitude: {alert.details.impact_magnitude}g</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 