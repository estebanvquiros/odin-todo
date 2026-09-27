import { setCurrentProjectId, getCurrentProjectId } from "../core/appState.js";
import { deleteProjectTasks, getTasks } from "../services/taskService";
import {
  createProject,
  deleteProject,
  getDefaultProject,
  getProjectById,
  getProjects,
  initDefaultProject,
  updateProject
} from "../services/projectService";
import {
  onProjectSubmit,
  onProjectDelete,
  onProjectCancel,
  openCreateProjectDialog,
  openEditProjectDialog,
  closeProjectDialog,
  showProjectNameError
} from "../views/project/projectDialogView.js";
import { setHeaderTitle, onProjectEdit } from "../views/project/projectHeaderView.js";
import {
  onProjectAdd,
  onProjectSelection,
  renderProject,
  renderProjects,
  highlightProjectById,
  updateProjectItem,
  removeProjectItem
} from "../views/project/projectListView.js";
import { renderTasks } from "../views/task/taskListView";

let isEditingProject = false;

function initProjectController() {
  onProjectAdd(handleAddProject);
  onProjectSubmit(handleProjectSubmit);
  onProjectCancel();
  onProjectSelection(selectProject);
  onProjectEdit(handleEditProject);
  onProjectDelete(handleDeleteProject);
}

function loadProjects() {
  const projects = getProjects();
  renderProjects(projects);
  if (projects.length > 0) {
    selectProject(projects[0].id);
  }
}

function handleAddProject() {
  isEditingProject = false;
  openCreateProjectDialog();
}

function handleProjectSubmit(projectName) {
  if (!projectName) {
    showProjectNameError("Project name cannot be empty");
    return;
  }
  if (projectName.length > 30) {
    showProjectNameError("Project name must be less than 30 characters");
    return;
  }
  if (isEditingProject) {
    const currentProjectId = getCurrentProjectId();
    const updatedProject = updateProject(currentProjectId, projectName);
    if (!updatedProject) return;
    setHeaderTitle(projectName);
    updateProjectItem(currentProjectId, projectName);
  } else {
    const newProject = createProject(projectName);
    renderProject(newProject);
  }
  closeProjectDialog();
  isEditingProject = false;
}

function handleDeleteProject() {
  const currentProjectId = getCurrentProjectId();
  if (!currentProjectId) return;
  const success = deleteProject(currentProjectId);
  if (!success) return;
  deleteProjectTasks(currentProjectId);
  removeProjectItem(currentProjectId);
  isEditingProject = false;
  let defaultProject = getDefaultProject();
  if (!defaultProject) {
    initDefaultProject();
    defaultProject = getDefaultProject();
  }
  selectProject(defaultProject.id);
}

function selectProject(projectId) {
  const project = getProjectById(projectId);
  if (!project) return;
  setCurrentProjectId(projectId);
  highlightProjectById(projectId);
  setHeaderTitle(project.name);
  const tasks = getTasks(projectId);
  renderTasks(tasks);
}

function handleEditProject() {
  if (!getCurrentProjectId()) return;
  const project = getProjectById(getCurrentProjectId());
  if (!project) return;
  isEditingProject = true;
  openEditProjectDialog(project);
}

export { initProjectController, loadProjects }
