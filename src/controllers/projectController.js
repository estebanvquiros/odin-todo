import { createProject, getProjectName, getProjects } from "../services/projectService";
import { createProjectItem } from "../views/projectView";
import { loadTasks } from "./taskController";

let activeProjectId = "";

const activeProjectName = document.querySelector("#active-project-name");
const projectsContainer = document.querySelector("#projects");
const newProjectButton = document.querySelector("#new-project-btn");
const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");
const projectNameInput = document.querySelector("#project-name-input");
const projectCancelBtn = document.querySelector("#project-cancel-btn");

projectsContainer.addEventListener("click", selectProject);
newProjectButton.addEventListener("click", openProjectDialog);
projectForm.addEventListener("submit", addProject);
projectCancelBtn.addEventListener("click", closeProjectDialog);

function addProject(e) {
  e.preventDefault();
  const newProject = createProject(projectNameInput.value);
  const newProjectElement = createProjectItem(newProject);
  projectsContainer.appendChild(newProjectElement);
  closeProjectDialog();
}

function openProjectDialog() {
  projectDialog.showModal();
}

function closeProjectDialog() {
  projectNameInput.value = "";
  projectDialog.close();
}

function selectProject(e) {
  const selection = e.target;
  if (!selection.classList.contains("project")) return;
  setActiveProject(selection);
}

function setActiveProject(projectElement) {
  if (!projectElement) return;
  activeProjectId = projectElement.dataset.projectId;
  highlightSelectedProject(projectElement);
  activeProjectName.textContent = getProjectName(activeProjectId);
  loadTasks(activeProjectId);
}

function highlightSelectedProject(selectedProject) {
  const currentActiveProject = document.querySelector(".project.active");
  if (currentActiveProject) {
    currentActiveProject.classList.remove("active");
  }
  selectedProject.classList.add("active");
}

function loadProjects() {
  const projects = getProjects();
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    fragment.appendChild(createProjectItem(project));
  });
  projectsContainer.replaceChildren(fragment);

  const firstProjectOfList = document.querySelector(".project");
  if (firstProjectOfList) {
    setActiveProject(firstProjectOfList);
  }
}

function getActiveProjectId() {
  return activeProjectId;
}

export { loadProjects, getActiveProjectId }
