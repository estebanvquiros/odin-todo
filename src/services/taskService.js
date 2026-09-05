import { readTasks, writeTasks } from "../dao/taskDAO";
import Task from "../models/Task";

const tasks = readTasks();

function createTask(title, description, dueDate, priority, projectID) {
  const newTask = new Task(crypto.randomUUID(), title, description, dueDate, priority, projectID);
  tasks[newTask.id] = newTask;
  writeTasks(tasks);
  return newTask;
}

function getTasks(projectID = null) {
  if (projectID) {
    return Object.values(tasks).filter((task) => task.projectID === projectID);
  } else {
    return Object.values(tasks);
  }
}

function deleteTask(id) {
  delete tasks[id];
  writeTasks(tasks);
}

function deleteProjectTasks(projectID) {
  Object.keys(tasks).forEach((id) => {
    if (tasks[id].projectID === projectID) {
      delete tasks[id];
    }
  });
  writeTasks(tasks);
}

function updateTask(id, title, description, dueDate, priority, projectID) {
  if (Object.hasOwn(tasks, id)) {
    tasks[id] = new Task(id, title, description, dueDate, priority, projectID);
  }
  writeTasks(tasks);
}

export { createTask, getTasks, deleteTask, deleteProjectTasks, updateTask }
