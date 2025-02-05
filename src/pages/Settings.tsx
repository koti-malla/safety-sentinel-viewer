import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlprHistory from "@/components/alpr/AlprHistory";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="alpr">ALPR History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">General Settings</h2>
              {/* Add general settings content */}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">Notification Settings</h2>
              {/* Add notification settings content */}
            </div>
          </TabsContent>
          
          <TabsContent value="alpr">
            <div className="grid gap-6">
              <AlprHistory />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;