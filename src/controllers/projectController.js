import { createProject, getProjectById, getProjects, updateProject } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { highlightProjectById, onAddProject, onCancelProject, onEditProject, onProjectSelection, onProjectSubmit, openEditProjectDialog, renderProject, renderProjects, setHeaderTitle, updateProjectItem } from "../views/projectView";
import { renderTasks } from "../views/taskView";

let currentProjectId = null;
let editingProjectId = null;

function initProjectController() {
  onAddProject(handleAddProject);
  onProjectSubmit(handleProjectSubmit);
  onCancelProject();
  onProjectSelection(handleSelectProject);
  onEditProject(handleEditProject);
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
  if (editingProjectId) {
    updateProject(editingProjectId, projectName);
    setHeaderTitle(projectName);
    updateProjectItem(editingProjectId, projectName);
  } else {
    const newProject = createProject(projectName);
    renderProject(newProject);
  }
  editingProjectId = null;
}

function selectProject(projectId) {
  highlightProjectById(projectId);
  handleSelectProject(projectId);
}

function handleSelectProject(projectId) {
  const project = getProjectById(projectId);
  if (!project) return;
  currentProjectId = projectId;
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
