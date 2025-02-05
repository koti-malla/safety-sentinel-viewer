import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlprHistory from "@/components/alpr/AlprHistory";
import AlertHistory from "@/components/alerts/AlertHistory";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const mockOrganization = {
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
};

const mockAdmins = [
  {
    name: "John Doe",
    email: "john@acme.com",
    role: "Super Admin",
  },
  {
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Admin",
  },
];

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="organization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="alpr">ALPR History</TabsTrigger>
            <TabsTrigger value="alerts">Alert History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Organization Details</h2>
              <div className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" value={mockOrganization.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email">Email</Label>
                  <Input id="org-email" value={mockOrganization.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-phone">Phone</Label>
                  <Input id="org-phone" value={mockOrganization.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Input id="org-address" value={mockOrganization.address} />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Administrators</h2>
                <Button>Add Admin</Button>
              </div>
              <div className="space-y-4">
                {mockAdmins.map((admin, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{admin.role}</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="alpr">
            <AlprHistory />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AlertHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;