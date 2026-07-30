import { readTasks, writeTasks } from "../dao/taskDAO";
import Task from "../models/Task";

const tasks = readTasks();

function createTask(title, description, dueDate, priority, projectID) {
  const taskID = crypto.randomUUID();
  tasks[taskID] = new Task(taskID, title, description, dueDate, priority, projectID);
  writeTasks(tasks);
}

function getTasks(projectID = null) {
  if (projectID) {
    return Object.values(tasks).filter((task) => task.projectID === projectID);
  } else {
    return Object.values(tasks);
  }
}

export { createTask, getTasks }