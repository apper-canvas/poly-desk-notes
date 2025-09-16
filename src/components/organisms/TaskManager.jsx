import React, { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";
import TaskInput from "@/components/molecules/TaskInput";
import FilterTabs from "@/components/molecules/FilterTabs";
import TaskList from "@/components/organisms/TaskList";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const tasksData = await taskService.getAll();
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (text) => {
    try {
      const newTask = await taskService.create({ text });
      setTasks(prev => [...prev, newTask]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTask = await taskService.update(id, { completed });
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      toast.success(completed ? "Task completed!" : "Task reopened");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

const getFilteredTasks = () => {
    switch (activeFilter) {
      case "active":
        return tasks.filter(task => !task.completed_c);
      case "completed":
        return tasks.filter(task => task.completed_c);
      default:
        return tasks;
    }
  };

const getTaskCounts = () => {
    return {
      all: tasks.length,
      active: tasks.filter(task => !task.completed_c).length,
      completed: tasks.filter(task => task.completed_c).length
    };
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Desk Notes</h1>
        <p className="text-secondary">Keep your daily work organized and actionable</p>
      </div>

      {/* Task Input */}
      <TaskInput onAddTask={handleAddTask} />

      {/* Task Stats */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="success">
              <ApperIcon name="CheckCircle" size={16} className="mr-1" />
              {taskCounts.completed} completed
            </Badge>
            <Badge variant="outline">
              <ApperIcon name="Clock" size={16} className="mr-1" />
              {taskCounts.active} remaining
            </Badge>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      {tasks.length > 0 && (
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
      )}

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Empty 
          title={tasks.length === 0 ? "No tasks yet" : `No ${activeFilter} tasks`}
          description={
            tasks.length === 0 
              ? "Add your first task to get started with organizing your work"
              : `You don't have any ${activeFilter} tasks right now`
          }
          actionText={tasks.length === 0 ? "Create your first task" : undefined}
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskManager;