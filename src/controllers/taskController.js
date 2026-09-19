import { changeTaskStatus, createTask, deleteTask, getTaskById, updateTask } from "../services/taskService";
import { closeTaskDialog, onAddTask, onCancelTask, onDeleteTask, onTaskSelect, onTaskStatusChange, onTaskSubmit, openEditTaskDialog, removeTaskItem, renderTask, renderTasks, showTaskDescriptionError, showTaskTitleError, updateTaskItem } from "../views/taskView"
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
  if (!taskTitle) {
    showTaskTitleError("Task title cannot be empty");
    return;
  }
  if (taskTitle.length > 100) {
    showTaskTitleError("Task name must be less than 100 characters");
    return;
  }
  if (taskDescription.length > 500) {
    showTaskDescriptionError("Task description must be less than 500 characters");
    return;
  }
  if (editingTaskId) {
    const updatedTask = updateTask(editingTaskId, taskTitle, taskDescription, taskDueDate, taskPriority, getCurrentProjectId());
    if (!updatedTask) return;
    updateTaskItem(updatedTask);
  } else {
    const newTask = createTask(taskTitle, taskDescription, taskDueDate, taskPriority, getCurrentProjectId());
    renderTask(newTask);
  }
  editingTaskId = null;
  closeTaskDialog()
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
