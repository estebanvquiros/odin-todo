import { differenceInCalendarDays, format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";

const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogTitle = taskDialog.querySelector("#task-dialog-title");
const taskForm = taskDialog.querySelector("#task-form");
const taskTitleInput = taskForm.querySelector("#task-title-input");
const taskTitleError = taskForm.querySelector("#task-title-error");
const taskDescriptionInput = taskForm.querySelector("#task-description-input");
const taskDescriptionError = taskForm.querySelector("#task-description-error");
const taskDueDateInput = taskForm.querySelector("#task-date-input");
const taskDueDateError = taskForm.querySelector("#task-duedate-error");
const taskPriorityInput = taskForm.querySelector("#task-priority-input");
const taskSubmitBtn = taskDialog.querySelector("#task-submit-btn");
const taskDeleteBtn = taskDialog.querySelector("#task-delete-btn");
const taskCancelBtn = taskDialog.querySelector("#task-cancel-btn")

function onAddTask(handler) {
  addTaskBtn.addEventListener("click", () => {
    handler();
    openCreateTaskDialog();
  });
}

function onTaskSubmit(handler) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handler(taskTitleInput.value.trim(), taskDescriptionInput.value.trim(), taskDueDateInput.value, taskPriorityInput.value);
  })
}

function onTaskSelect(handler) {
  taskList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("task")) return;
    const taskId = e.target.dataset.taskId;
    handler(taskId);
  })
}

function onDeleteTask(handler) {
  taskDeleteBtn.addEventListener("click", () => {
    handler();
    closeTaskDialog();
  })
}

function onCancelTask() {
  taskCancelBtn.addEventListener("click", closeTaskDialog);
  taskDialog.addEventListener("close", resetTaskForm);
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

function openCreateTaskDialog() {
  setupCreateTaskDialog();
  openTaskDialog();
}

function openEditTaskDialog(task) {
  setupEditTaskDialog();
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  taskDueDateInput.value = task.dueDate;
  taskPriorityInput.value = task.priority;
  openTaskDialog();
}

function openTaskDialog() {
  taskDialog.showModal();
}

function closeTaskDialog() {
  taskDialog.close();
}

function resetTaskForm() {
  taskForm.reset();
  hideTaskErrors();
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

function formatDueDate(dueDateString) {
  const dueDate = parseISO(dueDateString);

  if (isToday(dueDate)) return "Today";
  if (isTomorrow(dueDate)) return "Tomorrow";
  if (isYesterday(dueDate)) return "Yesterday";

  const remainingDays = differenceInCalendarDays(dueDate, new Date);

  if (remainingDays < 0) return `${Math.abs(remainingDays)} days ago`;
  if (remainingDays <= 7) return `In ${remainingDays} days`;

  return format(dueDate, 'MMM d, yyyy');
}

function setupCreateTaskDialog() {
  taskDialogTitle.textContent = "New Task";
  taskSubmitBtn.textContent = "Create Task";
  taskDeleteBtn.classList.add("hidden");
}

function setupEditTaskDialog() {
  taskDialogTitle.textContent = "Task Details";
  taskSubmitBtn.textContent = "Save";
  taskDeleteBtn.classList.remove("hidden");
  taskCancelBtn.textContent = "Close";
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

function showTaskTitleError(message) {
  taskTitleError.textContent = message;
  taskTitleInput.classList.add("input-error");
  taskTitleError.classList.remove("hidden");
}

function hideTaskErrors() {
  taskTitleError.classList.add("hidden");
  taskDescriptionError.classList.add("hidden");
  taskTitleInput.classList.remove("input-error");
  taskDescriptionInput.classList.remove("input-error");
  taskDueDateError.classList.add("hidden");
  taskDueDateInput.classList.remove("input-error");
}

function showTaskDescriptionError(message) {
  taskDescriptionError.textContent = message;
  taskDescriptionInput.classList.add("input-error");
  taskDescriptionError.classList.remove("hidden");
}

function showTaskDueDateError(message) {
  taskDueDateError.textContent = message;
  taskDueDateInput.classList.add("input-error");
  taskDueDateError.classList.remove("hidden");
}

export { createTaskItem, onAddTask, onTaskSubmit, onCancelTask, renderTask, renderTasks, onTaskStatusChange, onTaskSelect, openEditTaskDialog, updateTaskItem, onDeleteTask, removeTaskItem, showTaskDescriptionError, showTaskTitleError, closeTaskDialog, showTaskDueDateError }
