import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RaceTimeChip = ({ time, className }) => {
  const isUpcoming = new Date(time) > new Date();
  const timeString = format(new Date(time), "HH:mm");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        isUpcoming 
          ? "bg-green-100 text-green-800 border border-green-200" 
          : "bg-gray-100 text-gray-600 border border-gray-200",
        className
      )}
    >
      <ApperIcon name="Clock" className="h-3 w-3" />
      {timeString}
    </div>
  );
};

export default RaceTimeChip;