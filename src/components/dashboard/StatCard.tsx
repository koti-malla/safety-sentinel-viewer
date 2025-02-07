import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const StatCard = ({ title, value, subtitle, icon, onClick }: StatCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {onClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="rounded-full hover:bg-primary/5"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default StatCard;