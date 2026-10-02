import { parseISO, isValid, differenceInCalendarDays } from "date-fns";
import { getCurrentFilter, getCurrentProjectId, getCurrentSort, setCurrentFilter, setCurrentSort } from "../core/appState.js";
import { getProjectById, getProjects } from "../services/projectService.js";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from "../services/taskService";
import {
  onTaskSubmit,
  onTaskDelete,
  onTaskCancel,
  openCreateTaskDialog,
  openEditTaskDialog,
  closeTaskDialog,
  showTaskTitleError,
  showTaskDescriptionError,
  showTaskDueDateError
} from "../views/task/taskDialogView.js";
import {
  onTaskAdd,
  onTaskSelect,
  onTaskFilter,
  onTaskStatusChange,
  renderTask,
  updateTaskItem,
  removeTaskItem,
  renderTasks,
  onTaskSort
} from "../views/task/taskListView.js";
import { subscribe } from "../core/eventBus.js";

let editingTaskId = null;

function initTaskController() {
  onTaskAdd(handleAddTask);
  onTaskSubmit(handleTaskSubmit);
  onTaskCancel();
  onTaskStatusChange(handleTaskStatusChange);
  onTaskSelect(handleTaskSelect);
  onTaskDelete(handleDeleteTask);
  onTaskFilter(handleFilterTasks);
  onTaskSort(handleSortTasks);
  subscribe("project-selected", (projectId) => {
    loadTasks(projectId, getCurrentFilter());
  });
}

function handleTaskSubmit(taskTitle, taskDescription, taskDueDate, taskPriority, selectedProjectId) {
  if (hasTaskFormErrors(taskTitle, taskDescription, taskDueDate, taskPriority)) return;

  const currentProjectId = getCurrentProjectId();
  if (!currentProjectId) return;

  if (editingTaskId) {
    if (!getProjectById(selectedProjectId)) return;
    const updatedTask = updateTask(editingTaskId, taskTitle, taskDescription, taskDueDate, taskPriority, selectedProjectId);
    if (!updatedTask) return;
    loadTasks(getCurrentProjectId(), getCurrentFilter(), getCurrentSort());
  } else {
    const newTask = createTask(taskTitle, taskDescription, taskDueDate, taskPriority, currentProjectId);
    if (!newTask) return;
    loadTasks(getCurrentProjectId(), getCurrentFilter(), getCurrentSort());
  }
  editingTaskId = null;
  closeTaskDialog()
}

function hasTaskFormErrors(taskTitle, taskDescription, taskDueDate, taskPriority) {
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

  if (!["High", "Medium", "Low"].includes(taskPriority)) {
    hasError = true;
  }

  return hasError;
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
  openCreateTaskDialog();
}

function handleTaskStatusChange(taskId, completed) {
  changeTaskStatus(taskId, completed);
  loadTasks(getCurrentProjectId(), getCurrentFilter(), getCurrentSort());
}

function handleTaskSelect(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  editingTaskId = taskId;
  openEditTaskDialog(task, getProjects());
}

function handleFilterTasks(filter) {
  if (!["all", "pending", "completed"].includes(filter)) return;
  setCurrentFilter(filter);
  loadTasks(getCurrentProjectId(), filter, getCurrentSort());
}

function handleSortTasks(sort) {
  if (!["dueDate-asc", "dueDate-desc"].includes(sort)) return;
  setCurrentSort(sort);
  loadTasks(getCurrentProjectId(), getCurrentFilter(), sort);
}

function loadTasks(projectId, filter, sort) {
  const tasks = getTasks(projectId, filter, sort);
  if (!tasks) return;
  renderTasks(tasks);
}

export { initTaskController }
