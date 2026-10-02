import { compareAsc, compareDesc, parseISO } from "date-fns";
import { readTasks, writeTasks } from "../dao/taskDAO";
import Task from "../models/Task";

const tasks = readTasks();

function createTask(title, description, dueDate, priority, projectID) {
  const newTask = new Task(crypto.randomUUID(), title, description, dueDate, priority, projectID, false);
  tasks[newTask.id] = newTask;
  writeTasks(tasks);
  return newTask;
}

function getTasks(projectId = null, filter = 'all', sort = "dueDate-asc") {
  let tasksArray = Object.values(tasks);

  if (projectId) {
    tasksArray = tasksArray.filter((task) => task.projectID === projectId);
  }

  if (filter === "completed") {
    tasksArray = tasksArray.filter((task) => task.completed === true);
  }

  if (filter === "pending") {
    tasksArray = tasksArray.filter((task) => task.completed === false);
  }

  tasksArray.sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    if (sort === "dueDate-desc") return (compareDesc(parseISO(a.dueDate), parseISO(b.dueDate)));

    return (compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)));
  });

  return tasksArray;
}

function deleteTask(id) {
  if (!Object.hasOwn(tasks, id)) return false;
  delete tasks[id];
  writeTasks(tasks);
  return true;
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
  const oldTask = tasks[id];
  if (!oldTask) return null;
  const updatedTask = new Task(id, title, description, dueDate, priority, projectID, oldTask.completed);
  tasks[id] = updatedTask;
  writeTasks(tasks);
  return updatedTask;
}

function changeTaskStatus(id, completed) {
  if (tasks[id]) {
    tasks[id].completed = completed;
  }
  writeTasks(tasks);
}

function getTaskById(id) {
  return tasks[id] || null;
}

export {
  createTask,
  getTasks,
  deleteTask,
  deleteProjectTasks,
  updateTask,
  changeTaskStatus,
  getTaskById
}
