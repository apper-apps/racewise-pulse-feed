import React from "react";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ProbabilityBadge = ({ probability, size = "md" }) => {
  const getProbabilityColor = (prob) => {
    if (prob >= 40) return "bg-gradient-to-r from-green-500 to-green-600 text-white";
    if (prob >= 30) return "bg-gradient-to-r from-racing-gold to-racing-gold-light text-white";
    if (prob >= 20) return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
    return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold shadow-md",
        getProbabilityColor(probability),
        sizes[size]
      )}
    >
      {probability}%
    </span>
  );
};

export default ProbabilityBadge;