import React from "react";
import TaskManager from "@/components/organisms/TaskManager";

const TasksPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <TaskManager />
      </div>
    </div>
  );
};

export default TasksPage;