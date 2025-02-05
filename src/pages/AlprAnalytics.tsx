import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Eye } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockVehicleStatus = [
  { name: "Whitelist", value: 150 },
  { name: "Blacklist", value: 30 },
  { name: "Unknown", value: 80 },
];

const mockWeeklyTrend = [
  { name: "Mon", entries: 45, exits: 42 },
  { name: "Tue", entries: 52, exits: 48 },
  { name: "Wed", entries: 58, exits: 55 },
  { name: "Thu", entries: 48, exits: 45 },
  { name: "Fri", entries: 62, exits: 58 },
];

const COLORS = ["#10b981", "#ef4444", "#8b5cf6"];

const AlprAnalytics = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold">ALPR Analytics</h1>
          </div>
          <Button onClick={() => navigate("/vehicle-details")} className="gap-2">
            <Car className="h-5 w-5" />
            View All Vehicles
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Total Vehicles Today</h3>
              <Car className="h-5 w-5 text-secondary" />
            </div>
            <p className="mt-2 text-3xl font-bold">247</p>
            <p className="text-sm text-muted-foreground">+12% from yesterday</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Whitelist Matches</h3>
              <Car className="h-5 w-5 text-accent" />
            </div>
            <p className="mt-2 text-3xl font-bold">150</p>
            <p className="text-sm text-muted-foreground">60% of total vehicles</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Blacklist Alerts</h3>
              <Car className="h-5 w-5 text-alert" />
            </div>
            <p className="mt-2 text-3xl font-bold">30</p>
            <p className="text-sm text-muted-foreground">12% of total vehicles</p>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Vehicle Status Distribution</h2>
            <ChartContainer className="h-[300px]" config={{}}>
              <PieChart>
                <Pie
                  data={mockVehicleStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockVehicleStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Entry/Exit Trend</h2>
            <ChartContainer className="h-[300px]" config={{}}>
              <LineChart data={mockWeeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="entries"
                  stroke="#38bdf8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="exits"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlprAnalytics;