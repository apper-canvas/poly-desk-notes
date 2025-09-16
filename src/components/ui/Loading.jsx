import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, ...props }) => {
  return (
    <div className={cn("max-w-2xl mx-auto space-y-6", className)} {...props}>
      {/* Header skeleton */}
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-48"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64"></div>
      </div>

      {/* Input skeleton */}
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2">
        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Task items skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;