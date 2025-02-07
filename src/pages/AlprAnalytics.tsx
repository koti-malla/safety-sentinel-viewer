import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Car, Eye, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
  ResponsiveContainer,
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
          <Button 
            onClick={() => navigate("/vehicle-details")}
            className="w-full sm:w-auto gap-2"
          >
            <Car className="h-4 w-4" />
            View All Vehicles
          </Button>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Total Vehicles Today</h3>
              <Car className="h-5 w-5 text-secondary" />
            </div>
            <p className="mt-2 text-2xl md:text-3xl font-bold">247</p>
            <p className="text-sm text-muted-foreground">+12% from yesterday</p>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Whitelist Matches</h3>
              <Car className="h-5 w-5 text-accent" />
            </div>
            <p className="mt-2 text-2xl md:text-3xl font-bold">150</p>
            <p className="text-sm text-muted-foreground">60% of total vehicles</p>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Blacklist Alerts</h3>
              <Car className="h-5 w-5 text-alert" />
            </div>
            <p className="mt-2 text-2xl md:text-3xl font-bold">30</p>
            <p className="text-sm text-muted-foreground">12% of total vehicles</p>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Vehicle Status Distribution</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
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
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Weekly Entry/Exit Trend</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
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
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlprAnalytics;