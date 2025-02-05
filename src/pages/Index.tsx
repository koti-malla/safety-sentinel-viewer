import { Bell, Camera, BarChart2, Car, ArrowUpRight } from "lucide-react";
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

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8">
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
          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-alert/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-alert" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Active Alerts</p>
                <p className="text-2xl font-bold">{mockAlerts.filter(a => a.status === "New").length}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/alert-analytics')}
                className="rounded-full hover:bg-primary/5"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-secondary/5 to-secondary/10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Camera className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Active Cameras</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cameras')}
                className="rounded-full hover:bg-secondary/5"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-accent/5 to-accent/10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">ALPR Events Today</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/alpr')}
                className="rounded-full hover:bg-accent/5"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/5"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
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

          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">System Health</h2>
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  View Details
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[45%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[68%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-alert w-[82%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;