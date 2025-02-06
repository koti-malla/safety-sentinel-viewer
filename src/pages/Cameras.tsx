import React from "react";
import { Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import AddCameraDialog from "@/components/cameras/AddCameraDialog";

const mockCameras = [
  {
    id: "1",
    name: "Entrance Cam 1",
    location: "Main Entrance",
    status: "Active",
    url: "rtsp://example.com/stream1",
  },
  {
    id: "2",
    name: "Loading Dock 2",
    location: "Warehouse",
    status: "Active",
    url: "rtsp://example.com/stream2",
  },
];

const Cameras = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cameras</h1>
          <AddCameraDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCameras.map((camera) => (
            <Card key={camera.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{camera.name}</h3>
                <p className="text-sm text-gray-500">{camera.location}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{camera.url}</span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent">
                    {camera.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Cameras;