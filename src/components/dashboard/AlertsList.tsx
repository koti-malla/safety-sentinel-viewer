import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  type: string;
  camera: string;
  timestamp: string;
  status: string;
}

interface AlertsListProps {
  alerts: Alert[];
  onViewAnalytics: () => void;
}

const AlertsList = ({ alerts, onViewAnalytics }: AlertsListProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Alerts</h2>
          <Button
            variant="outline"
            onClick={onViewAnalytics}
            className="flex items-center gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{alert.type}</p>
                <p className="text-sm text-gray-500">
                  {alert.camera} • {new Date(alert.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  alert.status === "New"
                    ? "bg-alert/10 text-alert"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AlertsList;