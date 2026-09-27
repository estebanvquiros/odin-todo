import { formatDueDate } from "../../utils/dateUtils.js";

const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

function onTaskAdd(handler) {
  addTaskBtn.addEventListener("click", () => {
    handler();
  });
}

function onTaskSelect(handler) {
  taskList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("task")) return;
    const taskId = e.target.dataset.taskId;
    handler(taskId);
  })
}

function onTaskStatusChange(handler) {
  taskList.addEventListener("change", (e) => {
    const checkbox = e.target;
    if (!checkbox.classList.contains("task-checkbox")) return;
    const taskItem = checkbox.closest(".task");
    if (!taskItem) return;
    handler(taskItem.dataset.taskId, checkbox.checked);
    taskItem.classList.toggle("completed", checkbox.checked);
  });
}

function createTaskItem(task) {
  const taskItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskTitle = document.createElement("h2");
  const taskPriority = document.createElement("p");

  taskItem.classList.add("task");
  checkbox.classList.add("task-checkbox");
  taskTitle.classList.add("task-title");
  taskPriority.classList.add("task-priority", task.priority.toLowerCase());

  if (task.completed === true) {
    taskItem.classList.add("completed");
  }

  checkbox.type = "checkbox";
  checkbox.checked = Boolean(task.completed);
  taskItem.dataset.taskId = task.id;
  taskTitle.textContent = task.title;
  taskPriority.textContent = task.priority;

  if (task.dueDate) {
    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-duedate")
    taskDueDate.textContent = formatDueDate(task.dueDate);
    taskItem.appendChild(taskDueDate);
  }

  if (task.description) {
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;
    taskItem.appendChild(taskDescription);
  }

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskPriority);

  return taskItem;
}

function renderTask(task) {
  const taskItem = createTaskItem(task);
  taskList.appendChild(taskItem);
}

function renderTasks(tasks) {
  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    fragment.appendChild(createTaskItem(task));
  })
  taskList.replaceChildren(fragment);
}

function updateTaskItem(task) {
  const oldTaskItem = taskList.querySelector(`[data-task-id="${task.id}"]`);
  const newTaskItem = createTaskItem(task);
  oldTaskItem.replaceWith(newTaskItem);
}

function removeTaskItem(taskId) {
  const taskItem = taskList.querySelector(`[data-task-id="${taskId}"]`);
  taskItem.remove();
}

export {
  onTaskAdd,
  onTaskSelect,
  createTaskItem,
  renderTask,
  renderTasks,
  onTaskStatusChange,
  updateTaskItem,
  removeTaskItem
}
