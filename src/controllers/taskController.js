import { changeTaskStatus, createTask, getTasks } from "../services/taskService";
import { createTaskElement } from "../views/taskView";

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
taskContainer.addEventListener("change", handleStatusChange);

function addTask(e) {
  e.preventDefault();
  const newTask = createTask(
    taskTitleInput.value,
    taskDescriptionInput.value,
    taskDateInput.value,
    taskPriorityInput.value,
  );
  const newTaskElement = createTaskElement(newTask);
  taskContainer.appendChild(newTaskElement);
  closeTaskDialog();
}

function handleStatusChange(e) {
  if (!e.target.classList.contains("task-checkbox")) return;
  const checkbox = e.target;
  const taskElement = checkbox.closest(".task");
  const taskId = taskElement.dataset.taskId;
  changeTaskStatus(taskId, checkbox.checked);
  taskElement.classList.toggle("completed", checkbox.checked);
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
