import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockAlertHistory = [
  {
    id: 1,
    type: "PPE Violation",
    location: "Main Gate",
    timestamp: new Date().toISOString(),
    status: "New",
    camera: "Camera 1",
  },
  {
    id: 2,
    type: "Unauthorized Access",
    location: "Back Gate",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "Acknowledged",
    camera: "Camera 2",
  },
  {
    id: 3,
    type: "Fire Detection",
    location: "Workshop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "Resolved",
    camera: "Camera 3",
  },
  {
    id: 4,
    type: "Smoke Detection",
    location: "Kitchen Area",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: "New",
    camera: "Camera 4",
  },
  {
    id: 5,
    type: "PPE Violation",
    location: "Construction Site",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "Acknowledged",
    camera: "Camera 5",
  },
  {
    id: 6,
    type: "Restricted Area",
    location: "Server Room",
    timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    status: "New",
    camera: "Camera 6",
  },
  {
    id: 7,
    type: "Fire Detection",
    location: "Storage Area",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: "Resolved",
    camera: "Camera 7",
  },
];

const AlertHistory = () => {
  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Alert History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Camera</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAlertHistory.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.type}</TableCell>
                <TableCell>{alert.location}</TableCell>
                <TableCell>{alert.camera}</TableCell>
                <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      alert.status === "New" && "bg-alert/10 text-alert",
                      alert.status === "Acknowledged" &&
                        "bg-accent/10 text-accent",
                      alert.status === "Resolved" && "bg-gray-100 text-gray-600"
                    )}
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
  );
};

export default AlertHistory;