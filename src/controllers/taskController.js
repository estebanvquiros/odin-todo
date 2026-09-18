import { changeTaskStatus, createTask, deleteTask, getTaskById, updateTask } from "../services/taskService";
import { onAddTask, onCancelTask, onDeleteTask, onTaskSelect, onTaskStatusChange, onTaskSubmit, openEditTaskDialog, removeTaskItem, renderTask, renderTasks, updateTaskItem } from "../views/taskView"
import { getCurrentProjectId } from "./projectController";

let editingTaskId = null;

function initTaskController() {
  onAddTask(handleAddTask);
  onTaskSubmit(handleTaskSubmit);
  onCancelTask();
  onTaskStatusChange(handleTaskStatusChange);
  onTaskSelect(handleTaskSelect);
  onDeleteTask(handleDeleteTask);
}

function handleTaskSubmit(taskTitle, taskDescription, taskDueDate, taskPriority) {
  if (editingTaskId) {
    const updatedTask = updateTask(editingTaskId, taskTitle, taskDescription, taskDueDate, taskPriority, getCurrentProjectId());
    if (!updatedTask) return;
    updateTaskItem(updatedTask);
  } else {
    const newTask = createTask(taskTitle, taskDescription, taskDueDate, taskPriority, getCurrentProjectId());
    renderTask(newTask);
  }
}

function handleDeleteTask() {
  console.log(`Deleting task ${editingTaskId}`);
  const success = deleteTask(editingTaskId);
  if (!success) return;
  removeTaskItem(editingTaskId);
  editingTaskId = null;
}

function handleAddTask() {
  editingTaskId = null;
}

function handleTaskStatusChange(taskId, completed) {
  changeTaskStatus(taskId, completed);
}

function handleTaskSelect(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  editingTaskId = taskId;
  openEditTaskDialog(task);
}

export { initTaskController }
