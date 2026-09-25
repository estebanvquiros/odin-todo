import { createProject, deleteProject, getDefaultProject, getProjectById, getProjects, initDefaultProject, updateProject } from "../services/projectService";
import { deleteProjectTasks, getTasks } from "../services/taskService";
import { closeProjectDialog, highlightProjectById, onAddProject, onCancelProject, onEditProject, onProjectDelete, onProjectSelection, onProjectSubmit, openEditProjectDialog, removeProjectItem, renderProject, renderProjects, setHeaderTitle, showProjectNameError, updateProjectItem } from "../views/projectView";
import { renderTasks } from "../views/taskView";

let currentProjectId = null;
let editingProjectId = null;

function initProjectController() {
  onAddProject(handleAddProject);
  onProjectSubmit(handleProjectSubmit);
  onCancelProject();
  onProjectSelection(selectProject);
  onEditProject(handleEditProject);
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
  editingProjectId = null;
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
  if (editingProjectId) {
    const updatedProject = updateProject(editingProjectId, projectName);
    if (!updatedProject) return;
    setHeaderTitle(projectName);
    updateProjectItem(editingProjectId, projectName);
  } else {
    const newProject = createProject(projectName);
    renderProject(newProject);
  }
  closeProjectDialog();
  editingProjectId = null;
}

function handleDeleteProject() {
  const success = deleteProject(editingProjectId);
  if (!success) return;
  deleteProjectTasks(editingProjectId);
  removeProjectItem(editingProjectId);
  editingProjectId = null;
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
  currentProjectId = projectId;
  highlightProjectById(projectId);
  setHeaderTitle(project.name);
  const tasks = getTasks(projectId);
  renderTasks(tasks);
}

function handleEditProject() {
  if (!currentProjectId) return;
  const project = getProjectById(currentProjectId);
  if (!project) return;
  editingProjectId = project.id;
  openEditProjectDialog(project);
}

function getCurrentProjectId() {
  return currentProjectId;
}

export { initProjectController, loadProjects, getCurrentProjectId }
