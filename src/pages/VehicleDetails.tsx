import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockVehicles = [
  {
    id: 1,
    plate: "ABC123",
    lastSeen: new Date().toISOString(),
    status: "Whitelist",
    make: "Toyota",
    model: "Camry",
    color: "Silver",
    visits: 45,
  },
  {
    id: 2,
    plate: "XYZ789",
    lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "Blacklist",
    make: "Honda",
    model: "Civic",
    color: "Black",
    visits: 12,
  },
  {
    id: 3,
    plate: "DEF456",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "Unknown",
    make: "Ford",
    model: "F-150",
    color: "White",
    visits: 8,
  },
];

const VehicleDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/alpr-analytics")}
              className="rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold">Vehicle Details</h1>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by plate number, make, or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="secondary">Export Data</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Visits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.plate}</TableCell>
                    <TableCell>{new Date(vehicle.lastSeen).toLocaleString()}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.color}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          vehicle.status === "Whitelist"
                            ? "bg-accent/10 text-accent"
                            : vehicle.status === "Blacklist"
                            ? "bg-alert/10 text-alert"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.visits}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Handle view details
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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

export default VehicleDetails;