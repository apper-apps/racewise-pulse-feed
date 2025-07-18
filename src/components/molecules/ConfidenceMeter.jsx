import React from "react";
import { cn } from "@/utils/cn";

const ConfidenceMeter = ({ confidence, className }) => {
  const getConfidenceColor = (conf) => {
    if (conf >= 80) return "bg-green-500";
    if (conf >= 60) return "bg-yellow-500";
    if (conf >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getConfidenceLabel = (conf) => {
    if (conf >= 80) return "Very High";
    if (conf >= 60) return "High";
    if (conf >= 40) return "Medium";
    return "Low";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-500",
            getConfidenceColor(confidence)
          )}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-600 min-w-[70px]">
        {getConfidenceLabel(confidence)}
      </span>
    </div>
  );
};

export default ConfidenceMeter;