import Task from "../models/Task";
import { read, write } from "./storageDAO"

const STORAGE_KEY = "odinTodo:tasks";

function writeTasks(tasks) {
  write(STORAGE_KEY, tasks);
}

function readTasks() {
  const tasks = read(STORAGE_KEY);
  if (!tasks) return {};
  return Object.fromEntries(
    Object.values(tasks).map((task) => [task.id, new Task(task.id, task.title, task.description, task.dueDate, task.priority, task.projectID)])
  );
}

export { writeTasks, readTasks }


