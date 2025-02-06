import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cameras from "./pages/Cameras";
import Sites from "./pages/Sites";
import NotFound from "./pages/NotFound";
import AlertAnalytics from "./pages/AlertAnalytics";
import AlprAnalytics from "./pages/AlprAnalytics";
import VehicleDetails from "./pages/VehicleDetails";
import Settings from "./pages/Settings";
import UseCases from "./pages/UseCases";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/alert-analytics" element={<AlertAnalytics />} />
            <Route path="/alpr-analytics" element={<AlprAnalytics />} />
            <Route path="/vehicle-details" element={<VehicleDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;