import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Play, Square, Target, Shield, Flame, Cloud, Car } from "lucide-react";

const MOCK_CAMERAS = [
  { id: "1", name: "Entrance Camera", location: "Main Gate", status: "active" },
  { id: "2", name: "Parking Camera", location: "Parking Lot", status: "active" },
  { id: "3", name: "Loading Dock", location: "Warehouse", status: "inactive" },
];

const USE_CASES = [
  { id: "ppe", name: "PPE Detection", icon: Shield, description: "Detect personal protective equipment compliance" },
  { id: "intrusion", name: "Intrusion Detection", icon: Target, description: "Monitor unauthorized access" },
  { id: "fire", name: "Fire Detection", icon: Flame, description: "Early fire detection system" },
  { id: "smoke", name: "Smoke Detection", icon: Cloud, description: "Smoke and hazard detection" },
  { id: "vehicle", name: "Vehicle Detection", icon: Car, description: "Vehicle monitoring and tracking" },
];

const UseCases = () => {
  const [selectedCamera, setSelectedCamera] = React.useState<string | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  const handleStartDrawing = () => {
    setIsDrawing(true);
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Video Analytics Use Cases</h1>
          <Button variant="outline" onClick={() => setSelectedCamera(null)}>
            <Camera className="mr-2 h-4 w-4" />
            Select Camera
          </Button>
        </div>

        <Tabs defaultValue={USE_CASES[0].id} className="w-full">
          <TabsList className="w-full justify-start">
            {USE_CASES.map((useCase) => (
              <TabsTrigger key={useCase.id} value={useCase.id} className="flex items-center gap-2">
                <useCase.icon className="h-4 w-4" />
                {useCase.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {USE_CASES.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id}>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <useCase.icon className="h-5 w-5" />
                        {useCase.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleStartDrawing}
                        disabled={!selectedCamera || isDrawing}
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Draw ROI
                      </Button>
                      {isDrawing && (
                        <Button variant="secondary" onClick={handleStopDrawing}>
                          <Square className="mr-2 h-4 w-4" />
                          Stop Drawing
                        </Button>
                      )}
                      <Button
                        variant="default"
                        disabled={!selectedCamera}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Processing
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <canvas
                        className="absolute inset-0 w-full h-full"
                        onClick={() => {/* ROI drawing logic */}}
                      />
                      {!selectedCamera && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-500">Select a camera to configure {useCase.name}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Active Cameras</h4>
                      <div className="space-y-2">
                        {MOCK_CAMERAS.map((camera) => (
                          <div
                            key={camera.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedCamera === camera.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent"
                            }`}
                            onClick={() => setSelectedCamera(camera.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{camera.name}</p>
                                <p className="text-sm opacity-90">{camera.location}</p>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs ${
                                camera.status === "active" ? "bg-accent/20" : "bg-gray-200"
                              }`}>
                                {camera.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default UseCases;