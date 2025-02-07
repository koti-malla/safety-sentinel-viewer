import React from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Analytics Dashboard';
      case '/alert-analytics':
        return 'Alert Analytics';
      case '/alpr-analytics':
        return 'ALPR Analytics';
      case '/cameras':
        return 'Cameras';
      case '/sites':
        return 'Sites';
      case '/settings':
        return 'Settings';
      case '/use-cases':
        return 'Use Cases';
      case '/vehicle-details':
        return 'Vehicle Details';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold">{getPageTitle()}</h1>
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