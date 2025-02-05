import React from "react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

const mockAlertsByType = [
  { name: "PPE Violation", value: 45 },
  { name: "Unauthorized Access", value: 30 },
  { name: "Fire Detection", value: 15 },
  { name: "Smoke Detection", value: 20 },
  { name: "Restricted Area", value: 25 },
];

const mockAlertsTrend = [
  { name: "Mon", violations: 20, unauthorized: 15, fire: 5 },
  { name: "Tue", violations: 25, unauthorized: 18, fire: 8 },
  { name: "Wed", violations: 30, unauthorized: 20, fire: 10 },
  { name: "Thu", violations: 22, unauthorized: 16, fire: 7 },
  { name: "Fri", violations: 28, unauthorized: 22, fire: 9 },
];

const COLORS = ["#ef4444", "#38bdf8", "#10b981", "#8b5cf6", "#f59e0b"];

const AlertAnalytics = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold">Alert Analytics</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Alerts by Type</h2>
            <ChartContainer className="h-[300px]" config={{}}>
              <PieChart>
                <Pie
                  data={mockAlertsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockAlertsByType.map((entry, index) => (
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
            <h2 className="text-xl font-semibold mb-4">Weekly Alert Trend</h2>
            <ChartContainer className="h-[300px]" config={{}}>
              <LineChart data={mockAlertsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="violations"
                  stroke="#ef4444"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="unauthorized"
                  stroke="#38bdf8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="fire"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ChartContainer>
          </Card>

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Alert Distribution by Hour</h2>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart
                data={[
                  { hour: "00:00", alerts: 5 },
                  { hour: "04:00", alerts: 8 },
                  { hour: "08:00", alerts: 15 },
                  { hour: "12:00", alerts: 20 },
                  { hour: "16:00", alerts: 25 },
                  { hour: "20:00", alerts: 12 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="alerts" fill="#38bdf8" />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlertAnalytics;