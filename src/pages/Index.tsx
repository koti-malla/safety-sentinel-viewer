import { Bell, Camera, BarChart2, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockAlerts = [
  {
    id: 1,
    type: "PPE Violation",
    camera: "Entrance Cam 1",
    timestamp: new Date().toISOString(),
    status: "New",
  },
  {
    id: 2,
    type: "Unauthorized Access",
    camera: "Loading Dock 2",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "Acknowledged",
  },
  {
    id: 3,
    type: "Fire Detection",
    camera: "Workshop Cam 3",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "New",
  },
];

const mockAlprData = [
  { id: 1, plate: "ABC123", status: "Whitelist", count: 5 },
  { id: 2, plate: "XYZ789", status: "Blacklist", count: 2 },
  { id: 3, plate: "DEF456", status: "Unknown", count: 8 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-alert" />
            </div>
            <Bell className="h-6 w-6" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-alert/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-alert" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <p className="text-2xl font-bold">{mockAlerts.filter(a => a.status === "New").length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Camera className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Cameras</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ALPR Events Today</p>
                <p className="text-2xl font-bold">{mockAlprData.reduce((acc, curr) => acc + curr.count, 0)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Alerts</h2>
                <Button
                  variant="outline"
                  onClick={() => navigate('/alert-analytics')}
                  className="flex items-center gap-2"
                >
                  <BarChart2 className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
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

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent ALPR Events</h2>
                <Button
                  variant="outline"
                  onClick={() => navigate('/alpr-analytics')}
                  className="flex items-center gap-2"
                >
                  <BarChart2 className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
              <div className="space-y-4">
                {mockAlprData.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{event.plate}</p>
                      <p className="text-sm text-gray-500">
                        Detected {event.count} times today
                      </p>
                    </div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        event.status === "Whitelist"
                          ? "bg-accent/10 text-accent"
                          : event.status === "Blacklist"
                          ? "bg-alert/10 text-alert"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;