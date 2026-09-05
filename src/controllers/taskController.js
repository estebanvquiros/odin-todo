import { createTask, getTasks } from "../services/taskService";
import { createTaskElement } from "../views/taskView";
import { getActiveProjectId } from "./projectController";

const taskContainer = document.querySelector("#tasks")
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
  const newTask = createTask(
    taskTitleInput.value,
    taskDescriptionInput.value,
    taskDateInput.value,
    taskPriorityInput.value,
    getActiveProjectId()
  );
  const newTaskElement = createTaskElement(newTask);
  taskContainer.appendChild(newTaskElement);
  closeTaskDialog();
}

function openTaskDialog() {
  taskDialog.showModal();
}

function closeTaskDialog() {
  taskForm.reset();
  taskDialog.close();
}

function loadTasks(projectId) {
  const tasks = getTasks(projectId);
  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    fragment.appendChild(createTaskElement(task));
  })
  taskContainer.replaceChildren(fragment);
}

export { loadTasks }
