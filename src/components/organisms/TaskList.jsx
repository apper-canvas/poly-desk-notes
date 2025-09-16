import React from "react";
import { cn } from "@/utils/cn";
import TaskItem from "@/components/molecules/TaskItem";
import { AnimatePresence } from "framer-motion";

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, className, ...props }) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;