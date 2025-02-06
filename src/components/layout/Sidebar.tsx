import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Camera, 
  Bell, 
  Building2, 
  CarFront,
  Settings,
  Menu,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: Bell, label: "Alerts", path: "/" },
  { icon: Camera, label: "Cameras", path: "/cameras" },
  { icon: Building2, label: "Sites", path: "/sites" },
  { icon: LayoutDashboard, label: "Use Cases", path: "/use-cases" },
  { icon: CarFront, label: "ALPR", path: "/alpr-analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-primary text-primary-foreground transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-0",
        isMobile && !isOpen && "hidden"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold">Video Analytics</h1>
          </div>
          <nav className="flex-1">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 hover:bg-secondary/10 transition-colors",
                  location.pathname === path && "bg-secondary/20"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;