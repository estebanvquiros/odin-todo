const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogTitle = taskDialog.querySelector("#task-dialog-title");
const taskForm = taskDialog.querySelector("#task-form");
const taskTitleInput = taskForm.querySelector("#task-title-input");
const taskDescriptionInput = taskForm.querySelector("#task-description-input");
const taskDueDateInput = taskForm.querySelector("#task-date-input");
const taskPriorityInput = taskForm.querySelector("#task-priority-input");
const taskSubmitBtn = taskDialog.querySelector("#task-submit-btn");
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
    closeTaskDialog();
  })
}

function onTaskSelect(handler) {
  taskList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("task")) return;
    const taskId = e.target.dataset.taskId;
    handler(taskId);
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
    taskDueDate.textContent = task.dueDate;
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

function setupCreateTaskDialog() {
  taskDialogTitle.textContent = "New Task";
  taskSubmitBtn.textContent = "Create Task";
}

function setupEditTaskDialog() {
  taskDialogTitle.textContent = "Edit Task";
  taskSubmitBtn.textContent = "Save Changes";
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

export { createTaskItem, onAddTask, onTaskSubmit, onCancelTask, renderTask, renderTasks, onTaskStatusChange, onTaskSelect, openEditTaskDialog, updateTaskItem }
