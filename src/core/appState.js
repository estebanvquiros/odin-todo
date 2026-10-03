let currentProjectId = null;
let currentFilter = "all";
let currentSort = { criteria: "dueDate", direction: "asc" };

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

function setCurrentSort(criteria, direction) {
  currentSort = { criteria, direction };
}

function getCurrentSort() {
  return currentSort;
}

export {
  setCurrentProjectId,
  getCurrentProjectId,
  setCurrentFilter,
  getCurrentFilter,
  setCurrentSort,
  getCurrentSort,
}
