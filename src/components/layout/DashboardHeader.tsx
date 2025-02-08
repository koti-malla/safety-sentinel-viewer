
import React from "react";
import { Bell, LayoutDashboard, Calendar } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DashboardHeader = () => {
  const location = useLocation();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  
  const showDatePicker = [
    '/',
    '/alert-analytics',
    '/alerts',
    '/alpr-analytics',
    '/vehicle-details'
  ].includes(location.pathname);

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <nav className="flex items-center gap-2 md:gap-4 flex-wrap">
          <Link to="/">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/alert-analytics">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              Alerts
            </Button>
          </Link>
          <Link to="/cameras">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              Cameras
            </Button>
          </Link>
          <Link to="/sites">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              Sites
            </Button>
          </Link>
          <Link to="/alpr-analytics">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              ALPR
            </Button>
          </Link>
          <Link to="/use-cases">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              AI Vision Center
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="text-base md:text-lg font-semibold">
              Settings
            </Button>
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {showDatePicker && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}
          
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-alert" />
            </div>
            <Bell className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
