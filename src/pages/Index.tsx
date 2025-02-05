import React from "react";
import { Bell, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

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
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Alerts Dashboard</h1>
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-alert" />
            </div>
            <Bell className="h-6 w-6" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
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
          
          <Card className="p-6">
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
        </div>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
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
      </div>
    </Layout>
  );
};

export default Index;