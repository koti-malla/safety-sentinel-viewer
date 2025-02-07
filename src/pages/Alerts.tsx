import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    type: "PPE Violation",
    location: "Main Gate",
    timestamp: new Date().toISOString(),
    status: "New",
    camera: "Camera 1",
    severity: "High",
  },
  {
    id: 2,
    type: "Unauthorized Access",
    location: "Back Gate",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "Acknowledged",
    camera: "Camera 2",
    severity: "Medium",
  },
  {
    id: 3,
    type: "Fire Detection",
    location: "Workshop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "Resolved",
    camera: "Camera 3",
    severity: "Critical",
  },
];

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch = alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || alert.status === statusFilter;
    const matchesType = !typeFilter || alert.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PPE Violation">PPE Violation</SelectItem>
                  <SelectItem value="Unauthorized Access">Unauthorized Access</SelectItem>
                  <SelectItem value="Fire Detection">Fire Detection</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Camera</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell>{alert.camera}</TableCell>
                    <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          alert.severity === "Critical" ? "bg-alert/10 text-alert" :
                          alert.severity === "High" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          alert.status === "New" ? "bg-alert/10 text-alert" :
                          alert.status === "Acknowledged" ? "bg-accent/10 text-accent" :
                          "bg-gray-100 text-gray-600"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Alerts;