import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BedStatus = "occupied" | "available" | "cleaning" | "critical" | "medium" | "normal";

interface BedIconProps {
  status: BedStatus;
  bedNumber: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const statusColors = {
  occupied: "bg-bed-occupied",
  available: "bg-bed-available", 
  cleaning: "bg-bed-cleaning",
  critical: "bg-bed-critical",
  medium: "bg-bed-medium",
  normal: "bg-bed-normal"
};

const statusLabels = {
  occupied: "Occupied",
  available: "Available",
  cleaning: "Cleaning",
  critical: "Critical",
  medium: "Medium",
  normal: "Normal"
};

const BedIcon = ({ status, bedNumber, onClick, size = "md", showTooltip = true }: BedIconProps) => {
  const sizeClasses = {
    sm: "w-8 h-6",
    md: "w-12 h-8", 
    lg: "w-16 h-10"
  };

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          sizeClasses[size],
          statusColors[status],
          "rounded-lg cursor-pointer border-2 border-white/20",
          "flex items-center justify-center shadow-card",
          onClick && "hover:shadow-glow transition-all duration-300"
        )}
        whileHover={{
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
        }}
      >
        <span className="text-white text-xs font-bold">
          {bedNumber}
        </span>
      </motion.div>

      {showTooltip && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Bed {bedNumber} - {statusLabels[status]}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-black/80" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default BedIcon;