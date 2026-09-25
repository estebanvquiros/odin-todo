import { parseISO, isValid, differenceInCalendarDays } from "date-fns";
import { changeTaskStatus, createTask, deleteTask, getTaskById, updateTask } from "../services/taskService";
import { closeTaskDialog, onAddTask, onCancelTask, onDeleteTask, onTaskSelect, onTaskStatusChange, onTaskSubmit, openEditTaskDialog, removeTaskItem, renderTask, renderTasks, showTaskDescriptionError, showTaskTitleError, showTaskDueDateError, updateTaskItem } from "../views/taskView"
import { getCurrentProjectId } from "./projectController";
import { getProjectById, getProjects } from "../services/projectService";

let editingTaskId = null;

function initTaskController() {
  onAddTask(handleAddTask);
  onTaskSubmit(handleTaskSubmit);
  onCancelTask();
  onTaskStatusChange(handleTaskStatusChange);
  onTaskSelect(handleTaskSelect);
  onDeleteTask(handleDeleteTask);
}

function handleTaskSubmit(taskTitle, taskDescription, taskDueDate, taskPriority, selectedProjectId) {

  let hasError = false;

  if (!taskTitle) {
    showTaskTitleError("Task title cannot be empty");
    hasError = true;
  } else if (taskTitle.length > 100) {
    showTaskTitleError("Task name must be less than 100 characters");
    hasError = true;
  }

  if (taskDescription.length > 500) {
    showTaskDescriptionError("Task description must be less than 500 characters");
    hasError = true;
  }

  if (taskDueDate) {
    if (!isValid(parseISO(taskDueDate))) {
      showTaskDueDateError("Please enter a valid date");
      hasError = true;
    } else if (differenceInCalendarDays(parseISO(taskDueDate), new Date()) < 0) {
      showTaskDueDateError("Date must be today or later");
      hasError = true;
    }
  }

  const sanitizedPriority = ["High", "Medium", "Low"].includes(taskPriority) ? taskPriority : "Low";

  if (hasError) return;

  const currentProjectId = getCurrentProjectId();
  if (!currentProjectId) return;

  if (!getProjectById(selectedProjectId)) return;

  if (editingTaskId) {
    const updatedTask = updateTask(editingTaskId, taskTitle, taskDescription, taskDueDate, sanitizedPriority, selectedProjectId);
    if (!updatedTask) return;
    if (currentProjectId === selectedProjectId) {
      updateTaskItem(updatedTask);
    } else {
      removeTaskItem(editingTaskId);
    }
  } else {
    const newTask = createTask(taskTitle, taskDescription, taskDueDate, sanitizedPriority, currentProjectId);
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
  openEditTaskDialog(task, getProjects());
}

export { initTaskController }
