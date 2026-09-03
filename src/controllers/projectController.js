import { createProject, getProjects } from "../services/projectService";
import { createProjectItem } from "../views/projectView";

const projectsContainer = document.querySelector("#projects");

const newProjectButton = document.querySelector("#new-project-btn");
const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");
const projectNameInput = document.querySelector("#project-name-input");
const projectCancelBtn = document.querySelector("#project-cancel-btn");

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

function loadProjects() {
  const projects = getProjects();
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    fragment.appendChild(createProjectItem(project));
  });
  projectsContainer.replaceChildren(fragment);
}

export { loadProjects }
