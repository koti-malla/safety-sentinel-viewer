
import React from "react";
import { Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-4">
          <Link to="/cameras">
            <Button variant="ghost" className="text-lg font-semibold">
              Cameras
            </Button>
          </Link>
          <Link to="/sites">
            <Button variant="ghost" className="text-lg font-semibold">
              Sites
            </Button>
          </Link>
          <Link to="/use-cases">
            <Button variant="ghost" className="text-lg font-semibold">
              AI Vision Center
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="text-lg font-semibold">
              Settings
            </Button>
          </Link>
        </nav>
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-alert" />
          </div>
          <Bell className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
