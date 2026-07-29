export default class Task {
  constructor(id, title, description, dueDate, priority, projectID) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectID = projectID;
  }
}