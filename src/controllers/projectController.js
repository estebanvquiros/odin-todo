import { getProjects } from "../services/projectService";
import { createProjectItem } from "../views/projectView";

const projectsContainer = document.querySelector("#projects");

function loadProjects() {
  const projects = getProjects();
  projects.forEach((project) => {
    projectsContainer.appendChild(createProjectItem(project));
  });
}

export { loadProjects }