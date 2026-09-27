const projectDialog = document.querySelector("#project-dialog");
const projectDialogTitle = projectDialog.querySelector("#project-dialog-title");
const projectForm = projectDialog.querySelector("#project-form");
const projectNameInput = projectForm.querySelector("#project-name-input");
const projectNameErrorMsg = projectForm.querySelector("#project-name-error-msg");
const projectSubmitBtn = projectDialog.querySelector("#project-submit-btn");
const projectDeleteBtn = projectDialog.querySelector("#project-delete-btn");
const projectCancelBtn = projectDialog.querySelector("#project-cancel-btn");

function onProjectSubmit(handler) {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = projectNameInput.value.trim();
    handler(projectName);
  });
}

function onProjectDelete(handler) {
  projectDeleteBtn.addEventListener("click", () => {
    handler();
    closeProjectDialog();
  })
}

function onProjectCancel() {
  projectCancelBtn.addEventListener("click", closeProjectDialog);
  projectDialog.addEventListener("close", resetProjectForm);
}

function openCreateProjectDialog() {
  setupCreateProjectDialog();
  projectDialog.showModal();
}

function openEditProjectDialog(project) {
  setupEditProjectDialog(project.isDefault);
  projectNameInput.value = project.name;
  projectDialog.showModal();
}

function closeProjectDialog() {
  projectDialog.close();
}

function setupCreateProjectDialog() {
  projectDialogTitle.textContent = "New Project";
  projectSubmitBtn.textContent = "Create Project";
  projectDeleteBtn.classList.add("hidden");
}

function setupEditProjectDialog(isDefault) {
  projectDialogTitle.textContent = "Edit Project";
  projectSubmitBtn.textContent = "Save Changes";
  if (isDefault) {
    projectDeleteBtn.classList.add("hidden");
  } else {
    projectDeleteBtn.classList.remove("hidden");
  }
}

function resetProjectForm() {
  projectForm.reset();
  hideProjectNameError();
}

function showProjectNameError(message) {
  projectNameErrorMsg.textContent = message;
  projectNameInput.classList.add("input-error");
  projectNameErrorMsg.classList.remove("hidden");
}

function hideProjectNameError() {
  projectNameErrorMsg.classList.add("hidden");
  projectNameInput.classList.remove("input-error");
}

export {
  onProjectSubmit,
  onProjectDelete,
  onProjectCancel,
  openCreateProjectDialog,
  openEditProjectDialog,
  closeProjectDialog,
  showProjectNameError
}
