import React from "react";
import { cn } from "@/utils/cn";

const TrackConditionPill = ({ condition, className }) => {
  const getConditionStyle = (condition) => {
    switch (condition?.toLowerCase()) {
      case "firm":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "good":
        return "bg-green-100 text-green-800 border-green-200";
      case "good to soft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "soft":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "heavy":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        getConditionStyle(condition),
        className
      )}
    >
      {condition}
    </span>
  );
};

export default TrackConditionPill;