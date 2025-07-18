import React from "react";
import { cn } from "@/utils/cn";

const FormSparkline = ({ form, className }) => {
  const formArray = form.split("").slice(0, 5);
  
  const getPositionColor = (position) => {
    if (position === "1") return "bg-green-500";
    if (position === "2") return "bg-yellow-500";
    if (position === "3") return "bg-orange-500";
    if (position === "F" || position === "P" || position === "U") return "bg-red-500";
    return "bg-gray-400";
  };

  return (
    <div className={cn("flex gap-1", className)}>
      {formArray.map((position, index) => (
        <div
          key={index}
          className={cn(
            "w-2 h-6 rounded-sm",
            getPositionColor(position)
          )}
          title={`Race ${index + 1}: ${position}`}
        />
      ))}
    </div>
  );
};

export default FormSparkline;