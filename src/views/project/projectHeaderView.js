const headerTitle = document.querySelector("#header-title");
const projectEditBtn = document.querySelector("#project-edit-btn");

function onProjectEdit(handler) {
  projectEditBtn.addEventListener("click", handler);
}

function setHeaderTitle(projectName) {
  headerTitle.textContent = projectName;
}

export { onProjectEdit, setHeaderTitle }
