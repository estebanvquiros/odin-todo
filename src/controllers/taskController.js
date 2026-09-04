import { createTask, getTasks } from "../services/taskService";

const newTaskBtn = document.querySelector("#new-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const taskForm = document.querySelector("#task-form");
const taskTitleInput = document.querySelector("#task-title-input");
const taskDescriptionInput = document.querySelector("#task-description-input");
const taskDateInput = document.querySelector("#task-date-input");
const taskPriorityInput = document.querySelector("#task-priority-input");
const taskCancelBtn = document.querySelector("#task-cancel-btn");

newTaskBtn.addEventListener("click", openTaskDialog);
taskForm.addEventListener("submit", addTask);
taskCancelBtn.addEventListener("click", closeTaskDialog);

function addTask(e) {
  e.preventDefault();
  createTask(
    taskTitleInput.value,
    taskDescriptionInput.value,
    taskDateInput.value,
    taskPriorityInput.value,
    0 // TODO: Create task of a selected project.
  );
  closeTaskDialog();
}

function openTaskDialog() {
  taskDialog.showModal();
}

function closeTaskDialog() {
  taskForm.reset();
  taskDialog.close();
}

function loadTasks() {
  // TODO: Load tasks of a project.
  const tasks = getTasks();
  console.log(tasks);
}

export { loadTasks }
