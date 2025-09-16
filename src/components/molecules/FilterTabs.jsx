import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts, className, ...props }) => {
  const filters = [
    { key: "all", label: "All", count: taskCounts.all },
    { key: "active", label: "Active", count: taskCounts.active },
    { key: "completed", label: "Completed", count: taskCounts.completed }
  ];

  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className="relative"
        >
          {filter.label}
          <span className={cn(
            "ml-2 px-2 py-1 rounded-full text-xs font-medium",
            activeFilter === filter.key
              ? "bg-white/20 text-white"
              : "bg-surface text-secondary"
          )}>
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;