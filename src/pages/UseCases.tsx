
import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Target, Shield, Flame, Cloud, Car } from "lucide-react";
import { toast } from "sonner";

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
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(prev => {
      const newPoints = [...prev, { x, y }];
      drawPoints(newPoints);
      
      // If we have 4 or more points, show completion message
      if (newPoints.length >= 4) {
        toast.success("ROI area defined successfully! You can continue drawing or click 'Stop Drawing'");
      }
      
      return newPoints;
    });
  };

  const drawPoints = (points: { x: number; y: number }[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw guide lines
    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point, index) => {
        ctx.lineTo(point.x, point.y);
      });
      if (points.length >= 4) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fill();
      }
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw points
    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#38BDF8';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add point number
      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.strokeText((index + 1).toString(), point.x + 8, point.y + 8);
      ctx.fillText((index + 1).toString(), point.x + 8, point.y + 8);
    });
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
    setPoints([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    toast.info("Click to place points. Connect at least 4 points to define the ROI area.");
  };

  const handleStopDrawing = () => {
    if (points.length < 4) {
      toast.error("Please draw at least 4 points to create a valid ROI");
      return;
    }
    setIsDrawing(false);
    drawPoints(points);
    toast.success("ROI drawing completed successfully!");
  };

  const toggleProcessing = (useCaseId: string) => {
    const selectedCameraData = MOCK_CAMERAS.find(cam => cam.id === selectedCamera);
    
    if (!selectedCameraData) {
      toast.error("Please select a camera first");
      return;
    }

    if (selectedCameraData.status === "inactive") {
      toast.error("Cannot process with inactive camera");
      return;
    }

    if (!points.length || points.length < 4) {
      toast.error("Please define ROI area before starting processing");
      return;
    }

    setIsProcessing(prev => {
      const newState = { ...prev, [useCaseId]: !prev[useCaseId] };
      if (newState[useCaseId]) {
        toast.success(`Started processing for ${USE_CASES.find(uc => uc.id === useCaseId)?.name}`);
      } else {
        toast.info(`Stopped processing for ${USE_CASES.find(uc => uc.id === useCaseId)?.name}`);
      }
      return newState;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Video Analytics Use Cases</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedCamera(null)}
            className="text-sm"
          >
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
                      {isDrawing ? (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={handleStopDrawing}
                          className="text-xs"
                        >
                          Stop Drawing
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleStartDrawing}
                          disabled={!selectedCamera}
                          className="text-xs"
                        >
                          <Target className="mr-1 h-3 w-3" />
                          Draw ROI
                        </Button>
                      )}
                      <Button
                        variant={isProcessing[useCase.id] ? "secondary" : "default"}
                        size="sm"
                        onClick={() => toggleProcessing(useCase.id)}
                        disabled={!selectedCamera || !points.length || points.length < 4}
                        className="text-xs"
                      >
                        {isProcessing[useCase.id] ? "Stop Processing" : "Start Processing"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full cursor-crosshair"
                        onClick={handleCanvasClick}
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
                            onClick={() => {
                              setSelectedCamera(camera.id);
                              setPoints([]);
                              setIsDrawing(false);
                              const ctx = canvasRef.current?.getContext('2d');
                              if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{camera.name}</p>
                                <p className="text-sm opacity-90">{camera.location}</p>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs ${
                                camera.status === "active" 
                                  ? "bg-accent/20 text-accent" 
                                  : "bg-gray-200 text-gray-600"
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
