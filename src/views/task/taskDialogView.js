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
const taskProjectSelector = taskForm.querySelector("#task-project-selector");
const taskProjectInput = taskForm.querySelector("#task-project-input");
const taskSubmitBtn = taskDialog.querySelector("#task-submit-btn");
const taskDeleteBtn = taskDialog.querySelector("#task-delete-btn");
const taskCancelBtn = taskDialog.querySelector("#task-cancel-btn");


function onTaskSubmit(handler) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handler(taskTitleInput.value.trim(), taskDescriptionInput.value.trim(), taskDueDateInput.value, taskPriorityInput.value, taskProjectInput.value);
  })
}

function onTaskDelete(handler) {
  taskDeleteBtn.addEventListener("click", () => {
    handler();
    closeTaskDialog();
  })
}

function onTaskCancel() {
  taskCancelBtn.addEventListener("click", closeTaskDialog);
  taskDialog.addEventListener("close", resetTaskForm);
}

function openCreateTaskDialog() {
  setupCreateTaskDialog();
  openTaskDialog();
}

function openEditTaskDialog(task, projects) {
  setupEditTaskDialog();
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  taskDueDateInput.value = task.dueDate;
  taskPriorityInput.value = task.priority;
  populateTaskProjectOptions(projects, task.projectID);
  openTaskDialog();
}

function openTaskDialog() {
  taskDialog.showModal();
}

function closeTaskDialog() {
  taskDialog.close();
}

function setupCreateTaskDialog() {
  taskDialogTitle.textContent = "New Task";
  taskSubmitBtn.textContent = "Create Task";
  taskDeleteBtn.classList.add("hidden");
  taskProjectSelector.classList.add("hidden");
}

function setupEditTaskDialog() {
  taskDialogTitle.textContent = "Task Details";
  taskSubmitBtn.textContent = "Save";
  taskDeleteBtn.classList.remove("hidden");
  taskCancelBtn.textContent = "Close";
  taskProjectSelector.classList.remove("hidden");
}

function populateTaskProjectOptions(projects, selectedProjectId) {
  taskProjectInput.replaceChildren();
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.text = project.name;
    if (project.id === selectedProjectId) option.selected = true;
    taskProjectInput.add(option);
  })
}

function showTaskTitleError(message) {
  taskTitleError.textContent = message;
  taskTitleInput.classList.add("input-error");
  taskTitleError.classList.remove("hidden");
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

function resetTaskForm() {
  taskForm.reset();
  hideTaskErrors();
}

function hideTaskErrors() {
  taskTitleError.classList.add("hidden");
  taskDescriptionError.classList.add("hidden");
  taskTitleInput.classList.remove("input-error");
  taskDescriptionInput.classList.remove("input-error");
  taskDueDateError.classList.add("hidden");
  taskDueDateInput.classList.remove("input-error");
}

export {
  onTaskSubmit,
  onTaskDelete,
  onTaskCancel,
  openCreateTaskDialog,
  openEditTaskDialog,
  closeTaskDialog,
  resetTaskForm,
  showTaskTitleError,
  showTaskDescriptionError,
  showTaskDueDateError
}
