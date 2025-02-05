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

const mockAlprHistory = [
  {
    id: 1,
    plate: "ABC123",
    timestamp: new Date().toISOString(),
    location: "Main Gate",
    status: "Whitelist",
    direction: "Entry",
  },
  {
    id: 2,
    plate: "XYZ789",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    location: "Back Gate",
    status: "Blacklist",
    direction: "Exit",
  },
  {
    id: 3,
    plate: "DEF456",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    location: "Side Entrance",
    status: "Unknown",
    direction: "Entry",
  },
];

const AlprHistory = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">ALPR History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Plate</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAlprHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.plate}</TableCell>
                <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.direction}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      record.status === "Whitelist" && "bg-accent/10 text-accent",
                      record.status === "Blacklist" && "bg-alert/10 text-alert",
                      record.status === "Unknown" && "bg-gray-100 text-gray-600"
                    )}
                  >
                    {record.status}
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

export default AlprHistory;