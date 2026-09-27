const projectList = document.querySelector("#project-list");
const createProjectBtn = document.querySelector("#create-project-btn");

function onProjectAdd(handler) {
  createProjectBtn.addEventListener("click", () => {
    handler();
  });
}

function onProjectSelection(handler) {
  projectList.addEventListener("click", (e) => {
    const project = e.target;
    if (!project.classList.contains("project")) return;
    handler(project.dataset.projectId);
  });
}

function createProjectItem(project) {
  const projectItem = document.createElement("li");
  const projectName = document.createElement("p");
  const icon = document.createElement("span");

  projectItem.classList.add("sidebar-item", "project");
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pound</title><path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z" /></svg>';
  projectName.textContent = project.name;
  projectName.classList.add("project-name");
  projectItem.dataset.projectId = project.id;

  projectItem.append(icon);
  projectItem.append(projectName);

  return projectItem;
}

function renderProject(project) {
  const projectItem = createProjectItem(project);
  projectList.appendChild(projectItem);
}

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    fragment.appendChild(createProjectItem(project));
  });
  projectList.replaceChildren(fragment);
}

function highlightProject(projectItem) {
  const previousSelected = projectList.querySelector(".active");
  if (previousSelected) {
    previousSelected.classList.remove("active");
  }
  projectItem.classList.add("active");
}

function highlightProjectById(projectId) {
  const projectItem = projectList.querySelector(`[data-project-id="${projectId}"]`);
  if (projectItem) {
    highlightProject(projectItem);
  }
}

function removeProjectItem(projectId) {
  const projectItem = projectList.querySelector(`[data-project-id="${projectId}"]`);
  if (!projectItem) return;
  projectItem.remove();
}

function updateProjectItem(projectId, projectName) {
  const projectItem = projectList.querySelector(`[data-project-id="${projectId}"]`);
  projectItem.querySelector(".project-name").textContent = projectName;
}

export {
  onProjectAdd,
  onProjectSelection,
  renderProject,
  renderProjects,
  updateProjectItem,
  removeProjectItem,
  highlightProject,
  highlightProjectById
}
