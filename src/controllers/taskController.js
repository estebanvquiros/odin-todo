import { changeTaskStatus, createTask } from "../services/taskService";
import { onAddTask, onCancelTask, onTaskStatusChange, onTaskSubmit, renderTask } from "../views/taskView"
import { getCurrentProjectId } from "./projectController";

function initTaskController() {
  onAddTask();
  onTaskSubmit(handleTaskSubmit);
  onCancelTask();
  onTaskStatusChange(handleTaskStatusChange);
}

function handleTaskSubmit(taskTitle, taskDescription, taskDueDate, taskPriority) {
  const newTask = createTask(taskTitle, taskDescription, taskDueDate, taskPriority, getCurrentProjectId());
  renderTask(newTask);
}

function handleTaskStatusChange(taskId, completed) {
  changeTaskStatus(taskId, completed);
}

export { initTaskController }
