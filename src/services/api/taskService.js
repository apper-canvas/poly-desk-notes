import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const maxId = Math.max(...tasks.map(task => task.Id), 0);
    const newTask = {
      Id: maxId + 1,
      text: taskData.text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      completedAt: updates.completed ? new Date().toISOString() : null
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async getByFilter(filter) {
    await delay(250);
    const allTasks = [...tasks];
    
    switch (filter) {
      case "active":
        return allTasks.filter(task => !task.completed);
      case "completed":
        return allTasks.filter(task => task.completed);
      default:
        return allTasks;
    }
  }
};