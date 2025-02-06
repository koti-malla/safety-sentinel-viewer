import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Play, Square } from "lucide-react";

interface ROI {
  points: { x: number; y: number }[];
  useCase: string;
}

interface CameraConfig {
  id: string;
  name: string;
  rois: ROI[];
  isProcessing: boolean;
}

const USE_CASES = [
  "PPE Detection",
  "Intrusion Detection",
  "Fire Detection",
  "Smoke Detection",
  "Vehicle Detection"
];

const CameraUseCases = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraConfig | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentROI, setCurrentROI] = useState<ROI>({ points: [], useCase: "" });

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentROI(prev => ({
      ...prev,
      points: [...prev.points, { x, y }]
    }));
  };

  const startDrawing = (useCase: string) => {
    setIsDrawing(true);
    setCurrentROI({ points: [], useCase });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (selectedCamera && currentROI.points.length > 2) {
      // Save ROI logic here
      console.log("ROI saved:", currentROI);
    }
    setCurrentROI({ points: [], useCase: "" });
  };

  const toggleProcessing = (cameraId: string, useCase: string) => {
    // Toggle processing state logic here
    console.log("Toggle processing for camera:", cameraId, "useCase:", useCase);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Camera Use Cases</h2>
        <Button variant="outline" onClick={() => setSelectedCamera(null)}>
          <Camera className="mr-2 h-4 w-4" />
          Select Camera
        </Button>
      </div>

      <Tabs defaultValue={USE_CASES[0]} className="w-full">
        <TabsList className="w-full justify-start">
          {USE_CASES.map(useCase => (
            <TabsTrigger key={useCase} value={useCase}>
              {useCase}
            </TabsTrigger>
          ))}
        </TabsList>

        {USE_CASES.map(useCase => (
          <TabsContent key={useCase} value={useCase}>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{useCase}</h3>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => startDrawing(useCase)}
                      disabled={!selectedCamera || isDrawing}
                    >
                      Draw ROI
                    </Button>
                    {isDrawing && (
                      <Button variant="secondary" onClick={stopDrawing}>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Drawing
                      </Button>
                    )}
                    <Button
                      variant="default"
                      onClick={() => selectedCamera && toggleProcessing(selectedCamera.id, useCase)}
                      disabled={!selectedCamera}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Processing
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <canvas
                    className="absolute inset-0 w-full h-full"
                    onClick={handleCanvasClick}
                  />
                  {!selectedCamera && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Select a camera to configure {useCase}</p>
                    </div>
                  )}
                </div>

                {selectedCamera && (
                  <div className="text-sm text-gray-500">
                    Drawing ROI for: {selectedCamera.name}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CameraUseCases;