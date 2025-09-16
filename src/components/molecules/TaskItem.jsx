import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const TaskItem = ({ task, onToggleComplete, onDelete, className, ...props }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onToggleComplete(task.Id, !task.completed);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete(task.Id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group",
        className
      )}
      {...props}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={isUpdating}
          className="task-checkbox"
        />
      </label>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium transition-all duration-200",
          task.completed ? "task-completed" : "text-primary"
        )}>
          {task.text}
        </p>
        {task.completedAt && (
          <p className="text-xs text-secondary mt-1">
            Completed {new Date(task.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-error hover:bg-error hover:text-white"
      >
        <ApperIcon name="Trash2" size={16} />
      </Button>
    </motion.div>
  );
};

export default TaskItem;