import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const TaskInput = ({ onAddTask, className, ...props }) => {
  const [taskText, setTaskText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTask(taskText.trim());
      setTaskText("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-3", className)} {...props}>
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        disabled={!taskText.trim() || isSubmitting}
        className="px-6"
      >
        <ApperIcon name="Plus" size={16} className="mr-2" />
        {isSubmitting ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
};

export default TaskInput;