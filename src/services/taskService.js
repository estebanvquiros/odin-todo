import { readTasks, writeTasks } from "../dao/taskDAO";
import Task from "../models/Task";

const tasks = readTasks();

function createTask(title, description, dueDate, priority, projectID) {
  const taskID = crypto.randomUUID();
  tasks[taskID] = new Task(taskID, title, description, dueDate, priority, projectID);
  writeTasks(tasks);
}

export { createTask }