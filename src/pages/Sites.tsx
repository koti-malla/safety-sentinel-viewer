import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Plus, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockSites = [
  {
    id: 1,
    name: "Main Office",
    location: "New York",
    cameras: 5,
  },
  {
    id: 2,
    name: "Warehouse",
    location: "Los Angeles",
    cameras: 8,
  },
];

const AddSiteDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Site</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Site Name</Label>
            <Input id="name" placeholder="Enter site name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" />
          </div>
          <Button className="w-full">Add Site</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Sites = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sites</h1>
          <AddSiteDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockSites.map((site) => (
            <Card key={site.id} className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{site.name}</h3>
                  <p className="text-sm text-gray-500">{site.location}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Cameras</span>
                  <span className="font-medium">{site.cameras}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Sites;