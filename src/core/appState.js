let currentProjectId = null;

function setCurrentProjectId(projectId) {
  currentProjectId = projectId;
}

function getCurrentProjectId() {
  return currentProjectId;
}

export { setCurrentProjectId, getCurrentProjectId }
