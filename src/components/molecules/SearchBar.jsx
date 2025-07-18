import React from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ placeholder = "Search races, horses, or jockeys...", className, ...props }) => {
  return (
    <div className={cn("relative", className)}>
      <ApperIcon
        name="Search"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />
      <Input
        placeholder={placeholder}
        className="pl-10"
        {...props}
      />
    </div>
  );
};

export default SearchBar;