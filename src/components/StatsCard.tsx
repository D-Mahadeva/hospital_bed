import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtext?: string;
  breakdown?: { label: string; count: number }[];
  onClick?: () => void;
  delay?: number;
  color?: "red" | "green" | "yellow" | "blue";
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  subtext, 
  breakdown, 
  onClick, 
  delay = 0,
  color = "red" 
}: StatsCardProps) => {
  const colorClasses = {
    red: "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    green: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]", 
    yellow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={cn(
          "glass border-white/20 backdrop-blur-md cursor-pointer transition-all duration-300",
          colorClasses[color],
          onClick && "hover:border-white/40"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-hospital-red">
              {icon}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-sm text-white/70">{title}</div>
            </div>
          </div>
          
          {subtext && (
            <p className="text-xs text-white/60 mb-3">{subtext}</p>
          )}
          
          {breakdown && (
            <motion.div 
              className="space-y-2 pt-3 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-white/70">{item.label}:</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;