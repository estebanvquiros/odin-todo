import { createProject, getProjectById, getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { highlightProjectById, onAddProject, onCancelProject, onProjectSelection, onProjectSubmit, renderProject, renderProjects, setHeaderTitle } from "../views/projectView";
import { renderTasks } from "../views/taskView";

let currentProjectId = null;

function initProjectController() {
  onAddProject();
  onProjectSubmit(handleProjectSubmit);
  onCancelProject();
  onProjectSelection(handleSelectProject);
}

function loadProjects() {
  const projects = getProjects();
  renderProjects(projects);
  if (projects.length > 0) {
    selectProject(projects[0].id);
  }
}

function handleProjectSubmit(projectName) {
  const newProject = createProject(projectName);
  renderProject(newProject);
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

function getCurrentProjectId() {
  return currentProjectId;
}

export { initProjectController, loadProjects, getCurrentProjectId }
