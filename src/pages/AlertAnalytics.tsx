import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
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

const chartConfig = {
  violations: { color: "#ef4444", label: "PPE Violations" },
  unauthorized: { color: "#38bdf8", label: "Unauthorized Access" },
  fire: { color: "#10b981", label: "Fire Detection" },
  smoke: { color: "#8b5cf6", label: "Smoke Detection" },
  restricted: { color: "#f59e0b", label: "Restricted Area" },
};

const AlertAnalytics = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate("/alerts")} className="w-full sm:w-auto">
            View All Alerts
          </Button>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          <Card className="p-4 md:p-6 bg-white shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Alerts by Type
            </h2>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={mockAlertsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={5}
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
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Weekly Alert Trend
            </h2>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
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
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unauthorized"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fire"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white shadow-lg md:col-span-2">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Alert Distribution by Hour
            </h2>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
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
                  <Bar
                    dataKey="alerts"
                    fill="#38bdf8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlertAnalytics;