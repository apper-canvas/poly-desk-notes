import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, className, ...props }) => {
  return (
    <div className={cn("max-w-2xl mx-auto text-center py-12", className)} {...props}>
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertCircle" size={32} className="text-error" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-primary">Something went wrong</h3>
          <p className="text-secondary max-w-md mx-auto">
            {message || "We're having trouble loading your tasks. Please try again."}
          </p>
        </div>

        {onRetry && (
          <Button onClick={onRetry} className="mt-6">
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;