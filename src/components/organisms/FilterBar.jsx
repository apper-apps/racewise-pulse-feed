import React from "react";
import Select from "@/components/atoms/Select";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onReset, 
  className 
}) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-4", className)}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search races, horses, or jockeys..."
            value={filters.search || ""}
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Select
            value={filters.meeting || ""}
            onChange={(e) => onFilterChange("meeting", e.target.value)}
            className="min-w-[150px]"
          >
            <option value="">All Meetings</option>
            <option value="ascot">Ascot</option>
            <option value="cheltenham">Cheltenham</option>
            <option value="newmarket">Newmarket</option>
            <option value="york">York</option>
            <option value="curragh">Curragh</option>
            <option value="leopardstown">Leopardstown</option>
          </Select>
          
          <Select
            value={filters.type || ""}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="min-w-[120px]"
          >
            <option value="">All Types</option>
            <option value="flat">Flat</option>
            <option value="jumps">Jumps</option>
            <option value="handicap">Handicap</option>
            <option value="maiden">Maiden</option>
          </Select>
          
          <Select
            value={filters.class || ""}
            onChange={(e) => onFilterChange("class", e.target.value)}
            className="min-w-[100px]"
          >
            <option value="">All Classes</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
          </Select>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="px-3"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;