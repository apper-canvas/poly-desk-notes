import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at this time.", 
  actionText,
  onAction,
  className, 
  ...props 
}) => {
  return (
    <div className={cn("text-center py-12", className)} {...props}>
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={32} className="text-secondary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <p className="text-secondary max-w-md mx-auto">
            {description}
          </p>
        </div>

        {actionText && onAction && (
          <Button onClick={onAction} className="mt-6">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;