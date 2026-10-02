let currentProjectId = null;
let currentFilter = "all";

function setCurrentProjectId(projectId) {
  currentProjectId = projectId;
}

function getCurrentProjectId() {
  return currentProjectId;
}

function setCurrentFilter(filter) {
  currentFilter = filter;
}

function getCurrentFilter() {
  return currentFilter;
}

export {
  setCurrentProjectId,
  getCurrentProjectId,
  setCurrentFilter,
  getCurrentFilter,
}
