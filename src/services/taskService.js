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

function getTasks(projectId = null, filter = 'all', sort = { criteria: "dueDate", direction: "asc" }) {
  let tasksArray = Object.values(tasks);

  tasksArray = filterTasksByProject(tasksArray, projectId);
  tasksArray = filterTasksByStatus(tasksArray, filter);

  if (sort.criteria === "dueDate") {
    tasksArray = sortTasksByDueDate(tasksArray, sort.direction);
  } else if (sort.criteria === "priority") {
    tasksArray = sortTasksByPriority(tasksArray, sort.direction);
  }

  return tasksArray;
}

function sortTasksByPriority(tasksArray, direction) {
  const priorityWeight = { Low: 0, Medium: 1, High: 2 };
  return [...tasksArray].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    let priorityDifference = priorityWeight[a.priority] - priorityWeight[b.priority];
    if (direction === "desc") priorityDifference = -priorityDifference;

    if (priorityDifference !== 0) return priorityDifference;

    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return (compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)));
  });
}

function sortTasksByDueDate(tasksArray, direction) {
  return [...tasksArray].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (direction === "desc") return (compareDesc(parseISO(a.dueDate), parseISO(b.dueDate)));

    return (compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)));
  });
}

function filterTasksByProject(tasksArray, projectId) {
  if (projectId) {
    return tasksArray.filter((task) => task.projectID === projectId);
  }
  return tasksArray;
}

function filterTasksByStatus(tasksArray, filter) {
  if (filter === "completed") {
    return tasksArray.filter((task) => task.completed === true);
  } else if (filter === "pending") {
    return tasksArray.filter((task) => task.completed === false);
  }
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
