import { Bell, Camera, BarChart2, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import AlertsList from "@/components/dashboard/AlertsList";
import SystemHealth from "@/components/dashboard/SystemHealth";

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Alerts"
            value={mockAlerts.filter(a => a.status === "New").length}
            subtitle="+12% from yesterday"
            icon={<Bell className="h-6 w-6 text-alert" />}
            onClick={() => navigate('/alert-analytics')}
          />
          <StatCard
            title="Active Cameras"
            value={12}
            subtitle="All cameras operational"
            icon={<Camera className="h-6 w-6 text-secondary" />}
            onClick={() => navigate('/cameras')}
          />
          <StatCard
            title="ALPR Events Today"
            value={15}
            subtitle="+5 from yesterday"
            icon={<Car className="h-6 w-6 text-accent" />}
            onClick={() => navigate('/alpr-analytics')}
          />
          <StatCard
            title="Total Events"
            value={156}
            subtitle="Last 24 hours"
            icon={<BarChart2 className="h-6 w-6 text-primary" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AlertsList 
            alerts={mockAlerts}
            onViewAnalytics={() => navigate('/alert-analytics')}
          />
          <SystemHealth />
        </div>
      </div>
    </Layout>
  );
};

export default Index;