const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

const taskDialog = document.querySelector("#task-dialog");
const taskForm = taskDialog.querySelector("#task-form");
const taskTitleInput = taskForm.querySelector("#task-title-input");
const taskDescriptionInput = taskForm.querySelector("#task-description-input");
const taskDueDateInput = taskForm.querySelector("#task-date-input");
const taskPriorityInput = taskForm.querySelector("#task-priority-input");
const cancelTaskBtn = taskDialog.querySelector("#task-cancel-btn")

function onAddTask() {
  addTaskBtn.addEventListener("click", () => {
    openTaskDialog();
  });
}

function onTaskSubmit(handler) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handler(taskTitleInput.value.trim(), taskDescriptionInput.value.trim(), taskDueDateInput.value, taskPriorityInput.value);
    closeTaskDialog();
  })
}

function onCancelTask() {
  cancelTaskBtn.addEventListener("click", () => {
    closeTaskDialog();
  });
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

function openTaskDialog() {
  taskDialog.showModal();
}

function closeTaskDialog() {
  taskForm.reset();
  taskDialog.close();
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

// function renderTasks(projectId) {
//   const tasks = getTasks(projectId);
//   const fragment = document.createDocumentFragment();
//   tasks.forEach((task) => {
//     fragment.appendChild(createTaskItem(task));
//   })
//   taskList.replaceChildren(fragment);
// }

export { createTaskItem, onAddTask, onTaskSubmit, onCancelTask, renderTask, renderTasks, onTaskStatusChange }
