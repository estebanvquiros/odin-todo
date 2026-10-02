let currentProjectId = null;
let currentFilter = "all";
let currentSort = "dueDate-asc";

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

function setCurrentSort(sort) {
  currentSort = sort;
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
