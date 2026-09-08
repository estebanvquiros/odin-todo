import { createProject, getProjects } from "../services/projectService";
import { onAddProject, onCancelProject, onProjectSelection, onProjectSubmit, renderProject, renderProjects } from "../views/projectView";

function initProjectController() {
  onAddProject();
  onProjectSubmit(handleProjectSubmit);
  onCancelProject();
  onProjectSelection(handleSelectProject);
}

function loadProjects() {
  const projects = getProjects();
  renderProjects(projects);
}

function handleProjectSubmit(projectName) {
  const newProject = createProject(projectName);
  renderProject(newProject);
}

function handleSelectProject(projectId) {
  console.log(projectId);
}

export { initProjectController, loadProjects }
